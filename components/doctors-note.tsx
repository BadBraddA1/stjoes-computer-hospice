"use client"

import { useMemo, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"

const SITE = "https://stjoeshospice.com"

export function DoctorsNote() {
  const [name, setName] = useState("OptiPlex")
  const [days, setDays] = useState("3")
  const issued = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  )
  const device = name.trim() || "the device"
  const shareUrl = `${SITE}/doctors-note?for=${encodeURIComponent(device)}`

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
      <div className="no-print mb-8 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Device</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Excuse days</span>
          <input
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
      </div>
      <div className="no-print mb-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-11 rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Print / Save as PDF
        </button>
        <ShareButtons url={shareUrl} title={`Doctor's note for ${device} — ST Joe's`} />
      </div>

      <article className="dnr-sheet rounded-[28px] border-2 border-ink bg-card p-8 sm:p-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          Physician&apos;s excuse · ST Joe&apos;s
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold">
          Doctor&apos;s Note
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-ink">
          Please excuse <strong>{device}</strong> from work, school, Zoom, and heroic troubleshooting
          for <strong>{days || "several"}</strong> day(s).
        </p>
        <p className="mt-6 leading-relaxed text-muted">
          Diagnosis: terminal Windows Update / existential battery warning. Patient requires comfort
          care, not productivity. Recommended treatment: unplug, drawer, soft lighting.
        </p>
        <p className="mt-8 text-sm text-muted">
          Signed {issued} — Head of Hospice Care, ST Joe&apos;s Computer Hospice.
        </p>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-warn">
          sorry your time is up
        </p>
      </article>
    </div>
  )
}
