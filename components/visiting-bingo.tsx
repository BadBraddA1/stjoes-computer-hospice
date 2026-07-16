"use client"

import { useMemo, useState } from "react"

const CELLS = [
  "Fan motorcycle",
  "Dust bunny habitat",
  "3% battery",
  "Beach ball forever",
  "Windows Update",
  "Missing charger",
  "HDD click of death",
  "FREE SPACE",
  "Blue screen nap",
  "Warm laptop lap",
  "Printer jam tears",
  "Ctrl+Z denial",
  "Floppy nostalgia",
  "Code Beige",
  "Sorry your time is up",
  "USB upside down ×3",
  "Save dialog goodbye",
  "Capri Sun in break room",
  "TrackPoint scar",
  "RAID of emotions",
  "Power brick drawer",
  "Geek Squad temptation",
  "LED vigil vibes",
  "Joe 3 sighting",
  "Tissue box empty",
]

function linesBingo(marked: boolean[]) {
  const size = 5
  const idx = (r: number, c: number) => r * size + c
  for (let r = 0; r < size; r++) {
    if ([0, 1, 2, 3, 4].every((c) => marked[idx(r, c)])) return true
  }
  for (let c = 0; c < size; c++) {
    if ([0, 1, 2, 3, 4].every((r) => marked[idx(r, c)])) return true
  }
  if ([0, 1, 2, 3, 4].every((i) => marked[idx(i, i)])) return true
  if ([0, 1, 2, 3, 4].every((i) => marked[idx(i, 4 - i)])) return true
  return false
}

export function VisitingBingo() {
  const initial = useMemo(() => {
    const marked = Array(25).fill(false) as boolean[]
    marked[12] = true
    return marked
  }, [])
  const [marked, setMarked] = useState(initial)
  const [won, setWon] = useState(false)

  function toggle(i: number) {
    if (i === 12) return
    setMarked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      const bingo = linesBingo(next)
      if (bingo && !won) {
        setWon(true)
        window.dispatchEvent(
          new CustomEvent("stjoe:code-alert", {
            detail: { code: "Code Beige", detail: "Bingo in the visiting room. Remain solemnly thrilled." },
          })
        )
      }
      return next
    })
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-12 sm:px-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-accent">Visiting hours</p>
      <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold">
        Symptom bingo
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        Mark what you observe. Five in a row unlocks a Code Beige toast.
      </p>

      <div className="mt-8 grid grid-cols-5 gap-2">
        {CELLS.map((label, i) => {
          const on = marked[i]
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggle(i)}
              disabled={i === 12}
              className={`flex aspect-square items-center justify-center rounded-xl border p-1 text-center font-mono text-[9px] uppercase leading-tight tracking-wide transition sm:text-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                on
                  ? "border-accent bg-accent-soft text-ink"
                  : "border-line bg-card text-muted hover:border-accent"
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {won ? (
        <p className="mt-6 text-center text-lg font-semibold text-accent" role="status">
          Bingo. The ward dogs are wagging judgmentally.
        </p>
      ) : (
        <p className="mt-6 text-center font-mono text-xs text-muted">Center square is free. Like denial.</p>
      )}

      <button
        type="button"
        onClick={() => {
          setMarked(initial)
          setWon(false)
        }}
        className="mx-auto mt-6 block text-sm text-muted underline underline-offset-4"
      >
        New card
      </button>
    </div>
  )
}
