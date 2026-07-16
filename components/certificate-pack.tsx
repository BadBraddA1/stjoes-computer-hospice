"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { downloadStJoePdf, packFilename } from "@/lib/stjoe-pdf"

const STEPS = [
  {
    id: "admit",
    title: "Admit",
    blurb: "Case opened. Comfort care authorized.",
    href: "/#admit",
  },
  {
    id: "dnr",
    title: "DNR",
    blurb: "Do not resuscitate. Do not update. Do not argue.",
    href: "/dnr",
  },
  {
    id: "discharge",
    title: "Discharge",
    blurb: "Released against medical advice. Still won't boot.",
    href: "/discharge",
  },
  {
    id: "condolences",
    title: "Condolences",
    blurb: "Card for the living. Machine rests.",
    href: "/condolences",
  },
] as const

export function CertificatePack() {
  const [machine, setMachine] = useState("Dell OptiPlex ’09")
  const [owner, setOwner] = useState("")
  const [step, setStep] = useState(0)
  const [packed, setPacked] = useState(false)
  const [busy, setBusy] = useState(false)

  function onStart(e: FormEvent) {
    e.preventDefault()
    setStep(0)
    setPacked(false)
  }

  async function advance() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }

    const name = machine.trim() || "Unnamed Device"
    const kin = owner.trim() || "Next of Kin (USB)"
    const caseId = `GRIEF-${100 + Math.floor(Math.random() * 899)}`

    setBusy(true)
    try {
      await downloadStJoePdf(
        [
          { kind: "cover", machine: name, owner: kin, caseId },
          { kind: "admission", machine: name, owner: kin, caseId },
          { kind: "dnr", machine: name, owner: kin, caseId },
          {
            kind: "discharge",
            machine: name,
            owner: kin,
            caseId,
            extra: "Discharged against medical advice",
          },
          {
            kind: "condolence",
            machine: name,
            owner: kin,
            caseId,
            extra: `May its fans spin gently in memory. We're sorry for your ${name}.`,
          },
        ],
        packFilename(name)
      )
      setPacked(true)
    } catch {
      alert("The PDF printer jammed emotionally. Try again in a moment.")
    } finally {
      setBusy(false)
    }
  }

  const current = STEPS[step]

  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-accent">Bundle</p>
      <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold">
        Certificate pack
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        Walk admit → DNR → discharge → condolence. Download one branded ST Joe&apos;s PDF.
      </p>

      <form onSubmit={onStart} className="mt-8 space-y-4 rounded-2xl border border-line bg-card p-6">
        <label className="block">
          <span className="text-sm text-muted">Machine</span>
          <input
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Next of kin</span>
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            placeholder="Your name"
          />
        </label>
      </form>

      <ol className="mt-8 space-y-3">
        {STEPS.map((s, i) => (
          <li
            key={s.id}
            className={`rounded-2xl border px-5 py-4 ${
              i === step ? "border-accent bg-accent-soft/50" : "border-line bg-bg"
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
              Step {i + 1} · {s.title}
            </p>
            <p className="mt-1 font-semibold text-ink">{s.blurb}</p>
            {i === step ? (
              <Link
                href={s.href}
                className="mt-2 inline-block text-sm font-semibold text-accent underline underline-offset-2"
              >
                Open full {s.title.toLowerCase()} ward →
              </Link>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => void advance()}
          disabled={busy}
          className="inline-flex min-h-11 rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
        >
          {busy
            ? "Printing PDF…"
            : step < STEPS.length - 1
              ? `Complete ${current.title} →`
              : "Download ST Joe's PDF pack"}
        </button>
      </div>

      {packed ? (
        <p className="mt-6 text-center text-muted" role="status">
          Pack downloaded — a 5-page letter PDF (cover + four certificates). The printers are weeping
          proudly.
        </p>
      ) : null}
    </div>
  )
}
