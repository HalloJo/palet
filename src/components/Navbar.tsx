import { useTimeAgo } from '../hooks/useTimeAgo'

function PaletteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Palette body */}
      <path
        d="M12 3C7.03 3 3 7.03 3 12c0 4.97 4.03 9 9 9 .83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Paint dots */}
      <circle cx="7"    cy="12"  r="1.1" fill="currentColor" />
      <circle cx="9"    cy="8.5" r="1.1" fill="currentColor" />
      <circle cx="13"   cy="7"   r="1.1" fill="currentColor" />
      <circle cx="16.5" cy="9.5" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function Navbar() {
  const timeAgo = useTimeAgo()

  return (
    <header
      className="sticky top-0 z-20 px-4 sm:px-6 py-4"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(10,10,10,0.6)',
      }}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-accent">
          <PaletteIcon />
          <span className="text-xl font-serif leading-none">Palet</span>
        </div>

        {/* Vibe-coded badge */}
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <span aria-hidden="true">✦</span>
          <span>Vibe-coded {timeAgo}</span>
        </div>
      </div>
    </header>
  )
}
