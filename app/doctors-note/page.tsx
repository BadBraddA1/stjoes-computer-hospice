import type { Metadata } from "next"
import { DoctorsNote } from "@/components/doctors-note"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"
import { cleanOgText } from "@/lib/og-clean"

const siteUrl = "https://stjoeshospice.com"

type Props = { searchParams: Promise<{ for?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { for: nameRaw } = await searchParams
  const name = cleanOgText(nameRaw || "").slice(0, 40)
  const title = name
    ? `Doctor's note for ${name} | ST Joe's Computer Hospice`
    : "Doctor's Note | ST Joe's Computer Hospice"
  const description = name
    ? `Please excuse ${name} from work — terminal Windows Update.`
    : "Please excuse OptiPlex from work — terminal Windows Update."
  const og = new URL(`${siteUrl}/api/og/doctors-note`)
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

export default function DoctorsNotePage() {
  return (
    <main className="flex-1">
      <div className="no-print">
        <PageTicker
          items={["doctor's note", "excuse from Zoom", "terminal update", "sorry your time is up"]}
        />
        <PageHero
          kicker="Excuse desk"
          title="Doctor's note"
          copy="Print it. Share it. Blame Windows Update with clinical authority."
        />
      </div>
      <DoctorsNote />
      <div className="no-print">
        <AmenityShowcase
          title="More wards"
          copy="Need a fuller send-off? Try the certificate pack."
          excludeHref="/doctors-note"
          id="more-wards"
        />
        <SiteFooter showCounter={false} />
      </div>
    </main>
  )
}
