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
- **Lobby PA** announcements + **battery %** (bottom-left) that slowly drains / dims when idle
- **ST Joe's AI** — sitewide campus care chat widget (bottom-right). Talks via **OpenAI** when `OPENAI_API_KEY` is set; otherwise uses smarter offline replies

### ST Joe's AI (optional)

```bash
# local
cp .env.example .env.local
# paste OPENAI_API_KEY=sk-...

# production (Vercel)
vercel env add OPENAI_API_KEY
```

Uses `gpt-4o-mini` through `/api/chaplain`. Persona prompt lives in `lib/fr-joe.ts` (**ST Joe's AI**).

When a ward would help, ST Joe's AI can **walk you into a gag room** (grief stages, Call Doctor, vigil, DNR, etc.) with an **Enter room →** button. The widget stays open across pages so it can keep guiding after you arrive.
- Easter eggs: type `joe3`, Konami, or **Ctrl+Alt+Delete** → gentle BSOD
- Biz-card QR welcome: `/?from=bizcard` (also `card`, `qr`)
- Footer **grief sessions** view counter (CounterAPI, once per tab session)

### Patient amenities directory (wayfinding)

Home campus is a **hospital floor directory** (wings, room numbers, “You are here”). Tap a room plaque to **open that room’s page**, or hit **Random room**. Every room page has a sticky **Main lobby** bar (`/#amenities`) to return to the directory.

### Interactive wards (routes)

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
| `/chaplain` | **ST Joe's AI** campus care desk (also corner widget) |
| `/gift-shop` | Fake merch cart that always fails checkout |
| `/bingo` | Visiting-hours symptom bingo → Code Beige |
| `/family` | Family conference → always hospice |
| `/soundboard` | Web-audio pads (fan, HDD click, XP, hold sting…) |
| `/pack` | Certificate pack → one branded **5-page ST Joe's PDF** (cover + admit/DNR/discharge/condolence) |

Paperwork wards (**DNR**, **discharge**, **doctor's note**) also offer **Download ST Joe's PDF** (letter-size, navy/green frame, logo). Pack no longer dumps `.txt` files.
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

### Promo flyers

Seven Letter-size **ad-style** flyers (slow computer / does it need help / PSA / coupon energy) + combined PDF + 2-up handbills in [`print/flyers/`](print/flyers/). QR → `/?from=flyer`. Regenerate with `python3 print/flyers/generate.py`.

### Logos & portraits

In `public/`: `logo.jpg` / variants, `logo-icon.png`, `head-of-care.png`, `head-of-care.mp4`.

Footer: “Powered By BraddCorp © YEAR. All Rights Reserved.” → https://braddcorp.com
