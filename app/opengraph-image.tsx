import { ImageResponse } from "next/og"

export const alt = "ST Joe's Computer Hospice — comfort care for dying machines"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "56px 64px",
          background: "linear-gradient(160deg, #e8efe8 0%, #d5e0d6 45%, #2f6b4f 160%)",
          color: "#1c2b22",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#2f6b4f",
            marginBottom: 18,
          }}
        >
          Est. after the last forced update
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.02 }}>ST Joe&apos;s</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, color: "#2f6b4f" }}>
          Computer Hospice
        </div>
        <div style={{ fontSize: 28, marginTop: 22, color: "#4a5c52", maxWidth: 820 }}>
          Comfort care for dying machines.
        </div>
        <div style={{ fontSize: 20, marginTop: 28, color: "#4a5c52" }}>stjoeshospice.com</div>
      </div>
    ),
    { ...size },
  )
}
