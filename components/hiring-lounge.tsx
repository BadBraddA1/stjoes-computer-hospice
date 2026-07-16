"use client"

import { FormEvent, useMemo, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"

const BENEFITS = [
  { title: "Unlimited PTO", detail: "Printers already took it. All of it." },
  { title: "401(k)", detail: "A floppy disk labeled “dreams.” Do not format." },
  { title: "Dental", detail: "We floss the IDE cables monthly." },
  { title: "Remote work", detail: "Your soul clocks in from anywhere. Body stays in Ward 3." },
  { title: "Snacks", detail: "Expired Capri Sun and static." },
  { title: "Growth", detail: "Career ladder is a step stool with one step." },
]

const REJECTS = [
  "Resume received. Toner insufficient. Denied.",
  "We only hire destiny and dust. You appear to be a person.",
  "Your PDF rendered as a blue screen. Symbolic. No.",
  "HR filed this under /tmp. It has been recycled.",
  "Joe 3 already covers this headcount. Alleged.",
]

export function HiringLounge() {
  const [name, setName] = useState("Visitor")
  const [badgeReady, setBadgeReady] = useState(false)
  const [resumeNote, setResumeNote] = useState("")
  const [reject, setReject] = useState<string | null>(null)

  const badgeName = useMemo(() => (name.trim() || "Visitor").slice(0, 28), [name])
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/hiring?badge=${encodeURIComponent(badgeName)}`
      : `https://stjoeshospice.com/hiring?badge=${encodeURIComponent(badgeName)}`

  function onResume(e: FormEvent) {
    e.preventDefault()
    setReject(REJECTS[Math.floor(Math.random() * REJECTS.length)])
    setResumeNote("")
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-4 sm:px-10">
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Recruiters&apos; lounge</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
          Fake benefits · real rejection
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <li key={b.title} className="rounded-2xl border border-line bg-card px-5 py-4">
              <p className="font-semibold text-ink">{b.title}</p>
              <p className="mt-1 text-sm text-muted">{b.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-card p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Visitor badge</p>
        <label className="mt-4 block">
          <span className="text-sm text-muted">Name on badge</span>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setBadgeReady(false)
            }}
            className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <button
          type="button"
          onClick={() => setBadgeReady(true)}
          className="mt-4 inline-flex min-h-11 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Print badge
        </button>
        {badgeReady ? (
          <div className="mt-6 rounded-2xl border-2 border-ink bg-bg p-6 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
              ST Joe&apos;s Computer Hospice
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold">{badgeName}</p>
            <p className="mt-2 font-mono text-sm uppercase tracking-widest text-warn">
              Visitor · Not Joe 3
            </p>
            <div className="mt-5">
              <ShareButtons url={shareUrl} title={`${badgeName} is Not Joe 3 — ST Joe's hiring`} />
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-2xl border border-line bg-ink p-6 text-card sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-soft">Resume drop</p>
        <p className="mt-2 text-sm text-white/70">Upload is a metaphor. Rejection is literal.</p>
        <form onSubmit={onResume} className="mt-5">
          <label className="block">
            <span className="text-sm text-white/65">Paste a “resume”</span>
            <textarea
              value={resumeNote}
              onChange={(e) => setResumeNote(e.target.value)}
              rows={3}
              required
              placeholder="Skills: turning it off and on again…"
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-card outline-none focus:border-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
            />
          </label>
          <button
            type="submit"
            className="mt-4 inline-flex min-h-11 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
          >
            Submit for review
          </button>
        </form>
        {reject ? (
          <p className="mt-5 text-lg font-semibold text-accent-soft" role="status" aria-live="polite">
            {reject}
          </p>
        ) : null}
      </section>
    </div>
  )
}
