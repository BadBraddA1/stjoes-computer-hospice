import type { Metadata } from "next"
import { CondolenceCard } from "@/components/condolence-card"
import { PageHero, PageTicker, SiteFooter } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Condolence Card | ST Joe's Computer Hospice",
  description: "Generate a shareable condolence card for a dying computer. Download as PNG.",
}

export default function CondolencesPage() {
  return (
    <main className="flex-1">
      <PageTicker
        items={[
          "condolence generator",
          "we're sorry for your OptiPlex",
          "downloadable dignity",
          "sorry your time is up",
        ]}
      />
      <PageHero
        kicker="Card ministry"
        title="Condolence card"
        copy="Pick a machine, shuffle a line, download a PNG worthy of group chats and fridge doors."
      />
      <CondolenceCard />
      <SiteFooter showCounter={false} />
    </main>
  )
}
