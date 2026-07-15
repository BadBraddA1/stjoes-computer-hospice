#!/usr/bin/env python3
"""Regenerate ST Joe's fake biz-card print files (300 DPI)."""

from __future__ import annotations

from pathlib import Path

import img2pdf
import qrcode
from PIL import Image, ImageDraw, ImageFont

DPI = 300
SITE = "https://stjoeshospice.com"

INK = (26, 54, 93)
ACCENT = (95, 148, 72)
CREAM = (247, 250, 248)
MUTED = (74, 93, 115)
WHITE = (255, 255, 255)
SOFT = (212, 230, 203)

BLEED = 0.125
TRIM_W, TRIM_H = 3.5, 2.0


def inches(n: float) -> int:
    return int(round(n * DPI))


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    paths = [
        (
            "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
            if bold
            else "/System/Library/Fonts/Supplemental/Georgia.ttf"
        ),
        (
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
            if bold
            else "/System/Library/Fonts/Supplemental/Arial.ttf"
        ),
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in paths:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def mono(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in (
        "/System/Library/Fonts/Supplemental/Courier New Bold.ttf",
        "/System/Library/Fonts/Supplemental/Courier New.ttf",
        "/System/Library/Fonts/Menlo.ttc",
    ):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return font(size)


def main() -> None:
    root = Path(__file__).resolve().parents[2]
    out_dir = Path(__file__).resolve().parent
    out_dir.mkdir(parents=True, exist_ok=True)

    card_w = inches(TRIM_W + 2 * BLEED)
    card_h = inches(TRIM_H + 2 * BLEED)
    trim_x0, trim_y0 = inches(BLEED), inches(BLEED)
    trim_x1, trim_y1 = card_w - inches(BLEED), card_h - inches(BLEED)

    logo = Image.open(root / "public/logo.jpg").convert("RGB")
    head = Image.open(root / "public/head-of-care.png").convert("RGBA")

    # --- FRONT ---
    front = Image.new("RGB", (card_w, card_h), CREAM)
    d = ImageDraw.Draw(front)
    band_w = inches(1.15)
    d.rectangle((0, 0, band_w, card_h), fill=INK)
    d.rectangle((band_w, 0, band_w + inches(0.06), card_h), fill=ACCENT)

    ps = inches(0.85)
    portrait = head.resize((ps, ps), Image.Resampling.LANCZOS)
    mask = Image.new("L", (ps, ps), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, ps - 1, ps - 1), fill=255)
    px = (band_w - ps) // 2
    py = inches(0.35)
    ring = inches(0.035)
    d.ellipse((px - ring, py - ring, px + ps + ring, py + ps + ring), fill=ACCENT)
    front.paste(portrait, (px, py), mask)

    d.text(
        (band_w // 2, py + ps + inches(0.12)),
        "HEAD OF\nHOSPICE\nCARE",
        fill=SOFT,
        font=mono(int(DPI * 0.085)),
        anchor="ma",
        align="center",
        spacing=2,
    )

    tx = band_w + inches(0.18)
    lw = inches(0.55)
    front.paste(logo.resize((lw, lw), Image.Resampling.LANCZOS), (tx, inches(0.22)))
    d.text(
        (tx + lw + inches(0.1), inches(0.28)),
        "ST JOE'S",
        fill=INK,
        font=font(int(DPI * 0.16), bold=True),
    )
    d.text(
        (tx + lw + inches(0.1), inches(0.48)),
        "COMPUTER HOSPICE",
        fill=ACCENT,
        font=font(int(DPI * 0.11), bold=True),
    )
    d.text(
        (tx, inches(0.95)),
        "Comfort care for dying machines.",
        fill=MUTED,
        font=font(int(DPI * 0.095)),
    )
    d.text(
        (tx, inches(1.2)),
        "Sorry your time is up.",
        fill=INK,
        font=font(int(DPI * 0.1), bold=True),
    )

    d.rectangle((band_w, trim_y1 - inches(0.38), card_w, card_h), fill=INK)
    d.text((tx, trim_y1 - inches(0.26)), "stjoeshospice.com", fill=WHITE, font=mono(int(DPI * 0.1)))
    d.text(
        (card_w - inches(0.2), trim_y1 - inches(0.26)),
        "Admit a device",
        fill=SOFT,
        font=mono(int(DPI * 0.085)),
        anchor="ra",
    )

    # --- BACK ---
    back = Image.new("RGB", (card_w, card_h), INK)
    db = ImageDraw.Draw(back)
    db.rectangle((0, 0, card_w, inches(0.18)), fill=ACCENT)
    db.rectangle((0, card_h - inches(0.18), card_w, card_h), fill=ACCENT)

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=2,
    )
    qr.add_data(SITE)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    qr_size = inches(1.35)
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.NEAREST)
    pad = inches(0.08)
    qx = (card_w - qr_size) // 2
    qy = inches(0.38)
    db.rounded_rectangle(
        (qx - pad, qy - pad, qx + qr_size + pad, qy + qr_size + pad),
        radius=inches(0.06),
        fill=WHITE,
    )
    back.paste(qr_img, (qx, qy))
    db.text(
        (card_w // 2, qy + qr_size + inches(0.18)),
        "Scan for comfort care",
        fill=WHITE,
        font=font(int(DPI * 0.11), bold=True),
        anchor="ma",
    )
    db.text(
        (card_w // 2, qy + qr_size + inches(0.38)),
        SITE.replace("https://", ""),
        fill=SOFT,
        font=mono(int(DPI * 0.09)),
        anchor="ma",
    )

    front_path = out_dir / "biz-card-front.png"
    back_path = out_dir / "biz-card-back.png"
    front.save(front_path)
    back.save(back_path)
    front.save(out_dir / "biz-card-front.jpg", quality=92)
    back.save(out_dir / "biz-card-back.jpg", quality=92)

    def crop_trim(im: Image.Image) -> Image.Image:
        return im.crop((trim_x0, trim_y0, trim_x1, trim_y1))

    crop_trim(front).save(out_dir / "biz-card-front-trim.png")
    crop_trim(back).save(out_dir / "biz-card-back-trim.png")

    letter_w, letter_h = inches(8.5), inches(11)
    margin_x, margin_y = inches(0.75), inches(0.5)
    tw, th = inches(TRIM_W), inches(TRIM_H)

    def make_sheet(card_im: Image.Image, label: str, mirror_cols: bool = False) -> Image.Image:
        sheet = Image.new("RGB", (letter_w, letter_h), WHITE)
        sd = ImageDraw.Draw(sheet)
        sd.text(
            (letter_w // 2, inches(0.22)),
            f"ST Joe's Computer Hospice — {label} — cut on marks · 300 DPI · 3.5×2 in",
            fill=MUTED,
            font=mono(int(DPI * 0.07)),
            anchor="ma",
        )
        card = crop_trim(card_im)
        for r in range(5):
            for c in range(2):
                col = 1 - c if mirror_cols else c
                x = margin_x + col * tw
                y = margin_y + inches(0.15) + r * th
                sheet.paste(card, (x, y))
                mark = inches(0.12)
                for cx, cy in ((x, y), (x + tw, y), (x, y + th), (x + tw, y + th)):
                    sd.line((cx - mark, cy, cx + mark, cy), fill=(180, 180, 180), width=2)
                    sd.line((cx, cy - mark, cx, cy + mark), fill=(180, 180, 180), width=2)
        return sheet

    sf = out_dir / "sheet-letter-front.png"
    sb = out_dir / "sheet-letter-back.png"
    sb_mirror = out_dir / "sheet-letter-back-mirror-cols.png"
    make_sheet(front, "FRONT").save(sf)
    make_sheet(back, "BACK — duplex flip on short edge").save(sb)
    make_sheet(back, "BACK — duplex flip on long edge (mirrored cols)", mirror_cols=True).save(
        sb_mirror
    )

    with open(out_dir / "st-joes-biz-cards-letter.pdf", "wb") as f:
        f.write(
            img2pdf.convert(
                [str(sf), str(sb)],
                layout_fun=img2pdf.get_fixed_dpi_layout_fun((DPI, DPI)),
            )
        )

    with open(out_dir / "st-joes-biz-card-single-with-bleed.pdf", "wb") as f:
        f.write(
            img2pdf.convert(
                [str(front_path), str(back_path)],
                layout_fun=img2pdf.get_fixed_dpi_layout_fun((DPI, DPI)),
            )
        )

    print(f"Wrote print files to {out_dir}")
    print(f"QR → {SITE}")


if __name__ == "__main__":
    main()
