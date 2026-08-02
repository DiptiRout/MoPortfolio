#!/usr/bin/env python3
"""Derive the responsive image set for one screenshot.

    python3 tools/make-shots.py <source.png> <slot>

Writes shots/<slot>-<w>.{avif,webp,png} for each width in WIDTHS and
prints the intrinsic size to paste into projects.js. Kept as a script so
every screenshot is processed identically — quality settings drifting
between assets is how a gallery ends up looking uneven.
"""
import sys, os
from PIL import Image

WIDTHS = [430, 645, 860]
OUT = "shots"

def main(src, slot):
    im = Image.open(src)
    im = im.convert("RGB")
    w0, h0 = im.size
    os.makedirs(OUT, exist_ok=True)
    for w in WIDTHS:
        if w > w0:
            print(f"  skip {w}w — wider than the source ({w0}px)")
            continue
        h = round(h0 * w / w0)
        r = im.resize((w, h), Image.LANCZOS)
        base = f"{OUT}/{slot}-{w}"
        r.save(f"{base}.png", optimize=True)
        r.save(f"{base}.webp", quality=82, method=6)
        try:
            r.save(f"{base}.avif", quality=62)
        except Exception as e:
            print(f"  avif failed at {w}w: {e}")
        sizes = {e: os.path.getsize(f"{base}.{e}") // 1024
                 for e in ("png", "webp", "avif") if os.path.exists(f"{base}.{e}")}
        print(f"  {w}w → " + "  ".join(f"{k} {v}KB" for k, v in sizes.items()))
    print(f"\n  intrinsic for projects.js:  w:{w0}, h:{h0}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
