import { useState, useEffect } from 'react'

// First commit of this project
const BORN_AT = new Date('2026-06-19T11:45:42+02:00').getTime()

function formatAge(ms: number): string {
  const minutes = Math.floor(ms / 60_000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (months >= 1) return `${months}mo ago`
  if (weeks >= 1) return `${weeks}w ago`
  if (days >= 1) return `${days}d ago`
  if (hours >= 1) return `${hours}h ago`
  if (minutes >= 1) return `${minutes}m ago`
  return 'just now'
}

export function useTimeAgo(): string {
  const [label, setLabel] = useState(() => formatAge(Date.now() - BORN_AT))

  useEffect(() => {
    const id = setInterval(() => {
      setLabel(formatAge(Date.now() - BORN_AT))
    }, 60_000)
    return () => clearInterval(id)
  }, [])

  return label
}
