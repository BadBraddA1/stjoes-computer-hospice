"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ShareButtons } from "@/components/share-buttons"

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
    blurb: "You are allergic to power buttons. The spinner is your emotional support animal.",
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
    blurb: "You believe folders can be healed through deletion. The Recycle Bin files for divorce.",
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
    blurb: "Your love language is prepaid RAM. Theirs is a busy signal.",
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
    blurb: "You and the red battery icon have a situationship. It always leaves first.",
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
    blurb: "Peace with a ground pin. You unplug with grace and a tissue.",
  },
] as const

type StageId = (typeof stages)[number]["id"]
type FlowId = StageId | "done-admit" | "done-vigil" | "result"

const SITE = "https://stjoeshospice.com"

export function GriefQuiz() {
  const search = useSearchParams()
  const shared = search.get("stage")
  const sharedStage = stages.find((s) => s.id === shared)

  const [stageId, setStageId] = useState<FlowId>(sharedStage ? "result" : "denial")
  const [resultStage, setResultStage] = useState<StageId>(sharedStage?.id || "acceptance")
  const [visits, setVisits] = useState<Record<string, number>>({ denial: 1 })

  const stage = stages.find((s) => s.id === stageId)

  function go(next: FlowId) {
    if (next === "done-admit" || next === "done-vigil") {
      const dominant = Object.entries(visits).sort((a, b) => b[1] - a[1])[0]?.[0] as StageId
      setResultStage(dominant || "acceptance")
      setStageId("result")
      return
    }
    if (stages.some((s) => s.id === next)) {
      setVisits((v) => ({ ...v, [next]: (v[next] || 0) + 1 }))
    }
    setStageId(next)
  }

  const result = useMemo(() => stages.find((s) => s.id === resultStage) || stages[4], [resultStage])
  const shareUrl = `${SITE}/grief?stage=${result.id}`

  if (stageId === "result") {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Pastoral diagnosis</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          You are {result.title}
        </h2>
        <p className="mt-4 text-lg text-muted">{result.blurb}</p>
        <p className="mt-3 font-mono text-sm text-warn">{result.tip}</p>
        <div className="mt-8">
          <ShareButtons url={shareUrl} title={`My grief stage: ${result.title} — ST Joe's Computer Hospice`} />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/is-it-time"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Continue to intake
          </Link>
          <Link
            href="/vigil"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-7 py-3 text-sm font-semibold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Light a vigil
          </Link>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisits({ denial: 1 })
            setStageId("denial")
          }}
          className="mt-8 text-sm text-muted underline underline-offset-4"
        >
          Restart the stages
        </button>
      </div>
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
          onClick={() => go(stage.nextA)}
          className="min-h-11 rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {stage.choiceA}
        </button>
        <button
          type="button"
          onClick={() => go(stage.nextB)}
          className="min-h-11 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {stage.choiceB}
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          setVisits({ denial: 1 })
          setStageId("denial")
        }}
        className="mt-8 text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink"
      >
        Start over (denial is a circle)
      </button>
    </div>
  )
}
