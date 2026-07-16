import type { Metadata } from "next"
import { Suspense } from "react"
import { LastRites } from "@/components/last-rites"
import { AmenityPageShell } from "@/lib/page-shell"
import { cleanOgText } from "@/lib/og-clean"

const siteUrl = "https://stjoeshospice.com"

type Props = { searchParams: Promise<{ for?: string; os?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { for: nameRaw, os: osRaw } = await searchParams
  const name = cleanOgText(nameRaw || "").slice(0, 40)
  const title = name
    ? `Last rites for ${name} | ST Joe's Computer Hospice`
    : "Last Rites | ST Joe's Computer Hospice"
  const description = name
    ? `A short eulogy for ${name}${osRaw ? ` running ${cleanOgText(osRaw)}` : ""}.`
    : "Generate a short machine eulogy and share it."
  const og = new URL(`${siteUrl}/api/og/last-rites`)
  if (name) og.searchParams.set("for", name)
  if (osRaw) og.searchParams.set("os", cleanOgText(osRaw).slice(0, 40))

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

export default function LastRitesPage() {
  return (
    <AmenityPageShell
      ticker={["last rites", "eulogy for hard drives", "ashes to beige", "sorry your time is up"]}
      kicker="Ceremony chapel"
      title="Last rites"
      copy="Name the machine. Name the OS. Receive a eulogy worthy of the group chat."
      excludeHref="/last-rites"
    >
      <Suspense fallback={<p className="py-16 text-center text-muted">Opening the hymnal…</p>}>
        <LastRites />
      </Suspense>
    </AmenityPageShell>
  )
}
