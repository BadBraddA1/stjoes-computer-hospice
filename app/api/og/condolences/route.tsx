import { ImageResponse } from "next/og"

export const runtime = "edge"
export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

const LINES = [
  "The fans are quiet now. The icons can rest.",
  "May its ports find peace and its dust find dignity.",
  "Gone from the dock, never from the drawer of chargers.",
  "It gave you spreadsheets, memes, and one final blue screen.",
]

function clean(text: string) {
  return String(text || "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "")
    .trim()
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const machine = clean(searchParams.get("machine") || "OptiPlex").slice(0, 36) || "OptiPlex"
    const from =
      clean(searchParams.get("from") || "A friend in the wards").slice(0, 36) ||
      "A friend in the wards"
    const rawLine = Number(searchParams.get("line") || "0")
    const lineIndex = Number.isFinite(rawLine) ? Math.abs(Math.trunc(rawLine)) % LINES.length : 0
    const line = LINES[lineIndex]
    const title = `We're sorry for your ${machine}.`

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: "#eef3f0",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 1168,
              height: 598,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "48px 56px",
              background: "#d4e6cb",
              border: "8px solid #1a365d",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#5f9448",
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              {"ST Joe's Computer Hospice - Condolences"}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: title.length > 40 ? 48 : 58,
                  fontWeight: 700,
                  color: "#1a365d",
                  lineHeight: 1.15,
                  marginBottom: 20,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 30,
                  color: "#4a5d73",
                  lineHeight: 1.3,
                  marginBottom: 18,
                }}
              >
                {line}
              </div>
              <div style={{ display: "flex", fontSize: 26, color: "#1a365d" }}>
                - {from}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 20,
                color: "#8a5a2b",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              <div style={{ display: "flex" }}>sorry your time is up</div>
              <div style={{ display: "flex", color: "#1a365d" }}>stjoeshospice.com</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error("og/condolences failed", error)
    return new Response("OG image failed", { status: 500 })
  }
}
