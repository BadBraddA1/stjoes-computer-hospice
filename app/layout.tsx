import type { Metadata } from "next"
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"],
})

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
})

const siteUrl = "https://stjoeshospice.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ST Joe's Computer Hospice | Comfort Care for Dying Machines",
  description:
    "ST Joe's Computer Hospice — palliative care, last rites, and dignified end-of-life support for computers that just can't update anymore.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ST Joe's Computer Hospice",
    title: "ST Joe's Computer Hospice | Head of Hospice Care",
    description:
      "Meet the Head of Hospice Care. Comfort care for dying machines. Sorry your time is up.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ST Joe's Computer Hospice | Head of Hospice Care",
    description:
      "Meet the Head of Hospice Care. Comfort care for dying machines. Sorry your time is up.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
