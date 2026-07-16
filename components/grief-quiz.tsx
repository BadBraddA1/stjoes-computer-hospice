"use client"

import { useState } from "react"
import Link from "next/link"

const stages = [
  {
    id: "denial",
    title: "Denial",
    prompt: "The laptop is fine. It’s just thinking. Forever.",
    choiceA: "It’ll boot after one more minute",
    choiceB: "Okay… maybe it’s not fine",
    nextA: "denial",
    nextB: "cache",
    tip: "Denial is free. Electricity is not.",
  },
  {
    id: "cache",
    title: "Cache Clear",
    prompt: "You delete temp files like a ritual. The spinner remains spiritually fulfilled.",
    choiceA: "Clear cache again (this time with feeling)",
    choiceB: "Accept that cache was never the point",
    nextA: "cache",
    nextB: "bargain",
    tip: "Ctrl+Shift+Delete cannot delete fate.",
  },
  {
    id: "bargain",
    title: "Bargaining with Tech Support",
    prompt: "“If I buy more RAM, will you stay?” The machine does not negotiate.",
    choiceA: "Offer a new charger as tribute",
    choiceB: "Hang up. Whisper to the fans instead",
    nextA: "bargain",
    nextB: "depression",
    tip: "Tier-1 support has already said goodbye.",
  },
  {
    id: "depression",
    title: "Depression (battery warning)",
    prompt: "20%… 12%… 3%… The red icon knows your secrets.",
    choiceA: "Stare at the battery icon empathetically",
    choiceB: "Lay the power brick in the drawer",
    nextA: "depression",
    nextB: "acceptance",
    tip: "Low power mode is a form of prayer.",
  },
  {
    id: "acceptance",
    title: "Acceptance",
    prompt: "The power brick lives in the drawer forever. You are ready for comfort care.",
    choiceA: "Admit the device",
    choiceB: "Light a power-LED vigil",
    nextA: "done-admit",
    nextB: "done-vigil",
    tip: "Sorry your time is up.",
  },
] as const

type StageId = (typeof stages)[number]["id"] | "done-admit" | "done-vigil"

export function GriefQuiz() {
  const [stageId, setStageId] = useState<StageId>("denial")
  const stage = stages.find((s) => s.id === stageId)

  if (stageId === "done-admit") {
    return (
      <Result
        title="Admission recommended"
        copy="You’ve completed the five stages. The wards are ready."
        href="/is-it-time"
        cta="Continue to intake flowchart"
      />
    )
  }

  if (stageId === "done-vigil") {
    return (
      <Result
        title="Vigil mode"
        copy="Sit with the light. No forced firmware. Only glow."
        href="/vigil"
        cta="Open the power-LED vigil"
      />
    )
  }

  if (!stage) return null

  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
        Stage {stages.findIndex((s) => s.id === stage.id) + 1} of {stages.length}
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
        {stage.title}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">{stage.prompt}</p>
      <p className="mt-3 font-mono text-sm text-warn">{stage.tip}</p>
      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setStageId(stage.nextA)}
          className="rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-accent"
        >
          {stage.choiceA}
        </button>
        <button
          type="button"
          onClick={() => setStageId(stage.nextB)}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
        >
          {stage.choiceB}
        </button>
      </div>
      <button
        type="button"
        onClick={() => setStageId("denial")}
        className="mt-8 text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink"
      >
        Start over (denial is a circle)
      </button>
    </div>
  )
}

function Result({
  title,
  copy,
  href,
  cta,
}: {
  title: string
  copy: string
  href: string
  cta: string
}) {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center sm:px-10">
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-muted">{copy}</p>
      <Link
        href={href}
        className="mt-8 inline-flex rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
      >
        {cta}
      </Link>
    </div>
  )
}
