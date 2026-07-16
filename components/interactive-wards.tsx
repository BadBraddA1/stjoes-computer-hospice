"use client"

import Link from "next/link"
import { Suspense, useEffect, useId, useMemo, useState } from "react"
import { amenities, WINGS, type Amenity } from "@/lib/amenities"
import { openChaplainChat } from "@/components/chaplain-chat"
import { IsItTimeFlow } from "@/components/is-it-time-flow"
import { GriefQuiz } from "@/components/grief-quiz"
import { CallDoctor } from "@/components/call-doctor"
import { DnrCertificate } from "@/components/dnr-certificate"
import { DischargePapers } from "@/components/discharge-papers"
import { DoctorsNote } from "@/components/doctors-note"
import { MemorialWall } from "@/components/memorial-wall"
import { VigilLight } from "@/components/vigil-light"
import { CondolenceCard } from "@/components/condolence-card"
import { HiringQuiz } from "@/components/hiring-quiz"
import { HiringLounge } from "@/components/hiring-lounge"
import { LastRites } from "@/components/last-rites"
import { WaitingRoomCam } from "@/components/waiting-room-cam"
import { ChaplainChat } from "@/components/chaplain-chat"
import { GiftShop } from "@/components/gift-shop"
import { VisitingBingo } from "@/components/visiting-bingo"
import { FamilyConference } from "@/components/family-conference"
import { Soundboard } from "@/components/soundboard"
import { CertificatePack } from "@/components/certificate-pack"

type WardKey = Amenity["href"]

function WardPanel({ href }: { href: WardKey }) {
  switch (href) {
    case "/is-it-time":
      return <IsItTimeFlow />
    case "/grief":
      return (
        <Suspense fallback={<p className="py-10 text-center text-muted">Opening pastoral care…</p>}>
          <GriefQuiz />
        </Suspense>
      )
    case "/call-doctor":
      return <CallDoctor />
    case "/dnr":
      return <DnrCertificate />
    case "/discharge":
      return <DischargePapers />
    case "/doctors-note":
      return <DoctorsNote />
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
    case "/last-rites":
      return <LastRites />
    case "/waiting-room":
      return <WaitingRoomCam />
    case "/chaplain":
      return <ChaplainChat />
    case "/gift-shop":
      return <GiftShop />
    case "/bingo":
      return <VisitingBingo />
    case "/family":
      return <FamilyConference />
    case "/soundboard":
      return <Soundboard />
    case "/pack":
      return <CertificatePack />
    case "/hiring":
      return (
        <div>
          <HiringQuiz />
          <div className="border-t border-line pt-6">
            <HiringLounge />
          </div>
        </div>
      )
    default:
      return null
  }
}

export function InteractiveWards({
  title = "Patient amenities directory",
  copy = "Floor directory for ST Joe's. Select a room plaque to enter. Full pages remain for sharing and printouts.",
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

  const byWing = useMemo(() => {
    return WINGS.map((wing) => ({
      wing,
      rooms: items.filter((item) => item.wing === wing.id),
    })).filter((group) => group.rooms.length > 0)
  }, [items])

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (!hash.startsWith("ward-")) return
    const slug = hash.replace(/^ward-/, "")
    const match = items.find((item) => item.href === `/${slug}`)
    if (match) setOpen(match.href)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only deep link
  }, [])

  function select(href: WardKey) {
    // Chaplain is the sitewide help widget — directory just pages Fr. Joe
    if (href === "/chaplain") {
      openChaplainChat()
      return
    }
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
    <section className="border-y border-line bg-band py-14 sm:py-20" id={id}>
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        {/* Directory header — institutional, not arcade */}
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
                    const selected = open === item.href
                    return (
                      <li key={item.href} className="border-b border-line last:border-b-0">
                        <button
                          type="button"
                          onClick={() => select(item.href)}
                          aria-expanded={selected}
                          aria-controls={panelId}
                          className={`flex w-full items-stretch gap-0 text-left transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
                            selected ? "bg-accent-soft/70" : "hover:bg-card"
                          }`}
                        >
                          <span
                            className={`flex w-[4.5rem] shrink-0 flex-col items-center justify-center border-r border-line px-2 py-3 font-mono text-xs font-semibold uppercase tracking-wide sm:w-24 ${
                              selected ? "bg-ink text-accent-soft" : "bg-card text-ink"
                            }`}
                          >
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
                              {item.href === "/chaplain"
                                ? "Page Fr. Joe →"
                                : selected
                                  ? "← Close door"
                                  : "Enter room →"}
                            </span>
                          </span>
                        </button>
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

        {active ? (
          <div
            id={panelId}
            className="anim-rise mt-6 overflow-hidden rounded-sm border border-ink bg-card shadow-[0_20px_50px_rgba(26,54,93,0.12)]"
          >
            <div className="flex flex-col gap-3 border-b border-ink bg-ink px-5 py-4 text-card sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                  {active.ward} · {WINGS.find((w) => w.id === active.wing)?.name}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold">
                  {active.title}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={active.href}
                  className="inline-flex min-h-11 items-center rounded-sm border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:border-accent-soft hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
                >
                  Full room page
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(null)
                    window.history.replaceState(null, "", window.location.pathname)
                  }}
                  className="inline-flex min-h-11 items-center rounded-sm bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Return to directory
                </button>
              </div>
            </div>
            <div className="max-h-[85vh] overflow-y-auto">
              <WardPanel href={active.href} />
            </div>
          </div>
        ) : (
          <p className="mt-5 text-center font-mono text-xs uppercase tracking-wider text-muted">
            Select a room number to proceed · elevators not guaranteed
          </p>
        )}
      </div>
    </section>
  )
}
