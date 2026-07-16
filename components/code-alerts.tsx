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

type Alert = (typeof ALERTS)[number]

export function CodeAlerts() {
  const [alert, setAlert] = useState<Alert | null>(null)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    let timeout: number | undefined
    let flashTimeout: number | undefined

    const show = (next: Alert, fullscreen = false) => {
      setAlert(next)
      if (fullscreen) {
        setFlash(true)
        flashTimeout = window.setTimeout(() => setFlash(false), 1200)
      }
      timeout = window.setTimeout(() => setAlert(null), fullscreen ? 5000 : 4500)
    }

    const start = window.setTimeout(() => show(ALERTS[Math.floor(Math.random() * ALERTS.length)]), 8000)
    const interval = window.setInterval(() => {
      const next = ALERTS[Math.floor(Math.random() * ALERTS.length)]
      show(next, Math.random() < 0.22)
    }, 28000)

    function onCustom(e: Event) {
      const detail = (e as CustomEvent<Alert>).detail
      if (detail?.code) show(detail, true)
    }
    window.addEventListener("stjoe:code-alert", onCustom)

    return () => {
      window.clearTimeout(start)
      window.clearTimeout(timeout)
      window.clearTimeout(flashTimeout)
      window.clearInterval(interval)
      window.removeEventListener("stjoe:code-alert", onCustom)
    }
  }, [])

  return (
    <>
      {flash ? (
        <div
          className="code-flash fixed inset-0 z-[55] flex items-center justify-center bg-ink/85 p-6"
          role="alert"
        >
          <div className="text-center">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent-soft">
              ● {alert?.code || "Code Beige"}
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-card sm:text-4xl">
              Remain calm
            </p>
            <p className="mt-2 text-white/70">{alert?.detail}</p>
          </div>
        </div>
      ) : null}

      {alert && !flash ? (
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
      ) : null}
    </>
  )
}
