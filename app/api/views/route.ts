import { NextRequest, NextResponse } from "next/server"

const NAMESPACE = "stjoeshospice"
const KEY = "home"
const BASE = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const bump = request.nextUrl.searchParams.get("bump") === "1"
  const url = bump ? `${BASE}/up` : `${BASE}/`

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    })
    if (!res.ok) {
      return NextResponse.json(
        { count: null, error: "counter_unavailable" },
        { status: 502 }
      )
    }
    const data = (await res.json()) as { count?: number }
    const count = typeof data.count === "number" ? data.count : null
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json(
      { count: null, error: "counter_unavailable" },
      { status: 502 }
    )
  }
}
