"use client"

import { useState } from "react"

type Step = "ask" | "yes" | "no"

const yesLines = [
  "Nice try. You don't look like Joe.",
  "We've met Joe. You're… not him.",
  "Security has reviewed your face. Result: not Joe.",
]

const noLines = [
  "Good. You don't want to work here.",
  "Correct answer. Benefits include tissue boxes and no hope.",
  "Wise. The shift never ends and the fans never stop.",
]

function pick(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)] ?? lines[0]
}

export function HiringQuiz() {
  const [step, setStep] = useState<Step>("ask")
  const [punchline, setPunchline] = useState("")

  function answer(yes: boolean) {
    setPunchline(pick(yes ? yesLines : noLines))
    setStep(yes ? "yes" : "no")
  }

  function reset() {
    setStep("ask")
    setPunchline("")
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {step === "ask" ? (
        <div className="anim-rise rounded-2xl border border-line bg-card/90 p-8 text-center shadow-[0_20px_50px_rgba(26,54,93,0.1)] sm:p-10">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
            Mandatory intake question
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Is your name Joe?
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-muted">
            Be honest. We have a clipboard. The clipboard has feelings.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => answer(true)}
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border border-line bg-bg/80 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div
          className="anim-rise rounded-2xl border border-line bg-ink p-8 text-center text-card shadow-[0_20px_50px_rgba(26,54,93,0.18)] sm:p-10"
          role="status"
          aria-live="polite"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent-soft">
            {step === "yes" ? "Identity rejected" : "Application closed"}
          </p>
          <p className="mt-5 font-[family-name:var(--font-display)] text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
            {punchline}
          </p>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/65">
            {step === "yes"
              ? "Joe already works here. One Joe is plenty. Two Joes and the printers start praying."
              : "Positions include Holding the Mouse, Whispering to Fans, and Pretending the RAID is fine. All filled by destiny."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-card transition hover:border-accent-soft hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
          >
            Try again (please don&apos;t)
          </button>
        </div>
      )}
    </div>
  )
}
