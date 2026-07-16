import { ImageResponse } from "next/og"

export const runtime = "edge"
export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const raw = (searchParams.get("for") || "a dying machine").trim()
  const name = raw.slice(0, 48) || "a dying machine"

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
          background: "linear-gradient(145deg, #12263f 0%, #1a365d 55%, #243f2f 100%)",
          color: "#f7faf8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#d4e6cb",
              fontFamily: "monospace",
            }}
          >
            ST Joe's Computer Hospice
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8fbf78",
              fontFamily: "monospace",
            }}
          >
            Power-LED vigil
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 999,
              background: "#0d1b2a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "4px solid rgba(95,148,72,0.35)",
              boxShadow: "0 0 60px rgba(95,148,72,0.45)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 999,
                background: "#5f9448",
                boxShadow: "0 0 40px rgba(95,148,72,0.9)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div style={{ fontSize: 28, color: "#d4e6cb", marginBottom: 12 }}>
              Someone lit a quiet light for
            </div>
            <div
              style={{
                fontSize: name.length > 28 ? 54 : 68,
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#ffffff",
              }}
            >
              {name}
            </div>
            <div style={{ marginTop: 18, fontSize: 28, color: "#c5d0c9" }}>
              No updates. No diagnostics. Just glow.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "monospace",
            fontSize: 20,
            color: "#d4a574",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>sorry your time is up</span>
          <span style={{ color: "#d4e6cb" }}>stjoeshospice.com/vigil</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
