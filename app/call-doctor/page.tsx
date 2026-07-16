import type { Metadata } from "next"
import { CallDoctor } from "@/components/call-doctor"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Call Doctor | ST Joe's Computer Hospice",
  description: "On-call physician line. Plays hold music only. No doctor will answer.",
}

export default function CallDoctorPage() {
  return (
    <main className="flex-1">
      <PageTicker items={["on-call", "please hold", "hold music only", "sorry your time is up"]} />
      <PageHero
        kicker="Telecommunications chapel"
        title="Call Doctor"
        copy="Your call is important to us. Your laptop less so. Enjoy the hold music."
      />
      <CallDoctor />
      <AmenityShowcase
        title="More wards"
        copy="Still on hold? Try paperwork or a vigil."
        excludeHref="/call-doctor"
        id="more-wards"
      />
      <SiteFooter showCounter={false} />
    </main>
  )
}
