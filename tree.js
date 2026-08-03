/* ============================================================
   THE KNOWLEDGE TREE

   One interactive component in place of the journey stills: an abstract
   tree that grows as The Path is read, carrying every technology as a
   fruit and every Apple platform as a device node.

   Written in plain SVG + JS to match the rest of this site — no framework,
   no bundler, no dependency. The motion uses Framer Motion's own default
   spring (stiffness 170, damping 26) integrated by hand, so the feel is
   the same without shipping a library to get it.

   Everything below is DATA. Positions are computed from the branch curves,
   never hand-placed, so adding a technology is one line here and nothing
   else. Connections are data too — no animation is hardcoded.

   Deliberately absent: Apple Watch and watchOS. Dipti has not shipped a
   watchOS app, and the hero figure dropped it for exactly that reason. A
   knowledge tree claiming a platform the rest of the site admits to not
   having would undo that.
   ============================================================ */
(function (root) {
  'use strict';

  /* Branch curves, in a 600x900 (2:3) viewBox. Ground sits at y=700.
     Each is a cubic from the trunk outward; fruits ride these curves at a
     parametric t, so the layout is derived rather than typed twice. */
  var BRANCHES = [
    { id: 0, from: 0.10, d: 'M300,560 C 296,486 250,452 196,404' },
    { id: 1, from: 0.10, d: 'M300,566 C 304,492 352,458 408,412' },
    { id: 2, from: 0.30, d: 'M300,500 C 296,436 236,404 158,378' },
    { id: 3, from: 0.30, d: 'M300,494 C 306,430 368,398 446,374' },
    { id: 4, from: 0.05, d: 'M300,600 C 300,500 300,380 300,236' },
    { id: 5, from: 0.55, d: 'M300,430 C 294,360 244,318 206,268' },
    { id: 6, from: 0.55, d: 'M300,424 C 308,354 358,314 398,262' }
  ];

  /* kind: 'fruit'  a knowledge area
            'device' an Apple platform
     at:   scroll progress (0..1) at which it has grown in
     b:    which branch it rides,  t: how far along that branch
     off:  small perpendicular offset so fruits do not sit on the line */
  var NODES = [
    /* ---- the beginning: 2016, Objective-C and the tools ---- */
    { id:'objc',    label:'Objective-C',     kind:'fruit',  at:0.04, b:4, t:0.30, size:'sm', drop:32 },
    { id:'xcode',   label:'Xcode',           kind:'fruit',  at:0.06, b:4, t:0.46, size:'sm', drop:34 },
    { id:'uikit',   label:'UIKit',           kind:'fruit',  at:0.10, b:0, t:0.42, size:'md', drop:30 },
    { id:'git',     label:'Git',             kind:'fruit',  at:0.12, b:1, t:0.38, size:'sm', drop:32 },
    { id:'coredata',label:'Core Data',       kind:'fruit',  at:0.16, b:0, t:0.66, size:'sm', drop:30 },
    { id:'mac',     label:'MacBook',         kind:'device', at:0.08, b:4, t:0.62, size:'sm', drop:20 },
    { id:'iphone',  label:'iPhone',          kind:'device', at:0.14, b:0, t:0.92, size:'lg', drop:16 },

    /* ---- Swift arrives, and structure with it ---- */
    { id:'swift',   label:'Swift',           kind:'fruit',  at:0.26, b:1, t:0.62, size:'lg', drop:32 },
    { id:'network', label:'Networking',      kind:'fruit',  at:0.30, b:1, t:0.84, size:'sm', drop:30 },
    { id:'mvvm',    label:'MVVM',            kind:'fruit',  at:0.34, b:3, t:0.40, size:'sm', drop:32 },
    { id:'testing', label:'Testing',         kind:'fruit',  at:0.38, b:4, t:0.66, size:'md', drop:36 },
    { id:'ipad',    label:'iPad',            kind:'device', at:0.32, b:2, t:0.92, size:'sm', drop:16 },

    /* ---- money on the line: architecture becomes the job ---- */
    { id:'arch',    label:'Architecture',    kind:'fruit',  at:0.46, b:3, t:0.62, size:'lg', drop:32 },
    { id:'a11y',    label:'Accessibility',   kind:'fruit',  at:0.52, b:2, t:0.52, size:'md', drop:32 },
    { id:'appletv', label:'Apple TV',        kind:'device', at:0.50, b:3, t:0.92, size:'sm', drop:16 },

    /* ---- scale: one codebase, many brands ---- */
    { id:'swiftui', label:'SwiftUI',         kind:'fruit',  at:0.60, b:5, t:0.46, size:'lg', drop:32 },
    { id:'clean',   label:'Clean Architecture', kind:'fruit', at:0.64, b:3, t:0.82, size:'sm', drop:34 },
    { id:'conc',    label:'Concurrency',     kind:'fruit',  at:0.68, b:6, t:0.44, size:'sm', drop:32 },
    { id:'spm',     label:'SPM',             kind:'fruit',  at:0.70, b:6, t:0.66, size:'sm', drop:30 },
    { id:'perf',    label:'Performance',     kind:'fruit',  at:0.72, b:2, t:0.74, size:'sm', drop:30 },
    { id:'cicd',    label:'CI/CD',           kind:'fruit',  at:0.74, b:4, t:0.80, size:'sm', drop:36 },
    { id:'fastlane',label:'Fastlane',        kind:'fruit',  at:0.76, b:4, t:0.90, size:'sm', drop:34 },
    { id:'widgets', label:'Widgets',         kind:'fruit',  at:0.78, b:5, t:0.70, size:'sm', drop:30 },
    { id:'vision',  label:'Vision Pro',      kind:'device', at:0.82, b:6, t:0.94, size:'md', drop:16 },

    /* ---- shipped alone: the newest growth ---- */
    { id:'storekit',label:'StoreKit',        kind:'fruit',  at:0.86, b:5, t:0.88, size:'md', drop:32 },
    { id:'ml',      label:'Core ML',         kind:'fruit',  at:0.90, b:6, t:0.86, size:'md', drop:32 },
    { id:'live',    label:'Live Activities', kind:'fruit',  at:0.94, b:5, t:0.28, size:'sm', drop:32 },
    { id:'clips',   label:'App Clips',       kind:'fruit',  at:0.96, b:6, t:0.26, size:'sm', drop:30 }
  ];

  /* Undirected association. Hovering either end lights the line and the
     node at the other end. */
  var LINKS = [
    ['swiftui','swift'], ['swiftui','uikit'], ['swiftui','xcode'],
    ['swiftui','vision'], ['swiftui','widgets'], ['swiftui','live'],
    ['swift','objc'], ['swift','conc'], ['swift','spm'], ['swift','xcode'],
    ['uikit','iphone'], ['uikit','ipad'], ['uikit','a11y'],
    ['arch','mvvm'], ['arch','clean'], ['arch','spm'], ['arch','testing'],
    ['mvvm','clean'], ['clean','testing'],
    ['testing','cicd'], ['cicd','fastlane'], ['cicd','git'], ['git','xcode'],
    ['storekit','testing'], ['storekit','iphone'], ['storekit','xcode'],
    ['network','coredata'], ['coredata','iphone'],
    ['perf','conc'], ['perf','testing'], ['a11y','appletv'], ['a11y','iphone'],
    ['ml','vision'], ['ml','iphone'],
    ['mac','xcode'], ['mac','swift'], ['mac','testing'], ['mac','git'], ['mac','spm'],
    ['iphone','widgets'], ['iphone','swiftui'],
    ['ipad','swiftui'], ['ipad','a11y'],
    ['appletv','swiftui'], ['appletv','arch'],
    ['vision','conc'], ['vision','perf']
  ];

  /* An ordered progression, shown as a small stack beside the node. Used
     where the interesting thing is the SEQUENCE, not the association —
     which no amount of connecting lines can convey. */
  var CHAINS = {
    arch:     ['MVC', 'MVVM', 'Clean Architecture', 'Dependency Injection', 'Modular'],
    storekit: ['Idea', 'Prototype', 'Xcode', 'Testing', 'TestFlight', 'App Store Connect', 'Review', 'Live'],
    vision:   ['SwiftUI', 'RealityKit', 'ARKit', 'Metal', 'Apple Vision Pro']
  };

  /* Below the ground. Never named on the surface — you have to go looking,
     which is the point of calling them foundations. */
  var ROOTS = [
    'Curiosity', 'Discipline', 'Problem solving', 'Consistency',
    'Learning', 'Debugging', 'Architecture thinking', 'Attention to detail'
  ];

  root.KNOWLEDGE = {
    branches: BRANCHES, nodes: NODES, links: LINKS,
    chains: CHAINS, roots: ROOTS,
    view: { w: 600, h: 900, ground: 700, trunkX: 300 }
  };
})(typeof window !== 'undefined' ? window : globalThis);


/* ============================================================
   RENDERER — an industrial-design object, not a botanical one.

   No bark, no leaves, no grass, no fruit. Aluminium-like strokes, smooth
   continuous curves, and glass spheres suspended on invisible filaments.

   The one structurally interesting part: a connection does NOT draw a
   straight line between two spheres. It is routed DOWN the branch its
   sphere hangs from, through the trunk junction, and back UP the other
   branch — so the light travels through the structure the way current
   travels through a wire. Straight chords between nodes would have made
   this a network graph, which is the thing the brief rules out.

   Motion is a hand-integrated spring on Framer Motion's defaults
   (stiffness 170, damping 26). Everything animated is opacity, transform
   or stroke-dashoffset.
   ============================================================ */
(function tree(){
  'use strict';
  var host = document.getElementById('knowledgeTree');
  if (!host || !window.KNOWLEDGE) return;

  var K = window.KNOWLEDGE, V = K.view;
  var NS = 'http://www.w3.org/2000/svg';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var section = document.querySelector('.path-grid') || document.getElementById('path');
  var R = { lg: 13, md: 9.5, sm: 6.6 };

  function el(n, a){ var e = document.createElementNS(NS, n);
    for (var k in a) if (a[k] != null) e.setAttribute(k, a[k]); return e; }

  var svg = el('svg', { viewBox:'0 0 '+V.w+' '+V.h, class:'ktree', role:'img',
    'aria-label':'An abstract sculpture: glass spheres suspended from flowing metal branches, each sphere a technology learned across ten years.' });

  /* glass + glow, defined once */
  var defs = el('defs');
  defs.innerHTML =
    '<radialGradient id="ktGlass" cx="34%" cy="28%" r="78%">' +
      '<stop offset="0%"  stop-color="#fff" stop-opacity=".55"/>' +
      '<stop offset="42%" stop-color="#fff" stop-opacity=".14"/>' +
      '<stop offset="100%" stop-color="#fff" stop-opacity=".05"/>' +
    '</radialGradient>' +
    '<radialGradient id="ktCore" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%"  stop-color="var(--haldi)" stop-opacity=".55"/>' +
      '<stop offset="100%" stop-color="var(--haldi)" stop-opacity="0"/>' +
    '</radialGradient>' +
    '<filter id="ktSoft" x="-60%" y="-60%" width="220%" height="220%">' +
      '<feGaussianBlur stdDeviation="3.2"/></filter>';
  svg.appendChild(defs);

  var gBranch = el('g', { class:'kt-branches' });
  var gLit    = el('g', { class:'kt-lit' });        /* illuminated branch */
  var gFlow   = el('g', { class:'kt-flow' });       /* travelling energy */
  var gFil    = el('g', { class:'kt-filaments' });
  var gNodes  = el('g', { class:'kt-nodes' });
  var gRoots  = el('g', { class:'kt-roots' });
  [gRoots, gBranch, gLit, gFlow, gFil, gNodes].forEach(function(g){ svg.appendChild(g); });
  host.appendChild(svg);

  /* ---- structure ---- */
  var trunk = el('path', { class:'kt-trunk', 'pathLength':1,
    d:'M300,'+V.ground+' C 297,'+(V.ground-80)+' 303,'+(V.ground-140)+' 300,556' });
  gBranch.appendChild(trunk);

  var branchEls = {};
  K.branches.forEach(function(b){
    var p = el('path', { d:b.d, class:'kt-branch', 'pathLength':1 });
    branchEls[b.id] = p; gBranch.appendChild(p);
  });

  var rootDefs = [
    'M300,700 C 286,742 246,760 208,798','M300,700 C 314,742 354,760 392,798',
    'M300,700 C 292,750 274,786 262,836','M300,700 C 308,750 326,786 338,836',
    'M300,700 C 272,730 232,738 190,748','M300,700 C 328,730 368,738 410,748',
    'M300,700 C 296,754 300,800 300,852','M300,700 C 282,738 258,770 236,812'
  ];
  var rootEls = rootDefs.map(function(d){
    var p = el('path', { d:d, class:'kt-root', 'pathLength':1 });
    gRoots.appendChild(p); return p;
  });
  var rootLabels = K.roots.map(function(name, i){
    var t = el('text', { class:'kt-root-label', 'text-anchor':'middle' });
    t.textContent = name; gRoots.appendChild(t); return t;
  });

  function at(pathEl, t){
    var L = pathEl.getTotalLength();
    return pathEl.getPointAtLength(L * Math.max(0, Math.min(1, t)));
  }

  /* ---- spheres, hanging from filaments ---- */
  var nodes = K.nodes.map(function(n){
    var anchor = at(branchEls[n.b], n.t);
    var x = anchor.x, y = anchor.y + n.drop;
    var r = R[n.size] || R.sm;

    var fil = el('line', { class:'kt-filament', x1:anchor.x.toFixed(1), y1:anchor.y.toFixed(1),
                           x2:x.toFixed(1), y2:(y - r).toFixed(1) });
    gFil.appendChild(fil);

    var g = el('g', { class:'kt-node kt-'+n.size, tabindex:0, role:'button', 'aria-label':n.label });
    g.appendChild(el('circle', { class:'kt-bloom', r:r*2.6, fill:'url(#ktCore)', filter:'url(#ktSoft)' }));
    g.appendChild(el('circle', { class:'kt-glass', r:r, fill:'url(#ktGlass)' }));
    g.appendChild(el('circle', { class:'kt-rim',   r:r }));
    g.appendChild(el('circle', { class:'kt-spec',  r:r*0.34, cx:-r*0.3, cy:-r*0.34 }));
    g.__id = n.id;
    gNodes.appendChild(g);

    return { data:n, g:g, fil:fil, x:x, y:y, r:r, anchor:anchor,
             on:0, v:0, hov:0, hv:0, phase:Math.random()*Math.PI*2 };
  });
  var byId = {}; nodes.forEach(function(n){ byId[n.data.id] = n; });

  /* ---- connections routed THROUGH the branches ---- */
  function routeThrough(a, b){
    var pts = [], i, N = 16;
    pts.push({ x:a.x, y:a.y - a.r });                 /* up the filament */
    if (a.data.b === b.data.b){
      var pa = branchEls[a.data.b];
      var lo = Math.min(a.data.t, b.data.t), hi = Math.max(a.data.t, b.data.t);
      for (i = 0; i <= N; i++) pts.push(at(pa, lo + (hi - lo) * (i / N)));
    } else {
      var p1 = branchEls[a.data.b], p2 = branchEls[b.data.b];
      for (i = 0; i <= N; i++) pts.push(at(p1, a.data.t * (1 - i / N)));   /* down to the junction */
      for (i = 0; i <= N; i++) pts.push(at(p2, b.data.t * (i / N)));       /* and up the other */
    }
    pts.push({ x:b.x, y:b.y - b.r });                 /* down the far filament */
    return 'M' + pts.map(function(p){ return p.x.toFixed(1)+','+p.y.toFixed(1); }).join(' L');
  }

  var links = K.links.map(function(pair){
    var a = byId[pair[0]], b = byId[pair[1]];
    if (!a || !b) return null;
    var d = routeThrough(a, b);
    var lit  = el('path', { class:'kt-lit-path',  d:d, 'pathLength':1 });
    var flow = el('path', { class:'kt-flow-path', d:d, 'pathLength':1 });
    gLit.appendChild(lit); gFlow.appendChild(flow);
    return { a:pair[0], b:pair[1], lit:lit, flow:flow, on:0, v:0, target:0, t:0 };
  }).filter(Boolean);

  /* ---- the information card: glass, beside the sphere, never a tooltip ---- */
  var card = document.createElement('div');
  card.className = 'kt-card';
  card.setAttribute('aria-live', 'polite');
  host.appendChild(card);

  function showCard(n){
    if (!n){ card.classList.remove('is-on'); return; }
    var related = K.links.reduce(function(acc, l){
      if (l[0] === n.data.id && byId[l[1]]) acc.push(byId[l[1]].data.label);
      if (l[1] === n.data.id && byId[l[0]]) acc.push(byId[l[0]].data.label);
      return acc;
    }, []);
    var chain = K.chains[n.data.id];
    card.innerHTML =
      '<p class="kt-card-title">' + n.data.label + '</p>' +
      (chain ? '<ol class="kt-card-chain">' + chain.map(function(c){ return '<li>'+c+'</li>'; }).join('') + '</ol>'
             : '<p class="kt-card-list">' + related.slice(0,6).join(' · ') + '</p>');
    /* clamp inside the stage: flip to the other side near an edge */
    var lx = (n.x / V.w) * 100, ly = (n.y / V.h) * 100;
    card.classList.toggle('flip', lx > 54);
    card.style.left = lx.toFixed(2) + '%';
    card.style.top  = ly.toFixed(2) + '%';
    card.classList.add('is-on');
  }

  /* ---- state ---- */
  var progress = 0, pShown = 0, pVel = 0, hovered = null;
  var rootsOn = 0, rootsVel = 0, rootsTarget = 0, raf = 0, clock = 0;

  function spring(cur, vel, target, dt){
    vel += (-170 * (cur - target) - 26 * vel) * dt;
    return [cur + vel * dt, vel];
  }
  function scrollProgress(){
    if (!section) return 1;
    var r = section.getBoundingClientRect();
    var span = (r.height - innerHeight) * 0.86;
    if (span <= 0) return r.top < innerHeight * 0.5 ? 1 : 0;
    return Math.max(0, Math.min(1, (innerHeight * 0.45 - r.top) / span));
  }

  function setHover(id){
    if (hovered === id) return;
    hovered = id;
    host.classList.toggle('is-focused', !!id);
    nodes.forEach(function(n){
      var rel = id && (n.data.id === id || K.links.some(function(l){
        return (l[0] === id && l[1] === n.data.id) || (l[1] === id && l[0] === n.data.id); }));
      n.g.classList.toggle('is-lit', !!rel);
      n.g.classList.toggle('is-self', n.data.id === id);
      n.fil.classList.toggle('is-lit', !!rel);
    });
    links.forEach(function(l){
      var on = id && (l.a === id || l.b === id);
      l.target = on ? 1 : 0;
      if (on) l.t = 0;                     /* restart the travel */
    });
    showCard(id ? byId[id] : null);
    kick();
  }
  function kick(){ if (!raf) raf = requestAnimationFrame(frame); }

  function frame(){
    raf = 0;
    var dt = 1/60, moving = false;
    clock += dt;

    var sp = spring(pShown, pVel, progress, dt);
    pShown = RM ? progress : sp[0]; pVel = RM ? 0 : sp[1];
    if (Math.abs(pShown - progress) > 0.0004) moving = true;

    trunk.style.strokeDashoffset = String(1 - Math.min(1, pShown * 1.7));
    K.branches.forEach(function(b){
      branchEls[b.id].style.strokeDashoffset =
        String(1 - Math.max(0, Math.min(1, (pShown - b.from) / (1 - b.from))));
    });
    rootEls.forEach(function(p, i){
      p.style.strokeDashoffset =
        String(1 - Math.max(0, Math.min(1, (pShown - 0.05 - i*0.03) / 0.5)));
    });

    nodes.forEach(function(n){
      var want = Math.max(0, Math.min(1, (pShown - n.data.at) / 0.10));
      var s = spring(n.on, n.v, want, dt); n.on = s[0]; n.v = s[1];
      if (Math.abs(n.on - want) > 0.001) moving = true;

      var hoverWant = n.g.classList.contains('is-self') ? 1 : 0;
      var h = spring(n.hov, n.hv, hoverWant, dt); n.hov = h[0]; n.hv = h[1];
      if (Math.abs(n.hov - hoverWant) > 0.001) moving = true;

      /* barely-there float: a slow vertical drift, never a swing */
      var fy = RM ? 0 : Math.sin(clock * 0.55 + n.phase) * 1.4;
      var sc = (0.55 + 0.45 * Math.min(1, n.on)) * (1 + 0.06 * n.hov);
      n.g.style.opacity = String(Math.max(0, n.on));
      n.g.setAttribute('transform',
        'translate(' + n.x.toFixed(1) + ',' + (n.y + fy).toFixed(2) + ') scale(' + sc.toFixed(3) + ')');
      n.fil.setAttribute('y2', (n.y + fy - n.r * sc).toFixed(2));
      n.fil.style.opacity = String(Math.max(0, n.on) * 0.5);
    });

    links.forEach(function(l){
      var s = spring(l.on, l.v, l.target, dt); l.on = s[0]; l.v = s[1];
      if (Math.abs(l.on - l.target) > 0.002) moving = true;
      var o = Math.max(0, Math.min(1, l.on));
      l.lit.style.opacity = String(o * 0.5);
      l.lit.style.strokeDashoffset = String(1 - o);

      /* a short bright segment travelling the routed path */
      if (o > 0.02){
        if (!RM) l.t = (l.t + dt * 0.62) % 1.35;
        l.flow.style.opacity = String(o);
        l.flow.style.strokeDasharray = '0.12 0.88';
        l.flow.style.strokeDashoffset = String(1 - l.t);
        moving = true;
      } else {
        l.flow.style.opacity = '0';
      }
    });

    var rs = spring(rootsOn, rootsVel, rootsTarget, dt);
    rootsOn = rs[0]; rootsVel = rs[1];
    if (Math.abs(rootsOn - rootsTarget) > 0.002) moving = true;
    gRoots.style.setProperty('--rootsOn', Math.max(0, Math.min(1, rootsOn)).toFixed(3));

    if (moving || (!RM && pShown > 0.02)) raf = requestAnimationFrame(frame);
  }

  /* ---- input ---- */
  nodes.forEach(function(n){
    n.g.addEventListener('pointerenter', function(){ setHover(n.data.id); });
    n.g.addEventListener('pointerleave', function(){ setHover(null); });
  });
  host.addEventListener('focusin', function(e){
    var g = e.target.closest && e.target.closest('.kt-node');
    if (g && g.__id) setHover(g.__id);
  });
  /* focus/focusin never fire for a focused SVG <g> in some engines —
     activeElement updates but no event is dispatched — so keyboard
     movement is read straight off activeElement. */
  addEventListener('keyup', function(e){
    if (e.key !== 'Tab' && e.key.indexOf('Arrow') !== 0) return;
    var a = document.activeElement;
    var g = a && a.closest ? a.closest('.kt-node') : null;
    setHover(g && g.__id ? g.__id : null);
  }, { passive:true });

  gRoots.addEventListener('pointerenter', function(){ rootsTarget = 1; kick(); });
  gRoots.addEventListener('pointerleave', function(){ rootsTarget = 0; kick(); });

  var ticking = false;
  addEventListener('scroll', function(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){ ticking = false; progress = scrollProgress(); kick(); });
  }, { passive:true });
  addEventListener('resize', function(){ progress = scrollProgress(); kick(); }, { passive:true });

  rootEls.forEach(function(p, i){
    if (!rootLabels[i]) return;
    var pt = at(p, 0.94);
    rootLabels[i].setAttribute('x', pt.x.toFixed(1));
    rootLabels[i].setAttribute('y', (pt.y + 13).toFixed(1));
  });

  progress = scrollProgress();
  kick();
})();
