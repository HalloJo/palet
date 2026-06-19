import React from 'react'
import { motion } from 'framer-motion'

function SkeletonBlock({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`skeleton ${className ?? ''}`} style={style} />
}

export function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 py-8 space-y-6"
    >
      {/* Personality */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <SkeletonBlock className="h-6 w-40" />
        <div className="flex gap-2">
          <SkeletonBlock className="h-8 w-24 rounded-full" />
          <SkeletonBlock className="h-8 w-28 rounded-full" />
          <SkeletonBlock className="h-8 w-20 rounded-full" />
        </div>
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-3/4" />
      </div>

      {/* Colors */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <SkeletonBlock className="h-6 w-36" />
        <div className="grid grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <SkeletonBlock className="w-full aspect-square rounded-2xl min-h-20" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-2/3 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <SkeletonBlock className="h-6 w-32" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <SkeletonBlock className="h-10 w-full" />
            <SkeletonBlock className="h-4 w-1/2" />
          </div>
          <div className="space-y-2">
            <SkeletonBlock className="h-6 w-full" />
            <SkeletonBlock className="h-4 w-1/2" />
          </div>
        </div>
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-4/5" />
      </div>

      {/* Taglines */}
      <div className="glass rounded-2xl p-6 space-y-3">
        <SkeletonBlock className="h-6 w-36" />
        {[...Array(3)].map((_, i) => (
          <SkeletonBlock key={i} className="h-14 w-full" />
        ))}
      </div>

      {/* Tone of Voice */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <SkeletonBlock className="h-6 w-40" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <SkeletonBlock key={i} className="h-4 w-full" />
            ))}
          </div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <SkeletonBlock key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Social Bio */}
      <div className="glass rounded-2xl p-6 space-y-3">
        <SkeletonBlock className="h-6 w-36" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-4/5" />
        <SkeletonBlock className="h-4 w-3/5" />
      </div>
    </motion.div>
  )
}
