/* ============================================================
   PROJECTS — the single source of truth for the work section.

   index.html renders the cards from this array; case.html renders
   a full study from the same objects. Adding a project means adding
   one object here and nothing else — no markup, no CSS.

   ── FIELD CONTRACT ─────────────────────────────────────────
   slug        stable id; also the ?p= key for case.html
   tier        'selected' → a full card in #work
               'archive'  → data only, for the ledger and CV context
   ownership   whose product it is, in plain words
   mine        true only for products Dipti owns outright
   name        product name
   company     who it was built for/at (kept separate from `role`
               so neither has to be parsed out of the other)
   role        job title only — no company, no dates
   dateRange   'YYYY–YYYY' or 'YYYY–Present'
   platforms   Apple platforms actually shipped to
   oneLiner    max 12 words. The scannable summary — this is what a
               recruiter reads instead of the paragraph.
   blurb       one sentence of context beneath the name
   architecture how the thing is actually put together, backend
               through to view layer. This is what shows on the card
               in place of a screenshot.
   stack       renders as chips
   metrics     [{ label, value }] — value is null until Dipti supplies
               a real figure. NEVER invent one. A null renders as a
               marked gap, not as a number.
   links       { appStore, github, site } — null where none exists.
               The case-study URL is NOT stored here; it is derived
               from the presence of `study`, so it cannot drift.
   media       [] until Phase 2 fills it. See ASSETS-TODO.md.
   problem     \
   constraint   |  the case-study spine. One to three sentences each,
   decision     |  null where the honest answer is "not established".
   result      /
   study       optional long-form study. Only owned work carries one.

   `[Placeholder: …]` inside any prose string is deliberate and
   renders as a visible "still to confirm" note. Do not replace one
   with plausible-sounding prose — an unanswered detail written in
   the same voice as sourced fact is worse than an admitted gap.
   ============================================================ */
window.PROJECTS = [
  {
    slug: 'first-bus',
    tier: 'selected',
    ownership: 'Client work · Robosoft',
    name: 'First Bus',
    company: 'FirstGroup (via Robosoft)',
    role: 'Senior iOS Engineer',
    dateRange: '2021–Present',
    platforms: ['iOS'],
    oneLiner: 'Live bus tracking, routes and ticketing for a major UK operator.',
    blurb: 'Live bus tracking, routes and ticketing for FirstGroup, one of the UK’s largest operators.',
    /* Sourced from Dipti's own notes + the 2026 CV. The bracketed line is a
       real gap — do not replace it with plausible-sounding prose. */
    architecture: 'SwiftUI on Clean Architecture and MVVM, modular where it needed to be. Google Maps carries routing, live location and stop-level updates, with Atomic Design in the view layer. The live vehicle feed arrives over a WebSocket and is normalised in the network layer, so the view layer never sees the wire format.',
    stack: ['Swift', 'SwiftUI', 'Atomic Design', 'Google Maps SDK', 'Swift-Dependency', 'Snapshot Testing'],
    /* Rating pulled from the public iTunes lookup API on 2026-08-02. Dipti
       has worked on this app since 2021, so the current listing is fairly
       his to cite — unlike Bajaj, which he left five years ago. */
    metrics: [
      { label: 'App Store rating', value: '4.6★ · 197k ratings' },
      { label: 'Test coverage', value: '80%+' },
      { label: 'Crash-free rate', value: null }
    ],
    links: { appStore: 'https://apps.apple.com/gb/app/first-bus/id566586379', github: null, site: null },
    /* Client-owned UI — no reproduced screenshots. See ASSETS-TODO.md. */
    /* Client-owned UI — a drawn diagram, never their screenshots. */
    media: [
      { kind:'diagram', figure:'first-bus-feed', ready:true, w:720, h:240,
        alt:'How a live vehicle position travels from a WebSocket, through normalisation in the network layer, to the map view.',
        caption:'Where the wire format stops' }
    ],
    problem: null,
    constraint: null,
    decision: null,
    result: null
  },
  {
    slug: 'fuse',
    tier: 'selected',
    ownership: 'Client work · Robosoft',
    name: 'Fuse',
    company: 'Warner Bros. Discovery (via Robosoft)',
    role: 'Senior iOS Engineer',
    dateRange: '2021–Present',
    platforms: ['iOS', 'tvOS', 'visionOS'],
    oneLiner: 'One codebase shipping eighteen streaming apps across iOS, tvOS and visionOS.',
    blurb: 'One codebase across iOS, tvOS and visionOS, behind Discovery+, HBO Max, Max, TLC and fourteen more streaming apps.',
    architecture: 'Built on CommandBuilder, Template, Interactor and Router with protocol-oriented design and dependency injection. UIFocus Environment drives tvOS remote navigation, and accessibility was built across the whole platform from scratch rather than retrofitted late. Each brand carries its own design tokens and Figma configuration outside the shared core, and the backend drives UI and component placement.',
    stack: ['Swift', 'SwiftUI', 'tvOS', 'visionOS', 'CommandBuilder', 'Interactor', 'Router', 'SSO', 'MUX', 'Braze', 'Branch.io', 'GitHub Actions'],
    /* 18 is sourced — it is the same figure the hero counts and the blurb
       spells out. Everything else here is genuinely unknown. */
    metrics: [
      { label: 'Apps from one codebase', value: '18' },
      { label: 'Test coverage', value: '90%+' },
      { label: 'Brands shipped', value: '2 — Beam & TVE' }
    ],
    links: { appStore: null, github: null, site: null },
    media: [
      { kind:'diagram', figure:'fuse-brands', ready:true, w:720, h:300,
        alt:'One shared core feeding a per-brand layer of design tokens and configuration, producing eighteen apps across iOS, tvOS and visionOS.',
        caption:'One core, eighteen apps' }
    ],
    problem: null,
    constraint: null,
    decision: null,
    result: null
  },
  {
    slug: 'bajaj-markets',
    tier: 'archive',
    ownership: 'Client work · Bajaj Markets',
    name: 'Bajaj Markets',
    company: 'Bajaj Finserv Markets',
    role: 'iOS & tvOS Developer',
    dateRange: '2019–2020',
    platforms: ['iOS', 'tvOS'],
    oneLiner: 'A fintech marketplace for loans, cards, insurance, investments and UPI.',
    blurb: 'A fintech marketplace — loans, cards, insurance, investments, UPI and EMI shopping.',
    architecture: 'CMS-driven UI, so screens are described server-side rather than hardcoded in the client. MVVM over RESTful services with real-time data changes and deep linking, and an in-app-browser session bridged into native for auto-login — the backend drives both the UI and where each component lands.',
    stack: ['Objective-C', 'Swift', 'MVVM', 'CMS-driven layout', 'Deep Linking', 'REST', 'Bitbucket', 'Jira'],
    /* Deliberately empty. The listing today rates 4.7 from 23k ratings, but
       that is the 2026 app; Dipti left in 2020. Citing it would claim credit
       for five years of someone else's work. */
    metrics: [],
    links: { appStore: 'https://apps.apple.com/in/app/bajaj-markets-loan-finance/id1482914241', github: null, site: 'https://www.bajajfinservmarkets.in/' },
    media: [],
    problem: null,
    constraint: null,
    decision: null,
    result: null
  },
  {
    slug: 'muvi',
    tier: 'archive',
    ownership: 'Client work · Muvi',
    name: 'Muvi',
    company: 'Muvi',
    role: 'iOS Developer',
    dateRange: '2018–2019',
    platforms: ['iOS'],
    oneLiner: 'A platform other companies launched their own streaming services on.',
    blurb: 'A white-label streaming platform — Muvi’s customers stood up their own services on what we shipped.',
    architecture: 'A platform for standing up OTT apps and the CMS behind them, so the customer configured their own service rather than commissioning a build. Described as it was in 2018–19; the product has moved on since.',
    stack: ['Swift', 'Alamofire', 'MVVM', 'Crashlytics', 'Unit Tests'],
    metrics: [{ label: 'Customer services shipped', value: null }],
    links: { appStore: null, github: null, site: null },
    media: [],
    problem: null,
    constraint: null,
    decision: null,
    result: null
  },
  {
    slug: 'mobiona',
    tier: 'archive',
    ownership: 'Client work · Mobiona',
    name: 'Mobiona (services era)',
    company: 'Mobiona',
    role: 'iOS Developer',
    dateRange: '2016–2018',
    platforms: ['iOS'],
    oneLiner: 'Objective-C giving way to Swift, one client project at a time.',
    blurb: 'A services shop, so a lot of work came across the desk — where the decade started.',
    architecture: 'Objective-C and UIKit with Core Data and Realm, Storyboards, and SOAP/XML services. [Placeholder: which shipped apps from this era are worth naming individually.]',
    stack: ['Objective-C', 'UIKit', 'Core Data', 'Realm', 'Storyboards', 'SOAP / XML'],
    metrics: [{ label: 'Apps shipped', value: null }],
    links: { appStore: null, github: null, site: null },
    media: [],
    problem: null,
    constraint: null,
    decision: null,
    result: null
  },
  {
    slug: 'momudra',
    tier: 'selected',
    ownership: 'My own product',
    mine: true,
    name: 'MoMudra',
    company: 'Independent',
    role: 'Solo iOS engineer',
    dateRange: '2026',
    platforms: ['iOS'],
    oneLiner: 'Budgeting that follows your pay cycle, not the calendar month.',
    blurb: 'A personal finance app that budgets around your pay cycle, not the calendar month.',
    architecture: 'A Cloudflare Worker holds the vendor keys and serves routing config from KV, so the app never calls a model provider directly. On device SwiftData persists the cycles, one cycle-scoped calculator owns every derived figure, and AI replies cache by prompt hash.',
    stack: ['SwiftUI', 'SwiftData', 'StoreKit 2', 'Swift Concurrency', 'Claude', 'Groq', 'Cloudflare Workers', 'KV'],
    /* Released 30 July 2026, so there is no usage history worth citing yet.
       The listing shows 5.0 from a single rating — true, and meaningless.
       Publishing it would read as padding, so it stays out. */
    metrics: [
      { label: 'Shipped', value: '30 Jul 2026' },
      { label: 'Built by', value: 'Solo' },
      { label: 'Requires', value: 'iOS 18+' }
    ],
    links: { appStore: 'https://apps.apple.com/in/app/momudra-ai-money-tracker/id6785097723', github: null, site: null },
    /* Owned outright, so this is the one project that gets real screens. */
    /* The architecture diagram leads because it is ready now; the real
       screens slot in beside it the moment they are captured. */
    media: [
      { kind:'diagram', figure:'stack', ready:true, w:720, h:260,
        alt:'The app talks only to a Cloudflare Worker, which holds the vendor keys and routing config and calls Claude first, falling back to Groq.',
        caption:'No vendor key ever reaches the device' },
      { kind:'shot', slot:'momudra-home', ready:false, w:1290, h:2796,
        widths:[430,645,860], fallbackExt:'png',
        alt:'MoMudra home screen showing the amount free to spend for the current pay cycle.',
        caption:'Home — free to spend, scoped to the cycle' },
      { kind:'shot', slot:'momudra-ai', ready:false, w:1290, h:2796,
        widths:[430,645,860], fallbackExt:'png',
        alt:'An AI answer in MoMudra responding to a question about spending, quoting the same figures shown elsewhere in the app.' },
      { kind:'shot', slot:'momudra-widget', ready:false, w:1290, h:2796,
        widths:[430,645,860], fallbackExt:'png',
        alt:'The MoMudra home-screen widget showing the current cycle balance alongside other iOS widgets.' }
    ],

    /* Restated from the study below rather than written fresh, so the card
       and the study cannot drift apart. */
    problem: 'Almost every budgeting app assumes a calendar month, but most people are not paid on the first. A “monthly” budget quietly lies to you for the days between your payday and the reset.',
    constraint: 'Built solo, with no team to spread the work across, and against a hard cost ceiling: the AI features are sold as unlimited on a $2.99/month subscription, and a heavy user\'s real token usage can approach or exceed what that pays for.',
    decision: 'The pay cycle — not the month — became the unit of time everywhere: Home, widgets and AI answers all read one cycle-scoped calculator, so no two surfaces can disagree about what is left to spend.',
    result: 'Shipped solo to the App Store as v1.0.0 on 30 July 2026 — the SwiftUI app, the AI layer and the Cloudflare Worker backend.',

    study: {
      standfirst: 'Built alone, end to end: the app, the AI layer, and the backend that keeps the keys off the device.',

      /* Scannable in ten seconds, for the reader who will not read. */
      glance: [
        ['Role',      'Solo — app, AI layer, backend'],
        ['Shipped',   'v1.0.0 · 30 July 2026'],
        ['Platform',  'iOS 18+'],
        ['Stack',     'SwiftUI · SwiftData · StoreKit 2'],
        ['AI',        'Claude + Groq, routed'],
        ['Backend',   'Cloudflare Workers + KV']
      ],

      /* Keys into the FIGURES registry in case.html — a diagram runs
         where a diagram genuinely explains better than a paragraph. */
      figures: { problem: 'cycle', approach: 'stack' },

      problem: [
        'Almost every budgeting app assumes a calendar month. Most people are not paid on the first. If your salary lands on the 25th, a “monthly” budget quietly lies to you for six days out of every thirty — it resets while your money hasn’t.',
        'And when the money does run short, these apps hand you a chart. A chart is not an answer. The question people actually have is “why am I broke this month?”, and that is a question, not a visualisation.'
      ],

      approach: [
        'Two decisions up front, and everything else followed from them. First: the pay cycle — not the month — becomes the unit of time everywhere in the app, including widgets and AI answers. Second: the AI answers questions rather than generating summaries, which means it needs the same numbers the UI is showing, not its own interpretation of them.',
        'The second decision is what made the first one non-negotiable. The moment a model is reading your figures back to you, any disagreement between two screens becomes a credibility problem.'
      ],

      decisions: [
        {
          title: 'One cycle-scoped source of truth for “free to spend”',
          body: 'That number shows on Home, in the widget, and inside AI answers. Computing it in three places meant three chances to disagree — and when a chart and a sentence disagree about your money, the user stops trusting both. It is now derived once, cycle-scoped, and everything else calls that.'
        },
        {
          title: 'Provider routing with one self-heal retry',
          body: 'Claude and Groq sit behind a shared protocol, with selection and fallback order driven by backend config rather than hardcoded in the app. On a total failure the router forces one fresh config pull and rebuilds the chain before surfacing an error — cheap, because it only runs on the already-rare failure path, and it silently absorbs a routing fix that shipped server-side before this client re-checked.'
        },
        {
          title: 'A truncated reply is a failure, not a short answer',
          body: 'A response cut off by a token limit reads like a valid, if terse, answer. Cached and replayed, it becomes a permanent one. Those are now rejected outright, and the response cache is keyed on a hash of the full final prompt so any change in the underlying figures busts the key on its own.'
        },
        {
          title: 'Parse the vendor response defensively',
          body: 'A model can return a reasoning block ahead of the actual answer even when you did not ask for one. Assuming the answer sits at a fixed position silently discarded real replies and reported an outage instead. Now the parser looks for the answer rather than assuming where it is — with a regression test pinned to that exact shape.'
        },
        {
          title: 'Say the true thing when it breaks',
          body: 'When retries are genuinely exhausted the app says so plainly, without the red-alert framing that makes a user think their data is gone. Failed questions stay retryable, and errors are never fed back into the model as if they were conversation.'
        },
        {
          title: 'Keys never ship to the device',
          body: 'Vendor credentials live as secrets on a Cloudflare Worker. The app authenticates to that backend; the backend authenticates to the vendor. Remote config is served from KV and cached client-side with a lazy staleness check, so a routing change does not need an App Store release.'
        },
        {
          title: 'Tell the truth about the subscription too',
          body: 'A cancelled subscription still has a future expiry date. Reading only that date meant telling people their plan would “renew” when it would not. It now reads the real renewal info before making any claim about what happens next.'
        }
      ],

      outcome: [
        'Shipped solo to the App Store as v1.0.0 on 30 July 2026 — the SwiftUI app, the AI layer, and the Cloudflare Worker backend.',
        'Too recently released for usage data worth reporting. What it already proves is narrower and more useful: one person can carry a product from SwiftUI view to Cloudflare secret without a team behind them.'
      ],

      lessons: [
        'Most of an AI feature is the unhappy path. The prompt took an afternoon; the failure, retry, cache-invalidation and honest-copy work took the rest.',
        'Any number that appears in more than one place has to be computed in exactly one. A second implementation that agrees today will disagree eventually.',
        'A bug that needs four fixes at four call sites is not a hard bug. It is the absence of an owner for that value.',
        '[Placeholder: your own third lesson — the one that surprised you.]'
      ]
    }
  }
];

/* ============================================================
   SHIPPED — the breadth ledger.

   Grouped by domain rather than employer, because domain is what a
   reader actually learns something from. Only apps whose App Store
   listing still resolves carry a `url`; the rest render as plain
   text rather than as a link that 404s. Checked 2026-07-31 — five
   of the early listings are already gone, which is what a ten-year
   back catalogue honestly looks like.
   ============================================================ */
window.SHIPPED = [
  {
    domain: 'OTT & streaming',
    apps: [
      { name: 'Fuse', note: '18 apps from one source', year: '2021–Present · iOS · tvOS · visionOS' },
      { name: 'Muvi', note: 'live & on-demand platform', year: '2018–2019 · iOS' }
    ]
  },
  {
    domain: 'Fintech',
    apps: [
      { name: 'Bajaj Markets', note: 'loans, insurance, UPI', year: '2019–2020 · iOS · tvOS', url: 'https://apps.apple.com/in/app/bajaj-markets-loan-finance/id1482914241' },
      { name: 'MoMudra', note: 'solo', year: '2026 · iOS', url: 'https://apps.apple.com/in/app/momudra-ai-money-tracker/id6785097723' }
    ]
  },
  {
    domain: 'Healthcare',
    apps: [
      { name: 'Medtronic CareLink', note: 'device companion', url: 'https://apps.apple.com/us/app/medtronic-carelink-mobile/id445860674' }
    ]
  },
  {
    domain: 'Transport',
    apps: [
      { name: 'First Bus', note: 'FirstGroup, UK', year: '2021–Present · iOS', url: 'https://apps.apple.com/gb/app/first-bus/id566586379' }
    ]
  },
  {
    domain: 'Hospitality',
    apps: [
      { name: 'TikMe', note: 'freelance · restaurant platform · Canada & USA', url: 'https://apps.apple.com/in/app/tikme/id1302399301' }
    ]
  },
  {
    domain: 'Productivity',
    apps: [
      { name: 'Certificate Maker', url: 'https://apps.apple.com/us/app/certificate-maker-diploma-ai/id1179092354' }
    ]
  }
];
