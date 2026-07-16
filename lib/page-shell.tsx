import type { ReactNode } from "react"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export function AmenityPageShell({
  ticker,
  kicker,
  title,
  copy,
  excludeHref,
  children,
}: {
  ticker: string[]
  kicker: string
  title: string
  copy: string
  excludeHref: string
  children: ReactNode
}) {
  return (
    <main className="flex-1">
      <PageTicker items={ticker} />
      <PageHero kicker={kicker} title={title} copy={copy} />
      {children}
      <AmenityShowcase
        title="Other rooms"
        copy="Enter another room — or hit Main lobby to return to the directory."
        excludeHref={excludeHref}
        id="more-wards"
      />
      <SiteFooter showCounter={false} />
    </main>
  )
}
