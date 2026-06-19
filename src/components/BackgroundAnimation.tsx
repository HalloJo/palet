const NODES = [
  { cx: 180,  cy: 160 },
  { cx: 420,  cy: 280 },
  { cx: 680,  cy: 140 },
  { cx: 960,  cy: 320 },
  { cx: 1200, cy: 180 },
  { cx: 1350, cy: 500 },
  { cx: 1080, cy: 600 },
  { cx: 800,  cy: 520 },
  { cx: 540,  cy: 660 },
  { cx: 280,  cy: 580 },
  { cx: 100,  cy: 440 },
  { cx: 720,  cy: 800 },
  { cx: 360,  cy: 780 },
]

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [4, 5], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [10, 0],
  [1, 7], [2, 8], [3, 6],
  [7, 11], [8, 12], [9, 12],
]

export function BackgroundAnimation() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bg-g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: 'var(--color-green, #51ff00)', stopOpacity: 0.09 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-green, #51ff00)', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="bg-g2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#00ccff', stopOpacity: 0.06 }} />
            <stop offset="100%" style={{ stopColor: '#00ccff', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="bg-g3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#9966ff', stopOpacity: 0.05 }} />
            <stop offset="100%" style={{ stopColor: '#9966ff', stopOpacity: 0 }} />
          </radialGradient>

          <filter id="bg-orb-blur">
            <feGaussianBlur stdDeviation="80" />
          </filter>
          <filter id="bg-node-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Atmospheric gradient orbs */}
        <g filter="url(#bg-orb-blur)">
          <ellipse cx="200" cy="200" rx="440" ry="440" fill="url(#bg-g1)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 100,60; -40,100; 70,-30; 0,0"
              dur="28s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </ellipse>
          <ellipse cx="1300" cy="450" rx="500" ry="400" fill="url(#bg-g2)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -100,50; 40,-80; -60,70; 0,0"
              dur="23s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </ellipse>
          <ellipse cx="700" cy="860" rx="560" ry="340" fill="url(#bg-g3)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 60,-70; -80,30; 50,60; 0,0"
              dur="34s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </ellipse>
        </g>

        {/* Generative graph — edges */}
        {EDGES.map(([a, b], i) => {
          const n1 = NODES[a]
          const n2 = NODES[b]
          const period = 5 + (i % 5) * 1.3
          const delay = (i * 0.85) % 7
          return (
            <line
              key={`e${i}`}
              x1={n1.cx} y1={n1.cy}
              x2={n2.cx} y2={n2.cy}
              stroke="var(--color-green, #51ff00)"
              strokeWidth="0.6"
              strokeOpacity="0"
            >
              <animate
                attributeName="stroke-opacity"
                values="0; 0.18; 0.07; 0.15; 0"
                dur={`${period}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </line>
          )
        })}

        {/* Generative graph — nodes with ripple */}
        {NODES.map((node, i) => {
          const period = 4 + (i % 4) * 0.9
          const delay = (i * 0.55) % 5
          return (
            <g key={`n${i}`} filter="url(#bg-node-glow)">
              {/* Core dot */}
              <circle cx={node.cx} cy={node.cy} r="2" fill="var(--color-green, #51ff00)" opacity="0">
                <animate
                  attributeName="opacity"
                  values="0; 0.55; 0.2; 0.45; 0"
                  dur={`${period}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Ripple ring */}
              <circle
                cx={node.cx} cy={node.cy}
                r="2"
                fill="none"
                stroke="var(--color-green, #51ff00)"
                strokeWidth="0.6"
              >
                <animate
                  attributeName="r"
                  values="2; 16; 2"
                  dur={`${period}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.35; 0; 0"
                  dur={`${period}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
