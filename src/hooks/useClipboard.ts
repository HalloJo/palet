import { useCallback } from 'react'

export function useClipboard(onSuccess: (text: string) => void) {
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      onSuccess(text)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      onSuccess(text)
    }
  }, [onSuccess])

  return { copy }
}
