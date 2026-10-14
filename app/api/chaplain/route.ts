import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { FR_JOE_SYSTEM, frJoeFallback, parseFrJoeOutput, type ChatTurn } from "@/lib/fr-joe"

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
    // Strip prior GUIDE lines from history so the model doesn't mimic UI chrome mid-thread
    const stripped = content.replace(/\n?GUIDE:.*$/i, "").trim()
    if (!stripped) continue
    out.push({ role, content: stripped })
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
    return Response.json({ error: "Say something to ST Joe's AI first." }, { status: 400 })
  }

  const key = process.env.OPENAI_API_KEY?.trim()
  if (!key) {
    const fallback = frJoeFallback(lastUser.content, turns.length)
    return Response.json({ ...fallback, source: "chapel-notes" })
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-6-luna"),
      system: FR_JOE_SYSTEM,
      messages: turns.map((t) => ({ role: t.role, content: t.content })),
      temperature: 0.85,
      maxOutputTokens: 260,
    })

    const parsed = parseFrJoeOutput(text || "")
    if (!parsed.text || parsed.text.length < 2) {
      return Response.json({ ...frJoeFallback(lastUser.content, turns.length), source: "chapel-notes" })
    }

    return Response.json({
      text: parsed.text,
      guide: parsed.guide,
      source: "fr-joe",
    })
  } catch (error) {
    console.error("chaplain AI failed", error)
    return Response.json({ ...frJoeFallback(lastUser.content, turns.length), source: "chapel-notes" })
  }
}
