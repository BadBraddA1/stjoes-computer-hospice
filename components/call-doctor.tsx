"use client"

import { useEffect, useRef, useState } from "react"

/** Soft hold-music loop via Web Audio. */
function createHoldMusic(ctx: AudioContext) {
  const master = ctx.createGain()
  master.gain.value = 0.08
  master.connect(ctx.destination)

  const notes = [261.63, 329.63, 392.0, 329.63, 349.23, 392.0, 261.63, 196.0]
  let step = 0
  let timer: number | undefined

  const tick = () => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "triangle"
    osc.frequency.value = notes[step % notes.length]
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45)
    osc.connect(gain)
    gain.connect(master)
    osc.start()
    osc.stop(ctx.currentTime + 0.5)
    step += 1
    timer = window.setTimeout(tick, 520)
  }

  tick()
  return () => {
    if (timer) window.clearTimeout(timer)
    master.disconnect()
  }
}

function formatWait(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, "0")}`
}

type CutIn = {
  id: string
  who: string
  reason: string
  jumped: number
}

const CUT_INS: Omit<CutIn, "id">[] = [
  { who: "Care+ member #4481", reason: "Priority Comfort Tier", jumped: 2 },
  { who: "Platinum Tissue Club", reason: "prepaid grief package", jumped: 3 },
  { who: "Fr. Joe (staff)", reason: "chaplain override", jumped: 1 },
  { who: "Gateway family", reason: "bought Care+ at checkout", jumped: 2 },
  { who: "Express Empathy lane", reason: "monthly subscription", jumped: 4 },
  { who: "Joe 3", reason: "name recognition privilege", jumped: 5 },
  { who: "RAID array of 12", reason: "group appointment bump", jumped: 3 },
  { who: "VIP Beige Tower", reason: "legacy donor sticker", jumped: 2 },
  { who: "Printer in Lobby B", reason: "emotional jam emergency", jumped: 1 },
  { who: "Care++ trial user", reason: "free 14-day skip-the-line", jumped: 6 },
  { who: "Battery Warning Club", reason: "critical-but-cute status", jumped: 2 },
  { who: "Someone who brought cookies", reason: "pastoral hospitality", jumped: 1 },
]

const ANNOUNCEMENTS = [
  "Please continue holding. Your place in line is sacred… ish.",
  "An attendant may still be with you. Statistically.",
  "Care+ members may proceed to the front. Thank you for understanding.",
  "We appreciate your patience and your dying machine.",
  "Estimated wait has been refreshed for accuracy.",
  "Now serving: everyone except you.",
]

export function CallDoctor() {
  const [onHold, setOnHold] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [position, setPosition] = useState(4)
  const [startedAt, setStartedAt] = useState(4)
  const [feed, setFeed] = useState<CutIn[]>([])
  const [announcement, setAnnouncement] = useState(ANNOUNCEMENTS[0])
  const [pulse, setPulse] = useState(false)
  const stopRef = useRef<(() => void) | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const cutIndex = useRef(0)

  useEffect(() => {
    if (!onHold) return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [onHold])

  useEffect(() => {
    if (!onHold) return

    const bump = window.setInterval(() => {
      const gag = CUT_INS[cutIndex.current % CUT_INS.length]
      cutIndex.current += 1
      const entry: CutIn = {
        id: `${Date.now()}-${cutIndex.current}`,
        ...gag,
      }
      setPosition((p) => p + gag.jumped)
      setFeed((prev) => [entry, ...prev].slice(0, 6))
      setPulse(true)
      window.setTimeout(() => setPulse(false), 700)
      setAnnouncement(ANNOUNCEMENTS[cutIndex.current % ANNOUNCEMENTS.length])
    }, 4200)

    return () => window.clearInterval(bump)
  }, [onHold])

  useEffect(() => {
    return () => {
      stopRef.current?.()
      ctxRef.current?.close()
    }
  }, [])

  async function toggle() {
    if (onHold) {
      stopRef.current?.()
      stopRef.current = null
      await ctxRef.current?.close()
      ctxRef.current = null
      setOnHold(false)
      setSeconds(0)
      setFeed([])
      setAnnouncement(ANNOUNCEMENTS[0])
      return
    }

    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    ctxRef.current = ctx
    if (ctx.state === "suspended") await ctx.resume()
    stopRef.current = createHoldMusic(ctx)

    const startPos = 3 + Math.floor(Math.random() * 4) // 3–6
    setStartedAt(startPos)
    setPosition(startPos)
    setFeed([])
    cutIndex.current = Math.floor(Math.random() * CUT_INS.length)
    setOnHold(true)
    setSeconds(0)
    setAnnouncement("You are now in the comfort-care queue. Please hold.")
  }

  const placesLost = Math.max(0, position - startedAt)
  const etaMinutes = Math.max(12, position * 7 + Math.floor(seconds / 20))

  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
          On-call physician
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          Call Doctor
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Dial the Head of Hospice Care. Standard callers hold. Care+ floats to the front.
        </p>
      </div>

      {!onHold ? (
        <div className="mt-10 text-center">
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-4 border-accent/40 bg-ink shadow-[0_20px_50px_rgba(26,54,93,0.25)]">
            <span className="font-mono text-sm uppercase tracking-widest text-white/70">Ready</span>
          </div>
          <p className="mt-6 font-mono text-sm text-muted">
            Queue open · Care+ skip-the-line available at the gift shop
          </p>
          <button
            type="button"
            onClick={toggle}
            className="mt-8 inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
          >
            Call Doctor
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <div
            className={`rounded-3xl border bg-ink px-6 py-8 text-center text-card shadow-[0_20px_50px_rgba(26,54,93,0.22)] transition ${
              pulse ? "border-warn" : "border-accent/40"
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-soft">
              ● Connected · on hold
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/55">
              Your place in line
            </p>
            <p
              className={`mt-2 font-[family-name:var(--font-display)] text-6xl font-bold tabular-nums tracking-tight ${
                pulse ? "text-warn" : "text-card"
              }`}
            >
              #{position}
            </p>
            <p className="mt-3 font-mono text-sm text-white/65">
              Wait {formatWait(seconds)} · ETA ~{etaMinutes} min
            </p>
            {placesLost > 0 ? (
              <p className="mt-2 font-mono text-xs text-warn">
                {placesLost} caller{placesLost === 1 ? "" : "s"} moved ahead of you
              </p>
            ) : (
              <p className="mt-2 font-mono text-xs text-accent-soft">Holding steady… for now</p>
            )}
          </div>

          <p
            className="mt-5 text-center text-sm italic text-muted"
            aria-live="polite"
          >
            “{announcement}”
          </p>

          <div className="mt-6 rounded-2xl border border-line bg-card p-4 text-left">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Queue activity
            </p>
            <ul className="mt-3 space-y-3">
              {feed.length === 0 ? (
                <li className="text-sm text-muted">Listening for priority transfers…</li>
              ) : (
                feed.map((item) => (
                  <li
                    key={item.id}
                    className="anim-rise border-b border-line/70 pb-3 last:border-b-0 last:pb-0"
                  >
                    <p className="text-sm font-semibold text-ink">
                      {item.who}{" "}
                      <span className="font-mono text-xs font-medium text-warn">
                        +{item.jumped} ahead
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{item.reason}</p>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed rounded-full border border-line bg-bg px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-muted opacity-70"
              title="Gift shop is closed for grieving"
            >
              Upgrade to Care+
            </button>
            <button
              type="button"
              onClick={toggle}
              className="inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
            >
              End call
            </button>
          </div>
          <p className="mt-3 text-center font-mono text-[11px] text-muted">
            Care+ is currently unavailable · please continue holding
          </p>
        </div>
      )}
    </div>
  )
}
