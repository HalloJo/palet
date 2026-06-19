# Palet — AI Brand Identity Generator

Turn your idea into a complete brand identity in seconds, powered by Claude AI.

## What it does

Enter a brand name, a short description, and choose a vibe. Palet sends your input to a secure serverless function that calls the Claude API and returns a full brand kit including:

- Brand personality traits & tone of voice
- A 5-color palette with hex codes
- Typography pairing with reasoning
- 3 brand taglines
- Do/Don't communication guidelines
- A ready-to-use social media bio

## Setup

1. **Clone and install**
   ```bash
   npm install
   ```

2. **Add your API key**
   ```bash
   cp .env.example .env
   # Edit .env and replace with your actual Anthropic API key
   ```

3. **Run locally with Vercel dev server**
   ```bash
   npx vercel dev
   ```
   This runs both the Vite frontend and the `/api/generate` serverless function together.

## Security

The Claude API key is never exposed to the browser. All AI calls are proxied through `/api/generate`, a Vercel serverless function that:

- Reads `ANTHROPIC_API_KEY` from environment variables (server-side only)
- Validates and sanitizes all inputs before forwarding to Claude
- Applies rate limiting (10 requests per IP per minute)
- Returns only generic error messages — no stack traces or internal details
- Enforces CORS to same-origin only

## Deploy to Vercel

1. Push your repo to GitHub
2. Import the project in [vercel.com](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` as an Environment Variable in the Vercel dashboard
4. Deploy — done

---

Built with vibe coding + Claude
