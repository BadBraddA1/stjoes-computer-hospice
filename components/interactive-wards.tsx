"use client"

import Link from "next/link"
import { useMemo } from "react"
import { amenities, WINGS, type Amenity } from "@/lib/amenities"
import { openChaplainChat } from "@/components/chaplain-chat"

type WardKey = Amenity["href"]

export function InteractiveWards({
  title = "Patient amenities directory",
  copy = "Floor directory for ST Joe's. Enter a room to open that ward. Use Main lobby on any room page to come back here.",
  id = "amenities",
  excludeHref,
}: {
  title?: string
  copy?: string
  id?: string
  /** @deprecated Inline open removed — rooms always navigate to their page. */
  defaultOpen?: WardKey | null
  excludeHref?: string
}) {
  const items = amenities.filter((item) => item.href !== excludeHref)

  const byWing = useMemo(() => {
    return WINGS.map((wing) => ({
      wing,
      rooms: items.filter((item) => item.wing === wing.id),
    })).filter((group) => group.rooms.length > 0)
  }, [items])

  return (
    <section className="border-y border-line bg-band py-14 sm:py-20" id={id}>
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="rounded-sm border border-ink bg-card shadow-[0_12px_40px_rgba(26,54,93,0.08)]">
          <div className="flex flex-col gap-4 border-b border-ink bg-ink px-5 py-4 text-card sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-soft">
                ST Joe&apos;s Computer Hospice · Wayfinding
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
              <span className="inline-flex items-center gap-2 rounded-sm border border-accent/50 bg-accent/20 px-3 py-1.5 text-accent-soft">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                You are here · Main lobby
              </span>
              <span className="text-white/55">{items.length} rooms</span>
            </div>
          </div>

          <p className="border-b border-line px-5 py-3 text-sm text-muted sm:px-7">{copy}</p>

          <div className="divide-y divide-line">
            {byWing.map(({ wing, rooms }) => (
              <div key={wing.id} className="px-5 py-5 sm:px-7">
                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                      {wing.name}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                      {wing.floor}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{wing.note}</p>
                </div>

                <ul className="border border-line bg-bg">
                  {rooms.map((item) => {
                    const isChaplain = item.href === "/chaplain"
                    const className =
                      "flex w-full items-stretch gap-0 text-left transition hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"

                    const inner = (
                      <>
                        <span className="flex w-[4.5rem] shrink-0 flex-col items-center justify-center border-r border-line bg-card px-2 py-3 font-mono text-xs font-semibold uppercase tracking-wide text-ink sm:w-24">
                          {item.ward}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-ink">{item.title}</span>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                                {item.badge}
                              </span>
                            </span>
                            <span className="mt-0.5 block text-sm text-muted">{item.copy}</span>
                          </span>
                          <span className="mt-2 shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-accent sm:mt-0">
                            {isChaplain ? "Enter office →" : "Enter room →"}
                          </span>
                        </span>
                      </>
                    )

                    return (
                      <li key={item.href} className="border-b border-line last:border-b-0">
                        {isChaplain ? (
                          <div className="flex flex-col sm:flex-row">
                            <Link href={item.href} className={`${className} flex-1`}>
                              {inner}
                            </Link>
                            <button
                              type="button"
                              onClick={() => openChaplainChat()}
                              className="border-t border-line px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-accent hover:bg-accent-soft/40 sm:w-40 sm:border-t-0 sm:border-l focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                            >
                              Or page Fr. Joe ↓
                            </button>
                          </div>
                        ) : (
                          <Link href={item.href} className={className}>
                            {inner}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-line bg-bg px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <span>Quiet hours · no forced firmware</span>
            <span>Emergencies: Ask Fr. Joe (corner) · Code Beige</span>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-xs uppercase tracking-wider text-muted">
          Select a room number to enter · elevators not guaranteed
        </p>
      </div>
    </section>
  )
}
