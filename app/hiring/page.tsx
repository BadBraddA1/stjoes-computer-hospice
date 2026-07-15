import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { HiringQuiz } from "@/components/hiring-quiz"

export const metadata: Metadata = {
  title: "We're Hiring | ST Joe's Computer Hospice",
  description:
    "Join the ward. Or don't. First question: is your name Joe 3? Comfort care for dying machines — and one very exclusive hiring process.",
  openGraph: {
    title: "We're Hiring | ST Joe's Computer Hospice",
    description: "Is your name Joe 3? Answer carefully. Positions may or may not exist.",
  },
}

export default function HiringPage() {
  return (
    <main className="flex-1">
      <div className="overflow-hidden border-b border-line bg-ink text-card">
        <div className="ticker-track flex whitespace-nowrap py-2 font-mono text-xs tracking-wide uppercase">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex shrink-0 gap-10 px-6">
              <span>NOW HIRING: emotional support for hard drives</span>
              <span>JOE 3 NEED NOT APPLY (again)</span>
              <span>benefits: tissue boxes · no hope · free static</span>
              <span>sorry your resume is up</span>
            </div>
          ))}
        </div>
      </div>

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
        <div className="relative mx-auto max-w-3xl px-6 py-14 text-center sm:px-10 sm:py-20">
          <p className="anim-rise font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
            Human resources · sort of
          </p>
          <h1 className="anim-rise-delay-1 mt-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-ink">
            We&apos;re hiring
          </h1>
          <p className="anim-rise-delay-2 mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
            Openings in palliative performance, last rites for HDDs, and looking solemnly at a
            spinning beach ball. One screening question. Zero escape routes.
          </p>
          <Image
            src="/logo-icon.png"
            alt=""
            width={72}
            height={72}
            className="anim-rise-delay-2 mx-auto mt-8 h-16 w-16"
          />
        </div>
      </header>

      <section className="px-6 py-14 sm:px-10 sm:py-20" aria-labelledby="intake-heading">
        <h2 id="intake-heading" className="sr-only">
          Hiring intake question
        </h2>
        <HiringQuiz />
        <p className="mx-auto mt-10 max-w-md text-center font-mono text-xs text-muted">
          Not a real job. Definitely a real bit. Equal opportunity: all applicants equally unhired.
        </p>
      </section>

      <footer className="border-t border-line bg-ink py-10 text-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-10">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-base font-semibold transition hover:text-accent-soft"
          >
            ← Back to the wards
          </Link>
          <p className="text-sm text-white/65">stjoeshospice.com · sorry your time is up</p>
        </div>
      </footer>
    </main>
  )
}
