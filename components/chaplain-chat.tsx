"use client"

import { FormEvent, useEffect, useId, useRef, useState } from "react"

type Msg = { role: "you" | "chaplain"; text: string }

const OPEN_EVENT = "stjoe:open-chaplain"

export function openChaplainChat() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

async function askFrJoe(messages: Msg[]): Promise<string> {
  const res = await fetch("/api/chaplain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map((m) => ({
        role: m.role,
        text: m.text,
      })),
    }),
  })
  const data = (await res.json().catch(() => null)) as { text?: string; error?: string } | null
  if (!res.ok) {
    throw new Error(data?.error || "Fr. Joe stepped away briefly.")
  }
  return data?.text?.trim() || "The chapel is quiet. Try again in a moment."
}

export function ChaplainConversation({
  compact = false,
  inputId,
}: {
  compact?: boolean
  inputId?: string
}) {
  const autoId = useId()
  const fieldId = inputId || autoId
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "chaplain",
      text: "Peace be with your USB ports. What weighs on the hard drive today?",
    },
  ])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, busy])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || busy) return

    const next: Msg[] = [...messages, { role: "you", text }]
    setMessages(next)
    setInput("")
    setBusy(true)

    try {
      const reply = await askFrJoe(next)
      setMessages((m) => [...m, { role: "chaplain", text: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "chaplain",
          text: "The intercom crackled. Try again — the toner spirits are restless.",
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={compact ? "flex h-full min-h-0 flex-col" : ""}>
      <div
        className={
          compact
            ? "min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 py-3"
            : "mt-8 max-h-[50vh] space-y-3 overflow-y-auto rounded-2xl border border-line bg-card p-4"
        }
      >
        {messages.map((m, i) => (
          <div
            key={`${i}-${m.role}-${m.text.slice(0, 24)}`}
            className={`rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
              m.role === "you"
                ? "ml-6 bg-ink text-card"
                : "mr-6 border border-line bg-bg text-ink"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
              {m.role === "you" ? "You" : "Fr. Joe"}
            </p>
            <p className="mt-1">{m.text}</p>
          </div>
        ))}
        {busy ? (
          <div className="mr-6 rounded-2xl border border-line bg-bg px-3 py-2.5 text-sm text-muted">
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">Fr. Joe</p>
            <p className="mt-1 animate-pulse">Consulting the toner spirits…</p>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => void onSubmit(e)}
        className={
          compact
            ? "flex shrink-0 gap-2 border-t border-line bg-card p-3"
            : "mt-4 flex flex-col gap-3 sm:flex-row"
        }
      >
        <label className="sr-only" htmlFor={fieldId}>
          Message to the chaplain
        </label>
        <input
          id={fieldId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
          maxLength={500}
          placeholder="My tower is warm and sad…"
          className="min-h-11 flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="min-h-11 shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50"
        >
          {busy ? "…" : "Confess"}
        </button>
      </form>
    </div>
  )
}

/** Full-page chapel office view */
export function ChaplainChat() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-accent">
        Pastoral care · Rm 205
      </p>
      <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold">
        Chaplain office
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        Fr. Joe listens in character — battery grief, beach balls, printers, the works. Quicker
        visits:{" "}
        <button
          type="button"
          onClick={() => openChaplainChat()}
          className="font-semibold text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Ask Fr. Joe
        </button>{" "}
        in the corner.
      </p>
      <ChaplainConversation />
    </div>
  )
}

/** Sitewide help-desk style popover (bottom-right). */
export function ChaplainWidget() {
  const [open, setOpen] = useState(false)
  const [nudge, setNudge] = useState(false)
  const panelId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function onOpen() {
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    const nudgeTimer = window.setTimeout(() => setNudge(true), 14000)
    const hideNudge = window.setTimeout(() => setNudge(false), 22000)
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen)
      window.clearTimeout(nudgeTimer)
      window.clearTimeout(hideNudge)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setNudge(false)
      closeRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="fixed bottom-4 right-4 z-[45] flex flex-col items-end gap-3">
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby="chaplain-widget-title"
          className="flex h-[min(70vh,32rem)] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-2xl border border-ink/20 bg-card shadow-[0_24px_60px_rgba(26,54,93,0.28)]"
        >
          <div className="flex items-start justify-between gap-3 bg-ink px-4 py-3 text-card">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-soft">
                Pastoral help · online
              </p>
              <h2
                id="chaplain-widget-title"
                className="mt-0.5 font-[family-name:var(--font-display)] text-lg font-bold"
              >
                Ask Fr. Joe
              </h2>
              <p className="mt-0.5 text-xs text-white/65">Listens · rarely repairs · often anoints</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/25 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide hover:border-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
              aria-label="Close chaplain chat"
            >
              ×
            </button>
          </div>
          <ChaplainConversation compact inputId="chaplain-widget-input" />
        </div>
      ) : null}

      {nudge && !open ? (
        <div
          role="status"
          className="anim-rise max-w-[14rem] rounded-2xl border border-line bg-card px-3 py-2 text-sm text-ink shadow-md"
        >
          Need pastoral IT support?
          <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-accent">
            Fr. Joe is available
          </span>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex min-h-14 items-center gap-3 rounded-full border border-ink/15 bg-ink px-4 py-3 text-left text-card shadow-[0_16px_40px_rgba(26,54,93,0.35)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white">
          FJ
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-ink bg-accent-soft" />
        </span>
        <span>
          <span className="block text-sm font-semibold leading-tight">Ask Fr. Joe</span>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-white/55">
            Chaplain chat
          </span>
        </span>
      </button>
    </div>
  )
}
