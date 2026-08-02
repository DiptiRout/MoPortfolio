#!/usr/bin/env node
/* ============================================================
   BUILD — bakes projects.js into index.html as static markup.

   Why this exists: the work sections used to be rendered by JS at
   runtime, which meant a crawler, a link preview bot, or anyone with
   JS disabled got two headings and nothing else. Every project on the
   site was invisible to the outside world.

   Hand-writing the cards in HTML would fix that and immediately
   create a second source of truth that drifts. So instead the data
   stays in one file and this script renders it, using the SAME pure
   functions the browser used. Run it after editing projects.js:

       node build.js

   Output is committed, so Cloudflare Pages needs no build step and
   deploys stay a plain static upload. If the generated block ever
   looks stale, re-run this — it is idempotent.

   Everything between the BUILD markers in index.html is generated.
   Do not hand-edit inside them; edit projects.js and re-run.
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

/* The data + render modules are browser globals. Give them a window to
   attach to, then load them exactly as the browser would. */
global.window = global.window || {};
require(path.join(ROOT, 'figures.js'));
require(path.join(ROOT, 'projects.js'));
require(path.join(ROOT, 'media.js'));

const { PROJECTS, SHIPPED, MEDIA } = global.window;
const esc = MEDIA.esc;

/* An unanswered detail written in the same voice as sourced fact reads
   as broken copy. Marked up, it reads as an admitted gap. */
const gaps = s => esc(s).replace(/\[Placeholder:\s*([^\]]*)\]/g,
  (_, body) => `<span class="gap">still to confirm — ${body.trim()}</span>`);

const indent = (html, pad) =>
  html.split('\n').map(l => (l.trim() ? pad + l : l)).join('\n');

/* ---------- #work ---------- */

function metricsHTML(p) {
  const real = (p.metrics || []).filter(m => m.value !== null && m.value !== undefined);
  if (!real.length) return '';
  /* Same treatment as the hero's 10+ / 18 / 90%+ — that pairing of a
     display-face figure over a mono label is the one thing on the page
     that already reads in under a second. */
  return `<ul class="figs">${real.slice(0, 3).map(m =>
    `<li><b>${esc(m.value)}</b><span>${esc(m.label)}</span></li>`).join('')}</ul>`;
}

function linksHTML(p) {
  const out = [];
  if (p.study) out.push(`<a class="card-cta" href="case.html?p=${encodeURIComponent(p.slug)}">Read the case study →</a>`);
  const store = p.links && p.links.appStore;
  if (store) out.push(`<a class="card-cta ghost" href="${esc(store)}" target="_blank" rel="noopener">App Store<span class="sr-only"> (opens in a new tab)</span> →</a>`);
  return out.length ? `<div class="card-links">${out.join('')}</div>` : '';
}

function cardHTML(p, i) {
  const n = String(i + 1).padStart(2, '0');
  /* The first card's visual is the one likely above the fold on a
     laptop, so it alone loads eagerly. */
  const media = MEDIA.primary(p);
  const vis = media ? MEDIA.html(media, { eager: i === 0 }) : '';

  return `
<article class="card" id="work-${esc(p.slug)}">
  <div class="card-vis">${vis}</div>
  <div class="card-body">
    <span class="idx" aria-hidden="true">${n}</span>
    <span class="owner${p.mine ? ' owner-mine' : ''}">${esc(p.ownership)}</span>
    <h3>${esc(p.name)}</h3>
    <p class="one">${esc(p.oneLiner)}</p>
    <p class="card-meta">${esc(p.role)} · ${esc(p.dateRange)} · ${p.platforms.map(esc).join(' · ')}</p>
    ${metricsHTML(p)}
    <ul class="tags">${p.stack.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    <p class="arch"><span class="lbl">How it's built</span>${gaps(p.architecture)}</p>
    ${linksHTML(p)}
  </div>
</article>`;
}

function buildWork() {
  /* Owned work leads. Anyone judging whether this person can carry a
     product end to end should meet the one he built alone first. */
  const ordered = PROJECTS
    .filter(p => p.tier === 'selected')
    .sort((a, b) => (b.mine ? 1 : 0) - (a.mine ? 1 : 0));
  return ordered.map(cardHTML).join('\n');
}

/* ---------- #shipped ---------- */

function ledgerHTML(g) {
  return `
<div class="led-group">
  <h3 class="led-domain">${esc(g.domain)}</h3>
  <ul class="led-apps">
    ${g.apps.map(a => {
      const inner =
        `<span class="led-name">${esc(a.name)}</span>` +
        (a.note ? `<span class="led-note">${esc(a.note)}</span>` : '') +
        (a.year ? `<span class="led-year">${esc(a.year)}</span>` : '');
      /* An app whose listing has gone renders as plain text rather than
         a link that 404s — five of the early ones are already dead. */
      return `<li>${a.url
        ? `<a href="${esc(a.url)}" target="_blank" rel="noopener" class="led-live">${inner}<span class="sr-only"> (opens in a new tab)</span></a>`
        : inner}</li>`;
    }).join('\n    ')}
  </ul>
</div>`;
}

function buildShipped() {
  return SHIPPED.map(ledgerHTML).join('\n');
}

/* ---------- inject ---------- */

function inject(html, name, body) {
  const start = `<!-- BUILD:${name}:start -->`;
  const end = `<!-- BUILD:${name}:end -->`;
  const i = html.indexOf(start);
  const j = html.indexOf(end);
  if (i === -1 || j === -1) throw new Error(`missing BUILD markers for "${name}" in index.html`);
  const pad = ' '.repeat(6);
  return html.slice(0, i + start.length) +
         '\n' + indent(body.trim(), pad) + '\n' + pad +
         html.slice(j);
}

const file = path.join(ROOT, 'index.html');
let html = fs.readFileSync(file, 'utf8');
html = inject(html, 'cards', buildWork());
html = inject(html, 'ledger', buildShipped());
fs.writeFileSync(file, html);

const selected = PROJECTS.filter(p => p.tier === 'selected').length;
const shots = PROJECTS.flatMap(p => p.media || []).filter(m => !m.ready).length;
console.log(`built index.html — ${selected} work cards, ${SHIPPED.length} ledger groups`);
if (shots) console.log(`  ${shots} media slot(s) still awaiting assets (see ASSETS-TODO.md)`);
