import type { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react"
import { HiringQuiz } from "@/components/hiring-quiz"
import { HiringLounge } from "@/components/hiring-lounge"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageTicker, SiteFooter } from "@/components/site-chrome"
import { cleanOgText } from "@/lib/og-clean"

const siteUrl = "https://stjoeshospice.com"

type Props = { searchParams: Promise<{ badge?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { badge } = await searchParams
  const name = cleanOgText(badge || "").slice(0, 28)
  const title = name
    ? `${name} · Not Joe 3 | ST Joe's Computer Hospice`
    : "We're Hiring | ST Joe's Computer Hospice"
  const description = name
    ? `Visitor badge issued to ${name}. Status: Not Joe 3.`
    : "Is your name Joe 3? Fake benefits, visitor badges, and a resume drop that always rejects."
  const og = new URL(`${siteUrl}/api/og/hiring`)
  if (name) og.searchParams.set("badge", name)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: og.toString(), width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og.toString()] },
  }
}

export default function HiringPage() {
  return (
    <main className="flex-1">
      <PageTicker
        items={[
          "NOW HIRING: emotional support for hard drives",
          "JOE 3 NEED NOT APPLY (again)",
          "benefits: tissue boxes · no hope · free static",
          "sorry your resume is up",
        ]}
      />

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
            One screening question, a fake benefits lounge, visitor badges, and a resume drop that
            rejects on principle.
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
      </section>

      <section className="border-t border-line bg-band py-14">
        <Suspense fallback={null}>
          <HiringLounge />
        </Suspense>
      </section>

      <AmenityShowcase
        title="Meanwhile, in the wards"
        copy="While HR rejects you, the machines still need company."
        excludeHref="/hiring"
        id="more-wards"
      />
      <SiteFooter showCounter={false} />
    </main>
  )
}
