import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { InputForm } from './components/InputForm'
import { ResultsScreen } from './components/ResultsScreen'
import { SkeletonLoader } from './components/SkeletonLoader'
import { Toast } from './components/Toast'
import { useGenerate } from './hooks/useGenerate'
import { useToast } from './hooks/useToast'
import { useClipboard } from './hooks/useClipboard'
import type { GenerateRequest } from './types/brand'

function App() {
  const { status, data, errorMessage, generate, reset } = useGenerate()
  const { toasts, showToast, removeToast } = useToast()
  const { copy } = useClipboard(showToast)
  const [lastRequest, setLastRequest] = useState<GenerateRequest | null>(null)

  function handleSubmit(request: GenerateRequest) {
    setLastRequest(request)
    generate(request)
  }

  function handleRegenerate() {
    if (lastRequest) {
      generate(lastRequest)
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {(status === 'idle' || status === 'error') && (
          <div key="input">
            <InputForm onSubmit={handleSubmit} isLoading={false} />
            {status === 'error' && (
              <div className="max-w-2xl mx-auto px-4 pb-8">
                <div
                  className="glass rounded-xl p-4 flex items-center justify-between gap-4"
                  style={{ borderColor: 'rgba(255,107,43,0.3)' }}
                >
                  <p className="text-sm" style={{ color: '#FF6B2B' }}>
                    {errorMessage.includes('rate') || errorMessage.includes('limit')
                      ? "You've generated a few brands already! Wait a minute and try again. ☕"
                      : errorMessage}
                  </p>
                  <button
                    onClick={reset}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium"
                    style={{
                      background: 'rgba(255,107,43,0.15)',
                      color: '#FF6B2B',
                      border: '1px solid rgba(255,107,43,0.3)',
                    }}
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {status === 'loading' && (
          <div key="loading">
            <header className="px-4 py-6">
              <span style={{ color: '#FF6B2B', fontFamily: '"Instrument Serif", serif', fontSize: '1.5rem' }}>
                Palet
              </span>
            </header>
            <SkeletonLoader />
          </div>
        )}
        {status === 'success' && data && (
          <ResultsScreen
            key="results"
            kit={data}
            onCopy={copy}
            onRegenerate={handleRegenerate}
            onStartOver={reset}
          />
        )}
      </AnimatePresence>

      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  )
}

export default App
