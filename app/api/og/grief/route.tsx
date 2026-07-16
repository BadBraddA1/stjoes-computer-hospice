import { ogCard } from "@/lib/og-card"
import { cleanOgText } from "@/lib/og-clean"

export const runtime = "edge"
export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

const LABELS: Record<string, string> = {
  denial: "Denial",
  cache: "Cache Clear",
  bargain: "Bargaining with Tech Support",
  depression: "Depression (battery warning)",
  acceptance: "Acceptance",
}

export async function GET(request: Request) {
  try {
    const stage = cleanOgText(new URL(request.url).searchParams.get("stage") || "acceptance")
    const label = LABELS[stage] || "Acceptance"
    return ogCard({
      kicker: "Pastoral diagnosis",
      title: `You are ${label}`,
      subtitle: "Five stages of grief for dying machines.",
      path: "stjoeshospice.com/grief",
    })
  } catch (error) {
    console.error("og/grief failed", error)
    return new Response("OG image failed", { status: 500 })
  }
}
