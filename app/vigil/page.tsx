import type { Metadata } from "next"
import { Suspense } from "react"
import { VigilLight } from "@/components/vigil-light"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

const siteUrl = "https://stjoeshospice.com"

type Props = {
  searchParams: Promise<{ for?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { for: dedicated } = await searchParams
  const name = (dedicated || "").trim()
  const title = name
    ? `Vigil for ${name} | ST Joe's Computer Hospice`
    : "Power-LED Vigil | ST Joe's Computer Hospice"
  const description = name
    ? `Someone lit a quiet power-LED vigil for ${name}. No updates. No diagnostics. Just glow.`
    : "A quiet glowing vigil for machines in transition. Dedicate and share."

  const og = new URL(`${siteUrl}/api/og/vigil`)
  if (name) og.searchParams.set("for", name)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: name ? `${siteUrl}/vigil?for=${encodeURIComponent(name)}` : `${siteUrl}/vigil`,
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

export default function VigilPage() {
  return (
    <main className="flex-1">
      <PageTicker
        items={[
          "power LED vigil",
          "no forced updates",
          "sit with the light",
          "sorry your time is up",
        ]}
      />
      <PageHero
        kicker="Candlelight reboot chapel"
        title="Power-LED vigil"
        copy="A soft green pulse while you say goodbye. Add a name and share the link — the preview card writes itself."
      />
      <Suspense fallback={<p className="py-16 text-center text-muted">Lighting the LED…</p>}>
        <VigilLight />
      </Suspense>
      <AmenityShowcase
        title="More wards"
        copy="Keep touring the campus. The printers are emotionally available."
        excludeHref="/vigil"
        id="more-wards"
      />
      <SiteFooter showCounter={false} />
    </main>
  )
}
