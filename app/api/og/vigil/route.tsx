import { ImageResponse } from "next/og"

export const runtime = "edge"
export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

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
    const name =
      clean(searchParams.get("for") || "a dying machine").slice(0, 40) || "a dying machine"

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            background: "#1a365d",
            color: "#f7faf8",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#d4e6cb",
              }}
            >
              {"ST Joe's Computer Hospice"}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#8fbf78",
              }}
            >
              Power-LED vigil
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 160,
                height: 160,
                borderRadius: 80,
                background: "#0d1b2a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 40,
                border: "4px solid #5f9448",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  background: "#5f9448",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: 820 }}>
              <div style={{ display: "flex", fontSize: 26, color: "#d4e6cb", marginBottom: 10 }}>
                Someone lit a quiet light for
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: name.length > 28 ? 50 : 64,
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                {name}
              </div>
              <div style={{ display: "flex", marginTop: 16, fontSize: 26, color: "#c5d0c9" }}>
                No updates. No diagnostics. Just glow.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 20,
              color: "#d4a574",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex" }}>sorry your time is up</div>
            <div style={{ display: "flex", color: "#d4e6cb" }}>stjoeshospice.com/vigil</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error("og/vigil failed", error)
    return new Response("OG image failed", { status: 500 })
  }
}
