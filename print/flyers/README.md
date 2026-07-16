# Promo flyers — ST Joe's Computer Hospice

Print-ready **US Letter (8.5×11")** ads at **200 DPI**, plus 2-up handbill sheets.

These are written like **real ads**: pain-point headlines, checklists, coupon energy, PSA vibes — then the hospice punchline.

QR codes land on `https://stjoeshospice.com/?from=flyer`.

## Use these

| File | Ad angle |
| --- | --- |
| **`st-joes-flyers-letter.pdf`** | **All 7 ads** in one PDF |
| `flyer-01-is-your-computer-slow.png` | “Is your computer slow? Does it need help?” + checklist |
| `flyer-02-tired-of-waiting.png` | Late-night yellow “ATTENTION” offer |
| `flyer-03-call-hospice.png` | “Don't call IT. Call hospice.” + Head of Care |
| `flyer-04-warning-signs.png` | PSA: five warning signs |
| `flyer-05-before-after.png` | Before / after comfort care |
| `flyer-06-classified.png` | Newspaper classified + coupon |
| `flyer-07-does-it-need-help.png` | Yellow headline + Joe 3 hiring teaser |
| `handbills-slow-and-help.png` | 2-up Letter (cut in half) |
| `handbills-waiting-and-warnings.png` | 2-up Letter (cut in half) |

## Print tips

1. Print **actual size** / 100% (no “fit to page”).
2. Color if you can — navy + medical green carry the brand.
3. Handbills: print the 2-up PNG and cut on the center line.

## Regenerate

Needs Pillow + `qrcode`:

```bash
python3 print/flyers/generate.py
```
