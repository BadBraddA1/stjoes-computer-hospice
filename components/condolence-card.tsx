"use client"

import { useMemo, useRef, useState } from "react"

const lines = [
  "The fans are quiet now. The icons can rest.",
  "May its ports find peace and its dust find dignity.",
  "Gone from the dock, never from the drawer of chargers.",
  "It gave you spreadsheets, memes, and one final blue screen.",
]

export function CondolenceCard() {
  const [machine, setMachine] = useState("OptiPlex")
  const [from, setFrom] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const cardRef = useRef<HTMLElement>(null)

  const line = lines[lineIndex % lines.length]
  const title = useMemo(() => {
    const m = machine.trim() || "your machine"
    return `We’re sorry for your ${m}.`
  }, [machine])

  async function downloadPng() {
    const node = cardRef.current
    if (!node) return

    const width = 1080
    const height = 1080
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Background
    const grad = ctx.createLinearGradient(0, 0, width, height)
    grad.addColorStop(0, "#eef3f0")
    grad.addColorStop(1, "#d4e6cb")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // Frame
    ctx.strokeStyle = "#1a365d"
    ctx.lineWidth = 8
    ctx.strokeRect(48, 48, width - 96, height - 96)

    ctx.fillStyle = "#5f9448"
    ctx.font = "600 28px IBM Plex Mono, monospace"
    ctx.textAlign = "center"
    ctx.fillText("ST JOE'S COMPUTER HOSPICE", width / 2, 160)

    ctx.fillStyle = "#1a365d"
    ctx.font = "700 64px Fraunces, Georgia, serif"
    wrapText(ctx, title, width / 2, 360, width - 200, 74)

    ctx.fillStyle = "#4a5d73"
    ctx.font = "400 36px IBM Plex Sans, sans-serif"
    wrapText(ctx, line, width / 2, 560, width - 220, 48)

    ctx.fillStyle = "#1a365d"
    ctx.font = "500 30px IBM Plex Sans, sans-serif"
    ctx.fillText(`— ${from.trim() || "A friend in the wards"}`, width / 2, 780)

    ctx.fillStyle = "#8a5a2b"
    ctx.font = "500 24px IBM Plex Mono, monospace"
    ctx.fillText("sorry your time is up", width / 2, 920)

    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/png")
    a.download = `st-joes-condolences-${(machine || "machine").replace(/\s+/g, "-").toLowerCase()}.png`
    a.click()
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:px-10">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Machine</span>
          <input
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">From</span>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-accent"
            placeholder="Your name"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setLineIndex((i) => i + 1)}
          className="rounded-full border border-line bg-card px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition hover:border-accent"
        >
          Shuffle line
        </button>
        <button
          type="button"
          onClick={downloadPng}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
        >
          Download card PNG
        </button>
      </div>

      <article
        ref={cardRef}
        className="mt-8 rounded-[28px] border-2 border-ink bg-gradient-to-br from-bg to-accent-soft p-10 text-center shadow-[0_20px_50px_rgba(26,54,93,0.12)]"
      >
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
          ST Joe&apos;s Computer Hospice
        </p>
        <h2 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted">{line}</p>
        <p className="mt-10 text-ink">— {from.trim() || "A friend in the wards"}</p>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-warn">
          sorry your time is up
        </p>
      </article>
    </div>
  )
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ")
  let line = ""
  let yy = y
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy)
      line = word
      yy += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, yy)
}
