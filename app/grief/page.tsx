import type { Metadata } from "next"
import { GriefQuiz } from "@/components/grief-quiz"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Five Stages of Grief | ST Joe's Computer Hospice",
  description:
    "Denial, Cache Clear, Bargaining with Tech Support, Depression (battery warning), Acceptance.",
}

export default function GriefPage() {
  return (
    <main className="flex-1">
      <PageTicker
        items={[
          "denial",
          "cache clear",
          "bargaining",
          "battery warning",
          "acceptance",
        ]}
      />
      <PageHero
        kicker="Pastoral care"
        title="Five stages of grief"
        copy="Walk the path every owner knows. Progress is optional. The power brick drawer is not."
      />
      <GriefQuiz />
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
