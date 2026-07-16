# Promo flyers — ST Joe's Computer Hospice

Print-ready **US Letter (8.5×11")** flyers at **200 DPI**, plus 2-up handbill sheets.

QR codes land on `https://stjoeshospice.com/?from=flyer`.

## Use these

| File | What |
| --- | --- |
| **`st-joes-flyers-letter.pdf`** | **All 7 flyers** in one PDF (home printer) |
| `flyer-01-comfort-care.png` | Logo hero · comfort care |
| `flyer-02-now-admitting.png` | Dark admit poster + Head of Care |
| `flyer-03-st-joes-ai.png` | ST Joe's AI campus care |
| `flyer-04-directory.png` | Patient amenities directory tease |
| `flyer-05-dnr.png` | DNR-404 paperwork gag |
| `flyer-06-hiring-joe3.png` | “Is your name Joe 3?” |
| `flyer-07-qr-wheatpaste.png` | Bold green QR wall poster |
| `handbills-comfort-and-qr.png` | 2-up Letter (cut in half) |
| `handbills-ai-and-hiring.png` | 2-up Letter (cut in half) |

## Print tips

1. Print **actual size** / 100% (no “fit to page”).
2. Color if you can — navy + medical green are the bit.
3. For wheatpaste / poles, use `flyer-07` big and loud.
4. Handbills: print the 2-up PNG/PDF page and cut on the center line.

## Regenerate

Needs Pillow + `qrcode`:

```bash
python3 print/flyers/generate.py
```
