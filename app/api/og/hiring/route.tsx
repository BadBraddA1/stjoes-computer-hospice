import { ogCard } from "@/lib/og-card"
import { cleanOgText } from "@/lib/og-clean"

export const runtime = "edge"
export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

export async function GET(request: Request) {
  try {
    const badge = cleanOgText(new URL(request.url).searchParams.get("badge") || "Visitor").slice(0, 28)
    return ogCard({
      kicker: "Human resources",
      title: `${badge}`,
      subtitle: "Visitor badge status: Not Joe 3.",
      path: "stjoeshospice.com/hiring",
    })
  } catch (error) {
    console.error("og/hiring failed", error)
    return new Response("OG image failed", { status: 500 })
  }
}
