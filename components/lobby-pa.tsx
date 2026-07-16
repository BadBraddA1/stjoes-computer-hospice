"use client"

import { useEffect, useState } from "react"

const LINES = [
  "Paging OptiPlex to Discharge.",
  "Would the owner of a beige tower please report to Comfort Care.",
  "Printer in Lobby B: your emotional jam is ready.",
  "Visiting hours bingo begins when you are ready. You never are.",
  "Fr. Joe to Ward 3. Bring tissues and compressed air.",
  "Care+ members may cut ahead. Standard callers: forever (revised).",
  "Joe 3 to HR. Everyone else: remain seated.",
]

export function LobbyPA() {
  const [line, setLine] = useState<string | null>(null)

  useEffect(() => {
    let hide: number | undefined
    const speak = () => {
      setLine(LINES[Math.floor(Math.random() * LINES.length)])
      hide = window.setTimeout(() => setLine(null), 6000)
    }
    const start = window.setTimeout(speak, 12000)
    const interval = window.setInterval(speak, 42000)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(hide)
      window.clearInterval(interval)
    }
  }, [])

  if (!line) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="anim-rise pointer-events-none fixed left-1/2 top-4 z-40 w-[min(92vw,28rem)] -translate-x-1/2 rounded-full border border-line bg-card/95 px-5 py-2.5 text-center text-sm text-ink shadow-[0_12px_30px_rgba(26,54,93,0.12)]"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">PA · lobby</span>
      <span className="mt-0.5 block">{line}</span>
    </div>
  )
}
