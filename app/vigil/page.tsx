import type { Metadata } from "next"
import { Suspense } from "react"
import { VigilLight } from "@/components/vigil-light"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Power-LED Vigil | ST Joe's Computer Hospice",
  description: "A quiet glowing vigil for machines in transition. Dedicate and share.",
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
        copy="A soft green pulse while you say goodbye. Add a name and share the link."
      />
      <Suspense fallback={<p className="py-16 text-center text-muted">Lighting the LED…</p>}>
        <VigilLight />
      </Suspense>
      <SiteFooter showCounter={false} />
    </main>
  )
}
