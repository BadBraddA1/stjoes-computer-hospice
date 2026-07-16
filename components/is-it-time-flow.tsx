"use client"

import { useState } from "react"
import Link from "next/link"

type NodeId =
  | "start"
  | "bsod"
  | "battery"
  | "update"
  | "noise"
  | "miracle-check"
  | "admit"
  | "vigil"
  | "not-yet"
  | "miracle"
  | "bestbuy"
  | "sticker"

type Node = {
  id: NodeId
  question: string
  yes?: NodeId
  no?: NodeId
  end?: {
    title: string
    copy: string
    href?: string
    cta?: string
    code?: string
    secondaryHref?: string
    secondaryCta?: string
  }
}

const nodes: Record<NodeId, Node> = {
  start: {
    id: "start",
    question: "Has the machine shown a blue screen, black screen, or beach ball of eternal judgment?",
    yes: "bsod",
    no: "battery",
  },
  bsod: {
    id: "bsod",
    question: "Did restarting fix it for more than one emotionally significant hour?",
    yes: "miracle-check",
    no: "admit",
  },
  battery: {
    id: "battery",
    question: "Is the battery warning basically a lifestyle at this point?",
    yes: "update",
    no: "noise",
  },
  update: {
    id: "update",
    question: "Has Windows Update been “finishing” since a prior presidential administration?",
    yes: "admit",
    no: "vigil",
  },
  noise: {
    id: "noise",
    question: "Do the fans sound like a tiny motorcycle bargaining for its life?",
    yes: "admit",
    no: "not-yet",
  },
  "miracle-check": {
    id: "miracle-check",
    question: "Did it boot once, look you in the eye, and then die again out of spite?",
    yes: "miracle",
    no: "bestbuy",
  },
  admit: {
    id: "admit",
    question: "",
    end: {
      title: "It’s time.",
      copy: "Comfort care recommended. Print a DNR, light a vigil, or claim your diagnosis sticker.",
      href: "/dnr",
      cta: "Issue a DNR certificate",
      secondaryHref: "/is-it-time#sticker",
      secondaryCta: "Get ICD-PC sticker",
      code: "ICD-PC: TERMINAL",
    },
  },
  vigil: {
    id: "vigil",
    question: "",
    end: {
      title: "Transitional care",
      copy: "Not fully gone — but the LED deserves company.",
      href: "/vigil",
      cta: "Sit with the power LED",
      code: "ICD-PC: GLOW",
    },
  },
  "not-yet": {
    id: "not-yet",
    question: "",
    end: {
      title: "Not yet — somehow",
      copy: "Keep the tissues nearby. When denial thins out, the wards will be here.",
      href: "/grief",
      cta: "Walk the five stages anyway",
      code: "ICD-PC: DENIAL+",
    },
  },
  miracle: {
    id: "miracle",
    question: "",
    end: {
      title: "Miracle boot (temporary)",
      copy: "Clinically classified as a spite reboot. Enjoy the 11 minutes. Document nothing.",
      href: "/vigil",
      cta: "Light a precautionary vigil",
      code: "ICD-PC: MIRACLE",
    },
  },
  bestbuy: {
    id: "bestbuy",
    question: "",
    end: {
      title: "Best Buy shame pathway",
      copy: "You considered Geek Squad. That is a diagnosis. Return to hospice with dignity.",
      href: "/family",
      cta: "Hold a family conference",
      code: "ICD-PC: GEEKSQUAD",
    },
  },
  sticker: {
    id: "sticker",
    question: "",
    end: {
      title: "Intake sticker issued",
      copy: "Print this diagnosis code. Affix to the tower. Do not remove until acceptance.",
      code: "ICD-PC: BEACHBALL",
      href: "/pack",
      cta: "Bundle the certificate pack",
    },
  },
}

export function IsItTimeFlow() {
  const [id, setId] = useState<NodeId>("start")
  const node = nodes[id]

  if (node.end) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center sm:px-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          {node.end.title}
        </h2>
        <p className="mt-4 text-lg text-muted">{node.end.copy}</p>
        {node.end.code ? (
          <div className="mx-auto mt-8 max-w-sm rounded-2xl border-2 border-dashed border-ink bg-card px-6 py-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Diagnosis sticker</p>
            <p className="mt-2 font-mono text-2xl font-bold tracking-wide text-ink">{node.end.code}</p>
            <p className="mt-2 text-xs text-muted">ST Joe&apos;s Computer Hospice · not for food</p>
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {node.end.href && node.end.cta ? (
            <Link
              href={node.end.href}
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {node.end.cta}
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => setId("sticker")}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-7 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Print ICD-PC sticker path
          </button>
        </div>
        <button
          type="button"
          onClick={() => setId("start")}
          className="mt-8 text-sm text-muted underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Run the flowchart again
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Clinical flowchart</p>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
        {node.question}
      </h2>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => node.yes && setId(node.yes)}
          className="min-h-11 rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => node.no && setId(node.no)}
          className="min-h-11 rounded-full border border-line bg-card px-8 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          No
        </button>
      </div>
    </div>
  )
}
