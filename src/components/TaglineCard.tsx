import { motion } from 'framer-motion'

interface Props {
  tagline: string
  index: number
  onCopy: (text: string) => void
}

export function TaglineCard({ tagline, index, onCopy }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      className="glass rounded-xl p-4 flex items-center justify-between gap-4"
      style={{ borderLeft: '3px solid #FF6B2B' }}
    >
      <p className="text-sm leading-relaxed" style={{ color: '#f0f0f0', fontFamily: '"Inter", sans-serif' }}>
        "{tagline}"
      </p>
      <button
        onClick={() => onCopy(tagline)}
        className="shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors duration-150"
        style={{
          background: 'rgba(255,107,43,0.15)',
          color: '#FF6B2B',
          border: '1px solid rgba(255,107,43,0.3)',
        }}
      >
        Copy
      </button>
    </motion.div>
  )
}
