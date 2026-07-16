"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"

type Memorial = {
  id: string
  machine: string
  message: string
  from: string
  at: number
}

const SEED: Memorial[] = [
  {
    id: "seed-1",
    machine: "Gateway 2000",
    message: "You saw the blue light first. Save often. Rest well.",
    from: "Ward 3",
    at: Date.UTC(2024, 3, 12),
  },
  {
    id: "seed-2",
    machine: "iMac (2012)",
    message: "The beach ball was not a toy. It was a prophecy.",
    from: "A friend with a MagSafe scar",
    at: Date.UTC(2024, 8, 2),
  },
  {
    id: "seed-3",
    machine: "ThinkPad T420",
    message: "TrackPoint forever. Battery, we understood.",
    from: "Docking station next of kin",
    at: Date.UTC(2025, 0, 18),
  },
  {
    id: "seed-4",
    machine: "Dell OptiPlex ’09",
    message: "Beige was your season. Dust was your cologne.",
    from: "Fr. Joe",
    at: Date.UTC(2025, 5, 9),
  },
]

const STORAGE_KEY = "stjoe-memorials"
const CANDLE_KEY = "stjoe-candles"

function playChime() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const now = ctx.currentTime
    ;[523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02 + i * 0.12)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8 + i * 0.12)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + i * 0.12)
      osc.stop(now + 1 + i * 0.12)
    })
    window.setTimeout(() => void ctx.close(), 1500)
  } catch {
    /* audio blocked */
  }
}

function weekIndex() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  return Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))
}

export function MemorialWall() {
  const [mine, setMine] = useState<Memorial[]>([])
  const [machine, setMachine] = useState("")
  const [message, setMessage] = useState("")
  const [from, setFrom] = useState("")
  const [candles, setCandles] = useState(12)
  const [litFlash, setLitFlash] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Memorial[]
        if (Array.isArray(parsed)) setMine(parsed)
      }
      const c = Number(localStorage.getItem(CANDLE_KEY))
      if (Number.isFinite(c) && c > 0) setCandles(c)
    } catch {
      /* ignore */
    }
  }, [])

  const entries = useMemo(() => {
    return [...mine, ...SEED].sort((a, b) => b.at - a.at)
  }, [mine])

  const patientOfWeek = useMemo(() => {
    const pool = entries.length ? entries : SEED
    return pool[weekIndex() % pool.length]
  }, [entries])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Memorial = {
      id: `local-${Date.now()}`,
      machine: machine.trim() || "Unknown device",
      message: message.trim() || "Sorry your time is up.",
      from: from.trim() || "Anonymous USB",
      at: Date.now(),
    }
    const updated = [next, ...mine].slice(0, 40)
    setMine(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    const nextCandles = candles + 1
    setCandles(nextCandles)
    localStorage.setItem(CANDLE_KEY, String(nextCandles))
    playChime()
    setLitFlash(true)
    window.setTimeout(() => setLitFlash(false), 900)
    setMachine("")
    setMessage("")
    setFrom("")
  }

  function leaveFlowers() {
    const next = candles + 1
    setCandles(next)
    localStorage.setItem(CANDLE_KEY, String(next))
    playChime()
    setLitFlash(true)
    window.setTimeout(() => setLitFlash(false), 900)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
      <div
        className={`mb-8 rounded-2xl border bg-ink px-6 py-5 text-card transition ${
          litFlash ? "border-accent" : "border-accent/30"
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-soft">
              Chapel · candles lit
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold tabular-nums">
              {candles}
            </p>
          </div>
          <button
            type="button"
            onClick={leaveFlowers}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
          >
            Leave flowers
          </button>
        </div>
      </div>

      <aside className="mb-8 rounded-2xl border border-line bg-accent-soft/40 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Patient of the Week</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-ink">
          {patientOfWeek.machine}
        </p>
        <p className="mt-2 text-muted">“{patientOfWeek.message}”</p>
        <p className="mt-2 font-mono text-xs text-muted">— {patientOfWeek.from}</p>
      </aside>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-line bg-card p-6 shadow-[0_16px_40px_rgba(26,54,93,0.08)] sm:p-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Leave a last word</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-1">
            <span className="text-sm text-muted">Machine</span>
            <input
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              placeholder="OptiPlex, iBook, toaster PC…"
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="text-sm text-muted">From</span>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              placeholder="Your name or alias"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-muted">Memorial note</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              placeholder="Final words for the hard drive…"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-5 inline-flex min-h-11 rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Etch & light a candle
        </button>
      </form>

      <ul className="mt-10 space-y-4">
        {entries.map((entry) => (
          <li key={entry.id} className="rounded-2xl border border-line bg-bg px-5 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">{entry.machine}</h3>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {entry.from}
              </span>
            </div>
            <p className="mt-3 leading-relaxed text-muted">“{entry.message}”</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
