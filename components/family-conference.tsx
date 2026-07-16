"use client"

import { useState } from "react"
import Link from "next/link"

type Step = {
  q: string
  a: string
  b: string
  nextA: string
  nextB: string
}

const STEPS: Record<string, Step | { end: true; title: string; copy: string }> = {
  start: {
    q: "The machine is slow. Do we upgrade the RAM, or admit what we already know?",
    a: "Buy more RAM",
    b: "Admit what we know",
    nextA: "ram",
    nextB: "hospice",
  },
  ram: {
    q: "RAM is installed. It is still sad. Do we replace the battery, or schedule a family conference snack?",
    a: "New battery",
    b: "Tissue break",
    nextA: "battery",
    nextB: "hospice",
  },
  battery: {
    q: "Battery holds a charge for eleven minutes of hope. Upgrade the whole laptop?",
    a: "Shop for a new one",
    b: "Sit with this one",
    nextA: "shop",
    nextB: "hospice",
  },
  shop: {
    q: "You opened twelve tabs comparing laptops. Feel better?",
    a: "No. Close the tabs.",
    b: "Yes. Still no.",
    nextA: "hospice",
    nextB: "hospice",
  },
  hospice: {
    end: true,
    title: "Consensus: hospice",
    copy: "The family conference concludes as they always do. Comfort care. DNR optional. Vigil recommended.",
  },
}

export function FamilyConference() {
  const [id, setId] = useState("start")
  const step = STEPS[id]

  if ("end" in step && step.end) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Minutes approved</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold">{step.title}</h2>
        <p className="mt-4 text-lg text-muted">{step.copy}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/pack"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start certificate pack
          </Link>
          <Link
            href="/dnr"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-7 py-3 text-sm font-semibold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Issue DNR
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setId("start")}
          className="mt-8 text-sm text-muted underline underline-offset-4"
        >
          Reopen the conference
        </button>
      </div>
    )
  }

  const s = step as Step
  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Conference room</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold leading-snug sm:text-3xl">
        {s.q}
      </h2>
      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setId(s.nextA)}
          className="min-h-11 rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {s.a}
        </button>
        <button
          type="button"
          onClick={() => setId(s.nextB)}
          className="min-h-11 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {s.b}
        </button>
      </div>
    </div>
  )
}
