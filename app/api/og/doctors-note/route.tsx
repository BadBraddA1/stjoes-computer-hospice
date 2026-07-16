import { ogCard } from "@/lib/og-card"
import { cleanOgText } from "@/lib/og-clean"

export const runtime = "edge"
export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

export async function GET(request: Request) {
  try {
    const name = cleanOgText(new URL(request.url).searchParams.get("for") || "OptiPlex").slice(0, 40)
    return ogCard({
      kicker: "Doctor's note",
      title: `Excuse ${name}`,
      subtitle: "Terminal Windows Update. Please allow recovery naps.",
      path: "stjoeshospice.com/doctors-note",
    })
  } catch (error) {
    console.error("og/doctors-note failed", error)
    return new Response("OG image failed", { status: 500 })
  }
}
