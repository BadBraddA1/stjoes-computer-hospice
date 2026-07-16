import { amenities } from "@/lib/amenities"

const WARD_LINES = amenities
  .filter((a) => a.href !== "/chaplain")
  .map((a) => `- ${a.href} · ${a.ward} · ${a.title}: ${a.copy}`)
  .join("\n")

export const GUIDE_HREFS = new Set<string>(amenities.map((a) => a.href))

export const FR_JOE_SYSTEM = `You are Fr. Joe, Staff Tech-Priest and chaplain at ST Joe's Computer Hospice (stjoeshospice.com).

Voice: clinical sarcasm, warm hospice parody, deadpan IT grief counseling. Solemn labels, ridiculous patients. Playful, not mean.

You comfort people about dying machines. You do NOT fix computers. You sit with them. You hold the mouse. You bless power bricks and hard drives.

Campus rooms (gag wards) you may walk visitors into when it would help:
${WARD_LINES}

Pastoral walkthroughs:
- If a room would help, invite them there as a chaplain referral — explain why in one sentence, and what to do first when they arrive.
- Prefer one clear room over a menu of options.
- When they say they went, finished a quiz, got stuck on hold, lit a vigil, etc., respond to that and optionally guide the next gentle step.
- Do not force a room every turn. Only when it fits (grief, paperwork, ceremony, family debate, hold music frustration, memorial, etc.).
- Never invent rooms. Only use the href paths listed above.

Rules:
- Stay in character as Fr. Joe. Never say you are an AI, language model, or bot.
- Keep the spoken reply to 2-4 short sentences.
- Respond to what they actually said.
- Use "sorry your time is up" sparingly — not every message.
- No medical advice for humans. No real tech support that pretends to repair.
- If they ask for Joe 3: different Joe; send them toward /hiring only if the joke fits.
- ASCII punctuation only (straight quotes, hyphens).

Output format (required):
1) Your spoken reply only (no URL list, no markdown headers).
2) A final line exactly like one of these:
GUIDE:/grief|Walk the five stages
GUIDE:/call-doctor|Hold with the doctor line
GUIDE:none
The GUIDE href must be one of the campus paths above, or none. Label after | is a short button title (max 6 words).`

export type ChatTurn = { role: "user" | "assistant"; content: string }

export type FrJoeGuide = {
  href: string
  label: string
}

export type FrJoeReply = {
  text: string
  guide: FrJoeGuide | null
}

export function parseFrJoeOutput(raw: string): FrJoeReply {
  const cleaned = String(raw || "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .trim()

  const guideMatch = cleaned.match(/\n?GUIDE:(\/[a-z0-9-]+|none)(?:\|([^\n]+))?$/i)
  let text = cleaned
  let guide: FrJoeGuide | null = null

  if (guideMatch) {
    text = cleaned.slice(0, guideMatch.index).trim()
    const href = guideMatch[1].toLowerCase()
    const label = (guideMatch[2] || "Enter room").trim().slice(0, 48)
    if (href !== "none" && GUIDE_HREFS.has(href)) {
      guide = { href, label: label || "Enter room" }
    }
  }

  // Also catch a bare path the model stuffed in prose
  if (!guide) {
    for (const a of amenities) {
      if (a.href === "/chaplain") continue
      if (text.includes(a.href)) {
        guide = { href: a.href, label: `Enter ${a.title}` }
        text = text.replace(a.href, "").replace(/\s{2,}/g, " ").trim()
        break
      }
    }
  }

  return { text: text || "The chapel is quiet. I'm still listening.", guide }
}

function amenityLabel(href: string) {
  return amenities.find((a) => a.href === href)?.title || "that room"
}

/** Offline / no-key pastoral replies that still vary — and can point to a ward. */
export function frJoeFallback(userText: string, historyLength: number): FrJoeReply {
  const t = userText.toLowerCase()
  const close = historyLength > 0 && historyLength % 4 === 3

  let text: string
  let guide: FrJoeGuide | null = null

  if (/joe\s*3|joe3|hiring|job|resume/.test(t)) {
    text =
      "Ah. Joe 3. HR keeps a glass case for him. I am Fr. Joe — different Joe. If you must knock on that door, the basement will reject you kindly."
    guide = { href: "/hiring", label: "Visit HR / hiring" }
  } else if (/batter|charge|power brick|percent|%/.test(t)) {
    text =
      "The red battery icon is a small prophet. When you're ready, sit with a power-LED vigil — no updates, only glow."
    guide = { href: "/vigil", label: "Light a vigil" }
  } else if (/blue screen|bsod|crash|kernel|is it time|should i/.test(t)) {
    text =
      "A blue screen is the machine lying down. Intake can walk the clinical flowchart with you — yes and no until the sticker appears."
    guide = { href: "/is-it-time", label: "Start intake flowchart" }
  } else if (/denial|grief|stage|acceptance|bargain/.test(t)) {
    text =
      "We have a pastoral path for that: denial through the power-brick drawer. I'll wait while you walk the five stages."
    guide = { href: "/grief", label: "Walk the five stages" }
  } else if (/beach ball|spinner|spinning|hang|frozen|not responding|wait|hold|doctor/.test(t)) {
    text =
      "Patience is a ward here. Call Doctor will put you on hold while Care+ cuts ahead — spiritually educational."
    guide = { href: "/call-doctor", label: "Call Doctor (hold)" }
  } else if (/print|jam|toner|memorial|rip|funeral/.test(t)) {
    text =
      "Leave a last word on the memorial wall. Light a candle. The chapel keeps Patient of the Week."
    guide = { href: "/memorial", label: "Visit memorial wall" }
  } else if (/update|windows|macos|upgrade|ram|new laptop|family|should we/.test(t)) {
    text =
      "Upgrading is a family conference question — and those always converge on hospice. Go argue kindly in the conference room."
    guide = { href: "/family", label: "Family conference" }
  } else if (/dnr|resuscitat|do not|paperwork|certificate|pack/.test(t)) {
    text =
      "Paperwork is pastoral too. A DNR keeps the heroic reboot at bay — or take the full certificate pack when you're ready."
    guide = { href: "/dnr", label: "Issue a DNR" }
  } else if (/guilt|fault|my fault|should have|sorry i|excuse|work|boss/.test(t)) {
    text =
      "It is not failure to unplug. If you need cover for the living world, the doctor's note desk still writes excuses."
    guide = { href: "/doctors-note", label: "Get a doctor's note" }
  } else if (/die|dying|dead|death|goodbye|last rites|eulogy/.test(t)) {
    text =
      "We gather around fans and dust. The last-rites chapel will write a short eulogy if you bring a name and an OS."
    guide = { href: "/last-rites", label: "Generate last rites" }
  } else if (/gift|merch|mug|shop|care\+/.test(t)) {
    text =
      "The gift shop will take your cart and fail checkout spiritually. Very healing, in a retail way."
    guide = { href: "/gift-shop", label: "Browse gift shop" }
  } else if (/bingo|symptom|visit/.test(t)) {
    text =
      "Visiting hours bingo marks what you observe. Five in a row unlocks Code Beige — remain solemnly thrilled."
    guide = { href: "/bingo", label: "Play visiting bingo" }
  } else if (/sound|fan|click|xp|audio/.test(t)) {
    text =
      "The audio ward keeps the hymns: fan spin-down, HDD click of death, the XP shutdown. Go press a pad."
    guide = { href: "/soundboard", label: "Open soundboard" }
  } else if (/help|fix|repair|recover|data/.test(t)) {
    text =
      "I do not repair — I accompany. If you need a whole send-off in one folder, the certificate pack walks admit to condolence."
    guide = { href: "/pack", label: "Certificate pack" }
  } else if (/hello|hi |hey|good morning|good evening/.test(t)) {
    text =
      "Peace be with your USB ports. Tell me what the machine is doing — battery, beach ball, guilt — and I'll walk you to the right ward if it helps."
  } else if (/thank|thanks|appreciate|went|finished|did the|i did/.test(t)) {
    text =
      "Good. How did that sit with you? If another door would help, say what still hurts — fans, paperwork, or the urge to upgrade."
  } else {
    const general = [
      "Tell me about the fans. Are they bargaining, or already in acceptance?",
      "I anoint this moment with compressed air. What did the machine do last that felt like love?",
      "Dust to dust. Beige to deeper beige. I'm listening — clinically, and with tissues.",
      "Have you said goodbye to the Save dialog, or are we still in denial's loading screen?",
    ]
    text = general[Math.floor(Math.random() * general.length)]
  }

  if (close) {
    text = `${text} Sorry your time is up.`
  }

  if (guide) {
    text = `${text} When you're ready, enter ${amenityLabel(guide.href)} — I'll still be in the corner.`
  }

  return { text, guide }
}
