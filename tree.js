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
    { id:'objc',    label:'Objective-C',     kind:'fruit',  at:0.04, b:4, t:0.30, off:-16 },
    { id:'xcode',   label:'Xcode',           kind:'fruit',  at:0.06, b:4, t:0.46, off: 18 },
    { id:'uikit',   label:'UIKit',           kind:'fruit',  at:0.10, b:0, t:0.42, off:-14 },
    { id:'git',     label:'Git',             kind:'fruit',  at:0.12, b:1, t:0.38, off: 16 },
    { id:'coredata',label:'Core Data',       kind:'fruit',  at:0.16, b:0, t:0.66, off: 14 },
    { id:'mac',     label:'MacBook',         kind:'device', at:0.08, b:4, t:0.62, off:-26 },
    { id:'iphone',  label:'iPhone',          kind:'device', at:0.14, b:0, t:0.92, off:  0 },

    /* ---- Swift arrives, and structure with it ---- */
    { id:'swift',   label:'Swift',           kind:'fruit',  at:0.26, b:1, t:0.62, off:-16 },
    { id:'network', label:'Networking',      kind:'fruit',  at:0.30, b:1, t:0.84, off: 14 },
    { id:'mvvm',    label:'MVVM',            kind:'fruit',  at:0.34, b:3, t:0.40, off:-16 },
    { id:'testing', label:'Testing',         kind:'fruit',  at:0.38, b:4, t:0.66, off: 20 },
    { id:'ipad',    label:'iPad',            kind:'device', at:0.32, b:2, t:0.92, off:  0 },

    /* ---- money on the line: architecture becomes the job ---- */
    { id:'arch',    label:'Architecture',    kind:'fruit',  at:0.46, b:3, t:0.62, off: 16 },
    { id:'a11y',    label:'Accessibility',   kind:'fruit',  at:0.52, b:2, t:0.52, off:-16 },
    { id:'appletv', label:'Apple TV',        kind:'device', at:0.50, b:3, t:0.92, off:  0 },

    /* ---- scale: one codebase, many brands ---- */
    { id:'swiftui', label:'SwiftUI',         kind:'fruit',  at:0.60, b:5, t:0.46, off:-16 },
    { id:'clean',   label:'Clean Architecture', kind:'fruit', at:0.64, b:3, t:0.82, off: 18 },
    { id:'conc',    label:'Concurrency',     kind:'fruit',  at:0.68, b:6, t:0.44, off: 16 },
    { id:'spm',     label:'SPM',             kind:'fruit',  at:0.70, b:6, t:0.66, off: 14 },
    { id:'perf',    label:'Performance',     kind:'fruit',  at:0.72, b:2, t:0.74, off: 14 },
    { id:'cicd',    label:'CI/CD',           kind:'fruit',  at:0.74, b:4, t:0.80, off:-20 },
    { id:'fastlane',label:'Fastlane',        kind:'fruit',  at:0.76, b:4, t:0.90, off: 18 },
    { id:'widgets', label:'Widgets',         kind:'fruit',  at:0.78, b:5, t:0.70, off: 14 },
    { id:'vision',  label:'Vision Pro',      kind:'device', at:0.82, b:6, t:0.94, off:  0 },

    /* ---- shipped alone: the newest growth ---- */
    { id:'storekit',label:'StoreKit',        kind:'fruit',  at:0.86, b:5, t:0.88, off:-16 },
    { id:'ml',      label:'Core ML',         kind:'fruit',  at:0.90, b:6, t:0.86, off: 16 },
    { id:'live',    label:'Live Activities', kind:'fruit',  at:0.94, b:5, t:0.28, off: 16 },
    { id:'clips',   label:'App Clips',       kind:'fruit',  at:0.96, b:6, t:0.26, off:-14 }
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
   RENDERER

   Builds the SVG from the data above, grows it against scroll progress
   through The Path, and handles hover/focus reveals.

   Motion is a hand-integrated spring using Framer Motion's defaults
   (stiffness 170, damping 26). Everything animated is opacity, transform
   or stroke-dashoffset — all compositor-friendly, no layout reads inside
   the frame loop.
   ============================================================ */
(function tree(){
  'use strict';
  var host = document.getElementById('knowledgeTree');
  if (!host || !window.KNOWLEDGE) return;

  var K = window.KNOWLEDGE, V = K.view;
  var NS = 'http://www.w3.org/2000/svg';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* Progress is measured against the STICKY CONTAINER, not the whole
     section. #path is 1960px tall but the tree only sticks for the 1150px
     of .path-grid — measuring the section meant the tree reached about 59%
     growth and then scrolled away, so its mature state was never seen. */
  var section = document.querySelector('.path-grid') || document.getElementById('path');

  function el(name, attrs){
    var n = document.createElementNS(NS, name);
    for (var k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    return n;
  }

  /* ---- geometry: sample the branch curves so nodes ride them ---- */
  var svg = el('svg', {
    viewBox: '0 0 ' + V.w + ' ' + V.h,
    class: 'ktree',
    role: 'img',
    'aria-label': 'A tree whose branches carry the technologies learned across ten years, and whose roots carry the habits underneath them.'
  });

  var gRoots    = el('g', { class:'kt-roots' });
  var gBranches = el('g', { class:'kt-branches' });
  var gLeaves   = el('g', { class:'kt-leaves' });
  var gLinks    = el('g', { class:'kt-links' });
  var gNodes    = el('g', { class:'kt-nodes' });
  svg.appendChild(gRoots); svg.appendChild(gBranches); svg.appendChild(gLeaves);
  svg.appendChild(gLinks); svg.appendChild(gNodes);
  host.appendChild(svg);

  /* Branch paths first — they are the coordinate system everything else
     hangs off, so they must exist before any node can be placed. */
  var branchEls = {};
  K.branches.forEach(function(b){
    var p = el('path', { d: b.d, class:'kt-branch', 'pathLength':1 });
    branchEls[b.id] = p;
    gBranches.appendChild(p);
  });

  /* Trunk + ground */
  var trunk = el('path', {
    d: 'M300,' + V.ground + ' C 296,' + (V.ground-70) + ' 304,' + (V.ground-120) + ' 300,560',
    class:'kt-trunk', 'pathLength':1
  });
  gBranches.insertBefore(trunk, gBranches.firstChild);

  /* Roots: mirrored below ground, drawn from the same trunk foot */
  var rootEls = [];
  var rootDefs = [
    'M300,700 C 286,742 246,760 208,798', 'M300,700 C 314,742 354,760 392,798',
    'M300,700 C 292,750 274,786 262,836', 'M300,700 C 308,750 326,786 338,836',
    'M300,700 C 272,730 232,738 190,748', 'M300,700 C 328,730 368,738 410,748',
    'M300,700 C 296,754 300,800 300,852', 'M300,700 C 282,738 258,770 236,812'
  ];
  rootDefs.forEach(function(d, i){
    var p = el('path', { d:d, class:'kt-root', 'pathLength':1 });
    rootEls.push(p); gRoots.appendChild(p);
  });

  /* Root labels, revealed only when the roots are hovered */
  var rootLabels = K.roots.map(function(name, i){
    var pt = branchEls[0] ? null : null;
    var t = el('text', { class:'kt-root-label', x:0, y:0, 'text-anchor':'middle' });
    t.textContent = name;
    gRoots.appendChild(t);
    return t;
  });

  /* ---- place nodes on their branch curves ---- */
  function pointOn(pathEl, t){
    var L = pathEl.getTotalLength();
    var p = pathEl.getPointAtLength(L * t);
    var q = pathEl.getPointAtLength(Math.min(L, L * t + 1));
    var dx = q.x - p.x, dy = q.y - p.y;
    var m = Math.hypot(dx, dy) || 1;
    return { x:p.x, y:p.y, nx:-dy/m, ny:dx/m };   /* + perpendicular */
  }

  var nodes = K.nodes.map(function(n){
    var host = branchEls[n.b];
    var pt = pointOn(host, n.t);
    var x = pt.x + pt.nx * (n.off || 0);
    var y = pt.y + pt.ny * (n.off || 0);

    var g = el('g', {
      class:'kt-node kt-' + n.kind,
      tabindex: 0,
      role: 'button',
      'aria-label': n.label
    });
    g.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')');

    if (n.kind === 'device'){
      /* devices read as small hardware outlines, not fruit */
      g.appendChild(el('rect', { class:'kt-glyph', x:-9, y:-12, width:18, height:24, rx:4 }));
    } else {
      g.appendChild(el('circle', { class:'kt-halo',  r:14 }));
      g.appendChild(el('circle', { class:'kt-glyph', r:6 }));
    }

    var label = el('text', { class:'kt-label', x:0, y:-20, 'text-anchor':'middle' });
    label.textContent = n.label;
    g.appendChild(label);

    g.__id = n.id;
    gNodes.appendChild(g);
    return { data:n, g:g, x:x, y:y, on:0, v:0, target:0 };
  });

  var byId = {};
  nodes.forEach(function(n){ byId[n.data.id] = n; });

  /* ---- connection lines, one per link, drawn once and revealed ---- */
  var linkEls = K.links.map(function(pair){
    var a = byId[pair[0]], b = byId[pair[1]];
    if (!a || !b) return null;
    var mx = (a.x + b.x)/2, my = (a.y + b.y)/2 - Math.hypot(b.x-a.x, b.y-a.y) * 0.16;
    var p = el('path', {
      class:'kt-link',
      d:'M' + a.x.toFixed(1) + ',' + a.y.toFixed(1) +
        ' Q' + mx.toFixed(1) + ',' + my.toFixed(1) +
        ' ' + b.x.toFixed(1) + ',' + b.y.toFixed(1),
      'pathLength':1
    });
    gLinks.appendChild(p);
    return { el:p, a:pair[0], b:pair[1], on:0, v:0, target:0 };
  }).filter(Boolean);

  /* ---- leaves: small marks along each branch, appearing with growth ---- */
  var leaves = [];
  K.branches.forEach(function(b){
    var pathEl = branchEls[b.id];
    for (var i = 0; i < 7; i++){
      var t = 0.3 + (i / 7) * 0.65;
      var pt = pointOn(pathEl, t);
      var side = i % 2 ? 1 : -1;
      var lx = pt.x + pt.nx * 9 * side, ly = pt.y + pt.ny * 9 * side;
      var e = el('ellipse', {
        class:'kt-leaf', cx:lx.toFixed(1), cy:ly.toFixed(1), rx:5.2, ry:2.6,
        transform:'rotate(' + (Math.atan2(pt.ny, pt.nx) * 180/Math.PI).toFixed(1) + ' ' + lx.toFixed(1) + ' ' + ly.toFixed(1) + ')'
      });
      gLeaves.appendChild(e);
      leaves.push({ el:e, at: b.from + (t * 0.55) });
    }
  });

  /* ---- chain overlay: an ordered progression, where sequence is the point ---- */
  var chainBox = document.createElement('div');
  chainBox.className = 'kt-chain';
  host.appendChild(chainBox);

  /* ---- growth + spring state ---- */
  var progress = 0, pShown = 0, pVel = 0;
  var hovered = null, rootsOn = 0, rootsVel = 0, rootsTarget = 0;
  var raf = 0, breathe = 0;

  function springStep(cur, vel, target, dt){
    var f = -170 * (cur - target);
    var d = -26 * vel;
    vel += (f + d) * dt;
    cur += vel * dt;
    return [cur, vel];
  }

  function scrollProgress(){
    if (!section) return 1;
    var r = section.getBoundingClientRect();
    /* Travel available while the tree is pinned, ending a little early so
       the finished tree holds on screen instead of completing as it leaves. */
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
        return (l[0] === id && l[1] === n.data.id) || (l[1] === id && l[0] === n.data.id);
      }));
      n.g.classList.toggle('is-lit', !!rel);
      n.g.classList.toggle('is-self', n.data.id === id);
    });
    linkEls.forEach(function(l){
      l.target = (id && (l.a === id || l.b === id)) ? 1 : 0;
    });

    var chain = id && K.chains[id];
    if (chain){
      chainBox.innerHTML = chain.map(function(s, i){
        return '<span style="transition-delay:' + (i * 55) + 'ms">' + s + '</span>';
      }).join('');
      chainBox.classList.add('is-on');
    } else {
      chainBox.classList.remove('is-on');
    }
    kick();
  }

  function kick(){ if (!raf) raf = requestAnimationFrame(frame); }

  function frame(now){
    raf = 0;
    var dt = 1/60, moving = false;

    var sp = springStep(pShown, pVel, progress, dt);
    if (Math.abs(sp[0] - progress) > 0.0005 || Math.abs(sp[1]) > 0.0005){ moving = true; }
    pShown = sp[0]; pVel = sp[1];
    if (RM){ pShown = progress; pVel = 0; }

    /* trunk and branches draw on as growth advances */
    trunk.style.strokeDashoffset = String(1 - Math.min(1, pShown * 1.6));
    K.branches.forEach(function(b){
      var g = Math.max(0, Math.min(1, (pShown - b.from) / (1 - b.from)));
      branchEls[b.id].style.strokeDashoffset = String(1 - g);
    });
    rootEls.forEach(function(p, i){
      var g = Math.max(0, Math.min(1, (pShown - 0.05 - i*0.03) / 0.5));
      p.style.strokeDashoffset = String(1 - g);
    });
    leaves.forEach(function(l){
      l.el.style.opacity = String(Math.max(0, Math.min(1, (pShown - l.at) / 0.14)));
    });

    breathe += RM ? 0 : 0.006;
    var bs = RM ? 1 : 1 + Math.sin(breathe) * 0.006;
    gBranches.style.transform = 'scale(' + bs.toFixed(4) + ')';
    gLeaves.style.transform   = 'scale(' + bs.toFixed(4) + ')';

    nodes.forEach(function(n){
      var grown = Math.max(0, Math.min(1, (pShown - n.data.at) / 0.10));
      var want = grown;
      var s = springStep(n.on, n.v, want, dt);
      n.on = s[0]; n.v = s[1];
      if (Math.abs(n.on - want) > 0.001) moving = true;
      n.g.style.opacity = String(Math.max(0, n.on));
      var scale = 0.6 + 0.4 * Math.min(1, n.on);
      n.g.style.setProperty('--s', scale.toFixed(3));
    });

    linkEls.forEach(function(l){
      var s = springStep(l.on, l.v, l.target, dt);
      l.on = s[0]; l.v = s[1];
      if (Math.abs(l.on - l.target) > 0.002) moving = true;
      l.el.style.opacity = String(Math.max(0, Math.min(1, l.on)));
      l.el.style.strokeDashoffset = String(1 - Math.max(0, Math.min(1, l.on)));
    });

    var rs = springStep(rootsOn, rootsVel, rootsTarget, dt);
    rootsOn = rs[0]; rootsVel = rs[1];
    if (Math.abs(rootsOn - rootsTarget) > 0.002) moving = true;
    gRoots.style.setProperty('--rootsOn', Math.max(0, Math.min(1, rootsOn)).toFixed(3));

    if (moving || !RM) raf = requestAnimationFrame(frame);
  }

  /* ---- input ---- */
  nodes.forEach(function(n){
    n.g.addEventListener('pointerenter', function(){ setHover(n.data.id); });
    n.g.addEventListener('pointerleave', function(){ setHover(null); });
  });

  /* focus/blur do not fire reliably on an SVG <g> and do not bubble.
     focusin/focusout do both, so keyboard users get the same reveal a
     mouse gets — which the brief asks for and the site claims twice. */
  host.addEventListener('focusin', function(e){
    var g = e.target.closest && e.target.closest('.kt-node');
    if (g && g.__id) setHover(g.__id);
  });
  host.addEventListener('focusout', function(e){
    if (!host.contains(e.relatedTarget)) setHover(null);
  });

  /* Some engines set document.activeElement on a focused SVG <g> but never
     dispatch focus/focusin for it — verified here: activeElement updated
     while not a single focus event fired, at any level. So keyboard
     movement is also read directly off activeElement, which is the only
     thing that can be relied on. */
  addEventListener('keyup', function(e){
    if (e.key !== 'Tab' && e.key.indexOf('Arrow') !== 0) return;
    var a = document.activeElement;
    var g = a && a.closest ? a.closest('.kt-node') : null;
    setHover(g && g.__id ? g.__id : null);
  }, { passive:true });
  gRoots.addEventListener('pointerenter', function(){ rootsTarget = 1; kick(); });
  gRoots.addEventListener('pointerleave', function(){ rootsTarget = 0; kick(); });

  var ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      ticking = false;
      progress = scrollProgress();
      kick();
    });
  }
  addEventListener('scroll', onScroll, { passive:true });
  addEventListener('resize', onScroll, { passive:true });

  /* Position root labels once the paths exist and have real lengths. */
  rootEls.forEach(function(p, i){
    if (!rootLabels[i]) return;
    var L = p.getTotalLength();
    var pt = p.getPointAtLength(L * 0.92);
    rootLabels[i].setAttribute('x', pt.x.toFixed(1));
    rootLabels[i].setAttribute('y', (pt.y + 12).toFixed(1));
  });

  progress = scrollProgress();
  kick();
})();
