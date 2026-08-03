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
      { label: 'To stand up a new brand', value: '~1 day' },
      { label: 'Test coverage', value: '90%+' },
      { label: 'Brands shipped', value: '2 — Beam & TVE' }
    ],
    links: { appStore: null, github: null, site: null },
    media: [
      { kind:'diagram', figure:'fuse-brands', ready:true, w:720, h:300,
        alt:'One shared core feeding a per-brand layer of design tokens and configuration, producing eighteen apps across iOS, tvOS and visionOS.',
        caption:'One core, eighteen apps' }
    ],
    /* Every line below is drawn from what Dipti has already stated about
       this work — the craft principles that name Fuse, the career entry,
       and the architecture field above. Nothing here is inferred about a
       client's system beyond what he has said out loud. */
    problem: 'One shared source feeding many shipping brands means every choice is made on behalf of teams you will never meet. The question stops being "does this work" and becomes "what does this cost whoever inherits it".',
    decision: 'Everything that differs between brands — design tokens, Figma configuration, component placement — lives outside the core rather than in a fork of it, so eighteen apps ship without eighteen codebases.',
    result: 'Eighteen apps across two brands and three Apple platforms, from one codebase, held at 90%+ test coverage — and a new brand now takes about a day to stand up.',

    study: {
      standfirst: 'Eighteen streaming apps, two brands, three Apple platforms — and one codebase that has to survive every team that touches it.',

      glance: [
        ['Role',      'Senior iOS Engineer'],
        ['Client',    'Warner Bros. Discovery, via Robosoft'],
        ['Platforms', 'iOS · tvOS · visionOS'],
        ['Scale',     '18 apps · 2 brands'],
        ['Coverage',  '90%+'],
        ['Since',     '2021']
      ],

      figures: { approach: 'fuse-brands' },

      problem: [
        'A shared codebase behind eighteen shipping apps changes what a decision is. Every choice is made on behalf of teams you will never meet, on schedules you do not control, for brands whose requirements arrive after your code does.',
        'The question stops being "does this work" and becomes "what does this cost whoever inherits it". A shortcut that saves an afternoon here is paid for eighteen times, by people who cannot see why it was taken.'
      ],

      approach: [
        'The platform is built on CommandBuilder, Template, Interactor and Router, with protocol-oriented design and dependency injection throughout. UIFocus Environment drives tvOS remote navigation, and accessibility was built across the whole platform from the start rather than retrofitted once someone complained.',
        'The load-bearing idea is that nothing brand-specific belongs in the core. Design tokens, Figma configuration and backend-driven component placement all sit outside it, so a new brand is configuration rather than a fork.'
      ],

      decisions: [
        {
          title: 'Per-brand variation lives outside the core',
          body: 'What differs between brands is small and bounded: design tokens, a Google service plist, the app plist and ATT entries, assets and localisations. Everything else is shared. The moment a brand requirement is satisfied by editing the core, the next brand pays for it — and the fork that follows is permanent.'
        },
        {
          title: 'One owner per computed value',
          body: 'Any number computed twice will disagree eventually. When a bug needs four fixes at four call sites, that is not a hard bug — it is a value with no owner. Across eighteen apps that disagreement is not a display error; it is eighteen support threads.'
        },
        {
          title: 'Coverage past 90% as the price of speed, not a target',
          body: 'The number was never the goal. It was what made it possible to change shared code on a Friday and still sleep — which, on a codebase this many teams depend on, is the difference between shipping weekly and shipping carefully once a quarter.'
        },
        {
          title: 'Accessibility built in, not retrofitted',
          body: 'It was built across the whole platform from the start. Retrofitting it later would have meant doing it eighteen times, against eighteen release schedules, by which point the shortcuts are load-bearing.'
        },
        {
          title: 'The remote is a first-class input',
          body: 'tvOS navigation runs through UIFocus Environment rather than being approximated. A focus engine is not a mouse and pretending otherwise produces a TV app that is technically usable and actually miserable.'
        }
      ],

      outcome: [
        'Eighteen apps across two brands — Beam and TVE — shipping on iOS, tvOS and visionOS from a single codebase, held at 90%+ test coverage.',
        'Standing up a new brand is now about a day\'s work. That is the whole return on the architecture: because the deltas are bounded and none of them live in the shared code, a new app is configuration rather than engineering — and it stays that way as the count grows.'
      ],

      lessons: [
        'Writing for other engineers is a different job from writing for users. An awkward API stops being your opinion and becomes someone else\'s whole afternoon.',
        'Reading a codebase that good is its own apprenticeship — feature flags, design tokens, XcodeGen, interactors and templates, an AppObserver pattern that keeps AppDelegate almost empty.',
        'Scale does not make decisions harder. It makes the cost of a careless one visible, which is a different and more useful problem.'
      ]
    }
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
    architecture: 'Objective-C and UIKit with Core Data and Realm, Storyboards, and SOAP/XML services. Medtronic CareLink and Certificate Maker both shipped from this desk — a device companion and a document tool, which is what a services shop looks like from the inside.',
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
    /* The one project Dipti owns outright, so it is the one place real
       product UI belongs. The architecture diagram is NOT listed here — it
       lives in study.figures.approach, so the card and the study never show
       the same picture. */
    media: [
      { kind:'shot', slot:'momudra-home', ready:true, w:1206, h:2622,
        widths:[430,645,860], fallbackExt:'png',
        alt:'MoMudra home screen: $10,038 free to spend for the current pay cycle, derived from $11,300 income less $312 spent and $950 saved, with 19 days to pay day. Below it, hold-to-speak and type both log an entry, while Ask puts a question to the AI about entries already logged.',
        caption:'Home — free to spend, scoped to the cycle' },
      { kind:'shot', slot:'momudra-report', ready:true, w:1206, h:2622,
        widths:[430,645,860], fallbackExt:'png',
        alt:'MoMudra spending report card grading a month B+ overall, with budget discipline, saving habit and logging consistency scored separately, a category breakdown, and a written AI remark explaining that food spending rose $180 mostly at weekends.',
        caption:'The month, graded — and explained in a sentence' },
      { kind:'shot', slot:'momudra-widget', ready:false, w:1170, h:2532,
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

      /* Technique and mechanism only. These were seven paragraphs, which is
         the wrong register for the part of a study an engineer skims to
         find out how the thing is actually built. No decision was dropped —
         each still states what was decided and how it is enforced, in about
         a third of the words. */
      decisions: [
        { title: 'One cycle-scoped accessor',
          body: 'Derived once, scoped to the pay cycle. Home, the widget and every AI answer call it; nothing re-derives it.' },
        { title: 'Config-driven provider routing',
          body: 'Claude primary, Groq fallback, behind one shared protocol. Order comes from Worker KV rather than the binary, so it changes without a release.' },
        { title: 'One self-heal retry',
          body: 'A total failure forces a fresh config pull and rebuilds the chain before any error reaches the user.' },
        { title: 'Truncated replies rejected',
          body: 'A token-limit stop reason throws instead of caching. The response cache is keyed on a hash of the full final prompt.' },
        { title: 'Position-free response parsing',
          body: 'Finds the answer block rather than assuming its index, with a regression test pinned to a reasoning block arriving first.' },
        { title: 'Keys server-side only',
          body: 'Vendor credentials are Cloudflare Worker secrets. The app authenticates to the Worker; the Worker authenticates to the vendor.' },
        { title: 'Failure copy without alarm',
          body: 'Plain wording, the question stays retryable, and errors are never fed back into the model as conversation.' },
        { title: 'Real renewal state',
          body: 'Reads the subscription renewal info rather than inferring from an expiry date, which a cancelled plan also has.' }
      ],

      outcome: [
        'Shipped solo to the App Store as v1.0.0 on 30 July 2026 — the SwiftUI app, the AI layer, and the Cloudflare Worker backend.',
        'Too recently released for usage data worth reporting. What it already proves is narrower and more useful: one person can carry a product from SwiftUI view to Cloudflare secret without a team behind them.'
      ],

      /* Written from Dipti's own answers. Deliberately specific and
         deliberately unflattering — a regret section that hedges is worth
         less than no regret section, and this is the part of a study a
         senior reader actually weighs. */
      differently: [
        'I hardened the AI before anyone had used it. Prompt work to hold the token cost down, guards against abusive input, and keeping every answer strictly about MoMudra and nothing else — all of that needed to exist eventually. None of it needed to exist before the first user did.',
        'I spent a long time deciding how the numbers should read, and settled on the pay cycle as a mathematical expression: income, minus spent, minus saved, equals free to spend. I still like it. I am less sure it was worth the weeks it took to arrive at.',
        'Light mode and the notification system got the least of my attention, and they are the first two things I would rebuild. I built the app in dark mode, at night — so dark mode is the one that actually got designed.'
      ],

      lessons: [
        'Most of an AI feature is the unhappy path. The prompt took an afternoon; the failure, retry, cache-invalidation and honest-copy work took the rest.',
        'Any number that appears in more than one place has to be computed in exactly one. A second implementation that agrees today will disagree eventually.',
        'On-device OCR does not read every currency. Testing it for receipt capture, it would not reliably recognise the rupee symbol — which is why that feature is not in the app yet. Not something a tutorial warns you about; you find it the first time you point it at a receipt from your own country.',
        'The cheapest AI call is the one you never make. Rules handle whatever rules can, and an image is shrunk before it is ever sent. On a subscription that promises unlimited AI for $2.99, the work done before the model runs is what makes that promise survivable.'
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
/* ============================================================
   HERO STATS — the three numbers in the hero. Same rule as everywhere
   else on this site: a number stated once, not re-typed at each use site.
   build.js renders these into index.html's hero <ul>, and also drops
   apps.total into shots/hero-stats.json so tools/make-og.py reads the
   same figure rather than carrying its own hardcoded copy.

   CAREER_APPS is the count behind the middle stat, sourced from Dipti
   directly on 2026-08-03 — not derived from the ledger, which only
   names apps worth naming individually and was never meant to be a
   census. Do not add to this breakdown without an explicit count from
   him; a wrong total here is worse than a smaller true one.
   ============================================================ */
window.CAREER_APPS = {
  breakdown: [
    { source: 'Fuse (Robosoft · one codebase)', count: 18, on: ['iOS', 'tvOS', 'visionOS'] },
    { source: 'First Bus',                      count: 1,  on: ['iOS'] },
    { source: 'Bajaj Markets',                  count: 1,  on: ['iOS', 'tvOS'] },
    { source: 'MoMudra',                        count: 1,  on: ['iOS'] },
    { source: 'Muvi',                           count: 3,  on: ['iOS'] },
    { source: 'Mobiona (services era)',         count: 11, on: ['iOS'] },
    { source: 'TikMe (freelance)',               count: 1,  on: ['iOS'] }
  ],
  get total() { return this.breakdown.reduce((n, x) => n + x.count, 0); },

  /* Apps shipped per Apple platform, summed from the same breakdown rather
     than typed a second time into the hero figure. A platform with no
     entries returns 0, and the figure shows no number rather than a zero —
     iPadOS is in that state until Dipti confirms which apps were universal. */
  countOn: function (os) {
    return this.breakdown.reduce((n, x) => n + (x.on.includes(os) ? x.count : 0), 0);
  },
  sourcesOn: function (os) {
    return this.breakdown.filter(x => x.on.includes(os)).map(x => x.source);
  }
};

window.HERO_STATS = [
  { value: '10+', label: 'Years shipping' },
  /* Not "from one codebase" any more — that described only the Fuse
     figure. This is the sum across every stop, so the label has to say
     career rather than architecture. */
  { value: String(window.CAREER_APPS.total), label: 'Apps worked across my career' },
  { value: '90%+', label: 'Test coverage on Fuse' }
];

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
      { name: 'Medtronic CareLink', note: 'device companion', year: '2016–2018 · iOS', url: 'https://apps.apple.com/us/app/medtronic-carelink-mobile/id445860674' }
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
      { name: 'TikMe', note: 'freelance · restaurant platform · Canada & USA', year: '2019–2020 · iOS', url: 'https://apps.apple.com/in/app/tikme/id1302399301' }
    ]
  },
  {
    domain: 'Productivity',
    apps: [
      { name: 'Certificate Maker', year: '2016–2018 · iOS', url: 'https://apps.apple.com/us/app/certificate-maker-diploma-ai/id1179092354' }
    ]
  }
];
