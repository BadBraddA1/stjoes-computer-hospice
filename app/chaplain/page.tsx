import type { Metadata } from "next"
import { ChaplainChat } from "@/components/chaplain-chat"
import { AmenityPageShell } from "@/lib/page-shell"

export const metadata: Metadata = {
  title: "Chaplain Chat | ST Joe's Computer Hospice",
  description: "Scripted pastoral chat with Fr. Joe. Every thread ends with sorry your time is up.",
}

export default function ChaplainPage() {
  return (
    <AmenityPageShell
      ticker={["Fr. Joe on call", "grace with a ground pin", "confess your USB sins"]}
      kicker="Pastoral care · Rm 205"
      title="Chaplain office"
      copy="Fr. Joe answers in character about dying machines. Corner widget for quick confessions; full desk here."
      excludeHref="/chaplain"
    >
      <ChaplainChat />
    </AmenityPageShell>
  )
}
