import type { Metadata } from "next"
import { Soundboard } from "@/components/soundboard"
import { AmenityPageShell } from "@/lib/page-shell"

export const metadata: Metadata = {
  title: "Ward Soundboard | ST Joe's Computer Hospice",
  description: "Fan spin-down, HDD click of death, XP shutdown, hold music sting.",
}

export default function SoundboardPage() {
  return (
    <AmenityPageShell
      ticker={["soundboard", "fan spin-down", "click of death", "XP hymn"]}
      kicker="Audio ward"
      title="Ward soundboard"
      copy="The greatest hits of machines in transition. Click responsibly."
      excludeHref="/soundboard"
    >
      <Soundboard />
    </AmenityPageShell>
  )
}
