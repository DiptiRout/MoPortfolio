#!/usr/bin/env python3
"""Generate the Open Graph preview card (shots/og.png, 1200x630).

Kept as a script rather than a one-off export so the card can be
regenerated when the headline facts change — a share image that still
says "18 apps" three years from now is a small lie that nobody edits
because nobody remembers where the PNG came from.

Colours are the site's own night tokens, read from site.css by eye:
  --paper #14161e   --ink #ece7dc   --sindoor #c0562f   --ink-faint #8b8477

Run:  python3 tools/make-og.py
"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
PAPER = (20, 22, 30)
INK = (236, 231, 220)
SINDOOR = (192, 86, 47)
FAINT = (139, 132, 119)

S = "/System/Library/Fonts/Supplemental/"
serif = lambda n: ImageFont.truetype(S + "Georgia.ttf", n)
serif_i = lambda n: ImageFont.truetype(S + "Georgia Italic.ttf", n)
mono = lambda n: ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", n)

img = Image.new("RGB", (W, H), PAPER)
d = ImageDraw.Draw(img)

# A soft lamp behind the type, the same gesture the site uses for its diya.
glow = Image.new("RGB", (W, H), PAPER)
gd = ImageDraw.Draw(glow)
for r in range(420, 0, -14):
    a = (420 - r) / 420
    gd.ellipse([W - 300 - r, 300 - r, W - 300 + r, 300 + r],
               fill=(int(20 + 26 * a), int(22 + 20 * a), int(30 + 16 * a)))
img = Image.blend(img, glow, 0.55)
d = ImageDraw.Draw(img)

PAD = 84

def tracked(draw, xy, text, font, fill, track=0):
    """Letter-spaced text — Pillow has no tracking of its own."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + track
    return x

# eyebrow
tracked(d, (PAD, PAD), "GURUKUL — AN OLD DISCIPLINE", mono(17), FAINT, 2.6)

# the claim, in the site's own words and hierarchy. Sizes and the rule
# position are derived, not hard-coded: the first pass hard-coded them and
# the sub-line landed on top of the divider.
HEAD = serif(88)
LEAD = 98
top = PAD + 56
for i, line in enumerate(("Apple", "Application", "Developer")):
    d.text((PAD, top + i * LEAD), line, font=HEAD, fill=INK)

tick_x = PAD + d.textlength("Developer", font=HEAD) + 26
tick_y = top + 2 * LEAD + 62
d.rectangle([tick_x, tick_y, tick_x + 62, tick_y + 6], fill=SINDOOR)

sub_y = top + 2 * LEAD + 118
d.text((PAD, sub_y), "Ten years of ", font=serif(28), fill=FAINT)
w = d.textlength("Ten years of ", font=serif(28))
d.text((PAD + w, sub_y), "craft", font=serif_i(28), fill=SINDOOR)
w += d.textlength("craft", font=serif_i(28))
d.text((PAD + w, sub_y), " in iOS.", font=serif(28), fill=FAINT)

# the three numbers that carry the page
d.line([PAD, H - 122, W - PAD, H - 122], fill=(52, 54, 62), width=1)
stats = [("10+", "YEARS SHIPPING"), ("18", "APPS FROM ONE CODEBASE"), ("90%+", "TEST COVERAGE ON FUSE")]
x = PAD
for value, label in stats:
    d.text((x, H - 104), value, font=serif(38), fill=INK)
    tracked(d, (x, H - 48), label, mono(12), FAINT, 1.8)
    x += 300

tracked(d, (W - PAD - 168, PAD), "DIPTIROUT.COM", mono(15), SINDOOR, 2.2)

img.save("shots/og.png", optimize=True)
print("wrote shots/og.png", img.size)
