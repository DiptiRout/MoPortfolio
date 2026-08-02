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
  if (p.study) out.push(`<a class="card-cta" href="case-${esc(p.slug)}.html">Read the case study →</a>`);
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

/* ---------- case studies ----------
   One static page per study, generated from the same PROJECTS objects the
   cards use, so a project can never carry one name on the card and another
   here. These used to be rendered client-side, which meant a case study was
   zero words to anything that did not run JavaScript. */

const FIG = global.window.FIGURES;

function figHTML(key) {
  const f = key && FIG[key];
  if (!f) return '';
  return `<figure class="fig">${f.svg()}` +
         (f.caption ? `<figcaption>${esc(f.caption)}</figcaption>` : '') + '</figure>';
}

const paras = a => (a || []).map(t => `<p>${gaps(t)}</p>`).join('\n      ');

function glanceHTML(s) {
  if (!s.glance || !s.glance.length) return '';
  return `<dl class="glance">
      ${s.glance.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n      ')}
    </dl>`;
}

function studyHTML(p) {
  const s = p.study;
  const f = s.figures || {};
  const hero = MEDIA.primary(p);
  const out = [];

  out.push(`<a class="case-back" href="index.html#work">← All work</a>`);
  out.push(`<div class="case-head"><h1>${esc(p.name)}</h1></div>`);
  out.push(`<p class="case-meta"><span>${esc(p.role)}</span><span>${esc(p.dateRange)}</span><span>${p.platforms.map(esc).join(' · ')}</span></p>`);
  /* The hero visual comes before the standfirst: a reader should see the
     thing before being told about it. */
  if (hero) out.push(`<div class="case-hero">${MEDIA.html(hero, { eager: true })}</div>`);
  out.push(`<p class="case-stand">${esc(s.standfirst)}</p>`);
  out.push(glanceHTML(s));

  out.push('<div class="case-body">');
  out.push(`<h2>The problem</h2>`);
  out.push(paras(s.problem));
  out.push(figHTML(f.problem));

  /* Pulled from the project object, not the study — the card and the study
     must state the same constraint or neither can be trusted. */
  if (p.constraint) {
    out.push(`<h2>The constraint</h2>`);
    out.push(`<p>${gaps(p.constraint)}</p>`);
  }

  out.push(`<h2>The approach</h2>`);
  out.push(paras(s.approach));
  out.push(figHTML(f.approach));

  if (s.decisions && s.decisions.length) {
    out.push(`<h2>The decisions</h2>`);
    out.push(`<ol class="dec">${s.decisions.map(d =>
      `<li><h3>${esc(d.title)}</h3><p>${gaps(d.body)}</p></li>`).join('')}</ol>`);
  }

  out.push(`<h2>The result</h2>`);
  const real = (p.metrics || []).filter(m => m.value !== null && m.value !== undefined);
  if (real.length) {
    out.push(`<ul class="figs case-figs">${real.map(m =>
      `<li><b>${esc(m.value)}</b><span>${esc(m.label)}</span></li>`).join('')}</ul>`);
  }
  out.push(paras(s.outcome));

  if (s.lessons && s.lessons.length) {
    out.push(`<h2>What it taught me</h2>`);
    out.push(`<ul class="takeaways">${s.lessons.map(l => `<li>${gaps(l)}</li>`).join('')}</ul>`);
  }
  if (s.differently && s.differently.length) {
    out.push(`<h2>What I'd do differently</h2>`);
    out.push(paras(s.differently));
  }

  const store = p.links && p.links.appStore;
  out.push(`<div class="case-out">
      ${store ? `<a class="btn" href="${esc(store)}" target="_blank" rel="noopener">App Store<span class="sr-only"> (opens in a new tab)</span> →</a>` : ''}
      <a class="btn" href="index.html#work">All work →</a>
    </div>`);
  out.push('</div>');
  return out.filter(Boolean).join('\n    ');
}

function buildStudies() {
  const tpl = fs.readFileSync(path.join(ROOT, 'case-template.html'), 'utf8');
  const written = [];
  for (const p of PROJECTS) {
    if (!p.study) continue;
    let out = inject(tpl, 'study', studyHTML(p));
    out = out.replace('{{TITLE}}', `${p.name} — case study — Diptiranjan Rout`)
             .replace('{{DESC}}', `How ${p.name} was built: ${p.oneLiner} A case study by Diptiranjan Rout, Apple application developer.`);
    const name = `case-${p.slug}.html`;
    fs.writeFileSync(path.join(ROOT, name), out);
    written.push(name);
  }
  return written;
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

const studies = buildStudies();
studies.forEach(n => console.log('built ' + n));

const selected = PROJECTS.filter(p => p.tier === 'selected').length;
const shots = PROJECTS.flatMap(p => p.media || []).filter(m => !m.ready).length;
console.log(`built index.html — ${selected} work cards, ${SHIPPED.length} ledger groups`);
if (shots) console.log(`  ${shots} media slot(s) still awaiting assets (see ASSETS-TODO.md)`);
