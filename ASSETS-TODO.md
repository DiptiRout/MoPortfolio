# Assets to produce

Every slot below is already wired. `media.js` renders a marked placeholder
at the exact final aspect ratio until the file exists, so **adding a file
and flipping `ready: true` in `projects.js` is the whole job** — no layout
work, and nothing moves on the page when the real asset lands.

Naming: `shots/<slot>-<width>.<ext>`. Produce `avif` + `webp` + a `png`
fallback at each width. One command does all of it — see *Deriving the
sizes* at the bottom.

---

## 1. HAVE — MoMudra (you own it, so it gets real screens)

Capture on an **iPhone 16 Pro simulator** at the App Store 6.7" size:
**1290 × 2796**. Simulator screenshots come out at exactly this. Capture in
**dark mode** — the site's default ground is `#141a2b`, and a light
screenshot will glare against it. If a light version is easy, send both and
I'll switch them per theme.

Do **not** add a device frame, drop shadow, or marketing caption in the
image. The frame is drawn in CSS so it stays theme-aware and never looks
dated. Just the screen.

| Slot | What to capture | Why this screen |
|---|---|---|
| `momudra-home` | Home, showing **free to spend** for the current cycle | The one number the whole app is built around. This is the card's primary visual. |
| `momudra-ai` | An AI answer to a real spending question | Your actual differentiator. Pick a question whose answer quotes a figure — it proves the "same numbers everywhere" claim visually. |
| `momudra-widget` | The home-screen widget among other iOS widgets | Proves widget work, and the App Group snapshot architecture, in one image. |

**Use real-looking but non-personal data.** Your actual salary should not
be on a public site. Round, plausible numbers.

### Worth adding if you have 20 minutes

| Slot | What | Why |
|---|---|---|
| `momudra-cycle` | The pay-cycle setup screen | Shows the premise rather than asserting it |
| `momudra-demo` | **8–12s screen recording**, 1290×2796 `.mp4` (H.264) + a `-poster.jpg` first frame | Motion earns far more attention than a still. Ask a question, show the answer arriving. Keep it under ~2 MB. |

App icon is already public at 512×512 and can be pulled from your listing
if we want it in the ledger — no capture needed.

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

- [ ] **Your third MoMudra lesson** — the one that surprised you. Currently
      renders as a visible "still to confirm" in the MoMudra study.
- [ ] **"What I'd do differently"** — the section is built and stays hidden
      until you supply content. Add `differently: ['…']` to a study in
      `projects.js`. I won't invent regrets.
- [ ] **Fuse release cadence** — or how long standing up a new brand takes
      now versus before. The one gap in the Fuse study.
- [ ] **"90%+ test coverage"** — you said Fuse *and* First Bus, but also
      that First Bus is 80%+. The hero stat is therefore Fuse's. Say the
      word and I'll label it `90%+ on Fuse`.
- [ ] **Which apps from 2016–19** (Muvi / Mobiona) are worth naming.
- [ ] **Alt text review** — written for screens I have not seen. Correct
      once the captures exist; they're in `projects.js` under each `media[]`.
- [x] ~~Availability~~ — done: open to full-time, remote first,
      Bhubaneswar, IST (UTC+5:30).

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
