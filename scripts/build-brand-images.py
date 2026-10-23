#!/usr/bin/env python3
"""Render the PRYDD social images from the same photographs as the hero globe.

The homepage hero is 400 photo planes on a Fibonacci sphere. These images are
that sphere, cropped wide, so the social presence and the site share a motif
rather than merely a colour.

    python3 scripts/build-brand-images.py

Requires Google Chrome. Writes public/prydd/banner.png (the X header) and
public/prydd/og-field.png, the untyped backdrop. The shipped card,
public/prydd/og-image.png, is that backdrop with the headline set over it and
is committed as a finished file; rerun this only when the artwork itself
should change.
"""
import math
import pathlib
import random
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
GLOBE = ROOT / "public" / "prydd" / "globe"
INK = "#17191d"


def sphere_points(n):
    """Fibonacci sphere, matching the hero renderer's distribution."""
    golden = math.pi * (3 - math.sqrt(5))
    for i in range(n):
        y = 1 - (i / (n - 1)) * 2
        r = math.sqrt(max(0.0, 1 - y * y))
        t = golden * i
        yield math.cos(t) * r, y, math.sin(t) * r


def plates(width, height, radius, cx, cy, count, seed, drift=0.0, tilt=-0.18):
    """Project the front hemisphere, then let plates drift off toward the left.

    `drift` pulls plates on the far side of the sphere outward along -x, so the
    globe dissolves into the field instead of ending at a hard silhouette.
    """
    rng = random.Random(seed)
    photos = [p.name for p in sorted(GLOBE.glob("*.avif"))]
    rng.shuffle(photos)
    out = []
    for i, (px, py, pz) in enumerate(sphere_points(count)):
        y2 = py * math.cos(tilt) - pz * math.sin(tilt)
        z2 = py * math.sin(tilt) + pz * math.cos(tilt)
        if z2 <= 0.02:
            continue  # back hemisphere
        x = cx + px * radius
        y = cy + y2 * radius
        depth = z2

        # plates near the left limb break away and scatter into the dark
        pull = max(0.0, -px) ** 1.7
        if drift and pull > 0.12:
            spread = pull * drift * rng.uniform(0.35, 1.5)
            x -= spread
            y += rng.uniform(-1, 1) * spread * 0.42
            depth *= max(0.18, 1 - pull * 0.85)

        size = 26 + depth * 44
        if x < -size or x > width + size or y < -size or y > height + size:
            continue
        out.append({
            "src": photos[i % len(photos)],
            "x": x - size / 2,
            "y": y - size * 0.62,
            "w": size,
            "h": size * 1.24,
            "rot": rng.uniform(-14, 14),
            "op": round(min(1.0, 0.26 + depth * 0.9), 3),
            "blur": round(max(0.0, (0.40 - depth) * 3.0), 2),
            "z": int(depth * 1000),
        })
    out.sort(key=lambda p: p["z"])
    return out


def render(name, width, height, body, out_path):
    if not pathlib.Path(CHROME).exists():
        print(f"Chrome not found at {CHROME}", file=sys.stderr)
        return False
    with tempfile.TemporaryDirectory() as tmp:
        work = pathlib.Path(tmp)
        shutil.copytree(GLOBE, work / "globe")
        shutil.copy(ROOT / "public/prydd/montserrat-variable.ttf", work / "montserrat.ttf")
        (work / f"{name}.html").write_text(f"""<!doctype html><html><head><meta charset="utf-8">
<style>
  @font-face {{ font-family: Display; src: url(montserrat.ttf) format('truetype'); font-weight: 100 900; }}
  html, body {{ margin: 0; padding: 0; background: {INK}; }}
  .frame {{ position: relative; width: {width}px; height: {height}px; overflow: hidden; background: {INK}; }}
  .plate {{
    position: absolute; object-fit: cover; border-radius: 2.5px;
    box-shadow: 0 10px 26px #00000073;
  }}
  /* keeps the centre legible and sinks the sphere into the field at the edges */
  .vignette {{ position: absolute; inset: 0; }}
</style></head><body>{body}</body></html>""")
        subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
             f"--window-size={width},{height}", f"--screenshot={work / 'shot.png'}",
             "--default-background-color=17191dff", "--virtual-time-budget=20000",
             str(work / f"{name}.html")],
            check=True, capture_output=True,
        )
        shutil.copy(work / "shot.png", out_path)
    print(f"wrote {out_path.relative_to(ROOT)} ({out_path.stat().st_size // 1024} KB)")
    return True


def scatter(width, height, count, seed, quiet, min_gap=74):
    """Blue-noise scatter of photo plates, thinning toward the quiet edge.

    The hero globe is dense because it is a sphere; at banner proportions the
    same density reads as a disc, so the plates are spread as individual
    objects instead and carry depth through size, opacity and blur.
    """
    rng = random.Random(seed)
    photos = [p.name for p in sorted(GLOBE.glob("*.avif"))]
    rng.shuffle(photos)
    placed, out, tries = [], [], 0
    while len(out) < count and tries < count * 400:
        tries += 1
        size_guess = 90
        x = rng.uniform(size_guess * 0.6, width - size_guess * 0.6)
        y = rng.uniform(size_guess * 0.7, height - size_guess * 0.7)
        # probability of keeping a plate rises away from the quiet edge
        t = max(0.0, min(1.0, (x - quiet[0]) / (quiet[1] - quiet[0])))
        if rng.random() > 0.10 + t * 0.70:
            continue
        if any((x - px) ** 2 + (y - py) ** 2 < min_gap ** 2 for px, py in placed):
            continue
        placed.append((x, y))
        depth = min(1.0, rng.random() * 0.75 + t * 0.45)
        size = 30 + depth * 56
        out.append({
            "src": photos[len(out) % len(photos)],
            "x": x - size / 2,
            "y": y - size * 0.62,
            "w": size,
            "h": size * 1.26,
            "rot": rng.uniform(-13, 13),
            "op": round(0.26 + depth * 0.74, 3),
            "blur": round(max(0.0, (0.34 - depth) * 4.2), 2),
            "z": int(depth * 1000),
        })
    out.sort(key=lambda p: p["z"])
    return out


def plate_html(ps):
    return "".join(
        f'<img class="plate" src="globe/{p["src"]}" style="left:{p["x"]:.1f}px;top:{p["y"]:.1f}px;'
        f'width:{p["w"]:.1f}px;height:{p["h"]:.1f}px;opacity:{p["op"]};'
        f'transform:rotate({p["rot"]:.1f}deg);filter:blur({p["blur"]}px);">'
        for p in ps
    )


def main():
    # X header. The avatar covers the lower left, so the sphere sits right of
    # centre and the left third stays quiet.
    w, h = 1500, 500
    ps = scatter(w, h, count=34, seed=21, quiet=(210, 1150), min_gap=116)
    banner = f"""<div class="frame">{plate_html(ps)}
      <div class="vignette" style="background:
        linear-gradient(90deg, {INK} 0%, #17191dcc 9%, #17191d00 26%),
        radial-gradient(60% 120% at 50% 50%, #17191d00 70%, #17191d55 100%)"></div>
    </div>"""
    ok = render("banner", w, h, banner, ROOT / "public/prydd/banner.png")

    # Open Graph backdrop. Denser and pushed right so the headline sits clear.
    w, h = 1200, 630
    ps = scatter(w, h, count=26, seed=33, quiet=(150, 880), min_gap=124)
    field = f"""<div class="frame">{plate_html(ps)}
      <div class="vignette" style="background:
        linear-gradient(90deg, {INK} 10%, #17191df2 30%, #17191d99 52%, #17191d33 74%),
        linear-gradient(0deg, #17191dcc 0%, #17191d00 26%)"></div>
    </div>"""
    ok = render("field", w, h, field, ROOT / "public/prydd/og-field.png") and ok
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
