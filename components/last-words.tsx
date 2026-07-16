"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { allTickerLines, loadLastWords, saveLastWord, type LastWord } from "@/lib/last-words"

const BASE = [
  "ADMITTING: devices beyond repair",
  "CODE GREEN: fans still spinning",
  "sorry your time is up",
  "WIFI LAST WORDS welcome",
  "BRING YOUR OWN HDMI adapter",
]

export function LastWordsTicker() {
  const [mine, setMine] = useState<LastWord[]>([])

  useEffect(() => {
    setMine(loadLastWords())
    const refresh = () => setMine(loadLastWords())
    window.addEventListener("stjoe:last-words", refresh)
    return () => window.removeEventListener("stjoe:last-words", refresh)
  }, [])

  const lines = useMemo(() => [...allTickerLines(mine), ...BASE], [mine])

  return (
    <div className="overflow-hidden border-b border-line bg-ink text-card">
      <div className="ticker-track flex whitespace-nowrap py-2 font-mono text-xs tracking-wide uppercase">
        {[0, 1].map((loop) => (
          <div key={loop} className="flex shrink-0 gap-10 px-6" aria-hidden={loop === 1}>
            {lines.map((item) => (
              <span key={`${loop}-${item}`}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function LastWordsForm() {
  const [text, setText] = useState("")
  const [ok, setOk] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    saveLastWord(text)
    setText("")
    setOk(true)
    window.setTimeout(() => setOk(false), 2000)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl rounded-2xl border border-line bg-card p-6 text-left shadow-[0_12px_30px_rgba(26,54,93,0.08)]"
    >
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Last words</p>
      <p className="mt-2 text-sm text-muted">
        Drop a one-liner into the lobby ticker. Kept on this device. The cloud is grieving too.
      </p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={80}
        placeholder="RIP beige tower — you were warm in winter"
        className="mt-4 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
        required
      />
      <button
        type="submit"
        className="mt-4 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
      >
        {ok ? "Etched" : "Send to ticker"}
      </button>
    </form>
  )
}
