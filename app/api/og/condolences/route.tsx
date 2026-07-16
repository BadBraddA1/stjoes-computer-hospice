import { ImageResponse } from "next/og"
import { CONDOLENCE_LINES, condolenceTitle } from "@/lib/condolences"

export const runtime = "edge"
export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const machine = (searchParams.get("machine") || "OptiPlex").trim().slice(0, 40)
  const from = (searchParams.get("from") || "A friend in the wards").trim().slice(0, 40)
  const lineIndex = Number(searchParams.get("line") || "0")
  const line =
    CONDOLENCE_LINES[((Number.isFinite(lineIndex) ? lineIndex : 0) % CONDOLENCE_LINES.length + CONDOLENCE_LINES.length) % CONDOLENCE_LINES.length]
  const title = condolenceTitle(machine)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 60px",
          background: "linear-gradient(160deg, #eef3f0 0%, #d4e6cb 55%, #c5dcb8 100%)",
          color: "#1a365d",
          fontFamily: "Georgia, serif",
          border: "16px solid #1a365d",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#5f9448",
            fontFamily: "monospace",
          }}
        >
          ST Joe's Computer Hospice · Condolences
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: title.length > 42 ? 52 : 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 32, color: "#4a5d73", maxWidth: 920, lineHeight: 1.35 }}>
            {line}
          </div>
          <div style={{ fontSize: 28, marginTop: 8 }}>— {from}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#8a5a2b",
          }}
        >
          <span>sorry your time is up</span>
          <span style={{ color: "#1a365d" }}>stjoeshospice.com/condolences</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
