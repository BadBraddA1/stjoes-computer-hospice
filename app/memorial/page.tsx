import type { Metadata } from "next"
import { MemorialWall } from "@/components/memorial-wall"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Memorial Wall | ST Joe's Computer Hospice",
  description: "Leave a last word for a laptop, tower, or emotionally compromised printer.",
}

export default function MemorialPage() {
  return (
    <main className="flex-1">
      <PageTicker
        items={[
          "in memoriam: beige towers",
          "last words welcome",
          "tissues provided",
          "sorry your time is up",
        ]}
      />
      <PageHero
        kicker="Remembrance chapel"
        title="Memorial wall"
        copy="Etch a note for a machine that can’t update anymore. Seed memorials from the wards; yours stay on this device."
      />
      <MemorialWall />
      <SiteFooter showCounter={false} />
    </main>
  )
}
