import type { Metadata } from "next"
import { GiftShop } from "@/components/gift-shop"
import { AmenityPageShell } from "@/lib/page-shell"

export const metadata: Metadata = {
  title: "Gift Shop | ST Joe's Computer Hospice",
  description: "USB urns, BSOD mugs, Care+ memberships. Checkout always fails spiritually.",
}

export default function GiftShopPage() {
  return (
    <AmenityPageShell
      ticker={["gift shop", "Care+ unavailable", "inventory spiritually depleted"]}
      kicker="Retail therapy"
      title="Gift shop"
      copy="Fill a cart. Fail at checkout. Leave with emotional merch you never received."
      excludeHref="/gift-shop"
    >
      <GiftShop />
    </AmenityPageShell>
  )
}
