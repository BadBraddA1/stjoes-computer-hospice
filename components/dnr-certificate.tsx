"use client"

import { useMemo, useState } from "react"

export function DnrCertificate() {
  const [name, setName] = useState("Dell OptiPlex ’09")
  const [owner, setOwner] = useState("")
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
  const signed = owner.trim() || "Next of Kin (USB)"

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
      <div className="no-print mb-8 grid gap-4 sm:grid-cols-2">
        <label className="block text-left">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Patient / device
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 text-ink outline-none focus:border-accent"
            placeholder="ThinkPad T420"
          />
        </label>
        <label className="block text-left">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Signed by
          </span>
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 text-ink outline-none focus:border-accent"
            placeholder="Your name"
          />
        </label>
      </div>

      <div className="no-print mb-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
        >
          Print / Save as PDF
        </button>
      </div>

      <article className="dnr-sheet rounded-[28px] border-2 border-ink bg-card p-8 shadow-[0_20px_50px_rgba(26,54,93,0.12)] sm:p-12">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-warn">
          ST Joe&apos;s Computer Hospice · Form DNR-404
        </p>
        <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Do Not Resuscitate
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted">
          Comfort care only. No forced reboots. No “have you tried turning it off and on again.”
        </p>

        <div className="mt-10 space-y-6 text-left">
          <p className="text-lg leading-relaxed text-ink">
            This certifies that <strong>{device}</strong> is hereby admitted to palliative care at ST
            Joe&apos;s Computer Hospice.
          </p>
          <ul className="space-y-3 text-muted">
            <li>• No heroic last-minute Windows Updates</li>
            <li>• No third-party “PC cleaner” rituals</li>
            <li>• Fans may spin gently until the power LED fades</li>
            <li>• Final SMART reading optional; tissues provided</li>
          </ul>
          <p className="text-muted">
            Issued {issued}. Witnessed by Fr. Joe, Staff Tech-Priest. Sorry your time is up.
          </p>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Patient</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
              {device}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Authorized by</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
              {signed}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
