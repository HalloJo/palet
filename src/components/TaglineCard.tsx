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
      className="glass rounded-xl p-4 flex items-center justify-between gap-4 border-l-[3px] border-l-accent"
    >
      <p className="text-sm leading-relaxed text-text font-sans">
        "{tagline}"
      </p>
      <button
        onClick={() => onCopy(tagline)}
        className="shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors duration-150 bg-accent/15 text-accent border border-accent/30"
      >
        Copy
      </button>
    </motion.div>
  )
}
