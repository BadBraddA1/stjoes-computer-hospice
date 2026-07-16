import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { FR_JOE_SYSTEM, frJoeFallback, type ChatTurn } from "@/lib/fr-joe"

export const runtime = "nodejs"
export const maxDuration = 30

type Incoming = {
  messages?: { role: "you" | "chaplain" | "user" | "assistant"; text?: string; content?: string }[]
}

function normalize(messages: Incoming["messages"]): ChatTurn[] {
  if (!Array.isArray(messages)) return []
  const out: ChatTurn[] = []
  for (const m of messages.slice(-16)) {
    const content = String(m.content ?? m.text ?? "")
      .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "")
      .trim()
      .slice(0, 500)
    if (!content) continue
    const role =
      m.role === "chaplain" || m.role === "assistant"
        ? "assistant"
        : m.role === "you" || m.role === "user"
          ? "user"
          : null
    if (!role) continue
    out.push({ role, content })
  }
  return out
}

export async function POST(request: Request) {
  let body: Incoming
  try {
    body = (await request.json()) as Incoming
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const turns = normalize(body.messages)
  const lastUser = [...turns].reverse().find((t) => t.role === "user")
  if (!lastUser) {
    return Response.json({ error: "Say something to Fr. Joe first." }, { status: 400 })
  }

  const key = process.env.OPENAI_API_KEY?.trim()
  if (!key) {
    return Response.json({
      text: frJoeFallback(lastUser.content, turns.length),
      source: "chapel-notes",
    })
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: FR_JOE_SYSTEM,
      messages: turns.map((t) => ({ role: t.role, content: t.content })),
      temperature: 0.9,
      maxOutputTokens: 180,
    })

    const cleaned = String(text || "")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .trim()

    return Response.json({
      text: cleaned || frJoeFallback(lastUser.content, turns.length),
      source: "fr-joe",
    })
  } catch (error) {
    console.error("chaplain AI failed", error)
    return Response.json({
      text: frJoeFallback(lastUser.content, turns.length),
      source: "chapel-notes",
    })
  }
}
