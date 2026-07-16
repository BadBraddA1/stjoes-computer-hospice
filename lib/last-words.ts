export const SEED_LAST_WORDS = [
  "RIP Floppy — you spun so we didn't have to",
  "OptiPlex entered the blue light. Amen.",
  "ThinkPad battery has left the chat",
  "iMac (2012): spinner of eternal contemplation",
  "Gateway saw God. God was a progress bar.",
  "Final SMART status: sad but dignified",
  "Windows Update finished… emotionally",
] as const

const STORAGE_KEY = "stjoe-last-words"

export type LastWord = {
  id: string
  text: string
  at: number
}

export function loadLastWords(): LastWord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as LastWord[]
    return Array.isArray(parsed) ? parsed.slice(0, 30) : []
  } catch {
    return []
  }
}

export function saveLastWord(text: string): LastWord {
  const entry: LastWord = {
    id: `lw-${Date.now()}`,
    text: text.trim().slice(0, 80),
    at: Date.now(),
  }
  const next = [entry, ...loadLastWords()].slice(0, 30)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent("stjoe:last-words"))
  return entry
}

export function allTickerLines(extra: LastWord[] = []): string[] {
  return [...extra.map((w) => w.text), ...SEED_LAST_WORDS]
}
