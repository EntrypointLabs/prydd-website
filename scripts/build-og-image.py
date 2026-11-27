"""Compose public/prydd/og-image.png: one of the site's landscapes under the
same dark wash the site puts behind white type (`.practicalPhoto::before`,
a 140deg gradient from #0008 to #0003), with the PRYDD lockup in white.

Run with: python3 scripts/build-og-image.py [sky|field|shore]
"""

import math
import sys
from pathlib import Path

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
LOCKUP_WIDTH = 300
# Vertical offset into each 1200x900 photo; field keeps its horizon low so the
# lockup sits in open sky.
CROP_TOP = {"field": 110, "sky": 150, "shore": 150}


def site_wash(angle_deg=140, start=0x88, end=0x33):
    a = math.radians(angle_deg)
    dx, dy = math.sin(a), -math.cos(a)
    length = abs(W * dx) + abs(H * dy)
    wash = Image.new("L", (W, H))
    px = wash.load()
    for y in range(H):
        for x in range(W):
            t = ((x - W / 2) * dx + (y - H / 2) * dy) / length + 0.5
            px[x, y] = round(start + (end - start) * t)
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    out.putalpha(wash)
    return out


def backdrop(scene):
    src = Image.open(ROOT / f"public/prydd/landscape-{scene}.jpg").convert("RGB")
    scale = W / src.width
    src = src.resize((W, round(src.height * scale)), Image.LANCZOS)
    top = round(CROP_TOP[scene] * scale)
    card = src.crop((0, top, W, top + H)).convert("RGBA")
    return Image.alpha_composite(card, site_wash())


def lockup(width):
    src = Image.open(ROOT / "public/prydd/email-logo.png").convert("RGBA")
    src = src.crop(src.getbbox())
    r, _, _, a = src.split()
    # The email PNG is a dark fill with a white keyline; keep only the fill.
    alpha = ImageChops.multiply(a, r.point(lambda v: 255 - v)).point(lambda v: min(255, round(v * 1.12)))
    height = round(src.height * width / src.width)
    out = Image.new("RGBA", (width, height), (255, 255, 255, 0))
    out.putalpha(alpha.resize((width, height), Image.LANCZOS))
    return out


def main():
    scene = sys.argv[1] if len(sys.argv) > 1 else "sky"
    card = backdrop(scene)
    logo = lockup(LOCKUP_WIDTH)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    layer.paste(logo, ((W - logo.width) // 2, (H - logo.height) // 2), logo)
    card = Image.alpha_composite(card, layer)
    card.convert("RGB").save(ROOT / "public/prydd/og-image.png", optimize=True)


if __name__ == "__main__":
    main()
