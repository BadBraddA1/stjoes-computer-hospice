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

One-page hospice parody: continuum of care, Head of Hospice Care portrait, patient board, visiting hours, and an embedded “happy costermer” video that autoplays (muted — browsers won’t unmute without a click). No email admit button. Not a real hospital.

OG / Twitter preview (`app/opengraph-image.jpg`) shows the Head of Hospice Care portrait with brand colors — same pattern as the LECYC sites.

Footer uses the standard BraddCorp line: “Powered By BraddCorp © YEAR. All Rights Reserved.” → https://braddcorp.com

## Logos & portraits

In `public/`:

| File | Tagline |
| --- | --- |
| `logo.jpg` / `logo-b.jpg` | **Primary** — “sorry your time is up” |
| `logo-a.jpg` | “We bring new life to your technology.” |
| `logo-c.jpg` | Meramec edition |
| `logo-icon.png` | Icon crop for favicon / footer |
| `head-of-care.png` | Circular portrait — Head of Hospice Care (headset optional, empathy required) |
