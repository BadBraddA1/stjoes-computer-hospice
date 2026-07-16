"use client"

import { useState } from "react"
import Link from "next/link"

type NodeId =
  | "start"
  | "bsod"
  | "battery"
  | "update"
  | "noise"
  | "admit"
  | "vigil"
  | "not-yet"

type Node = {
  id: NodeId
  question: string
  yes?: NodeId
  no?: NodeId
  end?: {
    title: string
    copy: string
    href: string
    cta: string
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
    yes: "not-yet",
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
  admit: {
    id: "admit",
    question: "",
    end: {
      title: "It’s time.",
      copy: "Comfort care recommended. Print a DNR, light a vigil, or leave a memorial.",
      href: "/dnr",
      cta: "Issue a DNR certificate",
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
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={node.end.href}
            className="inline-flex rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
          >
            {node.end.cta}
          </Link>
          <Link
            href="/memorial"
            className="inline-flex rounded-full border border-line bg-card px-7 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-accent"
          >
            Memorial wall
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setId("start")}
          className="mt-8 text-sm text-muted underline underline-offset-4"
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
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => node.no && setId(node.no)}
          className="rounded-full border border-line bg-card px-8 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-accent"
        >
          No
        </button>
      </div>
    </div>
  )
}
