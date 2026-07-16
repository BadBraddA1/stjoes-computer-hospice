import type { Metadata } from "next"
import { ChaplainChat } from "@/components/chaplain-chat"
import { AmenityPageShell } from "@/lib/page-shell"

export const metadata: Metadata = {
  title: "ST Joe's AI | ST Joe's Computer Hospice",
  description:
    "Campus care chat for dying machines. ST Joe's AI listens, rarely repairs, and walks you to the right ward.",
}

export default function ChaplainPage() {
  return (
    <AmenityPageShell
      ticker={["ST Joe's AI", "campus care online", "grace with a ground pin", "sorry your time is up"]}
      kicker="Campus care · Rm 205"
      title="ST Joe's AI"
      copy="Ask about dying machines. Get walked to the right gag ward. Corner widget for quick check-ins; full desk here."
      excludeHref="/chaplain"
    >
      <ChaplainChat />
    </AmenityPageShell>
  )
}
