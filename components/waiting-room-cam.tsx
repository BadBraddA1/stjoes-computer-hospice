"use client"

import { useEffect, useState } from "react"

const PATIENTS = [
  "OptiPlex ’09 — comfort care",
  "ThinkPad T420 — battery absent",
  "iMac 2012 — beach ball vigil",
  "Gateway 2000 — seeing blue light",
  "Printer Lobby B — emotional jam",
  "Netbook 2009 — bargaining with Wi‑Fi",
  "RAID shelf — group therapy",
  "Beige tower — dust baptism",
]

export function WaitingRoomCam() {
  const [tick, setTick] = useState(0)
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2200)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => setOnline((o) => (Math.random() > 0.15 ? true : o)), 8000)
    return () => window.clearInterval(id)
  }, [])

  const line = PATIENTS[tick % PATIENTS.length]
  const blink = tick % 2 === 0

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:px-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-accent">
        Lobby webcam · not HIPAA because not real
      </p>
      <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
        Waiting room cam
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        A live-ish feed of the only thing that still responds: a power LED.
      </p>

      <div className="relative mt-8 overflow-hidden rounded-[28px] border border-ink bg-[#0d1b2a] shadow-[0_24px_60px_rgba(26,54,93,0.35)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-white/60">
          <span>{online ? "● REC · lobby B" : "○ buffering spiritually"}</span>
          <span>CAM-04</span>
        </div>
        <div className="flex aspect-video flex-col items-center justify-center gap-6 px-6">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-black/40">
            <div
              className="h-10 w-10 rounded-full bg-accent transition-opacity duration-500"
              style={{ opacity: blink ? 1 : 0.35, boxShadow: blink ? "0 0 28px rgba(95,148,72,0.7)" : "none" }}
              aria-hidden
            />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft" aria-live="polite">
            {line}
          </p>
        </div>
        <div className="overflow-hidden border-t border-white/10 bg-black/30 py-2">
          <div className="ticker-track flex gap-10 whitespace-nowrap px-4 font-mono text-[11px] uppercase tracking-wide text-white/55">
            {[0, 1].map((loop) => (
              <div key={loop} className="flex shrink-0 gap-10" aria-hidden={loop === 1}>
                {PATIENTS.map((p) => (
                  <span key={`${loop}-${p}`}>{p}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
