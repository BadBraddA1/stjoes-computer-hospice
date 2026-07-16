"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

type Mode = "joe3" | "bsod" | null

export function EasterEgg() {
  const [mode, setMode] = useState<Mode>(null)
  const bufferRef = useRef("")
  const keysRef = useRef<string[]>([])
  const chordRef = useRef({ ctrl: false, alt: false })
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Control") chordRef.current.ctrl = true
      if (e.key === "Alt") chordRef.current.alt = true

      if (
        chordRef.current.ctrl &&
        chordRef.current.alt &&
        (e.key === "Delete" || e.key === "Backspace" || e.code === "Delete")
      ) {
        e.preventDefault()
        setMode("bsod")
        return
      }

      if (mode) {
        if (e.key === "Escape") setMode(null)
        return
      }

      const tag = (e.target as HTMLElement | null)?.tagName
      const typing =
        tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement | null)?.isContentEditable
      if (typing) return

      const nextKeys = [...keysRef.current, e.key].slice(-KONAMI.length)
      keysRef.current = nextKeys
      if (nextKeys.join(",") === KONAMI.join(",")) {
        setMode("joe3")
        keysRef.current = []
      }

      if (e.key.length !== 1) return
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-8)
      if (bufferRef.current.includes("joe3")) {
        setMode("joe3")
        bufferRef.current = ""
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "Control") chordRef.current.ctrl = false
      if (e.key === "Alt") chordRef.current.alt = false
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [mode])

  useEffect(() => {
    if (mode) closeBtn.current?.focus()
  }, [mode])

  if (!mode) return null

  if (mode === "bsod") {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bsod-title"
        className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0078d7] p-8 text-white"
      >
        <div className="max-w-xl">
          <p className="text-6xl font-light">:(</p>
          <h2 id="bsod-title" className="mt-6 text-2xl font-semibold leading-snug">
            Your PC ran into a problem and needs a hug.
          </h2>
          <p className="mt-4 text-white/85">
            ST_JOE_COMFORT_CARE_EXCEPTION. We&apos;re just collecting some error info, and then
            we&apos;ll apologize forever.
          </p>
          <p className="mt-6 font-mono text-sm text-white/70">Stop code: SORRY_YOUR_TIME_IS_UP</p>
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setMode(null)}
            className="mt-8 inline-flex min-h-11 rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Return to the wards (Esc)
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="egg-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) setMode(null)
      }}
    >
      <div className="w-full max-w-md rounded-3xl border border-accent/40 bg-card p-8 text-center shadow-[0_30px_80px_rgba(26,54,93,0.35)]">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Easter egg</p>
        <h2 id="egg-title" className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          Nice try. You still don&apos;t look like Joe 3.
        </h2>
        <p className="mt-3 text-muted">HR has been notified. The printers are laughing.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/hiring"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white"
            onClick={() => setMode(null)}
          >
            Go to hiring
          </Link>
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setMode(null)}
            className="inline-flex min-h-11 rounded-full border border-line px-5 py-2.5 text-sm font-semibold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
