"use client"

import { useRef, useState } from "react"

type Step = "ask" | "yes" | "no"

const yesLines = [
  "Nice try. You don't look like Joe 3.",
  "We've met Joe 3. You're… not him.",
  "Security scanned your face. Result: not Joe 3.",
  "Joe 3 called. He said stop using his name.",
  "The clipboard disagrees. Hard.",
  "Cute. But Joe 3 has a better beard energy.",
  "HR has one Joe 3. Quota full. Forever.",
  "That name is trademarked in this hallway.",
  "Joe 3 already punched in. You're punching air.",
  "We've run the DNA. Mostly toner. Still not Joe 3.",
  "Imposter syndrome? No. Imposter detected.",
  "The ward dogs didn't wag. That's a no.",
  "Sorry — Joe 3 vibes not found.",
  "Nice try, Joe 2.5.",
  "Facial recognition returned: random civilian.",
  "Joe 3 would never ask like that.",
  "The printers hissed. They know a fake Joe.",
  "Badge printer jammed on purpose. Denied.",
  "We keep Joe 3 in a glass case. You're free-range.",
  "Our records show zero Joes matching your vibe.",
  "Chaplain Fr. Joe says you're not that Joe either.",
  "Joe 3 left for lunch in 2009. Still not you.",
  "You're giving strong Not-Joe-3 energy.",
  "Lie detected. Fans spun faster in judgment.",
  "The Head of Hospice Care shook his head slowly.",
  "Joe 3's mother would know. She said nah.",
  "Try Joe 4. We hear he's hiring somewhere else.",
  "Access denied: insufficient Joe.",
  "We've seen Joe 3. You look like a Tuesday.",
  "Bold claim. Soft evidence. Softer Joe.",
]

const noLines = [
  "Good. You don't want to work here.",
  "Correct. Benefits include tissue boxes and no hope.",
  "Wise. The shift never ends and the fans never stop.",
  "Smart. The 401(k) is just a floppy labeled 'dreams.'",
  "Excellent. We mostly hire destiny and dust.",
  "Good call. Uniform is a headset and regret.",
  "Proud of you. The break room is a blue screen.",
  "Stay free. Our lunch is expired Capri Sun and static.",
  "Correct instinct. Openings closed since the Pentium era.",
  "You passed. Passing means leaving. Please leave.",
  "Blessed refusal. The on-call pager never sleeps.",
  "Good. Training is grief counseling for hard drives.",
  "Yes. Run. The RAID array can smell fear.",
  "Healthy boundaries. Ours died in intake.",
  "Perfect. We pay in warm feelings and cold coffee.",
  "You get it. Career ladder is a step stool with one step.",
  "Nice. Performance reviews are just SMART status.",
  "Keep that energy. Ours is Code Slow forever.",
  "Right answer. Wrong building. Leave flowers at the door.",
  "Good. The only promotion is Head of Holding Mice.",
  "Smart cookie. Our holidays are visiting hours.",
  "Correct. Benefits vest after your soul does.",
  "You dodged a bullet. And a loose IDE cable.",
  "Wise mortal. Employees clock in; they don't clock out.",
  "Good instincts. The parking lot is full of beige towers.",
  "Yes. Go live a life with working batteries.",
  "Approved exit. The ward will miss you. Briefly.",
  "Textbook no. Textbook survival.",
  "Excellent. We were going to assign you to floppy duty.",
  "Stay gone. Joe 3 has this covered. Allegedly.",
]

const yesFollowups = [
  "Joe 3 already works here. One is plenty. Two and the printers start praying.",
  "Identity ward says: try again never.",
  "We keep a spare Joe 3 sticker. You're not getting it.",
  "Please leave a forwarding address for Not Joe 3.",
]

const noFollowups = [
  "Positions include Holding the Mouse, Whispering to Fans, and Pretending the RAID is fine.",
  "All roles filled by destiny, toner, and one guy named Joe 3.",
  "Application shredded. Shredder asked for a raise.",
  "Exit through gift shop. Gift shop sells tissue boxes.",
]

function pickUnique(lines: string[], last: string | null) {
  if (lines.length <= 1) return lines[0] ?? ""
  let next = lines[Math.floor(Math.random() * lines.length)] ?? lines[0]
  let guard = 0
  while (next === last && guard < 8) {
    next = lines[Math.floor(Math.random() * lines.length)] ?? lines[0]
    guard += 1
  }
  return next
}

export function HiringQuiz() {
  const [step, setStep] = useState<Step>("ask")
  const [punchline, setPunchline] = useState("")
  const [followup, setFollowup] = useState("")
  const lastYes = useRef<string | null>(null)
  const lastNo = useRef<string | null>(null)

  function answer(yes: boolean) {
    if (yes) {
      const line = pickUnique(yesLines, lastYes.current)
      lastYes.current = line
      setPunchline(line)
      setFollowup(pickUnique(yesFollowups, followup || null))
      setStep("yes")
    } else {
      const line = pickUnique(noLines, lastNo.current)
      lastNo.current = line
      setPunchline(line)
      setFollowup(pickUnique(noFollowups, followup || null))
      setStep("no")
    }
  }

  function reset() {
    setStep("ask")
    setPunchline("")
    setFollowup("")
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {step === "ask" ? (
        <div className="anim-rise rounded-2xl border border-line bg-card/90 p-8 text-center shadow-[0_20px_50px_rgba(26,54,93,0.1)] sm:p-10">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
            Mandatory intake question
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Is your name Joe 3?
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
            {followup}
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
