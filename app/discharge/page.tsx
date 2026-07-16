import type { Metadata } from "next"
import { DischargePapers } from "@/components/discharge-papers"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Discharge Papers | ST Joe's Computer Hospice",
  description: "Official-looking discharge paperwork for machines released against medical advice.",
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
          copy="Sign them out. Pretend the power button was a rumor."
        />
      </div>
      <DischargePapers />
      <div className="no-print">
        <AmenityShowcase
          title="More wards"
          copy="Not ready to leave? Call Doctor (hold music)."
          excludeHref="/discharge"
          id="more-wards"
        />
        <SiteFooter showCounter={false} />
      </div>
    </main>
  )
}
