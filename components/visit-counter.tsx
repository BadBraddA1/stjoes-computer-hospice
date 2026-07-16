"use client"

import { useEffect, useState } from "react"

const SESSION_KEY = "stjoe-view-counted"

function formatCount(n: number) {
  return new Intl.NumberFormat("en-US").format(n)
}

export function VisitCounter({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const already = sessionStorage.getItem(SESSION_KEY) === "1"
    if (!already) sessionStorage.setItem(SESSION_KEY, "1")

    fetch(`/api/views?bump=${already ? "0" : "1"}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (cancelled) return
        if (typeof data?.count === "number") setCount(data.count)
      })
      .catch(() => {
        /* counter is decorative — stay quiet */
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <p
      className={className}
      aria-live="polite"
      title="Counted once per browser tab session"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-soft">
        Grief sessions
      </span>
      <span className="mt-1 block font-[family-name:var(--font-display)] text-2xl font-bold tabular-nums text-card">
        {count == null ? "…" : formatCount(count)}
      </span>
      <span className="mt-1 block text-xs text-white/55">
        visitors who paid their respects
      </span>
    </p>
  )
}
