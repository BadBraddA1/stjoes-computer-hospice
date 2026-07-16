"use client"

import { ChaplainWidget } from "@/components/chaplain-chat"
import { IdleBattery } from "@/components/idle-battery"

/** Fixed chrome shared across the site (help chat + ambient battery). */
export function SiteWidgets() {
  return (
    <>
      <IdleBattery />
      <ChaplainWidget />
    </>
  )
}
