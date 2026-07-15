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

Hospice parody site: continuum of care, Head of Hospice Care portrait **plus bedside video** (`public/head-of-care.mp4`, muted autoplay loop with controls), patient board, visiting hours, and an embedded “happy costermer” YouTube bit. No email admit button. Not a real hospital.

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
