import type { Metadata } from "next"
import { CallDoctor } from "@/components/call-doctor"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Call Doctor | ST Joe's Computer Hospice",
  description: "On-call physician line at ST Joe's Computer Hospice. Please hold.",
}

export default function CallDoctorPage() {
  return (
    <main className="flex-1">
      <PageTicker items={["on-call", "please hold", "all circuits are busy", "sorry your time is up"]} />
      <PageHero
        kicker="Telecommunications chapel"
        title="Call Doctor"
        copy="Your call is important to us. An attendant will be with you… eventually."
      />
      <CallDoctor />
      <AmenityShowcase
        title="More wards"
        copy="While you wait, the paperwork wards remain open."
        excludeHref="/call-doctor"
        id="more-wards"
      />
      <SiteFooter showCounter={false} />
    </main>
  )
}
