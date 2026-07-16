"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"

const SITE = "https://stjoeshospice.com"

export function DischargePapers() {
  const [name, setName] = useState("ThinkPad T420")
  const [reason, setReason] = useState("Discharged against medical advice")
  const issued = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  )
  const device = name.trim() || "Unnamed Device"
  const shareUrl = `${SITE}/discharge?for=${encodeURIComponent(device)}`

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
      <div className="no-print mb-8 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Patient</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Disposition</span>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <option>Discharged against medical advice</option>
            <option>Released to drawer forever</option>
            <option>Transferred to eBay afterlife</option>
            <option>Still won't boot (family insistence)</option>
          </select>
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
        <ShareButtons url={shareUrl} title={`Discharge papers for ${device} — ST Joe's`} />
      </div>

      <article className="dnr-sheet rounded-[28px] border-2 border-ink bg-card p-8 sm:p-12">
        <div className="flex items-center gap-4">
          <Image src="/logo-icon.png" alt="" width={64} height={64} className="h-14 w-14" />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-warn">
              Form DC-200 · Discharge
            </p>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
              ST Joe&apos;s Computer Hospice
            </p>
          </div>
        </div>
        <h2 className="mt-8 text-center font-[family-name:var(--font-display)] text-3xl font-bold">
          Discharge Papers
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-muted">
          Patient <strong className="text-ink">{device}</strong> is hereby released.
        </p>
        <p className="mt-8 text-lg text-ink">Disposition: {reason}.</p>
        <ul className="mt-6 space-y-2 text-muted">
          <li>• Boot status: spiritually unresolved</li>
          <li>• Follow-up: none. We already said goodbye.</li>
          <li>• Return precautions: if it powers on, pretend you imagined it</li>
        </ul>
        <p className="mt-8 text-sm text-muted">
          Issued {issued}. Not a warranty. Not a repair. Sorry your time is up.
        </p>
      </article>
    </div>
  )
}
