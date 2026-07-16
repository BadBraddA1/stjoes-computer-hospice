import type { Metadata } from "next"
import { CallDoctor } from "@/components/call-doctor"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Call Doctor | ST Joe's Computer Hospice",
  description:
    "IVR tree, genre-shifting hold music, Care+ cut-ins, and a voicemail that never reaches anyone.",
}

export default function CallDoctorPage() {
  return (
    <main className="flex-1">
      <PageTicker
        items={[
          "press 1 for denial",
          "please hold",
          "now playing: elevator remorse",
          "ETA forever (revised)",
          "sorry your time is up",
        ]}
      />
      <PageHero
        kicker="Telecommunications chapel"
        title="Call Doctor"
        copy="Navigate the IVR. Enter the queue. Survive genre changes. Leave a voicemail in /dev/null."
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
