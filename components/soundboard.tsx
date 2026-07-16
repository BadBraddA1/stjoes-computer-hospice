"use client"

import { useRef } from "react"

type Pad = {
  id: string
  label: string
  play: (ctx: AudioContext) => void
}

function tone(
  ctx: AudioContext,
  freq: number,
  dur: number,
  type: OscillatorType = "sine",
  vol = 0.12
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0.0001, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + dur + 0.02)
}

const PADS: Pad[] = [
  {
    id: "fan",
    label: "Fan spin-down",
    play: (ctx) => {
      let t = 0
      for (let f = 180; f > 40; f -= 12) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sawtooth"
        osc.frequency.value = f
        gain.gain.value = 0.04
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + t)
        osc.stop(ctx.currentTime + t + 0.08)
        t += 0.07
      }
    },
  },
  {
    id: "hdd",
    label: "HDD click of death",
    play: (ctx) => {
      for (let i = 0; i < 8; i++) {
        tone(ctx, 80 + Math.random() * 40, 0.04, "square", 0.1)
        // stagger via timeout approximation
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "square"
        osc.frequency.value = 90
        gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.09)
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + i * 0.09 + 0.005)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.09 + 0.05)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + i * 0.09)
        osc.stop(ctx.currentTime + i * 0.09 + 0.06)
      }
    },
  },
  {
    id: "xp",
    label: "XP shutdown hymn",
    play: (ctx) => {
      ;[523.25, 392, 329.63, 261.63].forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "triangle"
        osc.frequency.value = f
        const t = ctx.currentTime + i * 0.35
        gain.gain.setValueAtTime(0.0001, t)
        gain.gain.exponentialRampToValueAtTime(0.15, t + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(t)
        osc.stop(t + 0.6)
      })
    },
  },
  {
    id: "hold",
    label: "Hold music sting",
    play: (ctx) => {
      ;[261.63, 329.63, 392, 523.25].forEach((f, i) => {
        tone(ctx, f, 0.25, "triangle", 0.1)
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "triangle"
        osc.frequency.value = f
        const t = ctx.currentTime + i * 0.18
        gain.gain.setValueAtTime(0.0001, t)
        gain.gain.exponentialRampToValueAtTime(0.1, t + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(t)
        osc.stop(t + 0.3)
      })
    },
  },
  {
    id: "beep",
    label: "POST beep of judgment",
    play: (ctx) => tone(ctx, 880, 0.35, "square", 0.08),
  },
  {
    id: "modem",
    label: "Modem handshake",
    play: (ctx) => {
      ;[600, 900, 1200, 800, 1400, 700].forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "square"
        osc.frequency.value = f
        const t = ctx.currentTime + i * 0.12
        gain.gain.value = 0.05
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(t)
        osc.stop(t + 0.1)
      })
    },
  },
]

export function Soundboard() {
  const ctxRef = useRef<AudioContext | null>(null)

  async function play(pad: Pad) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!ctxRef.current || ctxRef.current.state === "closed") ctxRef.current = new Ctx()
    const ctx = ctxRef.current
    if (ctx.state === "suspended") await ctx.resume()
    pad.play(ctx)
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:px-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-accent">Audio ward</p>
      <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold">
        Ward soundboard
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        Click to play. Headphones recommended. Neighbors not consulted.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {PADS.map((pad) => (
          <button
            key={pad.id}
            type="button"
            onClick={() => void play(pad)}
            className="min-h-14 rounded-2xl border border-line bg-card px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide transition hover:border-accent hover:bg-accent-soft/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {pad.label}
          </button>
        ))}
      </div>
    </div>
  )
}
