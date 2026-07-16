import { ImageResponse } from "next/og"
import { cleanOgText } from "@/lib/og-clean"

export function ogCard({
  kicker,
  title,
  subtitle,
  footer = "sorry your time is up",
  path,
}: {
  kicker: string
  title: string
  subtitle: string
  footer?: string
  path: string
}) {
  const t = cleanOgText(title).slice(0, 48) || "ST Joe's"
  const s = cleanOgText(subtitle).slice(0, 90)
  const k = cleanOgText(kicker).slice(0, 40)
  const f = cleanOgText(footer).slice(0, 40)
  const p = cleanOgText(path).slice(0, 40)

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            {k}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: t.length > 28 ? 48 : 60,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#ffffff",
            }}
          >
            {t}
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 26, color: "#c5d0c9" }}>{s}</div>
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
          <div style={{ display: "flex" }}>{f}</div>
          <div style={{ display: "flex", color: "#d4e6cb" }}>{p}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
