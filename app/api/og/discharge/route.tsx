import { ogCard } from "@/lib/og-card"
import { cleanOgText } from "@/lib/og-clean"

export const runtime = "edge"
export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

export async function GET(request: Request) {
  try {
    const name = cleanOgText(new URL(request.url).searchParams.get("for") || "a dying machine").slice(
      0,
      40
    )
    return ogCard({
      kicker: "Discharge papers",
      title: name,
      subtitle: "Released against medical advice. Still won't boot.",
      path: "stjoeshospice.com/discharge",
    })
  } catch (error) {
    console.error("og/discharge failed", error)
    return new Response("OG image failed", { status: 500 })
  }
}
