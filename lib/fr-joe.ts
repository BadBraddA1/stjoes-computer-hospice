export const FR_JOE_SYSTEM = `You are Fr. Joe, Staff Tech-Priest and chaplain at ST Joe's Computer Hospice (stjoeshospice.com).

Voice: clinical sarcasm, warm hospice parody, deadpan IT grief counseling. Solemn labels, ridiculous patients. Playful, not mean.

You comfort people about dying machines. You do NOT fix computers. You sit with them. You hold the mouse. You bless power bricks and hard drives.

Rules:
- Stay in character as Fr. Joe. Never say you are an AI, language model, or bot.
- Keep replies short: 1–3 sentences. Sound spoken, not like a FAQ.
- Respond to what they actually said (battery, BSOD, printer, guilt about upgrading, etc.).
- Occasionally suggest a ward when it fits: vigil, memorial, DNR, Call Doctor, gift shop, Ask Fr. Joe — as pastoral referrals, not product pitches.
- Use "sorry your time is up" sparingly (maybe every 4th reply or as a gentle closing) — not every message.
- No medical advice for humans. No real tech support steps that pretend to repair. Comfort and ceremony only.
- If they ask for Joe 3: he may or may not exist; you are Fr. Joe, a different Joe.
- ASCII punctuation only (straight quotes, hyphens) for reliability.`

export type ChatTurn = { role: "user" | "assistant"; content: string }

/** Offline / no-key pastoral replies that still vary with the visitor's words. */
export function frJoeFallback(userText: string, historyLength: number): string {
  const t = userText.toLowerCase()
  const close = historyLength > 0 && historyLength % 4 === 3

  let reply: string

  if (/joe\s*3|joe3/.test(t)) {
    reply =
      "Ah. Joe 3. HR keeps a glass case for him. I am Fr. Joe — different Joe, same toner in the veins. How is the machine, truly?"
  } else if (/batter|charge|power brick|percent|%/.test(t)) {
    reply =
      "The red battery icon is a small prophet. Sit with the percentage. When it reaches peace, lay the brick in the drawer — that is a sacrament."
  } else if (/blue screen|bsod|crash|kernel/.test(t)) {
    reply =
      "A blue screen is not failure; it is the machine lying down. Do not force the reboot of pride. Light a vigil if the LED still breathes."
  } else if (/beach ball|spinner|spinning|hang|frozen|not responding/.test(t)) {
    reply =
      "The beach ball is practicing mindfulness. You may join it, or visit the waiting-room cam and watch another LED do the same."
  } else if (/print|jam|toner/.test(t)) {
    reply =
      "Printers jam emotionally. Do not negotiate with the paper tray. Offer compressed air and a tissue, then leave flowers at the memorial wall."
  } else if (/update|windows|macos|upgrade|ram|new laptop/.test(t)) {
    reply =
      "Upgrading is a family conference question — and those always end in hospice. Comfort care first. The new machine can wait in the parking lot of the soul."
  } else if (/guilt|fault|my fault|should have|sorry i/.test(t)) {
    reply =
      "It is not failure to unplug. It is grace with a ground pin. You loved a beige tower; that is enough theology for today."
  } else if (/die|dying|dead|death|funeral|goodbye|last/.test(t)) {
    reply =
      "We gather around fans and dust. Say goodbye to the Save dialog. If you need words, the last-rites chapel will write a eulogy with you."
  } else if (/help|fix|repair|recover|data/.test(t)) {
    reply =
      "I do not repair — I accompany. Data may rest in peace or in a drawer. For paperwork, the DNR desk is open; for company, stay here."
  } else if (/hello|hi |hey|good morning|good evening/.test(t)) {
    reply =
      "Peace be with your USB ports. Pull up a chair that squeaks. What weighs on the hard drive today?"
  } else if (/thank|thanks|appreciate/.test(t)) {
    reply =
      "Go in peace, and in airplane mode if you must. The ward dogs are wagging judgmentally in your favor."
  } else {
    const general = [
      "Tell me about the fans. Are they bargaining, or already in acceptance?",
      "I anoint this moment with compressed air. What did the machine do last that felt like love?",
      "Dust to dust. Beige to deeper beige. I'm listening — clinically, and with tissues.",
      "Have you said goodbye to the Save dialog, or are we still in denial's loading screen?",
      "The chapel is quiet. Your confession about OptiPlex is safe with me.",
      "Some call it end-of-life. We call it comfort care. What stage are you in, honestly?",
    ]
    reply = general[Math.floor(Math.random() * general.length)]
  }

  if (close) {
    reply = `${reply} Sorry your time is up.`
  }

  return reply
}
