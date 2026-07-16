"use client"

import { useEffect, useState } from "react"

const ALERTS = [
  { code: "Code Beige", detail: "Tower is warm and sad." },
  { code: "Code Slow", detail: "Response times not guaranteed." },
  { code: "Code Spin", detail: "Beach ball practicing mindfulness." },
  { code: "Code Dust", detail: "Fan intake has become a habitat." },
  { code: "Code Blue… screen", detail: "Acceptance protocol engaged." },
  { code: "Code Capri", detail: "Break room juice expired in 2014." },
]

export function CodeAlerts() {
  const [alert, setAlert] = useState<(typeof ALERTS)[number] | null>(null)

  useEffect(() => {
    let timeout: number | undefined
    let interval: number | undefined

    const show = () => {
      const next = ALERTS[Math.floor(Math.random() * ALERTS.length)]
      setAlert(next)
      timeout = window.setTimeout(() => setAlert(null), 4500)
    }

    const start = window.setTimeout(show, 8000)
    interval = window.setInterval(show, 28000)

    return () => {
      window.clearTimeout(start)
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  if (!alert) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="anim-rise fixed bottom-5 left-1/2 z-50 w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl border border-accent/40 bg-ink px-5 py-4 text-card shadow-[0_20px_50px_rgba(26,54,93,0.35)]"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-soft">
        ● {alert.code}
      </p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">
        {alert.detail}
      </p>
    </div>
  )
}
