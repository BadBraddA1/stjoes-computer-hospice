"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { amenities } from "@/lib/amenities"

/** Persistent wayfinding chrome on room pages — back to the main lobby directory. */
export function LobbyNav() {
  const pathname = usePathname()
  const room = amenities.find((a) => a.href === pathname)
  const roomLabel = room ? `${room.ward} · ${room.title}` : undefined

  // Home lobby already is the directory — no sticky bar there
  if (pathname === "/") return null

  return (
    <div className="sticky top-0 z-30 border-b border-line bg-ink text-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-8">
        <Link
          href="/#amenities"
          className="inline-flex min-h-10 items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-semibold transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
        >
          <span aria-hidden className="font-mono text-accent-soft">
            ←
          </span>
          <span>Main lobby</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-white/50 sm:inline">
            directory
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-white/55">
          {roomLabel ? <span className="text-accent-soft">{roomLabel}</span> : null}
          <Link
            href="/"
            className="transition hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
          >
            Front entrance
          </Link>
        </div>
      </div>
    </div>
  )
}
