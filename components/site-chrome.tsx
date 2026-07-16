import Image from "next/image"
import Link from "next/link"
import { VisitCounter } from "@/components/visit-counter"
import { LobbyNav } from "@/components/lobby-nav"
import { amenities } from "@/lib/amenities"

export function SiteFooter({ showCounter = true }: { showCounter?: boolean }) {
  return (
    <footer className="border-t border-line bg-ink py-10 text-card">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
              <Image src="/logo-icon.png" alt="" width={40} height={40} className="h-10 w-10" />
              <p className="font-[family-name:var(--font-display)] text-base font-semibold">
                ST Joe&apos;s Computer Hospice
              </p>
            </Link>
            {showCounter ? <VisitCounter /> : null}
          </div>

          <nav aria-label="Patient amenities" className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {amenities.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/65 transition hover:text-accent-soft"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-2 text-center sm:items-end sm:text-right">
            <p className="text-sm text-white/65">stjoeshospice.com · sorry your time is up</p>
            <Link
              href="/#amenities"
              className="text-sm font-semibold text-accent-soft transition hover:text-white"
            >
              ← Main lobby
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6 text-center text-sm text-white/55">
          <p>
            Powered By{" "}
            <a
              href="https://braddcorp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-soft transition-colors hover:text-white"
            >
              BraddCorp
            </a>{" "}
            © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function PageTicker({ items }: { items: string[] }) {
  return (
    <>
      <LobbyNav />
      <div className="overflow-hidden border-b border-line bg-ink text-card">
        <div className="ticker-track flex whitespace-nowrap py-2 font-mono text-xs tracking-wide uppercase">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex shrink-0 gap-10 px-6" aria-hidden={loop === 1}>
              {items.map((item) => (
                <span key={`${loop}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export function PageHero({
  kicker,
  title,
  copy,
}: {
  kicker: string
  title: string
  copy: string
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a365d 1px, transparent 1px), linear-gradient(to bottom, #1a365d 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="anim-rise font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
          {kicker}
        </p>
        <h1 className="anim-rise-delay-1 mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-balance text-ink">
          {title}
        </h1>
        <p className="anim-rise-delay-2 mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
          {copy}
        </p>
      </div>
    </header>
  )
}
