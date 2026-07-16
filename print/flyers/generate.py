#!/usr/bin/env python3
"""Generate ST Joe's Computer Hospice promo flyers — real-ad style (print PNGs + PDF)."""

from __future__ import annotations

from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageFont

DPI = 200
SITE = "https://stjoeshospice.com"
QR_LANDING = f"{SITE}/?from=flyer"

INK = (26, 54, 93)
ACCENT = (95, 148, 72)
BG = (245, 248, 246)
CARD = (255, 255, 255)
MUTED = (74, 93, 115)
WARM = (138, 90, 43)
WHITE = (255, 255, 255)
SOFT = (212, 230, 203)
BLACK = (18, 22, 28)
PAPER = (252, 250, 245)
YELLOW = (255, 236, 160)


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


def draw_wrapped(
    draw: ImageDraw.ImageDraw,
    text: str,
    f: ImageFont.ImageFont,
    cx: int,
    y: int,
    max_w: int,
    fill: tuple[int, int, int],
    line_h: int,
) -> int:
    for line in wrap(draw, text, f, max_w):
        draw.text((cx, y), line, font=f, fill=fill, anchor="mm")
        y += line_h
    return y


def make_qr(size: int, dark: tuple[int, int, int] = INK, light: tuple[int, int, int] = CARD) -> Image.Image:
    qr = qrcode.QRCode(border=1, box_size=10)
    qr.add_data(QR_LANDING)
    qr.make(fit=True)
    img = qr.make_image(fill_color=dark, back_color=light).convert("RGB")
    return img.resize((size, size), Image.Resampling.NEAREST)


def cta_bar(draw: ImageDraw.ImageDraw, w: int, y: int, label: str = "VISIT FREE · stjoeshospice.com") -> None:
    draw.rectangle([inches(0.7), y, w - inches(0.7), y + inches(0.7)], fill=ACCENT)
    draw.text((w // 2, y + inches(0.35)), label, font=mono(18), fill=WHITE, anchor="mm")


def brand_strip(draw: ImageDraw.ImageDraw, w: int, y: int = inches(0.35)) -> None:
    draw.text((w // 2, y), "ST JOE'S COMPUTER HOSPICE", font=mono(14), fill=ACCENT, anchor="mm")
    draw.text((w // 2, y + inches(0.28)), "Comfort care for dying machines", font=font(16), fill=MUTED, anchor="mm")


# --- AD STYLES ---


def flyer_slow_computer(root: Path, w: int, h: int) -> Image.Image:
    """Classic pain-point ad: Is your computer slow?"""
    img = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, w, inches(0.55)], fill=INK)
    d.text((w // 2, inches(0.28)), "PAID ADVERTISEMENT", font=mono(14), fill=SOFT, anchor="mm")

    y = inches(1.0)
    y = draw_wrapped(d, "Is your computer slow?", font(58, bold=True), w // 2, y, w - inches(1.2), BLACK, inches(0.6))
    y += inches(0.15)
    y = draw_wrapped(d, "Does it need help?", font(48, bold=True), w // 2, y, w - inches(1.2), INK, inches(0.52))
    y += inches(0.25)

    d.rectangle([inches(0.9), y, w - inches(0.9), y + inches(0.08)], fill=ACCENT)
    y += inches(0.35)

    y = draw_wrapped(
        d,
        "Spinning beach ball. Fan screaming. Updates that never finish. You're not imagining it — your machine is in decline.",
        font(26),
        w // 2,
        y,
        w - inches(1.6),
        MUTED,
        inches(0.36),
    )
    y += inches(0.35)

    d.rectangle([inches(0.85), y, w - inches(0.85), y + inches(2.35)], outline=INK, width=3)
    d.rectangle([inches(0.85), y, w - inches(0.85), y + inches(0.5)], fill=INK)
    d.text((w // 2, y + inches(0.25)), "ASK YOURSELF:", font=mono(16), fill=WHITE, anchor="mm")
    checks = [
        "Takes forever to open email?",
        "Sounds like a leaf blower?",
        "Family says \"just buy a new one\"?",
        "You've already said goodbye once?",
    ]
    cy = y + inches(0.75)
    for c in checks:
        d.text((inches(1.2), cy), f"☐  {c}", font=font(24), fill=BLACK, anchor="lm")
        cy += inches(0.4)

    y = y + inches(2.6)
    y = draw_wrapped(
        d,
        "We don't fix dying computers. We help you let them go — with dignity, paperwork, and zero false hope.",
        font(24, bold=True),
        w // 2,
        y,
        w - inches(1.6),
        INK,
        inches(0.34),
    )

    qr = make_qr(inches(1.45))
    img.paste(qr, (inches(0.95), h - inches(2.55)))
    d.text((inches(2.7), h - inches(2.1)), "Scan or visit", font=font(22, bold=True), fill=BLACK, anchor="lm")
    d.text((inches(2.7), h - inches(1.7)), "stjoeshospice.com", font=mono(20), fill=INK, anchor="lm")
    d.text((inches(2.7), h - inches(1.35)), "Free · Online · Instantly less hopeful", font=font(18), fill=MUTED, anchor="lm")
    cta_bar(d, w, h - inches(0.95), "GET COMFORT CARE → stjoeshospice.com")
    return img


def flyer_tired_of_waiting(root: Path, w: int, h: int) -> Image.Image:
    """Late-night / coupon-book energy."""
    img = Image.new("RGB", (w, h), INK)
    d = ImageDraw.Draw(img)
    d.rectangle([inches(0.3), inches(0.3), w - inches(0.3), h - inches(0.3)], outline=YELLOW, width=6)

    d.rectangle([inches(0.7), inches(0.7), w - inches(0.7), inches(1.5)], fill=YELLOW)
    d.text((w // 2, inches(1.1)), "ATTENTION COMPUTER OWNERS", font=mono(18), fill=BLACK, anchor="mm")

    y = inches(2.0)
    y = draw_wrapped(d, "Tired of waiting…", font(46, bold=True), w // 2, y, w - inches(1.4), WHITE, inches(0.5))
    y += inches(0.1)
    y = draw_wrapped(d, "for a machine that will never get better?", font(32, bold=True), w // 2, y, w - inches(1.4), YELLOW, inches(0.4))
    y += inches(0.35)

    for line in (
        "✓ No \"have you tried turning it off\"",
        "✓ No $200 diagnostic fees",
        "✓ No false hope about \"one more update\"",
        "✓ Yes: grief support & DNR certificates",
    ):
        d.text((w // 2, y), line, font=font(26), fill=SOFT, anchor="mm")
        y += inches(0.42)

    y += inches(0.25)
    d.rectangle([inches(0.9), y, w - inches(0.9), y + inches(1.6)], fill=CARD)
    d.text((w // 2, y + inches(0.4)), "LIMITED-TIME OFFER*", font=mono(16), fill=WARM, anchor="mm")
    d.text((w // 2, y + inches(0.85)), "100% FREE HOSPICE CARE", font=font(30, bold=True), fill=INK, anchor="mm")
    d.text((w // 2, y + inches(1.25)), "*Offer never expires. Machine might.", font=font(18), fill=MUTED, anchor="mm")

    qr = make_qr(inches(1.5), dark=INK, light=CARD)
    img.paste(qr, ((w - qr.width) // 2, h - inches(3.0)))
    d.text((w // 2, h - inches(1.25)), "Call the doctor · Sit vigil · Admit a device", font=font(18), fill=SOFT, anchor="mm")
    d.text((w // 2, h - inches(0.8)), "stjoeshospice.com", font=mono(22), fill=YELLOW, anchor="mm")
    return img


def flyer_doctor_recommend(root: Path, w: int, h: int) -> Image.Image:
    """\"Doctors recommend\" / trust ad."""
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)
    brand_strip(d, w)

    y = inches(1.15)
    y = draw_wrapped(
        d,
        "When your computer needs help…",
        font(36, bold=True),
        w // 2,
        y,
        w - inches(1.3),
        BLACK,
        inches(0.42),
    )
    y += inches(0.1)
    y = draw_wrapped(
        d,
        "don't call IT.",
        font(44, bold=True),
        w // 2,
        y,
        w - inches(1.3),
        INK,
        inches(0.5),
    )
    y += inches(0.15)
    y = draw_wrapped(
        d,
        "Call hospice.",
        font(44, bold=True),
        w // 2,
        y,
        w - inches(1.3),
        ACCENT,
        inches(0.5),
    )

    head = Image.open(root / "public/head-of-care.png").convert("RGBA")
    head.thumbnail((inches(2.2), inches(2.2)), Image.Resampling.LANCZOS)
    hx = (w - head.width) // 2
    hy = y + inches(0.15)
    # circular mask-ish plate
    d.ellipse([hx - 12, hy - 12, hx + head.width + 12, hy + head.height + 12], fill=SOFT, outline=INK, width=3)
    img.paste(head, (hx, hy), head)
    y = hy + head.height + inches(0.45)

    d.text((w // 2, y), "\"We're not here to fix it.\"", font=font(28, bold=True), fill=INK, anchor="mm")
    y += inches(0.4)
    d.text((w // 2, y), "— Head of Hospice Care", font=font(20), fill=MUTED, anchor="mm")
    y += inches(0.55)

    y = draw_wrapped(
        d,
        "ST Joe's AI can walk you to the right ward: grief, DNR, power-LED vigils, and more.",
        font(22),
        w // 2,
        y,
        w - inches(1.6),
        MUTED,
        inches(0.32),
    )

    qr = make_qr(inches(1.35))
    img.paste(qr, (inches(1.0), h - inches(2.4)))
    d.text((inches(2.65), h - inches(1.95)), "Talk to ST Joe's AI", font=font(24, bold=True), fill=BLACK, anchor="lm")
    d.text((inches(2.65), h - inches(1.55)), "Free campus care kiosk", font=font(20), fill=MUTED, anchor="lm")
    d.text((inches(2.65), h - inches(1.2)), "stjoeshospice.com", font=mono(18), fill=INK, anchor="lm")
    cta_bar(d, w, h - inches(0.9), "START YOUR VISIT → stjoeshospice.com")
    return img


def flyer_warning_signs(root: Path, w: int, h: int) -> Image.Image:
    """PSA / health pamphlet ad."""
    img = Image.new("RGB", (w, h), CARD)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, w, inches(1.35)], fill=WARM)
    d.text((w // 2, inches(0.45)), "PUBLIC SERVICE ANNOUNCEMENT", font=mono(14), fill=WHITE, anchor="mm")
    d.text((w // 2, inches(0.95)), "Warning signs your PC needs hospice", font=font(32, bold=True), fill=WHITE, anchor="mm")

    signs = [
        ("1", "It boots like it's climbing stairs."),
        ("2", "The fan has become a personality."),
        ("3", "Chrome has 47 tabs and a death wish."),
        ("4", "Updates promise hope. Deliver nothing."),
        ("5", "You've already named a successor laptop."),
    ]
    y = inches(1.7)
    for num, text in signs:
        d.ellipse([inches(0.85), y, inches(1.35), y + inches(0.5)], fill=INK)
        d.text((inches(1.1), y + inches(0.25)), num, font=font(22, bold=True), fill=WHITE, anchor="mm")
        d.text((inches(1.65), y + inches(0.25)), text, font=font(24), fill=BLACK, anchor="lm")
        y += inches(0.7)

    y += inches(0.1)
    d.rectangle([inches(0.75), y, w - inches(0.75), y + inches(1.9)], fill=BG, outline=ACCENT, width=3)
    d.text((w // 2, y + inches(0.4)), "IF YOU CHECKED THREE OR MORE…", font=mono(14), fill=ACCENT, anchor="mm")
    d.text((w // 2, y + inches(0.9)), "It may be time.", font=font(36, bold=True), fill=INK, anchor="mm")
    d.text((w // 2, y + inches(1.4)), "Comfort care. Not miracles.", font=font(22), fill=MUTED, anchor="mm")

    qr = make_qr(inches(1.3))
    img.paste(qr, ((w - qr.width) // 2, h - inches(2.55)))
    d.text((w // 2, h - inches(1.05)), "Take the \"Is it time?\" quiz → stjoeshospice.com", font=mono(14), fill=MUTED, anchor="mm")
    cta_bar(d, w, h - inches(0.8), "CHECK SYMPTOMS FREE → stjoeshospice.com")
    return img


def flyer_before_after(root: Path, w: int, h: int) -> Image.Image:
    """Before / after fake product ad."""
    img = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(img)
    brand_strip(d, w, inches(0.4))

    d.text((w // 2, inches(1.15)), "BEFORE  vs  AFTER", font=mono(18), fill=MUTED, anchor="mm")
    d.text((w // 2, inches(1.6)), "ST Joe's comfort care", font=font(40, bold=True), fill=INK, anchor="mm")

    mid = w // 2
    top, bot = inches(2.15), inches(5.6)
    d.rectangle([inches(0.55), top, mid - inches(0.15), bot], fill=(255, 235, 230), outline=WARM, width=3)
    d.rectangle([mid + inches(0.15), top, w - inches(0.55), bot], fill=SOFT, outline=ACCENT, width=3)

    d.text((mid // 2 + inches(0.2), top + inches(0.35)), "BEFORE", font=mono(16), fill=WARM, anchor="mm")
    d.text(((mid + w) // 2, top + inches(0.35)), "AFTER", font=mono(16), fill=ACCENT, anchor="mm")

    before = [
        "Denial",
        "Angry restarts",
        "$180 \"maybe RAM\"",
        "Family pressure",
        "False hope",
    ]
    after = [
        "Acceptance",
        "Power-LED vigil",
        "Free DNR PDF",
        "Shared grief",
        "Peace (sort of)",
    ]
    by = top + inches(0.9)
    for b, a in zip(before, after):
        d.text((mid // 2 + inches(0.2), by), b, font=font(22), fill=BLACK, anchor="mm")
        d.text(((mid + w) // 2, by), a, font=font(22, bold=True), fill=INK, anchor="mm")
        by += inches(0.5)

    y = bot + inches(0.35)
    y = draw_wrapped(
        d,
        "Results may vary. Machines not resuscitated. Emotions may linger.",
        font(18),
        w // 2,
        y,
        w - inches(1.5),
        MUTED,
        inches(0.28),
    )

    logo = Image.open(root / "public/logo-icon.png").convert("RGBA")
    logo.thumbnail((inches(0.9), inches(0.9)), Image.Resampling.LANCZOS)
    img.paste(logo, ((w - logo.width) // 2, y + inches(0.15)), logo)

    qr = make_qr(inches(1.35))
    img.paste(qr, (inches(0.95), h - inches(2.35)))
    d.text((inches(2.6), h - inches(1.9)), "See the difference", font=font(24, bold=True), fill=BLACK, anchor="lm")
    d.text((inches(2.6), h - inches(1.5)), "stjoeshospice.com", font=mono(18), fill=INK, anchor="lm")
    cta_bar(d, w, h - inches(0.9), "START COMFORT CARE → FREE ONLINE")
    return img


def flyer_classified(root: Path, w: int, h: int) -> Image.Image:
    """Newspaper classified / coupon look."""
    img = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(img)
    # faux news columns border
    d.rectangle([inches(0.4), inches(0.4), w - inches(0.4), h - inches(0.4)], outline=BLACK, width=2)
    d.rectangle([inches(0.55), inches(0.55), w - inches(0.55), h - inches(0.55)], outline=BLACK, width=1)

    d.text((w // 2, inches(0.95)), "CLASSIFIEDS · SERVICES", font=mono(14), fill=MUTED, anchor="mm")
    d.line([inches(1.0), inches(1.25), w - inches(1.0), inches(1.25)], fill=BLACK, width=2)

    y = inches(1.7)
    y = draw_wrapped(d, "COMPUTER FEELING OFF?", font(42, bold=True), w // 2, y, w - inches(1.4), BLACK, inches(0.48))
    y += inches(0.15)
    y = draw_wrapped(d, "Does it need help?", font(36, bold=True), w // 2, y, w - inches(1.4), INK, inches(0.42))
    y += inches(0.3)

    body = (
        "ST Joe's Computer Hospice provides comfort care for dying machines. "
        "Admit a device. Print a DNR. Sit a power-LED vigil. Ask ST Joe's AI. "
        "No repairs. No judgments. No miracles."
    )
    y = draw_wrapped(d, body, font(24), w // 2, y, w - inches(1.6), MUTED, inches(0.34))
    y += inches(0.35)

    d.rectangle([inches(1.0), y, w - inches(1.0), y + inches(1.8)], outline=ACCENT, width=4)
    d.text((w // 2, y + inches(0.4)), "THIS WEEK ONLY*", font=mono(14), fill=WARM, anchor="mm")
    d.text((w // 2, y + inches(0.9)), "FREE ONLINE VISIT", font=font(34, bold=True), fill=INK, anchor="mm")
    d.text((w // 2, y + inches(1.35)), "Clip & save · or just scan", font=font(20), fill=MUTED, anchor="mm")

    qr = make_qr(inches(1.7))
    img.paste(qr, ((w - qr.width) // 2, h - inches(3.35)))
    d.text((w // 2, h - inches(1.4)), "stjoeshospice.com", font=mono(22), fill=BLACK, anchor="mm")
    d.text((w // 2, h - inches(1.0)), "*Every week is this week.", font=font(16), fill=MUTED, anchor="mm")
    d.text((w // 2, h - inches(0.65)), "sorry your time is up", font=mono(16), fill=WARM, anchor="mm")
    return img


def flyer_help_wanted_ad(root: Path, w: int, h: int) -> Image.Image:
    """Help-your-computer + hiring mashup ad."""
    img = Image.new("RGB", (w, h), CARD)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, w, h], outline=INK, width=10)
    d.rectangle([inches(0.25), inches(0.25), w - inches(0.25), h - inches(0.25)], outline=ACCENT, width=3)

    d.rectangle([inches(0.55), inches(0.55), w - inches(0.55), inches(2.0)], fill=YELLOW)
    d.text((w // 2, inches(1.0)), "Is your computer slow?", font=font(40, bold=True), fill=BLACK, anchor="mm")
    d.text((w // 2, inches(1.55)), "Does it need help?", font=font(36, bold=True), fill=INK, anchor="mm")

    y = inches(2.4)
    y = draw_wrapped(
        d,
        "Millions of aging laptops are suffering in silence. Don't force another reboot. Give them a soft landing.",
        font(24),
        w // 2,
        y,
        w - inches(1.5),
        MUTED,
        inches(0.34),
    )
    y += inches(0.35)

    for line in (
        "→ Free \"Is it time?\" assessment",
        "→ Downloadable DNR certificate",
        "→ Grief stages for battery death",
        "→ ST Joe's AI — 24/7 campus care",
    ):
        d.text((inches(1.1), y), line, font=font(24, bold=True), fill=INK, anchor="lm")
        y += inches(0.42)

    y += inches(0.25)
    d.rectangle([inches(0.8), y, w - inches(0.8), y + inches(1.35)], fill=INK)
    d.text((w // 2, y + inches(0.4)), "ALSO HIRING: Joe 3", font=mono(16), fill=SOFT, anchor="mm")
    d.text((w // 2, y + inches(0.85)), "One question. Serious inquiries only.", font=font(22), fill=WHITE, anchor="mm")

    qr = make_qr(inches(1.4))
    img.paste(qr, (inches(1.0), h - inches(2.5)))
    d.text((inches(2.7), h - inches(2.05)), "Don't wait.", font=font(28, bold=True), fill=BLACK, anchor="lm")
    d.text((inches(2.7), h - inches(1.6)), "Help starts at", font=font(20), fill=MUTED, anchor="lm")
    d.text((inches(2.7), h - inches(1.25)), "stjoeshospice.com", font=mono(20), fill=INK, anchor="lm")
    cta_bar(d, w, h - inches(0.9), "GET HELP NOW → stjoeshospice.com")
    return img


def half_sheet_grid(flyers: list[Image.Image], letter_w: int, letter_h: int) -> Image.Image:
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
        ("flyer-01-is-your-computer-slow", flyer_slow_computer),
        ("flyer-02-tired-of-waiting", flyer_tired_of_waiting),
        ("flyer-03-call-hospice", flyer_doctor_recommend),
        ("flyer-04-warning-signs", flyer_warning_signs),
        ("flyer-05-before-after", flyer_before_after),
        ("flyer-06-classified", flyer_classified),
        ("flyer-07-does-it-need-help", flyer_help_wanted_ad),
    ]

    # Remove old flyer names if present
    for old in out.glob("flyer-*.png"):
        old.unlink()
    for old in out.glob("handbills-*.png"):
        old.unlink()

    images: list[Image.Image] = []
    for name, fn in makers:
        im = fn(root, w, h)
        path = out / f"{name}.png"
        im.save(path, "PNG", optimize=True)
        images.append(im)
        print("wrote", path.name)

    pdf_path = out / "st-joes-flyers-letter.pdf"
    rgb = [im.convert("RGB") for im in images]
    rgb[0].save(pdf_path, "PDF", resolution=DPI, save_all=True, append_images=rgb[1:])
    print("wrote", pdf_path.name)

    hand1 = half_sheet_grid([images[0], images[6]], w, h)
    hand1.save(out / "handbills-slow-and-help.png", "PNG", optimize=True)
    hand2 = half_sheet_grid([images[1], images[3]], w, h)
    hand2.save(out / "handbills-waiting-and-warnings.png", "PNG", optimize=True)
    print("wrote handbill sheets")
    print("done →", out)


if __name__ == "__main__":
    main()
