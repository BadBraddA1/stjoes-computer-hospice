import type { Metadata } from "next"
import { FamilyConference } from "@/components/family-conference"
import { AmenityPageShell } from "@/lib/page-shell"

export const metadata: Metadata = {
  title: "Family Conference | ST Joe's Computer Hospice",
  description: "Should we upgrade? Every path converges on hospice.",
}

export default function FamilyPage() {
  return (
    <AmenityPageShell
      ticker={["family conference", "buy more RAM?", "consensus: hospice"]}
      kicker="Conference room"
      title="Family conference"
      copy="Debate the upgrade. Arrive at comfort care. Minutes will not be published."
      excludeHref="/family"
    >
      <FamilyConference />
    </AmenityPageShell>
  )
}
