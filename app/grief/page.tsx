import type { Metadata } from "next"
import { Suspense } from "react"
import { GriefQuiz } from "@/components/grief-quiz"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"
import { cleanOgText } from "@/lib/og-clean"

const siteUrl = "https://stjoeshospice.com"

const LABELS: Record<string, string> = {
  denial: "Denial",
  cache: "Cache Clear",
  bargain: "Bargaining with Tech Support",
  depression: "Depression (battery warning)",
  acceptance: "Acceptance",
}

type Props = { searchParams: Promise<{ stage?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { stage } = await searchParams
  const key = cleanOgText(stage || "")
  const label = LABELS[key]
  const title = label
    ? `You are ${label} | ST Joe's Computer Hospice`
    : "Five Stages of Grief | ST Joe's Computer Hospice"
  const description = label
    ? `Pastoral diagnosis: ${label}. Share your stage with the group chat.`
    : "Denial, Cache Clear, Bargaining with Tech Support, Depression (battery warning), Acceptance."
  const og = new URL(`${siteUrl}/api/og/grief`)
  if (key) og.searchParams.set("stage", key)

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

export default function GriefPage() {
  return (
    <main className="flex-1">
      <PageTicker items={["denial", "cache clear", "bargaining", "battery warning", "acceptance"]} />
      <PageHero
        kicker="Pastoral care"
        title="Five stages of grief"
        copy="Walk the path every owner knows. Finish with a shareable stage diagnosis."
      />
      <Suspense fallback={<p className="py-16 text-center text-muted">Opening pastoral care…</p>}>
        <GriefQuiz />
      </Suspense>
      <AmenityShowcase
        title="More wards"
        copy="Acceptance achieved? Issue a DNR or start a vigil."
        excludeHref="/grief"
        id="more-wards"
      />
      <SiteFooter showCounter={false} />
    </main>
  )
}
