import { jsPDF } from "jspdf"

const INK = "#1a365d"
const ACCENT = "#5f9448"
const MUTED = "#4a5d73"
const WARN = "#8a5a2b"
const BG = "#eef3f0"
const CARD = "#f7faf8"
const LINE = "#c5d0c9"

export type CertificateDoc = {
  kind: "admission" | "dnr" | "discharge" | "condolence" | "doctors-note" | "cover"
  machine: string
  owner?: string
  caseId?: string
  extra?: string
  issued?: string
}

function slug(name: string) {
  return name.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "").slice(0, 28) || "machine"
}

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res = await fetch("/logo-icon.png")
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error("logo read failed"))
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

function issuedToday() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function drawFrame(doc: jsPDF, pageW: number, pageH: number) {
  doc.setFillColor(BG)
  doc.rect(0, 0, pageW, pageH, "F")
  doc.setDrawColor(INK)
  doc.setLineWidth(2.2)
  doc.rect(28, 28, pageW - 56, pageH - 56)
  doc.setDrawColor(ACCENT)
  doc.setLineWidth(0.8)
  doc.rect(36, 36, pageW - 72, pageH - 72)
}

function drawHeader(
  doc: jsPDF,
  pageW: number,
  logo: string | null,
  formCode: string,
  subtitle: string
) {
  if (logo) {
    try {
      doc.addImage(logo, "PNG", 48, 48, 36, 36)
    } catch {
      /* ignore */
    }
  }
  doc.setTextColor(WARN)
  doc.setFont("courier", "bold")
  doc.setFontSize(9)
  doc.text(formCode, logo ? 92 : 48, 58)

  doc.setTextColor(INK)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text("ST Joe's Computer Hospice", logo ? 92 : 48, 74)

  doc.setTextColor(MUTED)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text(subtitle, logo ? 92 : 48, 86)

  doc.setDrawColor(LINE)
  doc.setLineWidth(0.5)
  doc.line(48, 98, pageW - 48, 98)
}

function drawFooter(doc: jsPDF, pageW: number, pageH: number, pageLabel: string) {
  doc.setTextColor(WARN)
  doc.setFont("courier", "normal")
  doc.setFontSize(8)
  doc.text("sorry your time is up", 48, pageH - 42)
  doc.setTextColor(MUTED)
  doc.text("stjoeshospice.com", pageW - 48, pageH - 42, { align: "right" })
  doc.setFontSize(7)
  doc.text(pageLabel, pageW / 2, pageH - 42, { align: "center" })
}

function wrap(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number
) {
  const lines = doc.splitTextToSize(text, maxW) as string[]
  doc.text(lines, x, y)
  return y + lines.length * lineH
}

function drawCertificatePage(
  doc: jsPDF,
  cert: CertificateDoc,
  logo: string | null,
  pageIndex: number,
  pageCount: number
) {
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const issued = cert.issued || issuedToday()
  const machine = cert.machine || "Unnamed Device"
  const owner = cert.owner || "Next of Kin (USB)"

  drawFrame(doc, pageW, pageH)

  const titles: Record<CertificateDoc["kind"], { form: string; title: string; sub: string }> = {
    cover: {
      form: "FORM PACK-01",
      title: "Certificate Pack",
      sub: "Comfort-care paperwork bundle",
    },
    admission: {
      form: "FORM ADMIT-200",
      title: "Admission Confirmation",
      sub: "Comfort care authorized",
    },
    dnr: {
      form: "FORM DNR-404",
      title: "Do Not Resuscitate",
      sub: "No forced firmware · no heroic reboots",
    },
    discharge: {
      form: "FORM DC-200",
      title: "Discharge Papers",
      sub: "Released against medical advice",
    },
    condolence: {
      form: "FORM CARD-07",
      title: "With Sympathy",
      sub: "Condolence certificate",
    },
    "doctors-note": {
      form: "FORM EXCUSE-12",
      title: "Doctor's Note",
      sub: "Physician's excuse · ST Joe's",
    },
  }

  const meta = titles[cert.kind]
  drawHeader(doc, pageW, logo, meta.form, meta.sub)

  doc.setTextColor(INK)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(26)
  doc.text(meta.title, pageW / 2, 130, { align: "center" })

  // Patient plate
  doc.setFillColor(CARD)
  doc.setDrawColor(INK)
  doc.setLineWidth(0.6)
  doc.roundedRect(48, 148, pageW - 96, 56, 3, 3, "FD")
  doc.setFont("courier", "normal")
  doc.setFontSize(8)
  doc.setTextColor(ACCENT)
  doc.text("PATIENT / DEVICE", 60, 168)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(16)
  doc.setTextColor(INK)
  doc.text(machine, 60, 188)

  let y = 230

  if (cert.kind === "cover") {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(MUTED)
    y = wrap(
      doc,
      `Case ${cert.caseId || "GRIEF-000"} · Issued ${issued}\nNext of kin: ${owner}`,
      48,
      y,
      pageW - 96,
      16
    )
    y += 12
    doc.setTextColor(INK)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("Included certificates", 48, y)
    y += 18
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    const items = [
      "1. Admission — comfort care authorized",
      "2. DNR — do not resuscitate / do not update",
      "3. Discharge — against medical advice",
      "4. Condolences — for the living, about the machine",
    ]
    for (const line of items) {
      doc.text(line, 56, y)
      y += 18
    }
    y += 8
    doc.setTextColor(MUTED)
    y = wrap(
      doc,
      "This pack is ceremonial paperwork from ST Joe's Computer Hospice. Not a warranty. Not a repair order. Definitely a bit.",
      48,
      y,
      pageW - 96,
      14
    )
  }

  if (cert.kind === "admission") {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(INK)
    y = wrap(
      doc,
      `${machine} is hereby admitted for comfort care under case ${cert.caseId || "GRIEF-000"}.`,
      48,
      y,
      pageW - 96,
      16
    )
    y += 10
    doc.setTextColor(MUTED)
    y = wrap(
      doc,
      "Visiting hours apply. No forced firmware. Tissue box provided. Retain this number for the ward board.",
      48,
      y,
      pageW - 96,
      15
    )
    y += 20
    doc.setFont("courier", "normal")
    doc.setFontSize(10)
    doc.setTextColor(ACCENT)
    doc.text(`CASE ID: ${cert.caseId || "GRIEF-000"}`, 48, y)
    y += 16
    doc.setTextColor(MUTED)
    doc.text(`Next of kin: ${owner}`, 48, y)
    y += 14
    doc.text(`Issued: ${issued}`, 48, y)
  }

  if (cert.kind === "dnr") {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(13)
    doc.setTextColor(INK)
    y = wrap(
      doc,
      "DO NOT RESUSCITATE. DO NOT UPDATE. DO NOT ARGUE WITH THE POWER BUTTON.",
      48,
      y,
      pageW - 96,
      16
    )
    y += 12
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(MUTED)
    y = wrap(
      doc,
      `Patient ${machine} shall receive comfort care only. Heroic troubleshooting is declined. Signed by ${owner}.`,
      48,
      y,
      pageW - 96,
      15
    )
    y += 28
    doc.setDrawColor(INK)
    doc.line(48, y, 260, y)
    doc.setFontSize(9)
    doc.text(`Signature · ${owner}`, 48, y + 12)
    doc.line(300, y, pageW - 48, y)
    doc.text(`Date · ${issued}`, 300, y + 12)
  }

  if (cert.kind === "discharge") {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(INK)
    y = wrap(
      doc,
      `Patient ${machine} is hereby released.`,
      48,
      y,
      pageW - 96,
      16
    )
    y += 10
    doc.setFont("helvetica", "bold")
    doc.text(`Disposition: ${cert.extra || "Discharged against medical advice"}`, 48, y)
    y += 20
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(MUTED)
    const bullets = [
      "Boot status: spiritually unresolved",
      "Follow-up: none. We already said goodbye.",
      "Return precautions: if it powers on, pretend you imagined it",
    ]
    for (const b of bullets) {
      doc.text(`•  ${b}`, 52, y)
      y += 16
    }
    y += 10
    doc.text(`Issued ${issued} · Signed context: ${owner}`, 48, y)
  }

  if (cert.kind === "condolence") {
    doc.setFont("helvetica", "italic")
    doc.setFontSize(14)
    doc.setTextColor(INK)
    y = wrap(
      doc,
      `We're sorry for your ${machine}.`,
      48,
      y,
      pageW - 96,
      18
    )
    y += 14
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(MUTED)
    y = wrap(
      doc,
      cert.extra ||
        "May its fans spin gently in memory. May its ports never again meet the wrong dongle.",
      48,
      y,
      pageW - 96,
      16
    )
    y += 24
    doc.setFont("helvetica", "bold")
    doc.setTextColor(INK)
    doc.text(`From ${owner}`, 48, y)
    y += 16
    doc.setFont("courier", "normal")
    doc.setFontSize(10)
    doc.setTextColor(WARN)
    doc.text("sorry your time is up", 48, y)
  }

  if (cert.kind === "doctors-note") {
    const days = cert.extra || "several"
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(INK)
    y = wrap(
      doc,
      `Please excuse ${machine} from work, school, Zoom, and heroic troubleshooting for ${days} day(s).`,
      48,
      y,
      pageW - 96,
      16
    )
    y += 12
    doc.setTextColor(MUTED)
    y = wrap(
      doc,
      "Diagnosis: terminal Windows Update / existential battery warning. Patient requires comfort care, not productivity. Recommended treatment: unplug, drawer, soft lighting.",
      48,
      y,
      pageW - 96,
      15
    )
    y += 28
    doc.setTextColor(INK)
    doc.setFont("helvetica", "bold")
    doc.text("Head of Hospice Care", 48, y)
    y += 14
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(MUTED)
    doc.text(`ST Joe's Computer Hospice · ${issued}`, 48, y)
  }

  drawFooter(doc, pageW, pageH, `Page ${pageIndex} of ${pageCount}`)
}

export async function buildStJoePdf(certs: CertificateDoc[]) {
  const doc = new jsPDF({ unit: "pt", format: "letter" })
  const logo = await loadLogoDataUrl()
  const pages = certs.length

  certs.forEach((cert, i) => {
    if (i > 0) doc.addPage()
    drawCertificatePage(doc, cert, logo, i + 1, pages)
  })

  return doc
}

export async function downloadStJoePdf(certs: CertificateDoc[], filename: string) {
  const doc = await buildStJoePdf(certs)
  doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`)
}

export function packFilename(machine: string) {
  return `st-joes-certificate-pack-${slug(machine)}.pdf`
}

export { slug as pdfSlug, issuedToday }
