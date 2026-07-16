"use client"

import { useEffect, useState } from "react"

export function IdleBattery() {
  const [pct, setPct] = useState(87)
  const [dim, setDim] = useState(false)

  useEffect(() => {
    let idleTimer: number | undefined
    let drain: number | undefined

    const wake = () => {
      setDim(false)
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => setDim(true), 30000)
    }

    wake()
    window.addEventListener("mousemove", wake)
    window.addEventListener("keydown", wake)
    window.addEventListener("touchstart", wake)

    drain = window.setInterval(() => {
      setPct((p) => Math.max(1, p - 1))
    }, 45000)

    return () => {
      window.clearTimeout(idleTimer)
      window.clearInterval(drain)
      window.removeEventListener("mousemove", wake)
      window.removeEventListener("keydown", wake)
      window.removeEventListener("touchstart", wake)
    }
  }, [])

  return (
    <div
      className={`pointer-events-none fixed bottom-4 right-4 z-40 font-mono text-[11px] uppercase tracking-wider transition ${
        dim ? "opacity-40" : "opacity-90"
      }`}
      aria-hidden
    >
      <div className="flex items-center gap-2 rounded-full border border-line bg-card/95 px-3 py-1.5 text-ink shadow-sm">
        <span
          className={`inline-block h-2 w-2 rounded-full ${pct <= 12 ? "bg-warn" : "bg-accent"}`}
          style={{ opacity: dim ? 0.45 : 1 }}
        />
        <span>{pct}%</span>
      </div>
    </div>
  )
}
