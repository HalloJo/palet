export type Vibe = 'minimal' | 'bold' | 'playful' | 'luxury' | 'tech' | 'organic'

export interface BrandColor {
  role: string
  hex: string
  name: string
}

export interface BrandPersonality {
  traits: [string, string, string]
  toneDescription: string
}

export interface BrandTypography {
  heading: string
  body: string
  reasoning: string
}

export interface ToneOfVoice {
  dos: [string, string, string]
  donts: [string, string, string]
}

export interface BrandKit {
  personality: BrandPersonality
  colors: [BrandColor, BrandColor, BrandColor, BrandColor, BrandColor]
  typography: BrandTypography
  taglines: [string, string, string]
  toneOfVoice: ToneOfVoice
  socialBio: string
}

export interface GenerateRequest {
  brandName: string
  description: string
  vibe: Vibe
}

export interface GenerateResponse {
  data?: BrandKit
  error?: string
}
