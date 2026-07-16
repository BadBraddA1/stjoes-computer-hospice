import type { Metadata } from "next"
import { DischargePapers } from "@/components/discharge-papers"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"
import { cleanOgText } from "@/lib/og-clean"

const siteUrl = "https://stjoeshospice.com"

type Props = { searchParams: Promise<{ for?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { for: nameRaw } = await searchParams
  const name = cleanOgText(nameRaw || "").slice(0, 40)
  const title = name
    ? `Discharge: ${name} | ST Joe's Computer Hospice`
    : "Discharge Papers | ST Joe's Computer Hospice"
  const description = name
    ? `${name} released against medical advice. Still won't boot.`
    : "Official-looking discharge paperwork for machines released against medical advice."
  const og = new URL(`${siteUrl}/api/og/discharge`)
  if (name) og.searchParams.set("for", name)

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

export default function DischargePage() {
  return (
    <main className="flex-1">
      <div className="no-print">
        <PageTicker
          items={["discharge", "against medical advice", "still won't boot", "sorry your time is up"]}
        />
        <PageHero
          kicker="Exit desk"
          title="Discharge papers"
          copy="Sign them out. The power button was only a rumor."
        />
      </div>
      <DischargePapers />
      <div className="no-print">
        <AmenityShowcase
          title="More wards"
          copy="Not ready to leave? The on-call line remains open."
          excludeHref="/discharge"
          id="more-wards"
        />
        <SiteFooter showCounter={false} />
      </div>
    </main>
  )
}
