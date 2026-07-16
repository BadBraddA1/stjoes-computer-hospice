"use client"

import { useState } from "react"

export function ShareButtons({
  url,
  title,
}: {
  url: string
  title: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      prompt("Copy link:", url)
    }
  }

  async function nativeShare() {
    if (!navigator.share) {
      await copy()
      return
    }
    try {
      await navigator.share({ title, url, text: title })
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        onClick={copy}
        className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={nativeShare}
        className="inline-flex rounded-full border border-line bg-card px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition hover:border-accent"
      >
        Share…
      </button>
    </div>
  )
}
