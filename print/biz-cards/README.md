# Fake biz cards — ST Joe's Computer Hospice

Print-ready **3.5×2 in** cards at **300 DPI**.

## Use these

| File | What |
| --- | --- |
| **`st-joes-biz-cards-letter.pdf`** | **Home printer** — US Letter, 10 cards/side (front page + back page) |
| **`st-joes-biz-card-single-with-bleed.pdf`** | **Pro print shop** — one front + one back, **0.125" bleed** |
| `biz-card-front.png` / `biz-card-back.png` | Single cards with bleed |
| `*-trim.png` | Exact 3.5×2 (no bleed) |

## What’s on them

- **Front:** Head of Hospice Care, brand, taglines, `stjoeshospice.com`
- **Back:** QR → `https://stjoeshospice.com` (“Scan for comfort care”)

## Print tips

1. Print **actual size** / 100% (no “fit to page”).
2. Color, heavy card stock if you have it (or plain paper for the bit).
3. Duplex: start with **flip on short edge**. If backs don’t line up, use `sheet-letter-back-mirror-cols.png` and **flip on long edge**.
4. Cut on the crop marks.

## Regenerate

Needs Pillow, `qrcode[pil]`, `img2pdf`:

```bash
python3 print/biz-cards/generate.py
```
