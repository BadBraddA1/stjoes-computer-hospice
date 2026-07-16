"use client"

import { FormEvent, useRef, useState } from "react"

type Msg = { role: "you" | "chaplain"; text: string }

const REPLIES = [
  "It is not failure to unplug. It is grace with a ground pin.",
  "Have you said goodbye to the Save dialog?",
  "The beach ball is not punishing you. It is processing grief.",
  "I anoint this machine with compressed air.",
  "Dust to dust. Beige to deeper beige.",
  "Your charger left first. That is also a form of love.",
  "Windows Update finishes in heaven. Not before.",
  "Light a vigil. Or don't. The LED understands either way.",
]

const CLOSING = "Sorry your time is up."

export function ChaplainChat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "chaplain",
      text: "Peace be with your USB ports. What weighs on the hard drive today?",
    },
  ])
  const [input, setInput] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)]
    setMessages((m) => [
      ...m,
      { role: "you", text },
      { role: "chaplain", text: reply },
      { role: "chaplain", text: CLOSING },
    ])
    setInput("")
    window.setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-accent">
        Pastoral care · Fr. Joe
      </p>
      <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold">
        Chaplain chat
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        Scripted comfort. Every thread ends the only way it can.
      </p>

      <div className="mt-8 max-h-[50vh] space-y-3 overflow-y-auto rounded-2xl border border-line bg-card p-4">
        {messages.map((m, i) => (
          <div
            key={`${i}-${m.text.slice(0, 12)}`}
            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === "you"
                ? "ml-8 bg-ink text-card"
                : "mr-8 border border-line bg-bg text-ink"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
              {m.role === "you" ? "You" : "Fr. Joe"}
            </p>
            <p className="mt-1">{m.text}</p>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="chaplain-input">
          Message to the chaplain
        </label>
        <input
          id="chaplain-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="My tower is warm and sad…"
          className="min-h-11 flex-1 rounded-full border border-line bg-bg px-5 py-3 outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <button
          type="submit"
          className="min-h-11 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Confess
        </button>
      </form>
    </div>
  )
}
