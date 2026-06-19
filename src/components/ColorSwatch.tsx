import { motion } from 'framer-motion'
import type { BrandColor } from '../types/brand'

interface Props {
  color: BrandColor
  onCopy: (hex: string) => void
  index: number
}

export function ColorSwatch({ color, onCopy, index }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24, delay: index * 0.07 }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onCopy(color.hex)}
      className="flex flex-col items-center gap-2 group cursor-pointer"
      title={`Copy ${color.hex}`}
    >
      <div
        className="w-full aspect-square rounded-2xl shadow-lg transition-shadow duration-200 group-hover:shadow-xl"
        style={{ backgroundColor: color.hex, minHeight: 80 }}
      />
      <div className="text-center">
        <p className="text-xs font-medium" style={{ color: '#f0f0f0' }}>{color.name}</p>
        <p className="text-xs font-mono mt-0.5" style={{ color: '#6b7280' }}>{color.hex}</p>
        <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{color.role}</p>
      </div>
    </motion.button>
  )
}
