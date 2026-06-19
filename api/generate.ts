import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

const VALID_VIBES = ['minimal', 'bold', 'playful', 'luxury', 'tech', 'organic'] as const
type Vibe = typeof VALID_VIBES[number]

// In-memory rate limit store: IP -> { count, resetAt }
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60_000

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress ?? 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) return false

  entry.count++
  return true
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — same origin only
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin ?? '')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  // Rate limiting
  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please wait a minute and try again.' })
  }

  // Parse and validate body
  const body = req.body as Record<string, unknown>

  const rawBrandName = typeof body?.brandName === 'string' ? body.brandName : ''
  const rawDescription = typeof body?.description === 'string' ? body.description : ''
  const rawVibe = typeof body?.vibe === 'string' ? body.vibe : ''

  const brandName = stripHtml(rawBrandName).slice(0, 50)
  const description = stripHtml(rawDescription).slice(0, 500)
  const vibe = rawVibe.toLowerCase()

  if (!brandName) {
    return res.status(400).json({ error: 'Brand name is required.' })
  }
  if (!description) {
    return res.status(400).json({ error: 'Description is required.' })
  }
  if (!VALID_VIBES.includes(vibe as Vibe)) {
    return res.status(400).json({ error: 'Invalid vibe value.' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Generation failed. Please try again.' })
  }

  try {
    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system:
        'You are a professional brand strategist and designer. Generate brand identities that are strategic, creative, and actionable. Always respond with valid JSON only, no markdown, no explanation.',
      messages: [
        {
          role: 'user',
          content: `Generate a complete brand identity for: Brand name: ${brandName}. Description: ${description}. Vibe/style: ${vibe}.

Return ONLY a valid JSON object with this exact structure:
{
  "personality": { "traits": ["string", "string", "string"], "toneDescription": "string" },
  "colors": [
    { "role": "string", "hex": "string", "name": "string" }
  ],
  "typography": { "heading": "string", "body": "string", "reasoning": "string" },
  "taglines": ["string", "string", "string"],
  "toneOfVoice": { "dos": ["string", "string", "string"], "donts": ["string", "string", "string"] },
  "socialBio": "string"
}

colors must have exactly 5 entries with roles: Primary, Secondary, Accent, Background, Text. All hex values must be valid 6-digit hex codes starting with #.`,
        },
      ],
    })

    const textBlock = message.content.find(b => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return res.status(500).json({ error: 'Generation failed. Please try again.' })
    }

    let parsed: unknown
    try {
      // Strip any accidental markdown fences
      const clean = textBlock.text.replace(/^```json?\s*/i, '').replace(/```\s*$/i, '').trim()
      parsed = JSON.parse(clean)
    } catch {
      return res.status(500).json({ error: 'Generation failed. Please try again.' })
    }

    return res.status(200).json(parsed)
  } catch {
    return res.status(500).json({ error: 'Generation failed. Please try again.' })
  }
}
