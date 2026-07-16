#!/usr/bin/env python3
"""Generate ST Joe's Computer Hospice promo flyers (print-ready PNGs + PDF)."""

from __future__ import annotations

from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageFont

DPI = 200  # solid for home printers without huge files
SITE = "https://stjoeshospice.com"
QR_LANDING = f"{SITE}/?from=flyer"

INK = (26, 54, 93)
ACCENT = (95, 148, 72)
BG = (238, 243, 240)
CARD = (247, 250, 248)
MUTED = (74, 93, 115)
WARN = (138, 90, 43)
WHITE = (255, 255, 255)
SOFT = (212, 230, 203)


def inches(n: float) -> int:
    return int(round(n * DPI))


def font(size: int, bold: bool = False) -> ImageFont.ImageFont:
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
    ]
    for path in paths:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def mono(size: int) -> ImageFont.ImageFont:
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


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.ImageFont, max_w: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        test = f"{cur} {w}".strip()
        if draw.textlength(test, font=f) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def make_qr(size: int) -> Image.Image:
    qr = qrcode.QRCode(border=1, box_size=10)
    qr.add_data(QR_LANDING)
    qr.make(fit=True)
    img = qr.make_image(fill_color=INK, back_color=CARD).convert("RGB")
    return img.resize((size, size), Image.Resampling.NEAREST)


def frame(draw: ImageDraw.ImageDraw, w: int, h: int, pad: int = 36) -> None:
    draw.rectangle([0, 0, w, h], fill=BG)
    draw.rectangle([pad, pad, w - pad, h - pad], outline=INK, width=6)
    draw.rectangle([pad + 14, pad + 14, w - pad - 14, h - pad - 14], outline=ACCENT, width=3)


def footer(draw: ImageDraw.ImageDraw, w: int, h: int, y: int) -> None:
    draw.text((w // 2, y), "sorry your time is up", font=mono(22), fill=WARN, anchor="mm")
    draw.text((w // 2, y + 36), SITE.replace("https://", ""), font=mono(20), fill=MUTED, anchor="mm")


def flyer_comfort(root: Path, w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)
    frame(d, w, h)

    logo = Image.open(root / "public/logo.jpg").convert("RGB")
    logo.thumbnail((inches(3.2), inches(3.2)), Image.Resampling.LANCZOS)
    img.paste(logo, ((w - logo.width) // 2, inches(0.85)))

    y = inches(0.85) + logo.height + inches(0.35)
    d.text((w // 2, y), "ST JOE'S COMPUTER HOSPICE", font=mono(18), fill=ACCENT, anchor="mm")
    y += inches(0.45)
    for line in wrap(d, "Comfort care for dying machines.", font(54, bold=True), w - inches(1.6)):
        d.text((w // 2, y), line, font=font(54, bold=True), fill=INK, anchor="mm")
        y += inches(0.55)

    y += inches(0.15)
    for line in wrap(
        d,
        "We don't fix them. We sit with them. We hold the mouse.",
        font(28),
        w - inches(1.8),
    ):
        d.text((w // 2, y), line, font=font(28), fill=MUTED, anchor="mm")
        y += inches(0.35)

    qr = make_qr(inches(1.6))
    img.paste(qr, ((w - qr.width) // 2, h - inches(3.1)))
    d.text((w // 2, h - inches(1.25)), "Scan for the wards", font=mono(18), fill=MUTED, anchor="mm")
    footer(d, w, h, h - inches(0.7))
    return img


def flyer_admit(root: Path, w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), INK)
    d = ImageDraw.Draw(img)
    d.rectangle([inches(0.35), inches(0.35), w - inches(0.35), h - inches(0.35)], outline=ACCENT, width=5)

    d.text((w // 2, inches(0.9)), "NOW ADMITTING", font=mono(22), fill=SOFT, anchor="mm")
    d.text((w // 2, inches(1.5)), "Bring your beige tower.", font=font(48, bold=True), fill=WHITE, anchor="mm")

    bullets = [
        "Palliative performance tuning",
        "Last rites for hard drives",
        "Do Not Resuscitate certificates",
        "Power-LED vigils · visiting hours",
        "ST Joe's AI campus care (corner kiosk)",
    ]
    y = inches(2.3)
    for b in bullets:
        d.text((inches(1.1), y), f"●  {b}", font=font(26), fill=SOFT, anchor="lm")
        y += inches(0.45)

    head = Image.open(root / "public/head-of-care.png").convert("RGBA")
    head.thumbnail((inches(2.4), inches(2.4)), Image.Resampling.LANCZOS)
    # circle-ish paste on dark
    hx, hy = w - inches(3.0), h - inches(4.2)
    img.paste(head, (hx, hy), head)

    qr = make_qr(inches(1.4))
    img.paste(qr, (inches(0.9), h - inches(2.6)))
    d.text((inches(0.9) + qr.width // 2, h - inches(0.95)), SITE.replace("https://", ""), font=mono(16), fill=SOFT, anchor="mm")
    d.text((w // 2, h - inches(0.55)), "sorry your time is up", font=mono(20), fill=WARN, anchor="mm")
    return img


def flyer_ai(root: Path, w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), CARD)
    d = ImageDraw.Draw(img)
    frame(d, w, h, pad=40)

    d.rectangle([inches(0.7), inches(0.9), w - inches(0.7), inches(2.4)], fill=INK)
    d.text((w // 2, inches(1.35)), "NEW · CAMPUS CARE", font=mono(20), fill=SOFT, anchor="mm")
    d.text((w // 2, inches(1.9)), "ST Joe's AI", font=font(56, bold=True), fill=WHITE, anchor="mm")

    y = inches(3.0)
    for line in wrap(
        d,
        "Talk to the hospice kiosk. It listens. It rarely repairs. It will walk you to the right ward.",
        font(30),
        w - inches(1.8),
    ):
        d.text((w // 2, y), line, font=font(30), fill=MUTED, anchor="mm")
        y += inches(0.4)

    y += inches(0.25)
    tips = ["Battery grief", "Beach ball denial", "Upgrade family meetings", "DNR paperwork"]
    for t in tips:
        d.text((w // 2, y), f"— {t}", font=font(26, bold=True), fill=INK, anchor="mm")
        y += inches(0.38)

    icon = Image.open(root / "public/logo-icon.png").convert("RGBA")
    icon.thumbnail((inches(1.2), inches(1.2)), Image.Resampling.LANCZOS)
    img.paste(icon, ((w - icon.width) // 2, y + inches(0.15)), icon)

    qr = make_qr(inches(1.5))
    img.paste(qr, ((w - qr.width) // 2, h - inches(2.9)))
    d.text((w // 2, h - inches(1.15)), "stjoeshospice.com · Ask in the corner", font=mono(16), fill=MUTED, anchor="mm")
    footer(d, w, h, h - inches(0.65))
    return img


def flyer_directory(root: Path, w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)
    frame(d, w, h)

    d.rectangle([inches(0.55), inches(0.55), w - inches(0.55), inches(1.55)], fill=INK)
    d.text((w // 2, inches(0.85)), "PATIENT AMENITIES DIRECTORY", font=mono(18), fill=SOFT, anchor="mm")
    d.text((w // 2, inches(1.25)), "You are here · Main lobby", font=font(28, bold=True), fill=WHITE, anchor="mm")

    rooms = [
        ("Rm 101", "Is it time?"),
        ("Rm 102", "Five stages of grief"),
        ("Rm 103", "Call Doctor (hold)"),
        ("Rm 110", "DNR certificate"),
        ("Rm 202", "Power-LED vigil"),
        ("Rm 205", "ST Joe's AI"),
        ("Rm B01", "We're hiring (Joe 3)"),
    ]
    y = inches(1.95)
    d.text((inches(0.9), y), "ROOM", font=mono(16), fill=ACCENT, anchor="lm")
    d.text((inches(2.6), y), "WARD", font=mono(16), fill=ACCENT, anchor="lm")
    y += inches(0.35)
    d.line([inches(0.85), y, w - inches(0.85), y], fill=SOFT, width=2)
    y += inches(0.25)
    for code, title in rooms:
        d.rectangle([inches(0.85), y - inches(0.18), w - inches(0.85), y + inches(0.28)], outline=INK, width=1)
        d.text((inches(1.0), y + inches(0.05)), code, font=mono(18), fill=INK, anchor="lm")
        d.text((inches(2.6), y + inches(0.05)), title, font=font(22, bold=True), fill=INK, anchor="lm")
        y += inches(0.55)

    qr = make_qr(inches(1.35))
    img.paste(qr, (w - inches(2.4), h - inches(2.5)))
    d.text((inches(0.95), h - inches(1.6)), "Play the campus.", font=font(32, bold=True), fill=INK, anchor="lm")
    d.text((inches(0.95), h - inches(1.15)), "Random room available.", font=font(22), fill=MUTED, anchor="lm")
    footer(d, w, h, h - inches(0.55))
    return img


def flyer_dnr(root: Path, w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), CARD)
    d = ImageDraw.Draw(img)
    frame(d, w, h)

    d.text((w // 2, inches(1.0)), "FORM DNR-404", font=mono(20), fill=WARN, anchor="mm")
    d.text((w // 2, inches(1.55)), "Do Not Resuscitate", font=font(48, bold=True), fill=INK, anchor="mm")
    d.text((w // 2, inches(2.15)), "(machines only)", font=font(26), fill=MUTED, anchor="mm")

    y = inches(2.9)
    for line in (
        "No forced firmware.",
        "No heroic reboots.",
        "No \"have you tried turning it off and on again.\"",
    ):
        d.text((w // 2, y), line, font=font(28, bold=True), fill=INK, anchor="mm")
        y += inches(0.45)

    y += inches(0.2)
    for line in wrap(
        d,
        "Print a certificate. Download a screensaver. Hang it on the fridge next to the takeout menus.",
        font(24),
        w - inches(1.8),
    ):
        d.text((w // 2, y), line, font=font(24), fill=MUTED, anchor="mm")
        y += inches(0.35)

    icon = Image.open(root / "public/logo-icon.png").convert("RGBA")
    icon.thumbnail((inches(1.4), inches(1.4)), Image.Resampling.LANCZOS)
    img.paste(icon, ((w - icon.width) // 2, y + inches(0.2)), icon)

    qr = make_qr(inches(1.5))
    img.paste(qr, ((w - qr.width) // 2, h - inches(2.85)))
    d.text((w // 2, h - inches(1.1)), "stjoeshospice.com/dnr", font=mono(18), fill=MUTED, anchor="mm")
    footer(d, w, h, h - inches(0.6))
    return img


def flyer_hiring(root: Path, w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)
    frame(d, w, h)

    d.text((w // 2, inches(1.0)), "HUMAN RESOURCES · SORT OF", font=mono(18), fill=ACCENT, anchor="mm")
    d.text((w // 2, inches(1.65)), "We're hiring.", font=font(56, bold=True), fill=INK, anchor="mm")

    y = inches(2.5)
    for line in wrap(d, "One screening question.", font(34, bold=True), w - inches(1.6)):
        d.text((w // 2, y), line, font=font(34, bold=True), fill=INK, anchor="mm")
        y += inches(0.45)

    d.rectangle([inches(1.0), y + inches(0.2), w - inches(1.0), y + inches(1.5)], fill=INK)
    d.text((w // 2, y + inches(0.7)), "Is your name Joe 3?", font=font(36, bold=True), fill=WHITE, anchor="mm")
    d.text((w // 2, y + inches(1.15)), "(Answer carefully.)", font=font(22), fill=SOFT, anchor="mm")

    y = y + inches(2.0)
    for line in wrap(
        d,
        "Benefits include tissue boxes, no hope, and free static. Resume drop always rejects.",
        font(24),
        w - inches(1.8),
    ):
        d.text((w // 2, y), line, font=font(24), fill=MUTED, anchor="mm")
        y += inches(0.35)

    qr = make_qr(inches(1.5))
    img.paste(qr, ((w - qr.width) // 2, h - inches(2.9)))
    d.text((w // 2, h - inches(1.15)), "stjoeshospice.com/hiring", font=mono(18), fill=MUTED, anchor="mm")
    footer(d, w, h, h - inches(0.65))
    return img


def flyer_qr_wheatpaste(root: Path, w: int, h: int) -> Image.Image:
    """Bold simple poster for walls / poles."""
    img = Image.new("RGB", (w, h), ACCENT)
    d = ImageDraw.Draw(img)
    d.rectangle([inches(0.4), inches(0.4), w - inches(0.4), h - inches(0.4)], outline=INK, width=8)

    d.text((w // 2, inches(1.1)), "ST JOE'S", font=font(52, bold=True), fill=INK, anchor="mm")
    d.text((w // 2, inches(1.7)), "COMPUTER HOSPICE", font=font(36, bold=True), fill=INK, anchor="mm")

    qr = make_qr(inches(3.4))
    # white plate behind QR
    plate = inches(3.7)
    px, py = (w - plate) // 2, inches(2.3)
    d.rectangle([px, py, px + plate, py + plate], fill=CARD, outline=INK, width=4)
    img.paste(qr, (px + inches(0.15), py + inches(0.15)))

    d.text((w // 2, h - inches(2.0)), "SCAN FOR COMFORT CARE", font=mono(22), fill=INK, anchor="mm")
    d.text((w // 2, h - inches(1.4)), "sorry your time is up", font=font(32, bold=True), fill=WHITE, anchor="mm")
    d.text((w // 2, h - inches(0.85)), SITE.replace("https://", ""), font=mono(20), fill=INK, anchor="mm")
    return img


def half_sheet_grid(flyers: list[Image.Image], letter_w: int, letter_h: int) -> Image.Image:
    """2-up on letter for handbills (scale each flyer to half page)."""
    sheet = Image.new("RGB", (letter_w, letter_h), WHITE)
    cell_w, cell_h = letter_w, letter_h // 2
    for i, src in enumerate(flyers[:2]):
        thumb = src.copy()
        thumb.thumbnail((cell_w - 40, cell_h - 40), Image.Resampling.LANCZOS)
        x = (cell_w - thumb.width) // 2
        y = i * cell_h + (cell_h - thumb.height) // 2
        sheet.paste(thumb, (x, y))
        draw = ImageDraw.Draw(sheet)
        draw.line([(20, cell_h), (letter_w - 20, cell_h)], fill=MUTED, width=2)
    return sheet


def main() -> None:
    root = Path(__file__).resolve().parents[2]
    out = Path(__file__).resolve().parent
    out.mkdir(parents=True, exist_ok=True)

    w, h = inches(8.5), inches(11)

    makers = [
        ("flyer-01-comfort-care", flyer_comfort),
        ("flyer-02-now-admitting", flyer_admit),
        ("flyer-03-st-joes-ai", flyer_ai),
        ("flyer-04-directory", flyer_directory),
        ("flyer-05-dnr", flyer_dnr),
        ("flyer-06-hiring-joe3", flyer_hiring),
        ("flyer-07-qr-wheatpaste", flyer_qr_wheatpaste),
    ]

    images: list[Image.Image] = []
    for name, fn in makers:
        im = fn(root, w, h)
        path = out / f"{name}.png"
        im.save(path, "PNG", optimize=True)
        images.append(im)
        print("wrote", path.name)

    # Combined PDF
    pdf_path = out / "st-joes-flyers-letter.pdf"
    rgb = [im.convert("RGB") for im in images]
    rgb[0].save(pdf_path, "PDF", resolution=DPI, save_all=True, append_images=rgb[1:])
    print("wrote", pdf_path.name)

    # Two handbill sheets (2-up)
    hand1 = half_sheet_grid([images[0], images[6]], w, h)
    hand1.save(out / "handbills-comfort-and-qr.png", "PNG", optimize=True)
    hand2 = half_sheet_grid([images[2], images[5]], w, h)
    hand2.save(out / "handbills-ai-and-hiring.png", "PNG", optimize=True)
    print("wrote handbill sheets")

    print("done →", out)


if __name__ == "__main__":
    main()
