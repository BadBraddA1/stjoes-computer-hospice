# ST Joe's Computer Hospice

Joke / meme site for **[stjoeshospice.com](https://stjoeshospice.com)** — comfort care for dying machines.

## Local

```bash
pnpm install
pnpm dev
```

## Deploy

Vercel project: **stjoes-computer-hospice** (GitHub linked). Domains:

- `stjoeshospice.com` → production
- `www.stjoeshospice.com` → 308 → apex

## What’s here

Hospice parody site with:

- Continuum of care, Head of Hospice Care portrait + bedside video (`public/head-of-care.mp4`, click to play)
- Patient board, visiting hours, happy costermer YouTube bit
- **Lobby last words** ticker (seeded + visitor lines in localStorage)
- **Admit a device** → fake case id like `GRIEF-404` (no email)
- Random **Code Beige** toasts + occasional full-screen “Remain calm” flash
- **Lobby PA** announcements + corner **battery %** that slowly drains / dims when idle
- Easter eggs: type `joe3`, Konami, or **Ctrl+Alt+Delete** → gentle BSOD
- Biz-card QR welcome: `/?from=bizcard` (also `card`, `qr`)
- Footer **grief sessions** view counter (CounterAPI, once per tab session)

### Interactive wards (home campus + routes)

| Route | What it does |
| --- | --- |
| `/is-it-time` | Yes/no flowchart + miracle / Best Buy / ICD-PC sticker endings |
| `/grief` | Five stages quiz → shareable stage diagnosis + OG |
| `/call-doctor` | IVR menu, genre-shifting hold music, Care+ cut-ins, voicemail void |
| `/dnr` | DNR certificate — 1920×1080 screensaver PNG or print |
| `/discharge` | Discharge papers + share / OG |
| `/doctors-note` | Fake doctor’s excuse + share / OG |
| `/memorial` | Memorial wall, candles, chime, Patient of the Week |
| `/vigil` | Power-LED vigil + share / OG |
| `/condolences` | Condolence card + share / OG + PNG |
| `/last-rites` | Name + OS → eulogy + share / OG |
| `/waiting-room` | Fake lobby webcam + patient ticker |
| `/chaplain` | Scripted Fr. Joe chat (always ends “sorry your time is up”) |
| `/gift-shop` | Fake merch cart that always fails checkout |
| `/bingo` | Visiting-hours symptom bingo → Code Beige |
| `/family` | Family conference → always hospice |
| `/soundboard` | Web-audio pads (fan, HDD click, XP, hold sting…) |
| `/pack` | Certificate pack: admit → DNR → discharge → condolence downloads |
| `/hiring` | Joe 3 quiz + benefits lounge, visitor badge, resume reject |

Home ward cards open bits **inline**. Full pages remain for sharing (`#ward-call-doctor`, etc.).

### Dynamic Open Graph

| Bit | Example |
| --- | --- |
| Vigil | `/vigil?for=ThinkPad` → `/api/og/vigil` |
| Condolences | `/condolences?machine=…&from=…` → `/api/og/condolences` |
| Grief stage | `/grief?stage=bargain` → `/api/og/grief` |
| Hiring badge | `/hiring?badge=Brad` → `/api/og/hiring` |
| Discharge | `/discharge?for=OptiPlex` → `/api/og/discharge` |
| Doctor’s note | `/doctors-note?for=OptiPlex` → `/api/og/doctors-note` |
| Last rites | `/last-rites?for=…&os=…` → `/api/og/last-rites` |

Previews use `next/og` (1200×630). Fancy Unicode is stripped so PNGs don’t come back empty.

### Fake biz cards

Print files in [`print/biz-cards/`](print/biz-cards/). Point QR codes at `https://stjoeshospice.com/?from=bizcard` for the welcome roast.

### Logos & portraits

In `public/`: `logo.jpg` / variants, `logo-icon.png`, `head-of-care.png`, `head-of-care.mp4`.

Footer: “Powered By BraddCorp © YEAR. All Rights Reserved.” → https://braddcorp.com
