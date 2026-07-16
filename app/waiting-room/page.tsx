import type { Metadata } from "next"
import { WaitingRoomCam } from "@/components/waiting-room-cam"
import { AmenityPageShell } from "@/lib/page-shell"

export const metadata: Metadata = {
  title: "Waiting Room Cam | ST Joe's Computer Hospice",
  description: "Live-ish lobby webcam of a blinking power LED and a ticker of fake patients.",
}

export default function WaitingRoomPage() {
  return (
    <AmenityPageShell
      ticker={["lobby cam", "power LED live", "please take a number", "sorry your time is up"]}
      kicker="Lobby surveillance (friendly)"
      title="Waiting room cam"
      copy="The only honest livestream left: a green light practicing mindfulness."
      excludeHref="/waiting-room"
    >
      <WaitingRoomCam />
    </AmenityPageShell>
  )
}
