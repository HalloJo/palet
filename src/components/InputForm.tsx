import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Vibe, GenerateRequest } from '../types/brand'
import { VIBES, MAX_BRAND_NAME_LENGTH, MAX_DESCRIPTION_LENGTH } from '../lib/constants'
import { validateForm } from '../lib/validators'

interface Props {
  onSubmit: (request: GenerateRequest) => void
  isLoading: boolean
}

export function InputForm({ onSubmit, isLoading }: Props) {
  const [brandName, setBrandName] = useState('')
  const [description, setDescription] = useState('')
  const [vibe, setVibe] = useState<Vibe>('minimal')
  const [errors, setErrors] = useState<{ brandName?: string; description?: string }>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validateForm(brandName, description)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    onSubmit({ brandName: brandName.trim(), description: description.trim(), vibe })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col px-4"
    >
      {/* Header */}
      <header className="py-6">
        <span
          className="text-2xl"
          style={{ color: '#FF6B2B', fontFamily: '"Instrument Serif", serif' }}
        >
          Palet
        </span>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight"
            style={{ color: '#f0f0f0', fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
          >
            Turn your idea into a<br />
            <span style={{ color: '#FF6B2B' }}>brand identity</span> — instantly.
          </h1>
          <p className="text-base" style={{ color: '#6b7280', fontFamily: '"Inter", sans-serif' }}>
            Powered by Claude AI. No design skills needed.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="w-full glass rounded-2xl p-6 sm:p-8 space-y-6"
          noValidate
        >
          {/* Brand Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="brandName"
              className="block text-sm font-medium"
              style={{ color: '#f0f0f0' }}
            >
              Brand Name
            </label>
            <input
              id="brandName"
              type="text"
              value={brandName}
              onChange={e => {
                setBrandName(e.target.value)
                if (errors.brandName) setErrors(prev => ({ ...prev, brandName: undefined }))
              }}
              maxLength={MAX_BRAND_NAME_LENGTH}
              placeholder="e.g. Verdant"
              disabled={isLoading}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-150 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: errors.brandName ? '1px solid #FF6B2B' : '1px solid rgba(255,255,255,0.1)',
                color: '#f0f0f0',
              }}
            />
            {errors.brandName && (
              <p className="text-xs mt-1" style={{ color: '#FF6B2B' }}>{errors.brandName}</p>
            )}
            <p className="text-xs text-right" style={{ color: '#6b7280' }}>
              {brandName.length}/{MAX_BRAND_NAME_LENGTH}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="block text-sm font-medium"
              style={{ color: '#f0f0f0' }}
            >
              Describe your brand
            </label>
            <textarea
              id="description"
              value={description}
              onChange={e => {
                setDescription(e.target.value)
                if (errors.description) setErrors(prev => ({ ...prev, description: undefined }))
              }}
              maxLength={MAX_DESCRIPTION_LENGTH}
              rows={4}
              placeholder="e.g. A sustainable sneaker brand for urban millennials who care about the planet"
              disabled={isLoading}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-colors duration-150 disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: errors.description ? '1px solid #FF6B2B' : '1px solid rgba(255,255,255,0.1)',
                color: '#f0f0f0',
              }}
            />
            {errors.description && (
              <p className="text-xs mt-1" style={{ color: '#FF6B2B' }}>{errors.description}</p>
            )}
            <p className="text-xs text-right" style={{ color: '#6b7280' }}>
              {description.length}/{MAX_DESCRIPTION_LENGTH}
            </p>
          </div>

          {/* Vibe selector */}
          <div className="space-y-2">
            <p className="text-sm font-medium" style={{ color: '#f0f0f0' }}>Brand Vibe</p>
            <div className="flex flex-wrap gap-2">
              {VIBES.map(v => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setVibe(v.value)}
                  disabled={isLoading}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 disabled:opacity-50"
                  style={{
                    background: vibe === v.value ? '#FF6B2B' : 'rgba(255,255,255,0.06)',
                    color: vibe === v.value ? '#fff' : '#6b7280',
                    border: vibe === v.value ? '1px solid #FF6B2B' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60"
            style={{
              background: isLoading ? 'rgba(255,107,43,0.7)' : '#FF6B2B',
              color: '#fff',
            }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Generating your brand...
              </>
            ) : (
              'Generate Brand Kit'
            )}
          </button>
        </motion.form>
      </div>
    </motion.div>
  )
}
