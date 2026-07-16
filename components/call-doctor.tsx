"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

type Genre = "chapel" | "elevator" | "modem" | "lullaby"

const GENRES: { id: Genre; label: string; notes: number[]; tempo: number; type: OscillatorType }[] = [
  {
    id: "chapel",
    label: "Chapel organette",
    notes: [261.63, 329.63, 392.0, 329.63, 349.23, 392.0, 261.63, 196.0],
    tempo: 520,
    type: "triangle",
  },
  {
    id: "elevator",
    label: "Elevator remorse",
    notes: [220, 277.18, 329.63, 277.18, 246.94, 220, 196, 164.81],
    tempo: 640,
    type: "sine",
  },
  {
    id: "modem",
    label: "Dial-up nostalgia",
    notes: [800, 1200, 900, 1400, 700, 1100, 1000, 600],
    tempo: 180,
    type: "square",
  },
  {
    id: "lullaby",
    label: "Battery lullaby",
    notes: [392, 349.23, 329.63, 293.66, 261.63, 293.66, 329.63, 261.63],
    tempo: 700,
    type: "sine",
  },
]

function createHoldMusic(ctx: AudioContext, genre: Genre) {
  const preset = GENRES.find((g) => g.id === genre) || GENRES[0]
  const master = ctx.createGain()
  master.gain.value = genre === "modem" ? 0.035 : 0.08
  master.connect(ctx.destination)

  let step = 0
  let timer: number | undefined

  const tick = () => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = preset.type
    osc.frequency.value = preset.notes[step % preset.notes.length]
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + Math.min(0.45, preset.tempo / 1000))
    osc.connect(gain)
    gain.connect(master)
    osc.start()
    osc.stop(ctx.currentTime + 0.5)
    step += 1
    timer = window.setTimeout(tick, preset.tempo)
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
]

const ANNOUNCEMENTS = [
  "Please continue holding. Your place in line is sacred… ish.",
  "Estimated wait has been refreshed for accuracy: forever (revised).",
  "Care+ members may proceed to the front. Thank you for understanding.",
  "We appreciate your patience and your dying machine.",
  "Now serving: everyone except you.",
  "An attendant may still be with you. Statistically.",
]

const IVR = [
  { key: "1", label: "Denial", detail: "Pressing 1 routes you back to yourself." },
  { key: "2", label: "Bargaining", detail: "Pressing 2 offers RAM. The system declines." },
  { key: "3", label: "Hold for Doctor", detail: "Enter the comfort-care queue." },
  { key: "4", label: "Leave voicemail", detail: "Record a message no physician will hear." },
] as const

type Phase = "menu" | "hold" | "voicemail" | "voicemail-done"

const VOICEMAIL_REPLIES = [
  "Message saved to /dev/null. A chaplain may review it in the next fiscal afterlife.",
  "Transcription complete: mostly sighs. Priority: beige.",
  "Your voicemail has been forwarded to a printer that is also on hold.",
  "Thank you. The Head of Hospice Care will not call you back. Spiritually.",
]

export function CallDoctor() {
  const [phase, setPhase] = useState<Phase>("menu")
  const [seconds, setSeconds] = useState(0)
  const [position, setPosition] = useState(4)
  const [startedAt, setStartedAt] = useState(4)
  const [feed, setFeed] = useState<CutIn[]>([])
  const [announcement, setAnnouncement] = useState(ANNOUNCEMENTS[0])
  const [pulse, setPulse] = useState(false)
  const [genreIndex, setGenreIndex] = useState(0)
  const [ivrLine, setIvrLine] = useState("Welcome to ST Joe's on-call. Listen carefully. Options rarely help.")
  const [vmText, setVmText] = useState("")
  const [vmReply, setVmReply] = useState("")
  const stopRef = useRef<(() => void) | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const cutIndex = useRef(0)
  const genre = GENRES[genreIndex % GENRES.length]

  useEffect(() => {
    if (phase !== "hold") return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase !== "hold") return
    const bump = window.setInterval(() => {
      const gag = CUT_INS[cutIndex.current % CUT_INS.length]
      cutIndex.current += 1
      setPosition((p) => p + gag.jumped)
      setFeed((prev) => [{ id: `${Date.now()}-${cutIndex.current}`, ...gag }, ...prev].slice(0, 6))
      setPulse(true)
      window.setTimeout(() => setPulse(false), 700)
      setAnnouncement(ANNOUNCEMENTS[cutIndex.current % ANNOUNCEMENTS.length])
    }, 4200)
    return () => window.clearInterval(bump)
  }, [phase])

  useEffect(() => {
    if (phase !== "hold") return
    const swap = window.setInterval(() => {
      setGenreIndex((i) => i + 1)
    }, 28000)
    return () => window.clearInterval(swap)
  }, [phase])

  useEffect(() => {
    if (phase !== "hold") return
    let cancelled = false
    ;(async () => {
      stopRef.current?.()
      stopRef.current = null
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!ctxRef.current || ctxRef.current.state === "closed") {
        ctxRef.current = new Ctx()
      }
      const ctx = ctxRef.current
      if (ctx.state === "suspended") await ctx.resume()
      if (cancelled) return
      stopRef.current = createHoldMusic(ctx, genre.id)
      setAnnouncement(`Now playing: ${genre.label}. Estimated wait: forever (revised).`)
    })()
    return () => {
      cancelled = true
      stopRef.current?.()
      stopRef.current = null
    }
  }, [phase, genre.id, genre.label])

  useEffect(() => {
    return () => {
      stopRef.current?.()
      ctxRef.current?.close()
    }
  }, [])

  async function startHold() {
    const startPos = 3 + Math.floor(Math.random() * 4)
    setStartedAt(startPos)
    setPosition(startPos)
    setFeed([])
    cutIndex.current = Math.floor(Math.random() * CUT_INS.length)
    setGenreIndex(Math.floor(Math.random() * GENRES.length))
    setSeconds(0)
    setPhase("hold")
  }

  async function endCall() {
    stopRef.current?.()
    stopRef.current = null
    await ctxRef.current?.close()
    ctxRef.current = null
    setPhase("menu")
    setSeconds(0)
    setFeed([])
    setVmText("")
    setVmReply("")
    setIvrLine("Welcome to ST Joe's on-call. Listen carefully. Options rarely help.")
  }

  function pressIvr(key: (typeof IVR)[number]["key"]) {
    if (key === "1") {
      setIvrLine("You have selected Denial. Returning you to the main menu. Nothing happened. Perfect.")
      return
    }
    if (key === "2") {
      setIvrLine("Bargaining accepted: +0 RAM installed spiritually. Returning to menu.")
      return
    }
    if (key === "3") {
      void startHold()
      return
    }
    setPhase("voicemail")
  }

  function submitVoicemail() {
    const reply = VOICEMAIL_REPLIES[Math.floor(Math.random() * VOICEMAIL_REPLIES.length)]
    setVmReply(reply)
    setPhase("voicemail-done")
  }

  const placesLost = Math.max(0, position - startedAt)

  if (phase === "menu") {
    return (
      <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">On-call physician</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
            Call Doctor
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Interactive voice response for the spiritually underinsured.
          </p>
        </div>
        <div className="mt-8 rounded-3xl border border-accent/40 bg-ink px-6 py-8 text-card">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-soft">IVR · main menu</p>
          <p className="mt-4 text-sm leading-relaxed text-white/80" aria-live="polite">
            {ivrLine}
          </p>
          <ul className="mt-6 space-y-3">
            {IVR.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => pressIvr(item.key)}
                  className="flex w-full items-start gap-4 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left transition hover:border-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                    {item.key}
                  </span>
                  <span>
                    <span className="block font-semibold">{item.label}</span>
                    <span className="mt-0.5 block text-sm text-white/60">{item.detail}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-center font-mono text-[11px] text-muted">
          Care+ upgrades: try the{" "}
          <Link href="/gift-shop" className="text-accent underline underline-offset-2">
            gift shop
          </Link>{" "}
          (it will fail)
        </p>
      </div>
    )
  }

  if (phase === "voicemail" || phase === "voicemail-done") {
    return (
      <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Voicemail · box 404</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          Leave a message after the beep that never comes
        </h2>
        {phase === "voicemail" ? (
          <>
            <label className="mt-6 block">
              <span className="text-sm text-muted">Your message</span>
              <textarea
                value={vmText}
                onChange={(e) => setVmText(e.target.value)}
                rows={4}
                maxLength={280}
                placeholder="Hi, my OptiPlex is warm and sad…"
                className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
            </label>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={submitVoicemail}
                className="inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Send to void
              </button>
              <button
                type="button"
                onClick={() => void endCall()}
                className="inline-flex rounded-full border border-line px-6 py-2.5 text-sm font-semibold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Hang up
              </button>
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-line bg-card p-6">
            <p className="text-lg text-ink" role="status" aria-live="polite">
              {vmReply}
            </p>
            {vmText.trim() ? (
              <p className="mt-4 text-sm italic text-muted">“{vmText.trim()}”</p>
            ) : null}
            <button
              type="button"
              onClick={() => void endCall()}
              className="mt-6 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Return to IVR
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
      <div
        className={`rounded-3xl border bg-ink px-6 py-8 text-center text-card shadow-[0_20px_50px_rgba(26,54,93,0.22)] transition ${
          pulse ? "border-warn" : "border-accent/40"
        }`}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-soft">
          ● Connected · on hold · {genre.label}
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">Your place in line</p>
        <p
          className={`mt-2 font-[family-name:var(--font-display)] text-6xl font-bold tabular-nums tracking-tight ${
            pulse ? "text-warn" : "text-card"
          }`}
        >
          #{position}
        </p>
        <p className="mt-3 font-mono text-sm text-white/70">
          Wait {formatWait(seconds)} · ETA forever (revised)
        </p>
        {placesLost > 0 ? (
          <p className="mt-2 font-mono text-xs text-warn">
            {placesLost} caller{placesLost === 1 ? "" : "s"} moved ahead of you
          </p>
        ) : (
          <p className="mt-2 font-mono text-xs text-accent-soft">Holding steady… for now</p>
        )}
      </div>

      <p className="mt-5 text-center text-sm italic text-muted" aria-live="polite">
        “{announcement}”
      </p>

      <div className="mt-6 rounded-2xl border border-line bg-card p-4 text-left">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Queue activity</p>
        <ul className="mt-3 space-y-3">
          {feed.length === 0 ? (
            <li className="text-sm text-muted">Listening for priority transfers…</li>
          ) : (
            feed.map((item) => (
              <li key={item.id} className="anim-rise border-b border-line/70 pb-3 last:border-b-0 last:pb-0">
                <p className="text-sm font-semibold text-ink">
                  {item.who}{" "}
                  <span className="font-mono text-xs font-medium text-warn">+{item.jumped} ahead</span>
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
          className="inline-flex min-h-11 cursor-not-allowed rounded-full border border-line bg-bg px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-muted opacity-70"
          title="Gift shop inventory spiritually depleted"
        >
          Upgrade to Care+
        </button>
        <button
          type="button"
          onClick={() => void endCall()}
          className="inline-flex min-h-11 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          End call
        </button>
      </div>
    </div>
  )
}
