import { useState, useCallback } from 'react'
import type { BrandKit, GenerateRequest } from '../types/brand'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useGenerate() {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<BrandKit | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const generate = useCallback(async (request: GenerateRequest) => {
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      const json = await res.json() as { error?: string } & Partial<BrandKit>

      if (!res.ok || json.error) {
        throw new Error(json.error ?? 'Generation failed. Please try again.')
      }

      setData(json as BrandKit)
      setStatus('success')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Generation failed. Please try again.'
      setErrorMessage(message)
      setStatus('error')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setData(null)
    setErrorMessage('')
  }, [])

  return { status, data, errorMessage, generate, reset }
}
