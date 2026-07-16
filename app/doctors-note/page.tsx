import type { Metadata } from "next"
import { DoctorsNote } from "@/components/doctors-note"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Doctor's Note | ST Joe's Computer Hospice",
  description: "Fake doctor's note excusing a computer from work due to terminal Windows Update.",
}

export default function DoctorsNotePage() {
  return (
    <main className="flex-1">
      <div className="no-print">
        <PageTicker
          items={["physician excuse", "terminal update", "comfort care recommended", "sorry your time is up"]}
        />
        <PageHero
          kicker="Excuse ministry"
          title="Doctor's note"
          copy="Please excuse OptiPlex from productivity. Comfort care recommended."
        />
      </div>
      <DoctorsNote />
      <div className="no-print">
        <AmenityShowcase
          title="More wards"
          copy="Need stronger paperwork? Try a DNR."
          excludeHref="/doctors-note"
          id="more-wards"
        />
        <SiteFooter showCounter={false} />
      </div>
    </main>
  )
}
