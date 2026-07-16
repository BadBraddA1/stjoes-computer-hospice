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

export function EasterEgg() {
  const [show, setShow] = useState(false)
  const bufferRef = useRef("")
  const keysRef = useRef<string[]>([])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName
      const typing =
        tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement | null)?.isContentEditable
      if (typing) return

      const nextKeys = [...keysRef.current, e.key].slice(-KONAMI.length)
      keysRef.current = nextKeys
      if (nextKeys.join(",") === KONAMI.join(",")) {
        setShow(true)
        keysRef.current = []
      }

      if (e.key.length !== 1) return
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-8)
      if (bufferRef.current.includes("joe3")) {
        setShow(true)
        bufferRef.current = ""
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-accent/40 bg-card p-8 text-center shadow-[0_30px_80px_rgba(26,54,93,0.35)]">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Easter egg</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          Nice try. You still don&apos;t look like Joe 3.
        </h2>
        <p className="mt-3 text-muted">HR has been notified. The printers are laughing.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/hiring"
            className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white"
            onClick={() => setShow(false)}
          >
            Go to hiring
          </Link>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-semibold uppercase tracking-wide"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
