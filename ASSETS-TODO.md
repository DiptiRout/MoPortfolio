# Assets to produce

Every slot below is already wired. `media.js` renders a marked placeholder
at the exact final aspect ratio until the file exists, so **adding a file
and flipping `ready: true` in `projects.js` is the whole job** — no layout
work, and nothing moves on the page when the real asset lands.

Naming: `shots/<slot>-<width>.<ext>`. Produce `avif` + `webp` + a `png`
fallback at each width. One command does all of it — see *Deriving the
sizes* at the bottom.

---

## 1. MoMudra — 2 of 3 delivered

| Slot | Status |
|---|---|
| `momudra-home` | **Live.** 1206×2622, leads the work card. |
| `momudra-report` | **Live.** The report card — grades, category split and the written AI remark. Leads the case study. |
| `momudra-widget` | **Held** — see below. |

### The widget shot needs one re-capture

The supplied widget reads **$150,000 free · ≈$6,818.18/day · Spent this
month $0**. The home screen beside it reads **$10,038 free**. Both would
sit on the same page.

That matters more here than it normally would, because MoMudra's whole
case study rests on *"one cycle-scoped source of truth — Home, the widget
and every AI answer all call it, so no two surfaces can disagree."* Two
screenshots disagreeing by a factor of fifteen is the one thing that
undercuts the claim the project is built on. A reader who notices reads it
as debug data, which is exactly what it looks like.

**What I need:** the widget captured against the same state as the home
screen — around **$10,038 free**, with a non-zero "spent this month". A
plainer wallpaper would also help it sit against the limestone page, but
that is taste, not correctness.

Everything else stays as it is; the slot is wired and holds its shape.

## 1b. THE JOURNEY STILLS — four images, and the animation is done

The machinery is built and live. Four layers cross-fade as you scroll The
Path, with drift against scroll and pointer. Every layer currently shows a
marked placeholder at the exact final size, so **dropping the files in and
running `node build.js` is the entire remaining job** — no code change,
nothing moves on the page.

Filenames must be exactly these, in `shots/`:

| File | Era | Who he is |
|---|---|---|
| `journey-2016.jpg` | 2016–2018 · Mobiona | Youngest. Just started. Objective-C, one desk, one device. |
| `journey-2018.jpg` | 2018–2019 · Muvi | A little older. Swift arrives. Building for other developers. |
| `journey-2019.jpg` | 2019–2020 · Bajaj | Mid-career. Money on the line. More screens around him. |
| `journey-2021.jpg` | 2021–Present · Robosoft | Most senior. Surrounded by iPhone, iPad, Apple TV, Vision Pro. Commanding. |

**Size: 900 × 1200 (3:4 portrait). JPEG.**

### Generating them

Same route as the portrait — ChatGPT image generation. The critical thing
is that it must read as **one character ageing**, not four unrelated
people, so generate the first, then ask for the others *as edits of it*.

A starting prompt, to adapt:

> A single illustrated character in a calm, muted anime style, warm
> limestone and deep navy palette, soft lighting. A young Indian software
> developer at a desk, early career, one computer, focused. Portrait
> orientation 3:4, plenty of negative space around the figure, no text.

Then for each later era: *"the same character, a few years older and more
confident, now with more Apple devices around him — iPad, Apple TV, a
Vision Pro headset — same style, same palette, same face."*

**Keep the background simple and dark-friendly.** These sit on a limestone
page in day mode and a near-black one at night; a busy background will
fight both.

---

## 2. NEED YOUR DECISION — client work

You do not own First Bus, Fuse, or Bajaj Markets. Two paths per app:

- **(a)** Link out to the public App Store listing, describe your
  contribution in text, reproduce no imagery.
- **(b)** Abstracted visuals — architecture diagrams drawn from scratch,
  showing your engineering decisions without any of their branded UI.

### My recommendation: (b), for all three

Not mainly for safety, though it is safer. **It is better evidence.**

A screenshot of HBO Max proves you had the app installed. A diagram showing
one core producing eighteen branded apps proves *you engineered it* — and
that is the exact claim the whole site makes. A grid of client screenshots
is also the single most generic thing in an iOS portfolio; nobody has your
diagrams.

These would be **inline SVG**, matching the two figures already in
`case.html` — theme-aware, zero image weight, sharp at any size, and they
work with JavaScript disabled once inlined into the HTML.

I would draw all three; **I need your go-ahead, and a check that each one
is safe to publish.**

| Slot | Diagram | Sourced from what you told me |
|---|---|---|
| `fuse-brands` | Shared core → per-brand design tokens + Figma config → 18 apps across iOS/tvOS/visionOS | "different design tokens and figma, configurations. backend driven UI" |
| `first-bus-feed` | WebSocket → normalisation in the network layer → domain → SwiftUI view | "WebSocket, the data was normalized by network layer" |
| `bajaj-bdui` | Server describes which components a screen has and where they sit → client renders natively | "backend driven UI and component placement" |

**Check before I draw:** none of these should reveal anything you would not
say with that client in the room. They are deliberately at the level of
*shape of the decision*, not endpoints, schemas, or internal names.

A possible fourth, if you want one more and it is safe to describe:
**tvOS focus-engine flow** (`fuse-focus`) — UIFocus Environment driving
remote navigation. It is the most distinctive thing on your CV that almost
no iOS developer can speak to, and it is currently one sentence of prose.

### Muvi / Mobiona

Archive tier, no visuals planned. Their value is date range and breadth,
which the ledger already carries.

---

## 3. Still needed in words, not pixels

All seven answered. Nothing on the site now renders an unanswered note.

- [x] Third MoMudra lesson — became two: on-device OCR and the rupee
      symbol, and cutting AI cost before the call.
- [x] "What I'd do differently" — four items, live on the MoMudra study.
- [x] Fuse release cadence — deliberately NOT stated (Dipti does not set
      it). Replaced with the far better fact: a new brand is ~1 day.
- [x] "90%+ coverage" — now attributed to Fuse, in the hero and on the
      share card.
- [x] 2016–19 apps — Medtronic CareLink and Certificate Maker placed at
      Mobiona, TikMe as freelance during Bajaj. Every ledger row dated.
- [x] Alt text — reviewed against the real screens. One real error found
      and fixed: Ask questions the AI, it does not log.

## Deriving the sizes

From one 1290×2796 capture, run this in `shots/` (needs `cwebp`,
`avifenc`, `sips` — all available via Homebrew, `sips` is built in):

```bash
for w in 430 645 860; do
  sips -Z $((w*2796/1290)) --resampleWidth $w momudra-home.png --out momudra-home-$w.png
  cwebp -q 82 momudra-home-$w.png -o momudra-home-$w.webp
  avifenc --min 24 --max 32 momudra-home-$w.png momudra-home-$w.avif
done
```

Then set `ready: true` on that slot in `projects.js`.

---

## Housekeeping (I can do these on request)

- `shots/momudra-home.png` — **820 KB, tracked, referenced nowhere.** It
  ships to production for nothing, and it is 6× the weight of the rest of
  the page. It is also the reference screenshot you said was not yours.
  Recommend deleting it; the real capture will take its filename.
- `index.backup.html` (37 KB) and a stale `.next/` folder are sitting
  untracked in the working directory.
