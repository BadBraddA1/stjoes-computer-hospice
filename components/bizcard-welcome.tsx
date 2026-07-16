"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export function BizcardWelcome() {
  const params = useSearchParams()
  const from = params.get("from")
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (from === "bizcard" || from === "card" || from === "qr") {
      setShow(true)
    }
  }, [from])

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="biz-welcome"
      className="fixed inset-0 z-[58] flex items-end justify-center bg-ink/50 p-4 sm:items-center"
    >
      <div className="w-full max-w-md rounded-3xl border border-accent/40 bg-card p-6 shadow-[0_24px_60px_rgba(26,54,93,0.3)] sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Biz card intake</p>
        <h2 id="biz-welcome" className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold">
          You scanned the wrong kind of hope.
        </h2>
        <p className="mt-3 text-muted">
          Welcome from the QR on the fake card. We don&apos;t fix machines — we sit with them. Start
          with admission or the campus.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/#admit"
            onClick={() => setShow(false)}
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white"
          >
            Admit a device
          </Link>
          <Link
            href="/#amenities"
            onClick={() => setShow(false)}
            className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold uppercase tracking-wide"
          >
            Play the campus
          </Link>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-muted underline underline-offset-4"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
