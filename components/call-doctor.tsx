"use client"

import { useEffect, useRef, useState } from "react"

/** Cheesy on-hold loop via Web Audio — no external music file needed. */
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

export function CallDoctor() {
  const [onHold, setOnHold] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const stopRef = useRef<(() => void) | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (!onHold) return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
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
      return
    }

    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    ctxRef.current = ctx
    if (ctx.state === "suspended") await ctx.resume()
    stopRef.current = createHoldMusic(ctx)
    setOnHold(true)
    setSeconds(0)
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12 text-center sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">On-call physician</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
        Call Doctor
      </h2>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Press to dial the Head of Hospice Care. Please hold.
      </p>

      <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center rounded-full border-4 border-accent/40 bg-ink shadow-[0_20px_50px_rgba(26,54,93,0.25)]">
        <span
          className={`font-mono text-sm uppercase tracking-widest ${onHold ? "anim-pulse text-accent-soft" : "text-white/70"}`}
        >
          {onHold ? "On hold" : "Ready"}
        </span>
      </div>

      <p className="mt-6 font-mono text-sm text-muted">
        {onHold
          ? `Current wait · ${formatWait(seconds)} · your call is important`
          : "Average wait times may vary by grief stage"}
      </p>

      <button
        type="button"
        onClick={toggle}
        className="mt-8 inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
      >
        {onHold ? "End call" : "Call Doctor"}
      </button>
    </div>
  )
}
