"use client"

import { FormEvent, useState } from "react"

function makeCaseId() {
  const n = Math.floor(100 + Math.random() * 899)
  return `GRIEF-${n}`
}

export function AdmitDevice() {
  const [device, setDevice] = useState("")
  const [symptom, setSymptom] = useState("Blue screen of acceptance")
  const [caseId, setCaseId] = useState<string | null>(null)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setCaseId(makeCaseId())
  }

  if (caseId) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-accent/40 bg-ink px-6 py-10 text-center text-card">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent-soft">
          Admission confirmed
        </p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold">{caseId}</p>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          <strong className="text-card">{device || "Unnamed device"}</strong> is on comfort care for:{" "}
          {symptom}. Please retain this number for visiting hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setCaseId(null)
            setDevice("")
          }}
          className="mt-8 inline-flex rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide transition hover:border-accent-soft"
        >
          Admit another
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl rounded-2xl border border-line bg-card p-6 text-left shadow-[0_12px_30px_rgba(26,54,93,0.08)] sm:p-8"
    >
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Admit a device</p>
      <p className="mt-2 text-sm text-muted">
        Complete intake for a case number and comfort-care placement.
      </p>
      <label className="mt-5 block">
        <span className="text-sm text-muted">Device name</span>
        <input
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          required
          placeholder="Dell OptiPlex '09"
          className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
        />
      </label>
      <label className="mt-4 block">
        <span className="text-sm text-muted">Chief complaint</span>
        <select
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
        >
          <option>Blue screen of acceptance</option>
          <option>Battery has left the chat</option>
          <option>Spinner of eternal contemplation</option>
          <option>Windows Update forever</option>
          <option>Fan motorcycle symphony</option>
        </select>
      </label>
      <button
        type="submit"
        className="mt-6 inline-flex rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
      >
        Submit for comfort care
      </button>
    </form>
  )
}
