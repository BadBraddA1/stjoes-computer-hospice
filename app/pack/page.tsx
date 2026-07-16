import type { Metadata } from "next"
import { CertificatePack } from "@/components/certificate-pack"
import { AmenityPageShell } from "@/lib/page-shell"

export const metadata: Metadata = {
  title: "Certificate Pack | ST Joe's Computer Hospice",
  description: "Admit → DNR → discharge → condolence. Download the whole send-off.",
}

export default function PackPage() {
  return (
    <AmenityPageShell
      ticker={["certificate pack", "admit to condolence", "download the send-off"]}
      kicker="Paperwork bundle"
      title="Certificate pack"
      copy="One machine. Four documents. Zero recovery."
      excludeHref="/pack"
    >
      <CertificatePack />
    </AmenityPageShell>
  )
}
