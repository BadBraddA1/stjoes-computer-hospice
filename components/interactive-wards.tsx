"use client"

import Link from "next/link"
import { Suspense, useEffect, useId, useState } from "react"
import { amenities, type Amenity } from "@/lib/amenities"
import { IsItTimeFlow } from "@/components/is-it-time-flow"
import { GriefQuiz } from "@/components/grief-quiz"
import { DnrCertificate } from "@/components/dnr-certificate"
import { MemorialWall } from "@/components/memorial-wall"
import { VigilLight } from "@/components/vigil-light"
import { CondolenceCard } from "@/components/condolence-card"
import { HiringQuiz } from "@/components/hiring-quiz"

type WardKey = Amenity["href"]

function WardPanel({ href }: { href: WardKey }) {
  switch (href) {
    case "/is-it-time":
      return <IsItTimeFlow />
    case "/grief":
      return <GriefQuiz />
    case "/dnr":
      return <DnrCertificate />
    case "/memorial":
      return <MemorialWall />
    case "/vigil":
      return (
        <Suspense fallback={<p className="py-10 text-center text-muted">Lighting the LED…</p>}>
          <VigilLight />
        </Suspense>
      )
    case "/condolences":
      return (
        <Suspense fallback={<p className="py-10 text-center text-muted">Folding the card…</p>}>
          <CondolenceCard />
        </Suspense>
      )
    case "/hiring":
      return <HiringQuiz />
    default:
      return null
  }
}

export function InteractiveWards({
  title = "Play the whole campus",
  copy = "Tap a ward card — the bit opens right here. No hallway walking required. Full pages still exist for sharing.",
  id = "amenities",
  defaultOpen = null,
  excludeHref,
}: {
  title?: string
  copy?: string
  id?: string
  defaultOpen?: WardKey | null
  excludeHref?: string
}) {
  const items = amenities.filter((item) => item.href !== excludeHref)
  const initial =
    defaultOpen && items.some((item) => item.href === defaultOpen) ? defaultOpen : null
  const [open, setOpen] = useState<WardKey | null>(initial)
  const panelId = useId()
  const active = items.find((item) => item.href === open) || null

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (!hash.startsWith("ward-")) return
    const slug = hash.replace(/^ward-/, "")
    const match = items.find((item) => item.href === `/${slug}`)
    if (match) setOpen(match.href)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only deep link
  }, [])

  function select(href: WardKey) {
    setOpen((current) => {
      const next = current === href ? null : href
      if (next) {
        window.history.replaceState(null, "", `#ward-${next.replace(/^\//, "")}`)
      } else {
        window.history.replaceState(null, "", window.location.pathname)
      }
      return next
    })
  }

  return (
    <section className="border-y border-line bg-card py-16 sm:py-20" id={id}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
              Interactive campus
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{copy}</p>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {items.length} playable wards
          </span>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => {
            const selected = open === item.href
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => select(item.href)}
                aria-expanded={selected}
                aria-controls={panelId}
                className={`group flex h-full flex-col rounded-2xl border p-5 text-left shadow-[0_10px_30px_rgba(26,54,93,0.05)] transition ${
                  selected
                    ? "border-accent bg-accent-soft/60 ring-2 ring-accent/30"
                    : "border-line bg-bg hover:-translate-y-0.5 hover:border-accent"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {item.ward}
                  </span>
                  <span className="rounded-full bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.copy}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-accent">
                  {selected ? "Close ward ×" : "Play here ↓"}
                </span>
              </button>
            )
          })}
        </div>

        {active ? (
          <div
            id={panelId}
            className="anim-rise mt-8 overflow-hidden rounded-[28px] border border-accent/40 bg-bg shadow-[0_20px_50px_rgba(26,54,93,0.12)]"
          >
            <div className="flex flex-col gap-3 border-b border-line bg-ink px-5 py-4 text-card sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-soft">
                  {active.ward} · now playing
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold">
                  {active.title}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={active.href}
                  className="inline-flex rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:border-accent-soft hover:text-accent-soft"
                >
                  Open full page
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(null)
                    window.history.replaceState(null, "", window.location.pathname)
                  }}
                  className="inline-flex rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="max-h-[85vh] overflow-y-auto">
              <WardPanel href={active.href} />
            </div>
          </div>
        ) : (
          <p className="mt-8 text-center font-mono text-xs text-muted">
            Pick a card above. Maximum funny per square inch.
          </p>
        )}
      </div>
    </section>
  )
}
