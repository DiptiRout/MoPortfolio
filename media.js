/* ============================================================
   MEDIA — one renderer for every visual on the site.

   `mediaHTML(item)` is a PURE function: media object in, HTML string
   out. Nothing in here touches the DOM. That is deliberate — today
   index.html calls it at runtime, but the same function can be called
   by a build script to bake the markup into the HTML file instead.
   Keeping it pure is what makes that switch a one-line change rather
   than a rewrite. (See ASSETS-TODO.md — the no-JS question.)

   ── MEDIA OBJECT ───────────────────────────────────────────
   kind     'shot'    a real screenshot, rendered in a CSS device frame
            'diagram' an inline SVG figure (client work — no branded UI)
            'video'   an autoplaying muted loop with a poster frame
   slot     stable asset name, no extension. 'momudra-home' resolves to
            shots/momudra-home.avif / .webp / .png at each width.
   w, h     INTRINSIC pixel size of the source capture. Always set both:
            they give the browser the aspect ratio before the bytes
            arrive, which is what stops the page jumping as images load.
   widths   which derivative widths exist, for srcset. Omit for 1x only.
   alt      real description of what is IN the image. Never the project
            name alone — a screen reader user gets nothing from "MoMudra".
            Empty string ONLY if the image is decorative, which none are.
   caption  optional visible line beneath.
   ready    false until the file actually exists on disk. A false slot
            renders a marked placeholder at the exact final aspect ratio,
            so the layout does not move when the real asset lands.

   A missing asset must never render as a broken image, and never as a
   stock photo. An honest empty frame is better than either.
   ============================================================ */
(function (root) {
  'use strict';

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  /* Widest-first is required: the browser takes the FIRST <source> whose
     type it understands, so putting png first would mean nobody ever
     gets avif. */
  var FORMATS = [
    { ext: 'avif', type: 'image/avif' },
    { ext: 'webp', type: 'image/webp' }
  ];

  function srcsetFor(slot, ext, widths) {
    return widths.map(function (w) {
      return 'shots/' + slot + '-' + w + '.' + ext + ' ' + w + 'w';
    }).join(', ');
  }

  /* An empty frame that states plainly what belongs in it. Marked as
     aria-hidden because a placeholder is a note to Dipti, not content a
     visitor's screen reader should have to sit through. */
  function placeholder(m) {
    var label = m.placeholderLabel || (m.kind === 'diagram' ? 'Diagram to be drawn' : 'Screenshot to be captured');
    return '' +
      '<div class="media media-ph" style="aspect-ratio:' + m.w + '/' + m.h + '" data-kind="' + esc(m.kind) + '">' +
        '<span class="media-ph-mark" aria-hidden="true">' + esc(label) + '</span>' +
        '<span class="media-ph-slot" aria-hidden="true">' + esc(m.slot || '—') + '</span>' +
      '</div>';
  }

  function shot(m, opts) {
    var widths = m.widths && m.widths.length ? m.widths : null;
    var fallbackExt = m.fallbackExt || 'png';
    var sizes = m.sizes || opts.sizes || '(max-width: 860px) 90vw, 380px';
    var loading = opts.eager ? '' : ' loading="lazy"';
    var fetchpri = opts.eager ? ' fetchpriority="high"' : '';

    var sources = FORMATS.map(function (f) {
      if (!widths) return '<source type="' + f.type + '" srcset="shots/' + m.slot + '.' + f.ext + '">';
      return '<source type="' + f.type + '" srcset="' + srcsetFor(m.slot, f.ext, widths) + '" sizes="' + esc(sizes) + '">';
    }).join('');

    var fallbackSrcset = widths
      ? ' srcset="' + srcsetFor(m.slot, fallbackExt, widths) + '" sizes="' + esc(sizes) + '"'
      : '';
    var fallbackSrc = widths
      ? 'shots/' + m.slot + '-' + widths[widths.length - 1] + '.' + fallbackExt
      : 'shots/' + m.slot + '.' + fallbackExt;

    return '' +
      '<figure class="media media-shot"' + (m.frame === false ? '' : ' data-frame="device"') + '>' +
        '<picture>' + sources +
          '<img src="' + esc(fallbackSrc) + '"' + fallbackSrcset +
            ' width="' + m.w + '" height="' + m.h + '"' + loading + fetchpri +
            ' decoding="async" alt="' + esc(m.alt) + '">' +
        '</picture>' +
        (m.caption ? '<figcaption>' + esc(m.caption) + '</figcaption>' : '') +
      '</figure>';
  }

  function video(m, opts) {
    /* Muted + playsinline + loop is the only combination iOS will start
       on its own. poster carries the first frame so the block is never
       blank, and the explicit dimensions keep the ratio reserved. */
    return '' +
      '<figure class="media media-video">' +
        '<video width="' + m.w + '" height="' + m.h + '" autoplay muted loop playsinline' +
          ' preload="metadata" poster="shots/' + esc(m.slot) + '-poster.jpg"' +
          ' aria-label="' + esc(m.alt) + '">' +
          '<source src="shots/' + esc(m.slot) + '.mp4" type="video/mp4">' +
        '</video>' +
        (m.caption ? '<figcaption>' + esc(m.caption) + '</figcaption>' : '') +
      '</figure>';
  }

  function mediaHTML(m, opts) {
    if (!m) return '';
    opts = opts || {};
    if (!m.ready) return placeholder(m);
    if (m.kind === 'video') return video(m, opts);
    if (m.kind === 'diagram') return m.svg ? '<figure class="media media-diagram">' + m.svg + '</figure>' : placeholder(m);
    return shot(m, opts);
  }

  /* The first visual a project has, or null. Cards want exactly one. */
  function primaryMedia(p) {
    return (p.media && p.media.length) ? p.media[0] : null;
  }

  root.MEDIA = { html: mediaHTML, primary: primaryMedia, esc: esc };
})(window);
