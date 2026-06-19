import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { InputForm } from './components/InputForm'
import { ResultsScreen } from './components/ResultsScreen'
import { SkeletonLoader } from './components/SkeletonLoader'
import { Toast } from './components/Toast'
import { BackgroundAnimation } from './components/BackgroundAnimation'
import { Navbar } from './components/Navbar'
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
      <BackgroundAnimation />

      {/* Full-viewport shell — Navbar + scrollable content area */}
      <div className="relative h-screen flex flex-col overflow-hidden" style={{ zIndex: 1 }}>
        <Navbar />

        {/* flex-1 + min-h-0 lets the child shrink and scroll internally */}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <AnimatePresence mode="wait">
            {(status === 'idle' || status === 'error') && (
              <div key="input" className="h-full flex flex-col">
                <InputForm onSubmit={handleSubmit} isLoading={false} />
                {status === 'error' && (
                  <div className="max-w-2xl mx-auto w-full px-4 pb-6">
                    <div
                      className="glass rounded-xl p-4 flex items-center justify-between gap-4"
                      style={{ borderColor: 'rgba(255,107,43,0.3)' }}
                    >
                      <p className="text-sm text-accent">
                        {errorMessage.includes('rate') || errorMessage.includes('limit')
                          ? "You've generated a few brands already! Wait a minute and try again. ☕"
                          : errorMessage}
                      </p>
                      <button
                        onClick={reset}
                        className="shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium bg-accent/15 text-accent border border-accent/30"
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
        </main>

        <Toast toasts={toasts} onRemove={removeToast} />
      </div>
    </>
  )
}

export default App
