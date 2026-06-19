import { AnimatePresence, motion } from 'framer-motion'
import type { ToastMessage } from '../hooks/useToast'

interface Props {
  toasts: ToastMessage[]
  onRemove: (id: number) => void
}

export function Toast({ toasts, onRemove }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => onRemove(toast.id)}
            className="glass rounded-xl px-4 py-3 text-sm font-medium pointer-events-auto cursor-pointer"
            style={{ color: '#62C688', borderColor: 'rgba(98,198,136,0.3)' }}
          >
            ✓ {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
