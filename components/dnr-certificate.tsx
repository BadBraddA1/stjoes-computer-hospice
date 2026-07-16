"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

const SITE_URL = "https://stjoeshospice.com"
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=8&color=1a365d&bgcolor=f7faf8&data=${encodeURIComponent(SITE_URL)}`

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load ${src}`))
    img.src = src
  })
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ")
  let line = ""
  let yy = y
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy)
      line = word
      yy += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, yy)
  return yy
}

export function DnrCertificate() {
  const [name, setName] = useState("Dell OptiPlex ’09")
  const [owner, setOwner] = useState("")
  const [busy, setBusy] = useState(false)
  const issued = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  )

  const device = name.trim() || "Unnamed Device"
  const signed = owner.trim() || "Next of Kin (USB)"

  async function downloadScreensaver() {
    setBusy(true)
    try {
      const width = 1920
      const height = 1080
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const [logo, qr] = await Promise.all([
        loadImage("/logo-icon.png"),
        loadImage(QR_URL),
      ])

      // Soft hospice wash
      const grad = ctx.createLinearGradient(0, 0, width, height)
      grad.addColorStop(0, "#eef3f0")
      grad.addColorStop(0.55, "#f7faf8")
      grad.addColorStop(1, "#d4e6cb")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Outer frame
      ctx.strokeStyle = "#1a365d"
      ctx.lineWidth = 10
      ctx.strokeRect(48, 40, width - 96, height - 80)

      // Inner hairline
      ctx.lineWidth = 2
      ctx.strokeStyle = "#5f9448"
      ctx.strokeRect(72, 64, width - 144, height - 128)

      // Logo
      ctx.drawImage(logo, 120, 100, 140, 140)

      ctx.fillStyle = "#5f9448"
      ctx.font = "600 26px IBM Plex Mono, monospace"
      ctx.textAlign = "left"
      ctx.fillText("ST JOE'S COMPUTER HOSPICE", 290, 150)
      ctx.fillStyle = "#8a5a2b"
      ctx.font = "500 20px IBM Plex Mono, monospace"
      ctx.fillText("FORM DNR-404  ·  COMFORT CARE ONLY", 290, 190)

      ctx.fillStyle = "#1a365d"
      ctx.font = "700 84px Fraunces, Georgia, serif"
      ctx.textAlign = "center"
      ctx.fillText("Do Not Resuscitate", width / 2, 340)

      ctx.fillStyle = "#4a5d73"
      ctx.font = "400 30px IBM Plex Sans, sans-serif"
      wrapText(
        ctx,
        "Comfort care only. No forced reboots. No “have you tried turning it off and on again.”",
        width / 2,
        400,
        1200,
        40
      )

      ctx.fillStyle = "#1a365d"
      ctx.font = "600 36px IBM Plex Sans, sans-serif"
      wrapText(
        ctx,
        `This certifies that ${device} is hereby admitted to palliative care.`,
        width / 2,
        520,
        1300,
        48
      )

      ctx.textAlign = "left"
      ctx.fillStyle = "#4a5d73"
      ctx.font = "400 26px IBM Plex Sans, sans-serif"
      const rules = [
        "• No heroic last-minute Windows Updates",
        "• No third-party “PC cleaner” rituals",
        "• Fans may spin gently until the power LED fades",
        "• Final SMART reading optional; tissues provided",
      ]
      rules.forEach((rule, i) => {
        ctx.fillText(rule, 160, 640 + i * 42)
      })

      ctx.fillStyle = "#1a365d"
      ctx.font = "500 24px IBM Plex Sans, sans-serif"
      ctx.fillText(`Issued ${issued}`, 160, 840)
      ctx.fillText(`Patient: ${device}`, 160, 880)
      ctx.fillText(`Authorized by: ${signed}`, 160, 920)
      ctx.fillStyle = "#8a5a2b"
      ctx.font = "600 22px IBM Plex Mono, monospace"
      ctx.fillText("sorry your time is up", 160, 970)

      // QR block (bottom right) — screensaver-friendly “scan for more info”
      const qrSize = 200
      const qrX = width - 160 - qrSize
      const qrY = height - 160 - qrSize - 40
      ctx.fillStyle = "#f7faf8"
      ctx.fillRect(qrX - 16, qrY - 52, qrSize + 32, qrSize + 88)
      ctx.strokeStyle = "#1a365d"
      ctx.lineWidth = 3
      ctx.strokeRect(qrX - 16, qrY - 52, qrSize + 32, qrSize + 88)
      ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)
      ctx.fillStyle = "#1a365d"
      ctx.font = "600 18px IBM Plex Mono, monospace"
      ctx.textAlign = "center"
      ctx.fillText("MORE INFO", qrX + qrSize / 2, qrY - 18)
      ctx.font = "500 16px IBM Plex Mono, monospace"
      ctx.fillStyle = "#5f9448"
      ctx.fillText("stjoeshospice.com", qrX + qrSize / 2, qrY + qrSize + 24)

      const a = document.createElement("a")
      const slug = device.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "device"
      a.href = canvas.toDataURL("image/png")
      a.download = `st-joes-dnr-${slug}-1920x1080.png`
      a.click()
    } catch (err) {
      console.error(err)
      alert("Couldn’t build the screensaver image. Try again in a moment.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
      <div className="no-print mb-8 grid gap-4 sm:grid-cols-2">
        <label className="block text-left">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Patient / device
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 text-ink outline-none focus:border-accent"
            placeholder="ThinkPad T420"
          />
        </label>
        <label className="block text-left">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Signed by
          </span>
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 text-ink outline-none focus:border-accent"
            placeholder="Your name"
          />
        </label>
      </div>

      <div className="no-print mb-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={downloadScreensaver}
          disabled={busy}
          className="inline-flex items-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {busy ? "Rendering…" : "Download screensaver (1920×1080)"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center rounded-full border border-line bg-card px-7 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition hover:border-accent"
        >
          Print / Save as PDF
        </button>
      </div>
      <p className="no-print mb-8 text-center font-mono text-xs text-muted">
        PNG wallpaper / screensaver image with logo + QR to stjoeshospice.com
      </p>

      <article className="dnr-sheet rounded-[28px] border-2 border-ink bg-card p-8 shadow-[0_20px_50px_rgba(26,54,93,0.12)] sm:p-12">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-icon.png"
              alt="ST Joe's Computer Hospice"
              width={72}
              height={72}
              className="h-16 w-16"
            />
            <div className="text-left">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-warn">
                Form DNR-404
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                ST Joe&apos;s Computer Hospice
              </p>
            </div>
          </div>
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={QR_URL}
              alt="QR code to stjoeshospice.com"
              width={112}
              height={112}
              className="mx-auto h-28 w-28 rounded-lg border border-line bg-bg p-1"
            />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted">
              Scan for more info
            </p>
          </div>
        </div>

        <h2 className="mt-8 text-center font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Do Not Resuscitate
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted">
          Comfort care only. No forced reboots. No “have you tried turning it off and on again.”
        </p>

        <div className="mt-10 space-y-6 text-left">
          <p className="text-lg leading-relaxed text-ink">
            This certifies that <strong>{device}</strong> is hereby admitted to palliative care at ST
            Joe&apos;s Computer Hospice.
          </p>
          <ul className="space-y-3 text-muted">
            <li>• No heroic last-minute Windows Updates</li>
            <li>• No third-party “PC cleaner” rituals</li>
            <li>• Fans may spin gently until the power LED fades</li>
            <li>• Final SMART reading optional; tissues provided</li>
          </ul>
          <p className="text-muted">
            Issued {issued}. Witnessed by Fr. Joe, Staff Tech-Priest. Sorry your time is up.
          </p>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Patient</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
              {device}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Authorized by</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
              {signed}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
