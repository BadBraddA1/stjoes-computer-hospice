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

export function MemorialWall() {
  const [mine, setMine] = useState<Memorial[]>([])
  const [machine, setMachine] = useState("")
  const [message, setMessage] = useState("")
  const [from, setFrom] = useState("")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as Memorial[]
      if (Array.isArray(parsed)) setMine(parsed)
    } catch {
      /* ignore */
    }
  }, [])

  const entries = useMemo(() => {
    return [...mine, ...SEED].sort((a, b) => b.at - a.at)
  }, [mine])

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
    setMachine("")
    setMessage("")
    setFrom("")
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
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
              className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
              placeholder="OptiPlex, iBook, toaster PC…"
              required
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="text-sm text-muted">From</span>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
              placeholder="Your name or alias"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-muted">Memorial note</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
              placeholder="Final words for the hard drive…"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-5 inline-flex rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
        >
          Etch on the wall
        </button>
        <p className="mt-3 font-mono text-xs text-muted">
          Your notes stay on this device. The cloud is also in hospice.
        </p>
      </form>

      <ul className="mt-10 space-y-4">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="rounded-2xl border border-line bg-bg/80 px-5 py-5 sm:px-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
                {entry.machine}
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {new Date(entry.at).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-3 leading-relaxed text-muted">“{entry.message}”</p>
            <p className="mt-3 text-sm text-ink">— {entry.from}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
