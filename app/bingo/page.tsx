import type { Metadata } from "next"
import { VisitingBingo } from "@/components/visiting-bingo"
import { AmenityPageShell } from "@/lib/page-shell"

export const metadata: Metadata = {
  title: "Visiting Hours Bingo | ST Joe's Computer Hospice",
  description: "Mark machine symptoms. Five in a row unlocks a Code Beige toast.",
}

export default function BingoPage() {
  return (
    <AmenityPageShell
      ticker={["bingo", "visiting hours", "mark the beach ball", "Code Beige"]}
      kicker="Recreation therapy"
      title="Visiting hours bingo"
      copy="Observe the ward. Mark the card. Celebrate solemnly."
      excludeHref="/bingo"
    >
      <VisitingBingo />
    </AmenityPageShell>
  )
}
