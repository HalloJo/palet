import { motion } from 'framer-motion'
import type { BrandKit } from '../types/brand'
import { ColorSwatch } from './ColorSwatch'
import { TaglineCard } from './TaglineCard'

interface Props {
  kit: BrandKit
  onCopy: (text: string) => void
  onRegenerate: () => void
  onStartOver: () => void
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
}

function Section({ children, index, className = '' }: { children: React.ReactNode; index: number; className?: string }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className={`glass rounded-2xl p-6 print-section ${className}`}
    >
      {children}
    </motion.div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl mb-4"
      style={{ color: '#f0f0f0', fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
    >
      {children}
    </h2>
  )
}

export function ResultsScreen({ kit, onCopy, onRegenerate, onStartOver }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 py-8 space-y-6"
    >
      {/* Brand header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4"
      >
        <p className="text-sm mb-1" style={{ color: '#6b7280' }}>Your brand identity is ready</p>
        <h1
          className="text-3xl"
          style={{ color: '#FF6B2B', fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
        >
          Palet
        </h1>
      </motion.div>

      {/* Personality */}
      <Section index={0}>
        <SectionTitle>Brand Personality</SectionTitle>
        <div className="flex flex-wrap gap-2 mb-4">
          {kit.personality.traits.map(trait => (
            <span
              key={trait}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(255,107,43,0.15)',
                color: '#FF6B2B',
                border: '1px solid rgba(255,107,43,0.3)',
              }}
            >
              {trait}
            </span>
          ))}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
          {kit.personality.toneDescription}
        </p>
      </Section>

      {/* Colors */}
      <Section index={1}>
        <SectionTitle>Color Palette</SectionTitle>
        <div className="grid grid-cols-5 gap-3">
          {kit.colors.map((color, i) => (
            <ColorSwatch
              key={color.hex}
              color={color}
              index={i}
              onCopy={(hex) => onCopy(hex)}
            />
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: '#6b7280' }}>Click any swatch to copy the hex code</p>
      </Section>

      {/* Typography */}
      <Section index={2}>
        <SectionTitle>Typography</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: '#6b7280' }}>HEADING</p>
            <p
              className="text-3xl"
              style={{ color: '#f0f0f0', fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
            >
              {kit.typography.heading}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: '#6b7280' }}>BODY</p>
            <p className="text-base" style={{ color: '#f0f0f0', fontFamily: '"Inter", sans-serif' }}>
              {kit.typography.body}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
          {kit.typography.reasoning}
        </p>
      </Section>

      {/* Taglines */}
      <Section index={3}>
        <SectionTitle>Brand Taglines</SectionTitle>
        <div className="space-y-3">
          {kit.taglines.map((tagline, i) => (
            <TaglineCard
              key={i}
              tagline={tagline}
              index={i}
              onCopy={(text) => onCopy(`Copied: "${text}"`)}
            />
          ))}
        </div>
      </Section>

      {/* Tone of Voice */}
      <Section index={4}>
        <SectionTitle>Tone of Voice</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p
              className="text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ color: '#62C688' }}
            >
              <span>✓</span> DO
            </p>
            <ul className="space-y-2">
              {kit.toneOfVoice.dos.map((item, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: '#6b7280' }}>
                  <span style={{ color: '#62C688' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              className="text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ color: '#FF6B2B' }}
            >
              <span>✕</span> DON'T
            </p>
            <ul className="space-y-2">
              {kit.toneOfVoice.donts.map((item, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: '#6b7280' }}>
                  <span style={{ color: '#FF6B2B' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Social Bio */}
      <Section index={5}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <SectionTitle>Social Media Bio</SectionTitle>
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              {kit.socialBio}
            </p>
          </div>
          <button
            onClick={() => onCopy(kit.socialBio)}
            className="shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium mt-1 transition-colors duration-150"
            style={{
              background: 'rgba(255,107,43,0.15)',
              color: '#FF6B2B',
              border: '1px solid rgba(255,107,43,0.3)',
            }}
            title="Copy bio"
          >
            Copy
          </button>
        </div>
      </Section>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="flex flex-col sm:flex-row gap-3 no-print"
      >
        <button
          onClick={onRegenerate}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
          style={{
            background: '#FF6B2B',
            color: '#fff',
          }}
        >
          Regenerate
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors duration-150"
          style={{
            background: 'rgba(255,255,255,0.06)',
            color: '#f0f0f0',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Export as PDF
        </button>
        <button
          onClick={onStartOver}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors duration-150"
          style={{
            background: 'rgba(255,255,255,0.04)',
            color: '#6b7280',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          Start Over
        </button>
      </motion.div>
    </motion.div>
  )
}
