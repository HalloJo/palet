import { useState, useCallback } from 'react'

export interface ToastMessage {
  id: number
  message: string
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((message: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 2500)
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, showToast, removeToast }
}
