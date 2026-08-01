# Gurukul Portfolio — what's live, and what's still open

Rebuilt against your Portfolio Manifesto.

## Three placeholders remain, deliberately

They are the three architecture details I don't actually know. They render as
visible `[Placeholder: …]` text on the page rather than as invented prose —
answer the three questions in the card-panel section below and they close.

Everything else is filled. What's left is **verification**: things I wrote or
decided that you should read once and correct if I got them wrong.

## Files

```
index.html                the page
case.html                 case-study template — reads ?p=<slug>
projects.js               ← PROJECTS (cards + studies) and SHIPPED (the ledger)
site.css                  shared styles for both pages
Diptiranjan-Rout-iOS.pdf  the public résumé (= your 2026 CV)
```

## ⚠️ Two things to fix in your CV source

I used the **2026 CV** — it's clearly the stronger document (better structure,
current skills, visionOS, the domain framing). Two errors in it though:

1. **It says you're "actively building Fynlo".** MoMudra is live on the App
   Store. The CV is describing a shipped product as a work in progress.
2. **It undersells you twice.** "Backend & Cloud (**Explored**) — *studied*
   Cloudflare Workers" — you didn't study it, you shipped a Worker backend
   with KV config and secret management in production. Same with "AI &
   Machine Learning (**Explored**)". Those are shipped, not explored.

Fix those in the source and re-export; I'll swap the PDF.
Also worth checking: the 2026 CV lists Bajaj tech as **Objective-C**, but the
2025 one said you implemented modules in **Swift** with MVVM. One is wrong.

Manifesto #9 ("content should be data-driven so projects can be updated
without redesigning") is now literally true: adding a project means appending
one object to `window.PROJECTS` in `projects.js`. No markup, no CSS. The
index cards and the case-study page are both rendered from that same array,
so a project can never have one name on the card and a different one on its
study.

---

## What was cut, and why

| Removed | Manifesto rule it failed |
|---|---|
| Scrolling technology belt (18 framework names) | "NOT a list of technologies… avoid endless skill badges" |
| Screenshot panels on cards | "NOT a collection of screenshots" |
| `[X.X]★ Avg rating` stat | Your own note — it was FirstGroup's and Bajaj's number, not yours |
| `0% MOMENTUM` readout + "drag to spin · hover to press" | "It is NOT a game" / "Calm over spectacle" |
| Craft section's framework chips | "Show evidence through projects rather than claiming expertise" |
| Muvi as a showcase card | Your rule — no App Store link. It stayed in The path. |
| Kolam dot divider | "Every object has a purpose" — it separated two sections that already separated themselves, and painted an opaque patch that mismatched on any non-default ground |
| **The yantra itself** | Replaced by the core→platforms diagram. It was beautiful and said nothing; the hero now states the argument the rest of the page backs up. |

---

## The card panel — architecture, sourced, with the gaps left visible

Two corrections applied. First, the pull-quote is gone: each panel now
answers **"How it's built"**, followed by the real stack as chips. Second —
and this was the more important note — **I had invented specifics.** Lines
like *"normalised in a Data layer the Domain never sees the shape of"* were
plausible-sounding prose, not something you told me.

Everything below is now traceable to your notes, your CVs, or the MoMudra
repo. Where I don't know, there is a **visible placeholder on the page**
rather than a confident guess.

```
FIRST BUS   SwiftUI on Clean Architecture and MVVM, modular where it needed
            to be. Google Maps carries routing, live location and stop-level
            updates, with Atomic Design in the view layer.
>>>         [Placeholder: how the live vehicle feed reaches the UI — polling
            or socket, and where it is normalised.]

FUSE        Built on CommandBuilder, Template, Interactor and Router with
            protocol-oriented design and dependency injection. UIFocus
            Environment drives tvOS remote navigation, and accessibility was
            built across the whole platform from scratch rather than
            retrofitted late.
>>>         [Placeholder: how per-brand config and theming separate from the
            shared core.]

BAJAJ       CMS-driven UI, so screens are described server-side rather than
            hardcoded in the client. MVVM over RESTful services with
            real-time data changes and deep linking, and an in-app-browser
            session bridged into native for auto-login.
>>>         [Placeholder: how the CMS layout contract handled an unknown
            component type.]

MOMUDRA     A Cloudflare Worker holds the vendor keys and serves routing
            config from KV, so the app never calls a model provider directly.
            On device SwiftData persists the cycles, one cycle-scoped
            calculator owns every derived figure, and AI replies cache by
            prompt hash.            ← sourced from the repo, no gaps
```

**Layout consequence:** the panel is now the substance, so it takes the wider
column (`.92fr / 1.08fr`) and both columns hang from the top. The duplicated
four-chip tag row under each title is gone — the chips live in the panel and
carry the fuller stack.

## The timeline infographic you sent

Agreed on the principle: **show real information, don't write around it.** I
took the one idea from it that the page genuinely lacked — the *"what has
remained constant"* band — and added it to the end of The path:

```
Maintainable over clever   Code the next person can change without asking me first.
Owned end to end           Requirement, architecture, delivery, release — not just the ticket.
Tested before shipped      From a first unit test to coverage past 90% on a shared codebase.
Relearning the tools       Objective-C to Swift to SwiftUI to working alongside agents.
```

It pairs with the era-stack column directly above it: the tools turn over
every two years, these don't.

I did **not** copy the infographic's era strip. The page already carries that
progression in the era-stack column beside each role (Objective-C/UIKit/SOAP →
Swift/Alamofire/MVVM → deep links/CMS → Swift 6/SwiftUI/visionOS), so a second
telling of the same story would be repetition.

*(The image was a style reference, not Dipti's own timeline — its 2011 start
and "14+ years" describe iOS as a platform, not this career. Nothing from it
was copied verbatim; only the "what has remained constant" idea was taken,
and that band is written from Dipti's own record.)*

>>> OPEN     Worth deciding: should The path become a horizontal era strip in
             the style of that reference, or stay as the vertical timeline
             with the era-stack column? The vertical version reads better on
             a phone and holds more prose; a horizontal strip is more
             scannable on desktop and weaker on mobile.

## 01 · IDENTITY — live

```
NAME          Diptiranjan Rout
ROLE_LINE     Apple Application Developer
PAGE_TITLE    Diptiranjan Rout — Apple Application Developer
EMAIL         diptiranjan.rout.ios@gmail.com
LOCATION      Odisha, India
GITHUB        https://github.com/DiptiRout
LINKEDIN      https://www.linkedin.com/in/diptiranjan-rout-ios-dev
RESUME_PDF    Diptiranjan-Rout-iOS.pdf   ← live, opens in a new tab
```

No dead links remain. Verified: the résumé serves 200 as `application/pdf`.
```
>>> PORTFOLIO    your Canva-Portfolio / SwiftNexus / ThemePackage URLs, if you
                 want them as extra contact links (optional — the page reads
                 fine with four)
```

## 02 · HERO — live

Headline stayed **"Ten years / of craft / in iOS"** — iOS is the searchable,
punchy anchor; "Apple Application Developer" carries the ecosystem breadth in
the role line and title. Say the word if you want the headline broadened too.

Stats are now all **your** contribution, no caveats needed:
```
10+    Years shipping
18     Apps from one codebase
90%+   Test coverage
```

## 03 · SELECTED WORK — live, 4 items

Rule: live App Store link, or major codebase impact. Nothing else.

| # | Project | Link | Study |
|---|---|---|---|
| 01 | First Bus | ✓ live · 4.72★ · 2,101 ratings | — |
| 02 | Fuse — iOS, **tvOS, visionOS** | none (non-clickable card) | — |
| 03 | Bajaj Markets | ✓ live · 4.69★ · 23,660 ratings | — |
| 04 | MoMudra | ✓ live | ✓ **written in full** |

Verified against the App Store today. Note Bajaj's URL slug changed — it's
now `bajaj-markets-loan-finance`, and it's titled "Bajaj Markets: Loan &
Finance".

## 04 · THE CRAFT — reframed, live, now five leaves

Kept the palm-leaf cards (you were right — they're the most original thing on
the page). Changed them from *skills I have* to **convictions, each anchored
to the work that paid for it**:

```
Sthapatya  One owner per idea                 → Fuse
Laya       Tests are what make speed safe     → Fuse, First Bus
Drishti    Accessibility is structural        → Fuse
Satya      Say the true thing when it breaks  → MoMudra
Abhyāsa    Retooling is the job now           → MoMudra   ← NEW
```

The original fourth was "Guru–Shishya / Mentorship", but a mentorship claim
with no concrete example is exactly the unsupported assertion the manifesto
warns about. I swapped it for **Satya**, which your MoMudra commits prove.

```
>>> MENTORSHIP   still want it back? Give me one real example (an engineer you
                 brought up, a review practice you started) and it becomes a
                 SIXTH leaf — the grid handles six fine.
```

## 05 · THE PATH — reframed, live

No longer a transcription of your employment history — that was the most
resume-like thing on the page. Now it's the arc: **the four times the
question you were being asked changed.**

```
2021—Present · Robosoft · Bengaluru, remote   Scale changed the question
2019—2020    · Bajaj Markets · Pune           Money on the other side
2018—2019    · Muvi · Bhubaneswar             Building for builders
2016—2018    · Mobiona · Bhubaneswar          Where it started
```
The Mobiona entry is now written from your answers — project-file conflicts,
learning why a codebase needs a repository at all, animation timing, and SOAP
/ XML parsing that did not want to be parsed. Then why you stayed: the tools
and the standard the platform holds you to, and the fact that knowledge
compounds.

The Robosoft entry gained a second paragraph naming what the codebase taught
you: feature flags, design tokens, XcodeGen, interactors and templates,
dependency injection, and the AppObserver pattern that keeps AppDelegate
almost empty.

## 06 · MOMUDRA CASE STUDY — written, needs your sign-off

`case.html?p=momudra`. Structured exactly to manifesto #8: problem → approach
→ decisions → outcome → lessons.

**Now layered for scanners as well as readers:**

- **At a glance strip** under the standfirst — role, ship date, platform,
  stack, AI, backend. The ten-second read. Edit via `study.glance` in
  `projects.js` (any number of pairs; it wraps cleanly).
- **Two drawn diagrams**, not screenshots:
  - `cycle` — calendar month vs. your pay cycle, showing the six-day lie.
    This is the entire premise of the app in one picture.
  - `stack` — app → Worker → Claude/Groq, with the self-heal retry.
  Both are inline SVG using theme tokens, so they follow day/night with no
  second asset. They live in `FIGURES` in `case.html`; a study opts in via
  `study.figures = { problem:'cycle', approach:'stack' }`.

Seven decisions, each drawn from your real commit history:

1. One cycle-scoped source of truth for "free to spend"
2. Provider routing with one self-heal retry
3. A truncated reply is a failure, not a short answer
4. Parse the vendor response defensively
5. Say the true thing when it breaks
6. Keys never ship to the device
7. Tell the truth about the subscription too

```
>>> OUTCOME    I could only state "shipped solo as v1.0.0, July 2026". Add
               downloads, retention, ratings — or simply what shipping a solo
               product end to end actually taught you.
>>> LESSON 4   I wrote three; the fourth is a placeholder. Yours should be the
               one that surprised you.
>>> ACCURACY   read the seven decisions and correct anything I inferred wrong
               from the commit messages.
```

## 07 · THE VERSE — live

> “Lift yourself by your own self. Do not let yourself sink.”
> — Bhagavad Gītā 6.5 · *uddhared ātmanātmānam*

Chosen over the more famous 2.47 (*karmaṇy-evādhikāras te*) because 6.5 is
**your** story, not a general statement about karma. You said there were times
early on you thought about quitting and you held on — 6.5 is literally
"lift yourself by yourself, do not let yourself sink." 2.47 is about working
without attachment to results, which is a different (and less personal) idea.

Say the word and I'll swap to 2.47.

## 08 · AGENTIC / AI-ASSISTED WORK — live, as a fifth craft leaf

Your "vibe coding / self-relearning" point now has a home: a **fifth leaf** in
The Craft, since that section is convictions and this is one.

```
Abhyāsa — practice, repeated   →   "Retooling is the job now"
```

> I work with agents daily — Claude Code, Cursor, Codex, Xcode's own coding
> intelligence. The discipline is simple and non-negotiable: an agent may
> draft, but I review every line and I never ship what I can't explain. Ten
> years in, the willingness to learn the tools again is worth more than any
> framework I already know.

Framed as a **conviction with a guardrail**, not a tools list — otherwise it
reads as "I use ChatGPT", which every candidate now says. The differentiator
is the review discipline, and MoMudra's commit history is the evidence.

## 09 · ALSO SHIPPED — new section, live

The breadth ledger you asked for, at `#shipped` (section 02). **Grouped by
domain, not employer** — domain is what a reader actually learns from, and it
backs the "OTT, fintech, healthcare, e-commerce" claim in your CV profile.

Sixteen apps across six domains. **Only the six with a listing that still
resolves are links** (they carry a small ↗); the other ten are plain text.

I checked all of them on 2026-07-31:

| Still live | Gone |
|---|---|
| First Bus · Bajaj Markets · MoMudra | Sinner2Saint · New Train Your Brain |
| Medtronic CareLink · TikMe · Certificate Maker | Fitnesia · EBT Connect · Fake Bank Pro |

Two judgment calls you should review:

- **I left Fake Bank Pro out entirely.** The listing is dead, and "prank bank
  account" doesn't help a senior Apple-platform portfolio. Say so and it goes back in.
- ~~TikMe has no employer attached~~ — **resolved: freelance**, now labelled as such — your 2025 résumé listed it under "Some
  apps" separately from the employment section, so I couldn't tell whether it
  was Mobiona-era or Muvi-era. Tell me and I'll place it.

---

## The next three case studies

Fuse, First Bus and Bajaj Markets have cards but no studies — their cards
link straight to the App Store instead. The moment you add a `study` object
to any of them in `projects.js`, the card automatically switches its CTA to
"Case study →" and starts linking to `case.html?p=<slug>`. Nothing else to
change.

For each one I need: **the problem**, **what you tried**, **3–7 decisions
with the reasoning**, **what happened**, **what it taught you**. Give me
those in any rough form — bullet points, voice-note transcript, whatever —
and I'll write it to the same standard as MoMudra's.

Fuse is the one I'd write next. Eighteen apps on one codebase is the most
impressive thing on this site and right now it gets three sentences.

---

## OWNERSHIP — what is yours, and what you may say about it

Selected work now states whose product each thing is, and **MoMudra leads**:

```
01  MoMudra        — MY OWN PRODUCT           (sindoor, with a rule)   → case study
02  First Bus        CLIENT WORK · ROBOSOFT   (quiet grey)             → App Store
03  Fuse             CLIENT WORK · ROBOSOFT                            (no link)
04  Bajaj Markets    CLIENT WORK · BAJAJ MARKETS                       → App Store
```

Not split into two sections: four items don't support it, and a section of
one reads as thin rather than as a highlight. The distinction belongs on the
card. Owned work sorts first automatically — anyone judging whether you can
carry a product end to end should meet the one you built alone before three
you contributed to.

### ⚠️ The three placeholders point at a client's system design

Answer them at **the level you'd say out loud with that client in the room** —
the shape of the decision, not the mechanism.

```
FIRST BUS   how the live vehicle feed reaches the UI
            SAFE: "a single stream feeds one state owner rather than each view
                   polling independently"
            NOT:  transport, endpoints, cadence, payload shape

FUSE        how per-brand config and theming separate from the shared core
            SAFE: "brand config is data, not code — a target supplies values,
                   never behaviour"
            NOT:  the config schema, the token pipeline, build wiring

BAJAJ       how the CMS layout contract handled an unknown component type
            SAFE: "unknown components degrade rather than crash"
            NOT:  the contract itself, versioning, field names
```

The **current** card text is fine — CommandBuilder, Interactor, Router, MVVM
and Clean Architecture are industry-standard pattern names, not proprietary
anything, and they're the sort of thing engineers say in interviews daily.
It's the unanswered detail that would tip into publishing someone else's
architecture.

MoMudra carries no such constraint. That is exactly why it gets the full case
study and the others don't.

---

## DESIGN PASS — opinions, and what I changed

Looking at the page as a designer rather than an auditor, four things were
wrong. All four are fixed.

**1. Every project card was two columns that didn't talk to each other.**
The right panel ran 2.2–3.0× taller than the left, so a void opened beside
every project name. Moving the tech chips out of the panel and under the
blurb gave the left column mass: **balance is now 1.00–1.12**, and the whole
section got 284px shorter without losing anything.

**2. The unanswered details read as broken copy.** `[Placeholder: how the
live vehicle feed reaches the UI…]` sat mid-sentence in the same voice as
the writing around it. It is now marked up as what it is — *"still to
confirm — …"*, italic and dotted-underlined. Honest, and it looks deliberate
rather than unfinished.

**3. The card index numerals were orphaned.** A 11px `01` floating at the top
of the card with nothing near it read as leftover debris. Nudged onto the
project name's baseline so it belongs to something.

**4. The Craft evidence lines stepped up and down across the row.** *"Paid
for on Fuse"* sat wherever each paragraph happened to end. The leaves are
flex columns now and the evidence is pushed to the floor, so every footer in
a row shares a baseline — verified at 4355px and 4790px for the two rows.

---

## UI/UX AUDIT — findings and fixes

Ran a full pass over semantics, keyboard, targets, typography and layout.
Clean already: heading order (no skips, one `h1`), landmarks, no generic
link text, skip-link target valid, nothing below the WCAG 2.2 minimum target
size, `lang` set, contrast passing in both themes.

**Six real faults found and fixed:**

| Fault | Evidence | Fix |
|---|---|---|
| **Craft grid painted 3 grey empty cells** | 4 columns for 5 leaves, and the container painted the 1px gaps — so the 3 unused cells in row 2 rendered as blocks | Container background transparent; each leaf carries its own hairline. Empty cells are now simply empty. Same latent bug I'd fixed on the glance strip and never checked here. |
| **Craft prose at 23 characters a line** | 250px columns minus 66px padding | Columns widened to 300px min → 3 columns, measure **23ch → 33ch** |
| **12 links opened a new tab silently** | every App Store / GitHub / résumé link | A visually-hidden "(opens in a new tab)" appended to each, applied after the renderers so the JS-built cards and ledger are covered |
| **Icon buttons at 38px** | theme + menu toggles | 44px |
| **Nav links 27px tall** | above the 24px WCAG minimum but tight | padding raised → 35px |
| **Mobile menu stranded keyboard focus** | opening left focus on the body behind the panel; closing dropped it at the top of the document | Focus moves to the first link on open and returns to the button on close |

### A process failure worth recording

My first two attempts at the menu fix **silently did nothing.** I used a
string replace whose target didn't match the real source (it was missing a
line), and `str.replace` returns the original string rather than raising.
I only caught it because I instrumented `HTMLElement.prototype.focus` and saw
**zero calls** — the behaviour I'd twice "fixed" had never changed.

Every edit in this pass is now asserted before it is written, and each one
was re-grepped afterwards to confirm it actually landed.

---

## SCROLL & COMPOSITION PASS

**The hero felt empty because it was badly composed, not under-animated.**
Measured before: the figure column ran 183px shorter than the type beside it,
leaving 164px of dead air under it, and the hero was 995px against an 860px
viewport — 16% past the fold, so it was never seen as one composition.

| | before | after |
|---|---|---|
| column height gap | 183px | **0px** |
| dead space below figure | 164px | **45px** |
| figure size | 410px | **511px** |

The hero now takes `min-height:100svh`, the grid absorbs the space between
header and foot, and the two columns are centred against each other.

### The figure is scroll-scrubbed, not scroll-triggered

Apple's real mechanic is binding *progress* to scroll position so you scrub
it, rather than firing an animation once when something becomes visible. As
the hero leaves, the diagram takes itself apart in reverse order — platforms
fade, then the spokes retract toward the core, then the core dims — and
scrolling back rebuilds it.

Measured across the hero's scroll range (canvas ink pixels):

```
scroll 0%    26,911      full
scroll 15%   25,729
scroll 35%   15,444      platforms going
scroll 55%   13,786      spokes retracting
scroll 80%      311      core alone
scroll 100%       0      gone
back to 0%   26,831      fully rebuilt
```

### Reveals now use the native scroll-driven API

`animation-timeline: view()` replaced the IntersectionObserver and its
class-toggling JS. Progress is bound to each element's own position in the
viewport, it runs on the compositor rather than the main thread, and the
whole thing sits inside `@supports` starting **visible** — a browser without
scroll timelines shows a finished page rather than a blank one.

The headline keeps a one-shot load entrance, since a view() timeline would
show it already finished for an element that starts on screen.

**Two bugs found and fixed while verifying:**
- The draw loop was calling `querySelector` and reading `offsetHeight` every
  frame to get the scroll range — forcing a layout on every paint. Cached.
- The stat count-up froze partway when frames were throttled, leaving the
  page claiming *"0+ years shipping"*. It now snaps to the true value when
  animation frames aren't available.

---

## MODERNISATION PASS — ancient aesthetic, modern execution

The concept was right; several details read *old-fashioned* rather than
*ancient*. Ancient things that still feel modern — stone, a clean serif, a
lot of empty space — are not the same as things that look aged.

| Was | Now | Why |
|---|---|---|
| Yellowed parchment `#e9e0cd` | Limestone `#ebe7de` | Yellowed reads as an aged paperback. Stone is what actually survives millennia — cooler, higher value, and it lets the sindoor do the warming instead of the ground. |
| Grain overlay at **.26** | **.07** | A visible noise texture is the loudest "2015" signal on a page. Material should come from colour and space, not a fake fibre layer. |
| Mono tracking `.16em–.24em` | `.10em–.15em` | Wide-tracked uppercase is a 2018 agency tic. Modern sets it closer and lets scale carry emphasis. |
| Palm-leaf striations at **.5** | **.16**, wider pitch | It was mimicking a dried leaf literally. Abstracted, it just reads as material. |
| Drawn binding cord + stitch holes | One 34px accent rule | Literal props — the most clip-art thing on the page. |
| Oil lamp with wobbling flame | A point of light that breathes | Same problem: illustrating a diya instead of evoking one. |
| Body 16px, gutter ≤76px, section pad ≤138px | 17px, ≤92px, ≤180px | Confidence in a layout comes from air. |
| Section headings ≤78px | ≤92px | More scale contrast; modern editorial is bolder at the top end. |

Contrast re-verified after the palette change — the first cut put
`--ink-faint` at exactly 4.50:1, which is too close to the line, so it was
darkened to **4.99:1**. Everything passes AA in both themes:

```
            day     night
ink        14.25    15.29
ink-soft    7.37     8.44
ink-faint   4.99     5.38
sindoor     5.61     5.99
```

Dark mode also moved off the blue-navy `#141a2b` to a more neutral
`#14161e`, so night reads as unlit stone rather than a blue room.

---

## DESIGN DECISIONS — settled

```
DEVANAGARI     NO — Latin script only, for global reach
NIGHT SECTION  YES — one indigo, lamp-lit band behind the verse
DARK MODE      YES — follows the OS, plus a manual toggle in the header
CURSOR RING    REMOVED
TYPE           Tiro Devanagari Sanskrit (display + italic) · Inter (body)
               · IBM Plex Mono (labels)
```

### The hero figure — one core, five platforms

The yantra was removed. In its place, a diagram that states the page's whole
argument before a word is read: one shared core, spokes out to the five Apple
platforms, and a pulse travelling core → rim along each in turn.

**Second pass fixed five real UI faults in it:**

| Fault | Fix |
|---|---|
| The orbit circle ran straight **through the middle of all five glyphs** | The rim is now drawn as arcs *between* neighbours, with a gap sized to each glyph. The devices sit in the gaps. |
| Glyphs drawn at one literal size, so **Apple TV had ~2× the mass of iPhone** and the Watch looked like an afterthought | Each platform declares half-extents and a scale factor `k`, tuned so all five carry roughly equal optical area. |
| **iPhone and iPad were near-identical** tall rounded rectangles | iPad is now clearly wider with squarer corners; iPhone gained a speaker line. |
| The core's three equal stacked lines **read as a hamburger menu button** | Replaced with a ring, an inner ring and a filled centre — "origin", not a UI control. |
| The pentagon **drifted a few degrees a minute**, so it was tilted in every frame anyone actually saw | Locked, vertex at top. A tilted pentagon always reads as a mistake. The life comes from the pulse instead. |

Spoke end-points and hover targets now derive from each glyph's own size
rather than one fixed number that suited none of them.

No drag, no momentum score, no grab cursor — it is a diagram, not a toy.
Verified: all five hover targets resolve, a point in the empty mid-band
matches nothing, and the caption reverts to "One core · every Apple
platform".

All the dead yantra code is gone (`PETALS`, `SEGMENTS`, `shatkona`,
`bhupura`, the spring/displacement arrays). `.yantra` → `.platform-fig`,
`paintYantra` → `repaintFigure`.

>>> MAC?      PARKED — decide later. Five platforms for now (iPhone, iPad,
              Apple Watch, Apple TV, Vision Pro). Your CV doesn't claim Mac
              work, so it is left out. Adding it later is a one-line change:
              append an entry to PLATFORMS in index.html and the orbit
              re-spaces itself automatically.
