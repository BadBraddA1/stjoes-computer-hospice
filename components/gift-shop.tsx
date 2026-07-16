"use client"

import { useState } from "react"

type Item = {
  id: string
  name: string
  price: string
  blurb: string
}

const ITEMS: Item[] = [
  { id: "urn", name: "USB urn", price: "$29", blurb: "Holds 16GB of ashes or Word docs. Same thing." },
  { id: "mug", name: "I ♥ BSOD mug", price: "$18", blurb: "Heat-activated blue screen. Emotionally." },
  { id: "sticker", name: "Sorry your time is up sticker", price: "$4", blurb: "Fits laptops, printers, relationships." },
  { id: "candle", name: "Power-LED candle", price: "$22", blurb: "Smells like ozone and acceptance." },
  { id: "care", name: "Care+ membership", price: "$99/mo", blurb: "Skip the line. Still never get a doctor." },
  { id: "hoodie", name: "Code Beige hoodie", price: "$64", blurb: "Warm. Sad. Machine washable denial." },
]

export function GiftShop() {
  const [cart, setCart] = useState<string[]>([])
  const [checkout, setCheckout] = useState<"idle" | "spin" | "fail">("idle")

  function add(id: string) {
    setCart((c) => [...c, id])
    setCheckout("idle")
  }

  function tryCheckout() {
    if (!cart.length) return
    setCheckout("spin")
    window.setTimeout(() => setCheckout("fail"), 1600)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-accent">Retail therapy</p>
      <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold">Gift shop</h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted">
        Inventory is spiritually depleted at checkout. Browsing is free.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <li key={item.id} className="flex flex-col rounded-2xl border border-line bg-card p-5">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-semibold text-ink">{item.name}</h3>
              <span className="font-mono text-sm text-accent">{item.price}</span>
            </div>
            <p className="mt-2 flex-1 text-sm text-muted">{item.blurb}</p>
            <button
              type="button"
              onClick={() => add(item.id)}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-line px-4 py-2 text-sm font-semibold uppercase tracking-wide transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-ink bg-ink px-6 py-6 text-card">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
          Cart · {cart.length} item{cart.length === 1 ? "" : "s"}
        </p>
        <p className="mt-2 text-sm text-white/70">
          {cart.length
            ? cart.map((id) => ITEMS.find((i) => i.id === id)?.name).join(" · ")
            : "Empty as a battery icon at 1%."}
        </p>
        <button
          type="button"
          disabled={!cart.length || checkout === "spin"}
          onClick={tryCheckout}
          className="mt-5 inline-flex min-h-11 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
        >
          {checkout === "spin" ? "Processing grief…" : "Checkout"}
        </button>
        {checkout === "fail" ? (
          <p className="mt-4 text-lg font-semibold text-warn" role="alert">
            Checkout failed: inventory spiritually depleted. Please remain in the gift shop forever.
          </p>
        ) : null}
      </div>
    </div>
  )
}
