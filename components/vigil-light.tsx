"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ShareButtons } from "@/components/share-buttons"

export function VigilLight() {
  const params = useSearchParams()
  const initial = params.get("for") || ""
  const [name, setName] = useState(initial)
  useEffect(() => {
    setName(params.get("for") || "")
  }, [params])

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return ""
    const url = new URL(window.location.origin + "/vigil")
    if (name.trim()) url.searchParams.set("for", name.trim())
    return url.toString()
  }, [name])

  const shareTitle = name.trim()
    ? `Vigil for ${name.trim()} — ST Joe's Computer Hospice`
    : "Power-LED Vigil — ST Joe's Computer Hospice"

  return (
    <div className="mx-auto max-w-xl px-6 py-12 text-center sm:px-10">
      <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full bg-ink shadow-[0_30px_80px_rgba(26,54,93,0.35)]">
        <div className="led-vigil h-16 w-16 rounded-full bg-accent" aria-hidden />
      </div>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.28em] text-accent">
        Power LED · comfort brightness
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
        {name.trim() ? `Vigil for ${name.trim()}` : "A quiet light for dying machines"}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-muted">
        No updates. No diagnostics. Just a soft green pulse while you sit with what remains. Shared
        links get a custom preview card.
      </p>

      <label className="mx-auto mt-8 block max-w-md text-left">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Dedicate this vigil
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-accent"
          placeholder="Machine name"
        />
      </label>

      {shareUrl ? (
        <div className="mt-6">
          <ShareButtons url={shareUrl} title={shareTitle} />
        </div>
      ) : null}
      <p className="mt-3 font-mono text-xs text-muted">
        Preview: navy ward + glowing LED + the machine name
      </p>
    </div>
  )
}
