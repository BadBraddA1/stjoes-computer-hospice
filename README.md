# ST Joe's Computer Hospice

Joke / meme site for **[stjoeshospice.com](https://stjoeshospice.com)** — comfort care for dying machines.

## Local

```bash
pnpm install
pnpm dev
```

## Deploy

Vercel project: **stjoes-computer-hospice** (GitHub linked). Domains already attached:

- `stjoeshospice.com` → production
- `www.stjoeshospice.com` → 308 → apex

### DNS (Cloudflare registrar)

Nameservers are still on Cloudflare (`erin` / `eugene`). Until DNS points at Vercel the public hostname won’t resolve.

**Option A — DNS records (keep Cloudflare NS)** — DNS only / grey cloud:

| Type | Name | Content |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

**Option B — Vercel nameservers** — in Cloudflare → Domain Registration → stjoeshospice.com → update NS to:

- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

API note: the local Cloudflare token can read existing zones but can’t create `stjoeshospice.com` or edit its DNS yet — finish one of the options above (or drop a Zone.DNS Edit token) and it goes live.

## What’s here

Hospice parody site with:

- Continuum of care, Head of Hospice Care portrait + bedside video (`public/head-of-care.mp4`, click to play)
- Patient board, visiting hours, happy costermer YouTube bit
- Footer **grief sessions** view counter (once per tab session via CounterAPI)
- **Patient amenities** (all except a soundboard):

| Route | What it does |
| --- | --- |
| `/is-it-time` | Yes/no flowchart → admit / vigil / not yet |
| `/grief` | Five stages quiz (Denial → Acceptance) |
| `/dnr` | Printable Do Not Resuscitate certificate |
| `/memorial` | Memorial wall (seeded + notes saved in this browser) |
| `/vigil` | Shareable power-LED vigil (`?for=MachineName`) — **dynamic Open Graph** preview |
| `/condolences` | Condolence card (`?machine=&from=&line=`) — **dynamic Open Graph** + PNG download |
| `/hiring` | Joe 3 hiring quiz |

Amenity **cards** show on the home page (Patient amenities / Campus directory) and again as “More wards” on each amenity page — not footer-only.

### Dynamic Open Graph

- Vigil share: `/vigil?for=ThinkPad` → `/api/og/vigil?for=ThinkPad`
- Condolence share: `/condolences?machine=OptiPlex&from=Brad&line=0` → `/api/og/condolences?...`

Previews are generated with `next/og` (1200×630) so iMessage / Slack / Twitter get the fun card, not a generic homepage image.

### We’re Hiring (`/hiring`)

Playful dead-end careers page. One intake question: **Is your name Joe 3?**

- **Yes** → ~30 unique rejections (e.g. “Nice try. You don’t look like Joe 3.”).
- **No** → ~30 unique wise-exit lines (e.g. “Good. You don’t want to work here.”).

“Try again” rotates punchlines without immediate repeats. Linked from the home hero and footer. Still not a real job.

OG / Twitter preview (`app/opengraph-image.jpg`) shows the Head of Hospice Care portrait with brand colors — same pattern as the LECYC sites.

Footer uses the standard BraddCorp line: “Powered By BraddCorp © YEAR. All Rights Reserved.” → https://braddcorp.com

## Fake biz cards

Print files live in [`print/biz-cards/`](print/biz-cards/) — open **`st-joes-biz-cards-letter.pdf`** for a 10-up Letter sheet (front + back with QR to the site). Details in that folder’s README.

## Logos & portraits

In `public/`:

| File | Tagline |
| --- | --- |
| `logo.jpg` / `logo-b.jpg` | **Primary** — “sorry your time is up” |
| `logo-a.jpg` | “We bring new life to your technology.” |
| `logo-c.jpg` | Meramec edition |
| `logo-icon.png` | Icon crop for favicon / footer |
| `head-of-care.png` | Circular portrait — Head of Hospice Care (headset optional, empathy required) |
| `head-of-care.mp4` | Short bedside address (Hedra) — shown beside the portrait on the home page |
