import type { Vibe } from '../types/brand'

export const VIBES: { value: Vibe; label: string }[] = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'bold', label: 'Bold' },
  { value: 'playful', label: 'Playful' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'tech', label: 'Tech' },
  { value: 'organic', label: 'Organic' },
]

export const MAX_BRAND_NAME_LENGTH = 50
export const MAX_DESCRIPTION_LENGTH = 500
