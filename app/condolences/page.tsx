import type { Metadata } from "next"
import { Suspense } from "react"
import { CondolenceCard } from "@/components/condolence-card"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"
import { CONDOLENCE_LINES, condolenceTitle } from "@/lib/condolences"

const siteUrl = "https://stjoeshospice.com"

type Props = {
  searchParams: Promise<{ machine?: string; from?: string; line?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams
  const machine = (sp.machine || "").trim()
  const from = (sp.from || "").trim()
  const lineIndex = Number(sp.line || "0")
  const line =
    CONDOLENCE_LINES[
      ((Number.isFinite(lineIndex) ? lineIndex : 0) % CONDOLENCE_LINES.length +
        CONDOLENCE_LINES.length) %
        CONDOLENCE_LINES.length
    ]

  const title = machine
    ? `${condolenceTitle(machine)} | ST Joe's`
    : "Condolence Card | ST Joe's Computer Hospice"
  const description = machine
    ? `${line} — ${from || "A friend in the wards"}`
    : "Generate a shareable condolence card for a dying computer. Custom Open Graph preview included."

  const og = new URL(`${siteUrl}/api/og/condolences`)
  if (machine) og.searchParams.set("machine", machine)
  if (from) og.searchParams.set("from", from)
  if (sp.line) og.searchParams.set("line", String(lineIndex || 0))

  const pageUrl = new URL(`${siteUrl}/condolences`)
  if (machine) pageUrl.searchParams.set("machine", machine)
  if (from) pageUrl.searchParams.set("from", from)
  if (sp.line) pageUrl.searchParams.set("line", String(lineIndex || 0))

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl.toString(),
      images: [{ url: og.toString(), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og.toString()],
    },
  }
}

export default function CondolencesPage() {
  return (
    <main className="flex-1">
      <PageTicker
        items={[
          "condolence generator",
          "we're sorry for your OptiPlex",
          "shareable preview cards",
          "sorry your time is up",
        ]}
      />
      <PageHero
        kicker="Card ministry"
        title="Condolence card"
        copy="Pick a machine, shuffle a line, share the link. Group chats get a custom Open Graph preview — not just a boring URL."
      />
      <Suspense fallback={<p className="py-16 text-center text-muted">Folding the card…</p>}>
        <CondolenceCard />
      </Suspense>
      <AmenityShowcase
        title="More wards"
        copy="Still processing? Try a vigil, a DNR, or the memorial wall."
        excludeHref="/condolences"
        id="more-wards"
      />
      <SiteFooter showCounter={false} />
    </main>
  )
}
