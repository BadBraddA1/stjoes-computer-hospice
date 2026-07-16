"use client"

import { useRef, useState } from "react"

type Pad = {
  id: string
  label: string
  play: (ctx: AudioContext, master: GainNode) => void
}

function beep(
  ctx: AudioContext,
  master: GainNode,
  {
    freq,
    start = 0,
    dur = 0.2,
    type = "sine" as OscillatorType,
    vol = 0.35,
  }: {
    freq: number
    start?: number
    dur?: number
    type?: OscillatorType
    vol?: number
  }
) {
  const t0 = ctx.currentTime + start
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(vol, t0 + 0.015)
  gain.gain.linearRampToValueAtTime(0, t0 + dur)
  osc.connect(gain)
  gain.connect(master)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

const PADS: Pad[] = [
  {
    id: "fan",
    label: "Fan spin-down",
    play: (ctx, master) => {
      let i = 0
      for (let f = 220; f > 45; f -= 14) {
        beep(ctx, master, {
          freq: f,
          start: i * 0.07,
          dur: 0.12,
          type: "sawtooth",
          vol: 0.22,
        })
        i += 1
      }
    },
  },
  {
    id: "hdd",
    label: "HDD click of death",
    play: (ctx, master) => {
      for (let i = 0; i < 10; i++) {
        beep(ctx, master, {
          freq: 70 + (i % 3) * 25,
          start: i * 0.08,
          dur: 0.05,
          type: "square",
          vol: 0.28,
        })
      }
    },
  },
  {
    id: "xp",
    label: "XP shutdown hymn",
    play: (ctx, master) => {
      ;[523.25, 392, 329.63, 261.63].forEach((f, i) => {
        beep(ctx, master, {
          freq: f,
          start: i * 0.32,
          dur: 0.55,
          type: "triangle",
          vol: 0.32,
        })
      })
    },
  },
  {
    id: "hold",
    label: "Hold music sting",
    play: (ctx, master) => {
      ;[261.63, 329.63, 392, 523.25].forEach((f, i) => {
        beep(ctx, master, {
          freq: f,
          start: i * 0.16,
          dur: 0.28,
          type: "triangle",
          vol: 0.3,
        })
      })
    },
  },
  {
    id: "beep",
    label: "POST beep of judgment",
    play: (ctx, master) => {
      beep(ctx, master, { freq: 880, dur: 0.4, type: "square", vol: 0.25 })
    },
  },
  {
    id: "modem",
    label: "Modem handshake",
    play: (ctx, master) => {
      ;[600, 900, 1200, 800, 1400, 700, 1100, 500].forEach((f, i) => {
        beep(ctx, master, {
          freq: f,
          start: i * 0.1,
          dur: 0.12,
          type: "square",
          vol: 0.2,
        })
      })
    },
  },
]

function getAudioContextCtor(): typeof AudioContext | null {
  if (typeof window === "undefined") return null
  return (
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext ||
    null
  )
}

export function Soundboard() {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const [status, setStatus] = useState("Tap a pad — audio unlocks on first click.")
  const [activeId, setActiveId] = useState<string | null>(null)

  async function ensureAudio() {
    const Ctor = getAudioContextCtor()
    if (!Ctor) throw new Error("Web Audio not supported in this browser.")

    if (!ctxRef.current || ctxRef.current.state === "closed") {
      const ctx = new Ctor()
      const master = ctx.createGain()
      master.gain.value = 0.85
      master.connect(ctx.destination)
      ctxRef.current = ctx
      masterRef.current = master
    }

    const ctx = ctxRef.current
    if (ctx.state === "suspended") {
      await ctx.resume()
    }
    if (ctx.state !== "running") {
      throw new Error(`Audio still ${ctx.state}. Unmute the tab and try again.`)
    }

    return { ctx, master: masterRef.current! }
  }

  async function play(pad: Pad) {
    try {
      const { ctx, master } = await ensureAudio()
      setActiveId(pad.id)
      setStatus(`Playing: ${pad.label}`)
      pad.play(ctx, master)
      window.setTimeout(() => {
        setActiveId((id) => (id === pad.id ? null : id))
      }, 1200)
    } catch (err) {
      console.error("soundboard", err)
      setStatus(
        err instanceof Error
          ? err.message
          : "Couldn’t start audio. Check the tab isn’t muted."
      )
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:px-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-accent">Audio ward</p>
      <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold">
        Ward soundboard
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        Click a pad to play. Unmute the browser tab if you hear nothing. Neighbors not consulted.
      </p>
      <p className="mx-auto mt-3 max-w-md text-center font-mono text-xs text-accent" aria-live="polite">
        {status}
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {PADS.map((pad) => (
          <button
            key={pad.id}
            type="button"
            onClick={() => void play(pad)}
            className={`min-h-14 rounded-2xl border px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              activeId === pad.id
                ? "border-accent bg-accent-soft text-ink"
                : "border-line bg-card hover:border-accent hover:bg-accent-soft/40"
            }`}
          >
            {pad.label}
          </button>
        ))}
      </div>
    </div>
  )
}
