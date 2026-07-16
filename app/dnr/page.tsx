import type { Metadata } from "next"
import { DnrCertificate } from "@/components/dnr-certificate"
import { AmenityShowcase } from "@/components/amenity-showcase"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "DNR Certificate | ST Joe's Computer Hospice",
  description: "Issue a Do Not Resuscitate certificate for a dying machine. Printable. Mostly solemn.",
}

export default function DnrPage() {
  return (
    <main className="flex-1">
      <div className="no-print">
        <PageTicker
          items={[
            "FORM DNR-404",
            "no heroic reboots",
            "comfort care only",
            "sorry your time is up",
          ]}
        />
        <PageHero
          kicker="Paperwork ward"
          title="Do Not Resuscitate"
          copy="Name the device, sign as next of kin, then print or save as PDF. Hang it near the charger graveyard."
        />
      </div>
      <DnrCertificate />
      <div className="no-print">
        <AmenityShowcase
          title="More wards"
          copy="Certificates filed? Light a vigil or leave a memorial."
          excludeHref="/dnr"
          id="more-wards"
        />
        <SiteFooter showCounter={false} />
      </div>
    </main>
  )
}
