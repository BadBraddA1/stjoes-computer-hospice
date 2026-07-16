import type { Metadata } from "next"
import { IsItTimeFlow } from "@/components/is-it-time-flow"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Is it time? | ST Joe's Computer Hospice",
  description: "A short clinical flowchart for deciding whether your machine needs comfort care.",
}

export default function IsItTimePage() {
  return (
    <main className="flex-1">
      <PageTicker
        items={[
          "clinical flowchart",
          "yes / no only",
          "blue screens count",
          "sorry your time is up",
        ]}
      />
      <PageHero
        kicker="Intake desk"
        title="Is it time?"
        copy="Answer a few yes/no questions. We’ll recommend admission, a vigil, or a little more denial."
      />
      <IsItTimeFlow />
      <SiteFooter showCounter={false} />
    </main>
  )
}
