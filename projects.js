/* ============================================================
   PROJECTS — the single source of truth for the work section.

   index.html renders the cards from this array; case.html renders
   a full study from the same objects. Adding a project means adding
   one object here and nothing else — no markup, no CSS.

   `ownership` states plainly whose product it is. A reader evaluating
   whether someone can own a thing end to end should not have to infer it
   from a job title, and the distinction also governs what may be said:
   only work Dipti owns carries a full case study.

   `architecture` is what shows on the card instead of a screenshot:
   how the thing is actually put together, backend through to view
   layer. `stack` renders as chips beneath it. `study` is optional; a
   project without one links straight out.
   ============================================================ */
window.PROJECTS = [
  {
    slug: 'first-bus',
    ownership: 'Client work · Robosoft',
    name: 'First Bus',
    role: 'Senior iOS Engineer · Robosoft',
    years: '2021–Present',
    tags: ['SwiftUI', 'Atomic Design', 'Clean Architecture', 'Google Maps'],
    blurb: 'Live bus tracking, routes and ticketing for FirstGroup, one of the UK’s largest operators.',
    /* Sourced from Dipti's own notes + the 2026 CV. The bracketed line is a
       real gap — do not replace it with plausible-sounding prose. */
    architecture: 'SwiftUI on Clean Architecture and MVVM, modular where it needed to be. Google Maps carries routing, live location and stop-level updates, with Atomic Design in the view layer. [Placeholder: how the live vehicle feed reaches the UI — polling or socket, and where it is normalised.]',
    stack: ['Swift', 'SwiftUI', 'Atomic Design', 'Google Maps SDK', 'Swift-Dependency', 'Snapshot Testing'],
    link: 'https://apps.apple.com/gb/app/first-bus/id566586379',
    linkLabel: 'App Store'
  },
  {
    slug: 'fuse',
    ownership: 'Client work · Robosoft',
    name: 'Fuse',
    role: 'Senior iOS Engineer · Robosoft',
    years: '2021–Present',
    tags: ['tvOS', 'visionOS', 'Shared Codebase', 'Accessibility'],
    blurb: 'One codebase across iOS, tvOS and visionOS, behind Discovery+, HBO Max, Max, TLC and fourteen more streaming apps.',
    architecture: 'Built on CommandBuilder, Template, Interactor and Router with protocol-oriented design and dependency injection. UIFocus Environment drives tvOS remote navigation, and accessibility was built across the whole platform from scratch rather than retrofitted late. [Placeholder: how per-brand config and theming separate from the shared core.]',
    stack: ['Swift', 'SwiftUI', 'tvOS', 'visionOS', 'CommandBuilder', 'Interactor', 'Router', 'SSO', 'MUX', 'Braze', 'Branch.io', 'GitHub Actions'],
    link: null,
    linkLabel: null
  },
  {
    slug: 'bajaj-markets',
    ownership: 'Client work · Bajaj Markets',
    name: 'Bajaj Markets',
    role: 'iOS & tvOS Developer',
    years: '2019–2020',
    tags: ['MVVM', 'CMS-Driven UI', 'Deep Linking', 'WebView Auth'],
    blurb: 'A fintech marketplace — loans, cards, insurance, investments, UPI and EMI shopping.',
    architecture: 'CMS-driven UI, so screens are described server-side rather than hardcoded in the client. MVVM over RESTful services with real-time data changes and deep linking, and an in-app-browser session bridged into native for auto-login. [Placeholder: how the CMS layout contract handled an unknown component type.]',
    stack: ['Objective-C', 'Swift', 'MVVM', 'CMS-driven layout', 'Deep Linking', 'REST', 'Bitbucket', 'Jira'],
    link: 'https://apps.apple.com/in/app/bajaj-markets-loan-finance/id1482914241',
    linkLabel: 'App Store'
  },
  {
    slug: 'momudra',
    ownership: 'My own product',
    mine: true,
    name: 'MoMudra',
    role: 'Solo iOS engineer',
    years: '2026',
    tags: ['SwiftUI', 'StoreKit 2', 'Claude AI', 'Cloudflare Workers'],
    blurb: 'A personal finance app that budgets around your pay cycle, not the calendar month.',
    architecture: 'A Cloudflare Worker holds the vendor keys and serves routing config from KV, so the app never calls a model provider directly. On device SwiftData persists the cycles, one cycle-scoped calculator owns every derived figure, and AI replies cache by prompt hash.',
    stack: ['SwiftUI', 'SwiftData', 'StoreKit 2', 'Swift Concurrency', 'Claude', 'Groq', 'Cloudflare Workers', 'KV'],
    link: 'https://apps.apple.com/in/app/momudra-ai-money-tracker/id6785097723',
    linkLabel: 'App Store',

    study: {
      standfirst: 'Built alone, end to end: the app, the AI layer, and the backend that keeps the keys off the device.',

      /* Scannable in ten seconds, for the reader who will not read. */
      glance: [
        ['Role',      'Solo — app, AI layer, backend'],
        ['Shipped',   'v1.0.0 · July 2026'],
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
        'Shipped solo to the App Store as v1.0.0 in July 2026 — the SwiftUI app, the AI layer, and the Cloudflare Worker backend.',
        '[Placeholder: add real outcome once you have it — downloads, retention, ratings, or simply what you learned shipping a solo product end to end.]'
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
      { name: 'Fuse', note: '18 apps from one source' },
      { name: 'Muvi', note: 'live & on-demand platform' }
    ]
  },
  {
    domain: 'Fintech',
    apps: [
      { name: 'Bajaj Markets', note: 'loans, insurance, UPI', url: 'https://apps.apple.com/in/app/bajaj-markets-loan-finance/id1482914241' },
      { name: 'MoMudra', note: 'solo', url: 'https://apps.apple.com/in/app/momudra-ai-money-tracker/id6785097723' }
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
      { name: 'First Bus', note: 'FirstGroup, UK', url: 'https://apps.apple.com/gb/app/first-bus/id566586379' }
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
