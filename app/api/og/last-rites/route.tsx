import { ogCard } from "@/lib/og-card"
import { cleanOgText } from "@/lib/og-clean"

export const runtime = "edge"
export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const name = cleanOgText(searchParams.get("for") || "a dying machine").slice(0, 40)
    const os = cleanOgText(searchParams.get("os") || "an unfinished OS").slice(0, 40)
    return ogCard({
      kicker: "Last rites",
      title: name,
      subtitle: `Eulogy in progress · ${os}`,
      path: "stjoeshospice.com/last-rites",
    })
  } catch (error) {
    console.error("og/last-rites failed", error)
    return new Response("OG image failed", { status: 500 })
  }
}
