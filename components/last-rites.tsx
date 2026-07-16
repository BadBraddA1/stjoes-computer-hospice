"use client"

import { FormEvent, useMemo, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"

const OS_OPTIONS = [
  "Windows XP",
  "Windows 7",
  "Windows 10 (perpetual update)",
  "macOS Catalina",
  "Ubuntu that one friend installed",
  "ChromeOS somehow",
  "Unknown / beeping",
]

function eulogy(name: string, os: string) {
  const n = name.trim() || "this faithful machine"
  return [
    `Dearly beloved, we gather around ${n}, running ${os}, to celebrate a life of fans, dust, and unfinished downloads.`,
    `It saved what it could. It forgot what it must. It spun when spinning was all that remained.`,
    `May its power brick find peace in the drawer. May its ports never again meet the wrong dongle.`,
    `Ashes to ashes. Beige to beige. Sorry your time is up.`,
  ].join(" ")
}

const SITE = "https://stjoeshospice.com"

export function LastRites() {
  const [name, setName] = useState("Dell OptiPlex ’09")
  const [os, setOs] = useState(OS_OPTIONS[0])
  const [done, setDone] = useState(false)

  const text = useMemo(() => eulogy(name, os), [name, os])
  const shareUrl = `${SITE}/last-rites?for=${encodeURIComponent(name.trim() || "a dying machine")}&os=${encodeURIComponent(os)}`

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setDone(true)
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-accent">Ceremony</p>
      <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold">
        Last rites generator
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        Name the machine. Name the OS. Receive a short eulogy for the group chat.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-line bg-card p-6">
        <label className="block">
          <span className="text-sm text-muted">Machine name</span>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setDone(false)
            }}
            className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Operating system</span>
          <select
            value={os}
            onChange={(e) => {
              setOs(e.target.value)
              setDone(false)
            }}
            className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {OS_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="inline-flex min-h-11 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Perform last rites
        </button>
      </form>

      {done ? (
        <div className="mt-8 rounded-2xl border border-accent/40 bg-ink px-6 py-8 text-card">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-soft">Eulogy</p>
          <p className="mt-4 text-lg leading-relaxed">{text}</p>
          <div className="mt-6">
            <ShareButtons url={shareUrl} title={`Last rites for ${name} — ST Joe's Computer Hospice`} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
