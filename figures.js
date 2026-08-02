/* ============================================================
   FIGURES — drawn, not screenshotted.

   Moved out of case.html so index.html can use the same registry:
   the work cards and the case studies now draw from one place, and a
   diagram cannot exist in two slightly different versions.

   Each one earns its slot by explaining something a paragraph
   explains badly — a misalignment in time, the shape of a request
   path, where a boundary sits. Every stroke uses the theme tokens,
   so day/night needs no second asset and no image bytes are sent.

   The three client-work diagrams exist BECAUSE the apps are not
   Dipti's to screenshot. They are pitched at the shape of the
   decision — never endpoints, schemas or internal names — which is
   also why they are better evidence than a screenshot would be: they
   show engineering rather than proving the app was installed.
   ============================================================ */
(function (root) {
  'use strict';

  var FIGURES = {

    /* The whole premise of the app in one picture: the month resets,
       the money doesn't. */
    cycle: {
      caption: 'A month-based budget resets on the 1st. If you are paid on the 25th, it spends six days every cycle telling you about money you do not have yet.',
      svg: function () {
      return '' +
      '<svg viewBox="0 0 720 250" width="720" height="250" role="img" aria-label="A calendar month resets on the 1st, but a salary paid on the 25th means six days where the budget has reset and the money has not arrived.">' +
        '<g class="fig-mute" font-size="12" font-family="var(--f-mono)" letter-spacing="1.6">' +
          '<text x="0" y="34">CALENDAR MONTH</text>' +
          '<text x="0" y="150">YOUR PAY CYCLE</text>' +
        '</g>' +
        '<rect x="0" y="50" width="720" height="34" rx="3" class="fig-band"/>' +
        '<line x1="0" y1="50" x2="0" y2="84" class="fig-edge"/>' +
        '<line x1="480" y1="44" x2="480" y2="90" class="fig-edge"/>' +
        '<line x1="720" y1="50" x2="720" y2="84" class="fig-edge"/>' +
        '<text x="8" y="72" class="fig-label" font-size="12">1st — budget resets</text>' +
        '<text x="712" y="72" class="fig-label" font-size="12" text-anchor="end">30th</text>' +
        '<rect x="480" y="166" width="240" height="34" rx="3" class="fig-band"/>' +
        '<rect x="0" y="166" width="480" height="34" rx="3" class="fig-band"/>' +
        '<line x1="480" y1="160" x2="480" y2="206" class="fig-accent-line"/>' +
        '<text x="488" y="188" class="fig-accent" font-size="12">25th — salary lands</text>' +
        '<rect x="480" y="44" width="240" height="162" class="fig-gap"/>' +
        '<text x="600" y="232" text-anchor="middle" class="fig-accent" font-size="12" font-family="var(--f-mono)" letter-spacing="1.4">SIX DAYS THE BUDGET LIES TO YOU</text>' +
      '</svg>';
      }
    },

    /* Where the keys live, and what happens when a provider fails. */
    stack: {
      caption: 'No vendor key ever ships to a device. The app authenticates to the Worker; the Worker authenticates to the vendor — and routing order is config, not a release.',
      svg: function () {
      return '' +
      '<svg viewBox="0 0 720 260" width="720" height="260" role="img" aria-label="The app talks only to a Cloudflare Worker, which holds the vendor keys and routing config and calls Claude first, falling back to Groq.">' +
        '<g class="fig-box"><rect x="0" y="86" width="150" height="70" rx="4"/></g>' +
        '<text x="75" y="116" text-anchor="middle" class="fig-strong" font-size="14">MoMudra</text>' +
        '<text x="75" y="134" text-anchor="middle" class="fig-mute" font-size="11">iOS app</text>' +
        '<g class="fig-box"><rect x="255" y="70" width="180" height="102" rx="4"/></g>' +
        '<text x="345" y="102" text-anchor="middle" class="fig-strong" font-size="14">Cloudflare Worker</text>' +
        '<text x="345" y="122" text-anchor="middle" class="fig-mute" font-size="11">vendor keys · routing</text>' +
        '<text x="345" y="140" text-anchor="middle" class="fig-mute" font-size="11">config in KV</text>' +
        '<g class="fig-box"><rect x="545" y="34" width="150" height="58" rx="4"/></g>' +
        '<text x="620" y="60" text-anchor="middle" class="fig-strong" font-size="13">Claude</text>' +
        '<text x="620" y="78" text-anchor="middle" class="fig-mute" font-size="11">primary</text>' +
        '<g class="fig-box"><rect x="545" y="150" width="150" height="58" rx="4"/></g>' +
        '<text x="620" y="176" text-anchor="middle" class="fig-strong" font-size="13">Groq</text>' +
        '<text x="620" y="194" text-anchor="middle" class="fig-mute" font-size="11">fallback</text>' +
        '<path d="M150 121 H255" class="fig-arrow"/>' +
        '<path d="M435 110 H500 V63 H545" class="fig-arrow"/>' +
        '<path d="M435 132 H500 V179 H545" class="fig-arrow fig-dash"/>' +
        '<path d="M620 208 V236 H345 V172" class="fig-arrow fig-dash"/>' +
        '<text x="482" y="252" text-anchor="middle" class="fig-accent" font-size="11" font-family="var(--f-mono)" letter-spacing="1.4">ONE SELF-HEAL RETRY BEFORE ADMITTING FAILURE</text>' +
      '</svg>';
      }
    },

    /* Fuse. The claim the whole site rests on, drawn: one core, and
       what has to be TRUE of that core for eighteen brands to ship
       from it without forking. */
    'fuse-brands': {
      caption: 'Eighteen apps ship from one source because everything that differs between brands — tokens, Figma configuration, component placement — lives outside the core rather than in a fork of it.',
      svg: function () {
      return '' +
      '<svg viewBox="0 0 720 300" width="720" height="300" role="img" aria-label="A single shared core feeds a per-brand layer of design tokens, Figma configuration and backend-driven component placement, which produces eighteen apps across iOS, tvOS and visionOS.">' +
        '<g class="fig-mute" font-size="11" font-family="var(--f-mono)" letter-spacing="1.5">' +
          '<text x="0" y="20">ONE SOURCE</text>' +
          '<text x="243" y="20">VARIES PER BRAND</text>' +
          '<text x="561" y="20">SHIPS AS</text>' +
        '</g>' +

        '<g class="fig-box"><rect x="0" y="44" width="176" height="196" rx="4"/></g>' +
        '<text x="88" y="106" text-anchor="middle" class="fig-strong" font-size="15">Shared core</text>' +
        '<text x="88" y="132" text-anchor="middle" class="fig-mute" font-size="11">CommandBuilder</text>' +
        '<text x="88" y="150" text-anchor="middle" class="fig-mute" font-size="11">Interactor · Router</text>' +
        '<text x="88" y="168" text-anchor="middle" class="fig-mute" font-size="11">Template</text>' +
        '<text x="88" y="196" text-anchor="middle" class="fig-mute" font-size="11">accessibility,</text>' +
        '<text x="88" y="212" text-anchor="middle" class="fig-mute" font-size="11">built in from the start</text>' +

        '<rect x="243" y="44" width="196" height="196" rx="4" class="fig-gap"/>' +
        '<g class="fig-box"><rect x="243" y="44" width="196" height="196" rx="4"/></g>' +
        '<text x="341" y="100" text-anchor="middle" class="fig-accent" font-size="13">Design tokens</text>' +
        '<text x="341" y="132" text-anchor="middle" class="fig-accent" font-size="13">Figma config</text>' +
        '<text x="341" y="164" text-anchor="middle" class="fig-accent" font-size="13">Backend-driven</text>' +
        '<text x="341" y="182" text-anchor="middle" class="fig-accent" font-size="13">placement</text>' +
        '<text x="341" y="216" text-anchor="middle" class="fig-mute" font-size="11">no forks, no per-brand branches</text>' +

        '<path d="M176 142 H243" class="fig-arrow"/>' +
        '<path d="M439 142 H506" class="fig-arrow"/>' +

        '<g class="fig-box">' +
          '<rect x="561" y="44" width="159" height="52" rx="4"/>' +
          '<rect x="561" y="116" width="159" height="52" rx="4"/>' +
          '<rect x="561" y="188" width="159" height="52" rx="4"/>' +
        '</g>' +
        '<text x="640" y="70" text-anchor="middle" class="fig-strong" font-size="13">iOS</text>' +
        '<text x="640" y="86" text-anchor="middle" class="fig-mute" font-size="11">phone &amp; tablet</text>' +
        '<text x="640" y="142" text-anchor="middle" class="fig-strong" font-size="13">tvOS</text>' +
        '<text x="640" y="158" text-anchor="middle" class="fig-mute" font-size="11">focus-engine navigation</text>' +
        '<text x="640" y="214" text-anchor="middle" class="fig-strong" font-size="13">visionOS</text>' +
        '<text x="640" y="230" text-anchor="middle" class="fig-mute" font-size="11">spatial</text>' +

        '<text x="360" y="286" text-anchor="middle" class="fig-accent" font-size="11" font-family="var(--f-mono)" letter-spacing="1.4">18 APPS · 2 BRANDS · ONE CODEBASE</text>' +
      '</svg>';
      }
    },

    /* First Bus. A moving bus is a stream of wire messages; the view
       layer should never have to know that. Where the normalising
       happens IS the decision worth showing. */
    'first-bus-feed': {
      caption: 'A moving bus is a stream of wire messages. Normalising once, in the network layer, means nothing above it has to know the transport exists.',
      svg: function () {
      return '' +
      '<svg viewBox="0 0 720 240" width="720" height="240" role="img" aria-label="Live vehicle positions arrive over a WebSocket, are normalised in the network layer, pass through the domain layer, and reach the SwiftUI map as settled values. The view layer never sees the wire format.">' +
        '<g class="fig-mute" font-size="11" font-family="var(--f-mono)" letter-spacing="1.5">' +
          '<text x="0" y="20">LIVE FEED</text>' +
          '<text x="516" y="20">WHAT THE VIEW SEES</text>' +
        '</g>' +

        '<g class="fig-box"><rect x="0" y="44" width="148" height="76" rx="4"/></g>' +
        '<text x="74" y="76" text-anchor="middle" class="fig-strong" font-size="13">WebSocket</text>' +
        '<text x="74" y="96" text-anchor="middle" class="fig-mute" font-size="11">vehicle positions</text>' +

        '<rect x="196" y="34" width="180" height="96" rx="4" class="fig-gap"/>' +
        '<g class="fig-box"><rect x="196" y="34" width="180" height="96" rx="4"/></g>' +
        '<text x="286" y="68" text-anchor="middle" class="fig-strong" font-size="13">Network layer</text>' +
        '<text x="286" y="90" text-anchor="middle" class="fig-accent" font-size="12">normalised here</text>' +
        '<text x="286" y="112" text-anchor="middle" class="fig-mute" font-size="11">wire shape stops at this line</text>' +

        '<g class="fig-box"><rect x="424" y="44" width="140" height="76" rx="4"/></g>' +
        '<text x="494" y="76" text-anchor="middle" class="fig-strong" font-size="13">Domain</text>' +
        '<text x="494" y="96" text-anchor="middle" class="fig-mute" font-size="11">routes · stops</text>' +

        '<g class="fig-box"><rect x="612" y="44" width="108" height="76" rx="4"/></g>' +
        '<text x="666" y="76" text-anchor="middle" class="fig-strong" font-size="13">SwiftUI</text>' +
        '<text x="666" y="96" text-anchor="middle" class="fig-mute" font-size="11">map view</text>' +

        '<path d="M148 82 H196" class="fig-arrow"/>' +
        '<path d="M376 82 H424" class="fig-arrow"/>' +
        '<path d="M564 82 H612" class="fig-arrow"/>' +

        '<line x1="376" y1="24" x2="376" y2="150" class="fig-accent-line fig-dash"/>' +
        '<text x="386" y="168" class="fig-mute" font-size="11">nothing past this line knows the transport</text>' +

        '<text x="360" y="220" text-anchor="middle" class="fig-accent" font-size="11" font-family="var(--f-mono)" letter-spacing="1.4">ONE PLACE OWNS THE SHAPE OF A LIVE VEHICLE</text>' +
      '</svg>';
      }
    }
  };

  root.FIGURES = FIGURES;
})(typeof window !== 'undefined' ? window : globalThis);
