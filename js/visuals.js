/*
 * Capa visual de la documental: indicadores, gráficos y línea de tiempo.
 * Se ejecuta después de js/app.js e inserta piezas en secciones ya renderizadas.
 * Los textos salen de js/content*.js cuando existen; las etiquetas propias de los
 * gráficos están en L (es/en). Todo el texto se inserta con textContent.
 *
 * Cifras de alcance: salen del backlog del Hito 2 (84 de 99 requisitos funcionales,
 * 75 de 79 no funcionales; Fase 1 = 36 y 41). Si el backlog cambia, hay que
 * actualizar DATA aquí.
 */
(function () {
  "use strict";
  if (!window.CONTENT) { return; }

  var SVG_NS = "http://www.w3.org/2000/svg";
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var DATA = {
    rf:  { p1: 36, p2: 48, out: 15 },          // 36 + 48 = 84 dentro; 99 candidatos
    rnf: { p1: 41, p2: 34, out: 4 },           // 41 + 34 = 75 dentro; 79 candidatos
    blocks: [                                  // requisitos funcionales por bloque (suman 84)
      { id: "A1", n: 18 }, { id: "A2", n: 15 }, { id: "A3", n: 13 }, { id: "A4", n: 17 },
      { id: "A5", n: 6 },  { id: "A6", n: 12 }, { id: "A7", n: 3 }
    ],
    linked: { with: 12, total: 84 },           // RF con necesidad enlazada
    sprints: [                                 // fechas reales de los sprints
      ["2026-09-21", "2026-10-02"], ["2026-10-05", "2026-10-23"], ["2026-10-26", "2026-11-13"],
      ["2026-11-16", "2026-12-11"], ["2026-12-14", "2027-01-15"]
    ]
  };

  var L = {
    es: {
      kpiTitle: "El proyecto en cifras",
      kpis: [
        ["84", "requisitos funcionales", "de 99 candidatos"],
        ["75", "requisitos no funcionales", "de 79 candidatos"],
        ["36", "en la Fase 1", "demo mínima funcional"],
        ["5", "sprints y 5 hitos", "hasta el 15 de enero de 2027"],
        ["9", "necesidades", "ninguna validada con usuarios"]
      ],
      flowTitle: "Así se reparte una compra",
      flowAria: "Un carrito con productos de tres marcas se convierte en un pedido y este en tres subpedidos, uno por marca.",
      scopeTitle: "Qué entra y qué no",
      scopeAria: "Requisitos por fase",
      rfLabel: "Requisitos funcionales", rnfLabel: "Requisitos no funcionales",
      p1: "Fase 1", p2: "Fase 2", out: "Fuera de alcance",
      blocksTitle: "Requisitos funcionales por bloque",
      blocks: {
        A1: "Catálogo y navegación", A2: "Carrito unificado", A3: "Checkout y pago simulado",
        A4: "Pedido y subpedidos", A5: "Seguimiento y cuenta", A6: "Marcas y operación", A7: "Datos y soporte"
      },
      blocksNote: "Cada bloque tiene su documento con las cuatro vistas: flujo de datos, modelo de datos, arquitectura y pantallas.",
      statusTitle: "Estado de los elementos de esta sección",
      statusAria: "Reparto por estado",
      commTitle: "Reparto del ejemplo",
      linkTitle: "Requisitos enlazados a una necesidad",
      linkText: function (a, b) { return a + " de " + b + " enlazados"; },
      linkNote: "El resto está pendiente de enlazar: no se ha inventado ninguna relación.",
      timeTitle: "Calendario del proyecto",
      today: "Hoy", defense: "Defensa 15 ene",
      months: ["sep", "oct", "nov", "dic", "ene"],
      asanaTitle: "Avance en Asana",
      asanaSummary: function (d, t) { return d + " de " + t + " tareas completadas"; },
      asanaSynced: "Última sincronización",
      asanaBtn: "Actualizar", asanaBusy: "Actualizando…",
      asanaFail: "No se pudo leer la última sincronización.",
      asanaNote: "Se sincroniza solo cada 6 horas. Solo se muestran recuentos por sprint, nunca nombres de tareas ni personas.",
      asanaRun: "Sincronizar ahora",
      asanaRows: { "sprint-1": "Sprint 1", "sprint-2": "Sprint 2", "sprint-3": "Sprint 3", "sprint-4": "Sprint 4", "sprint-5": "Sprint 5", landing: "Landing", otros: "Otros" },
      sprintAria: function (s) { return s; }
    },
    en: {
      kpiTitle: "The project in numbers",
      kpis: [
        ["84", "functional requirements", "out of 99 candidates"],
        ["75", "non-functional requirements", "out of 79 candidates"],
        ["36", "in Phase 1", "minimum working demo"],
        ["5", "sprints and 5 milestones", "until 15 January 2027"],
        ["9", "needs", "none validated with users"]
      ],
      flowTitle: "How a purchase is split",
      flowAria: "A cart with products from three brands becomes one order, which is split into three sub-orders, one per brand.",
      scopeTitle: "What is in and what is out",
      scopeAria: "Requirements by phase",
      rfLabel: "Functional requirements", rnfLabel: "Non-functional requirements",
      p1: "Phase 1", p2: "Phase 2", out: "Out of scope",
      blocksTitle: "Functional requirements by block",
      blocks: {
        A1: "Catalogue and navigation", A2: "Unified cart", A3: "Checkout and simulated payment",
        A4: "Order and sub-orders", A5: "Tracking and account", A6: "Brands and operations", A7: "Data and support"
      },
      blocksNote: "Each block has its own document with four views: data flow, data model, architecture and screens.",
      statusTitle: "Status of the items in this section",
      statusAria: "Breakdown by status",
      commTitle: "Breakdown of the example",
      linkTitle: "Requirements linked to a need",
      linkText: function (a, b) { return a + " of " + b + " linked"; },
      linkNote: "The rest still has to be linked: no relationship has been made up.",
      timeTitle: "Project calendar",
      today: "Today", defense: "Defence 15 Jan",
      months: ["Sep", "Oct", "Nov", "Dec", "Jan"],
      asanaTitle: "Progress in Asana",
      asanaSummary: function (d, t) { return d + " of " + t + " tasks completed"; },
      asanaSynced: "Last sync",
      asanaBtn: "Refresh", asanaBusy: "Refreshing…",
      asanaFail: "Could not read the latest sync.",
      asanaNote: "It syncs on its own every 6 hours. Only per-sprint counts are shown, never task names or people.",
      asanaRun: "Sync now",
      asanaRows: { "sprint-1": "Sprint 1", "sprint-2": "Sprint 2", "sprint-3": "Sprint 3", "sprint-4": "Sprint 4", "sprint-5": "Sprint 5", landing: "Landing", otros: "Other" },
      sprintAria: function (s) { return s; }
    }
  };

  function lang() { return (window.IC_LANG && window.IC_LANG.get() === "en") ? "en" : "es"; }
  function T() { return L[lang()]; }
  function C() { return (lang() === "en" && window.CONTENT_EN) ? window.CONTENT_EN : window.CONTENT; }

  function make(ns, tag, attrs, kids) {
    var n = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") { n.textContent = attrs[k]; } else { n.setAttribute(k, attrs[k]); }
    });
    (kids || []).forEach(function (kid) { if (kid) { n.appendChild(kid); } });
    return n;
  }
  function el(tag, attrs, kids) { return make(null, tag, attrs, kids); }
  function svg(tag, attrs, kids) { return make(SVG_NS, tag, attrs, kids); }

  function host(id) {
    var s = document.getElementById(id);
    return s ? s.querySelector(".container") : null;
  }
  function panel(title, extraClass, kids) {
    return el("figure", { "class": "viz " + (extraClass || ""), "data-viz": "1" }, [
      el("figcaption", { "class": "viz-title", text: title })
    ].concat(kids));
  }
  function cleanup() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-viz]"), function (n) { n.parentNode.removeChild(n); });
  }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

  /* ---------- barra apilada reutilizable ---------- */

  function stack(parts, ariaLabel) {
    var total = parts.reduce(function (a, p) { return a + p.value; }, 0);
    var bar = el("div", { "class": "stack", role: "img", "aria-label": ariaLabel }, parts.map(function (p) {
      return el("div", { "class": "stack-seg " + p.cls, style: "flex-grow:" + p.value, title: p.label + ": " + p.value },
        [el("span", { text: p.value >= total * 0.08 ? String(p.value) : "" })]);
    }));
    var legend = el("ul", { "class": "viz-legend" }, parts.map(function (p) {
      return el("li", {}, [
        el("span", { "class": "swatch " + p.cls, "aria-hidden": "true" }),
        el("span", { text: p.text || (p.label + " · " + p.value) })
      ]);
    }));
    return el("div", { "class": "stack-wrap" }, [bar, legend]);
  }

  /* ---------- inicio: cifras y flujo ---------- */

  function kpis() {
    var t = T();
    var c = host("inicio");
    if (!c) { return; }
    var items = t.kpis.map(function (k) {
      return el("li", { "class": "kpi" }, [
        el("span", { "class": "kpi-num", "data-to": k[0], text: k[0] }),
        el("span", { "class": "kpi-label", text: k[1] }),
        el("span", { "class": "kpi-sub", text: k[2] })
      ]);
    });
    var strip = el("div", { "class": "kpi-strip", "data-viz": "1", role: "group", "aria-label": t.kpiTitle }, [
      el("ul", {}, items)
    ]);
    c.appendChild(strip);
    countUp(strip);
  }

  function countUp(root) {
    if (REDUCED || !("IntersectionObserver" in window)) { return; }
    var nums = root.querySelectorAll(".kpi-num");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        io.unobserve(e.target);
        var node = e.target, to = parseInt(node.getAttribute("data-to"), 10), t0 = null;
        function step(ts) {
          if (t0 === null) { t0 = ts; }
          var k = Math.min(1, (ts - t0) / 900);
          node.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) { requestAnimationFrame(step); } else { node.textContent = String(to); }
        }
        node.textContent = "0";
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(nums, function (n) { io.observe(n); });
  }

  function flow() {
    var t = T(), D = C().how.diagram;
    var c = host("inicio");
    if (!c) { return; }
    var brands = D.brands;
    var colors = ["fl-a", "fl-b", "fl-c"];
    var ys = [10, 84, 158];
    var g = [];

    function box(x, y, w, h, title, sub, cls) {
      g.push(svg("rect", { x: x, y: y, width: w, height: h, rx: 12, "class": "fl-box " + (cls || "") }));
      g.push(svg("text", { x: x + w / 2, y: y + h / 2 - (sub ? 4 : -5), "text-anchor": "middle", "class": "fl-t", text: title }));
      if (sub) { g.push(svg("text", { x: x + w / 2, y: y + h / 2 + 15, "text-anchor": "middle", "class": "fl-s", text: sub })); }
    }
    // Carrito con productos de colores
    box(16, 62, 170, 96, D.cart.title, "", "fl-cart");
    [0, 1, 2].forEach(function (i) {
      g.push(svg("circle", { cx: 60 + i * 34, cy: 134, r: 9, "class": "fl-dot " + colors[i] }));
    });
    // Pedido
    box(272, 62, 170, 96, D.order.title, D.order.sub, "fl-order");
    // Subpedidos
    brands.slice(0, 3).forEach(function (b, i) {
      box(528, ys[i], 176, 52, D.subTitle + " · " + b, "", "fl-sub " + colors[i]);
    });
    // Conectores
    var paths = [];
    paths.push(svg("path", { d: "M186 110 H272", "class": "fl-line", id: "fl-p0" }));
    brands.slice(0, 3).forEach(function (b, i) {
      paths.push(svg("path", { d: "M442 110 C485 110 485 " + (ys[i] + 26) + " 528 " + (ys[i] + 26), "class": "fl-line", id: "fl-p" + (i + 1) }));
    });
    var moving = [];
    if (!REDUCED) {
      [0, 1, 2].forEach(function (i) {
        moving.push(svg("circle", { r: 6, "class": "fl-dot " + colors[i] }, [
          svg("animateMotion", { dur: "3.2s", begin: (i * 0.5) + "s", repeatCount: "indefinite", path: "M186 110 H272" })
        ]));
        moving.push(svg("circle", { r: 6, "class": "fl-dot " + colors[i] }, [
          svg("animateMotion", { dur: "3.2s", begin: (1.6 + i * 0.5) + "s", repeatCount: "indefinite",
            path: "M442 110 C485 110 485 " + (ys[i] + 26) + " 528 " + (ys[i] + 26) })
        ]));
      });
    }
    var s = svg("svg", { viewBox: "0 0 720 220", role: "img", "aria-label": t.flowAria, "class": "flow-svg" },
      paths.concat(g).concat(moving));
    c.appendChild(panel(t.flowTitle, "viz--flow", [s]));
  }

  /* ---------- alcance y requisitos ---------- */

  function scopeViz() {
    var t = T(), c = host("alcance");
    if (!c) { return; }
    function row(label, d) {
      return el("div", { "class": "bar-row" }, [
        el("div", { "class": "bar-label", text: label }),
        stack([
          { value: d.p1, label: t.p1, cls: "c-p1" },
          { value: d.p2, label: t.p2, cls: "c-p2" },
          { value: d.out, label: t.out, cls: "c-out" }
        ], label + ": " + t.p1 + " " + d.p1 + ", " + t.p2 + " " + d.p2 + ", " + t.out + " " + d.out)
      ]);
    }
    c.appendChild(panel(t.scopeTitle, "", [row(t.rfLabel, DATA.rf), row(t.rnfLabel, DATA.rnf)]));
  }

  function blocksViz() {
    var t = T(), c = host("requisitos");
    if (!c) { return; }
    var max = Math.max.apply(null, DATA.blocks.map(function (b) { return b.n; }));
    var rows = DATA.blocks.map(function (b) {
      return el("li", { "class": "hbar" }, [
        el("span", { "class": "hbar-id", text: b.id }),
        el("span", { "class": "hbar-name", text: t.blocks[b.id] }),
        el("span", { "class": "hbar-track" }, [
          el("span", { "class": "hbar-fill", style: "width:" + Math.round(b.n / max * 100) + "%" })
        ]),
        el("span", { "class": "hbar-n", text: String(b.n) })
      ]);
    });
    var fig = panel(t.blocksTitle, "viz--blocks", [
      el("ul", { "class": "hbars" }, rows),
      el("p", { "class": "note", text: t.blocksNote })
    ]);
    var head = c.querySelector(".section-head");
    if (head && head.nextSibling) { c.insertBefore(fig, head.nextSibling); } else { c.appendChild(fig); }
  }

  /* ---------- estado de los elementos (se recalcula con los datos reales) ---------- */

  var STATUS = [
    ["aprobado", "badge--aprobado", "c-ok"], ["entregado", "badge--entregado", "c-ok"],
    ["en-revision", "badge--en-revision", "c-info"], ["en-curso", "badge--en-curso", "c-info"],
    ["borrador", "badge--borrador", "c-warn"], ["pendiente", "badge--pendiente", "c-neu"],
    ["descartado", "badge--descartado", "c-bad"]
  ];

  function statusViz(id) {
    var t = T(), c = host(id);
    if (!c) { return; }
    var parts = [];
    STATUS.forEach(function (s) {
      var nodes = c.querySelectorAll("." + s[1]);
      // Las leyendas de estados posibles no cuentan como elementos
      var n = Array.prototype.filter.call(nodes, function (b) { return !b.closest(".legend, .status-legend, [data-viz]"); });
      if (n.length) { parts.push({ value: n.length, label: n[0].textContent, cls: s[2] }); }
    });
    if (!parts.length) { return; }
    var fig = panel(t.statusTitle, "", [stack(parts, t.statusAria)]);
    var after = c.querySelector("ul.legend") || c.querySelector(".section-head");
    if (after && after.nextSibling) { c.insertBefore(fig, after.nextSibling); } else { c.appendChild(fig); }
  }

  /* ---------- negocio: reparto de la comisión ---------- */

  function commissionViz() {
    var t = T(), c = host("negocio");
    if (!c) { return; }
    var rows = C().business.example.rows;
    var colors = ["fl-a", "fl-b", "fl-c", "c-p2"];
    var parts = rows.map(function (r, i) {
      var v = parseFloat(String(r[1]).replace(/[^\d,.-]/g, "").replace(",", "."));
      return { value: isNaN(v) ? 0 : v, label: r[0], text: r[0] + " · " + r[1], cls: colors[i % colors.length] };
    }).filter(function (p) { return p.value > 0; });
    if (!parts.length) { return; }
    var anchor = c.querySelector("table");
    var wrap = anchor ? (anchor.closest(".table-wrap") || anchor.parentNode) : null;
    var fig = panel(t.commTitle, "viz--small", [stack(parts, t.commTitle)]);
    if (wrap && wrap.parentNode) { wrap.parentNode.insertBefore(fig, wrap.nextSibling); } else { c.appendChild(fig); }
  }

  /* ---------- trazabilidad: anillo de cobertura ---------- */

  function linkViz() {
    var t = T(), c = host("trazabilidad");
    if (!c) { return; }
    var a = DATA.linked.with, b = DATA.linked.total, r = 52, circ = 2 * Math.PI * r;
    var ring = svg("svg", { viewBox: "0 0 140 140", "class": "ring", role: "img", "aria-label": t.linkText(a, b) }, [
      svg("circle", { cx: 70, cy: 70, r: r, "class": "ring-bg" }),
      svg("circle", { cx: 70, cy: 70, r: r, "class": "ring-fg", transform: "rotate(-90 70 70)",
        "stroke-dasharray": (circ * a / b).toFixed(1) + " " + circ.toFixed(1) }),
      svg("text", { x: 70, y: 68, "text-anchor": "middle", "class": "ring-n", text: String(a) }),
      svg("text", { x: 70, y: 90, "text-anchor": "middle", "class": "ring-s", text: "/ " + b })
    ]);
    var fig = panel(t.linkTitle, "viz--ring", [
      el("div", { "class": "ring-box" }, [
        ring,
        el("div", {}, [
          el("p", { "class": "ring-text", text: t.linkText(a, b) }),
          el("p", { "class": "note", text: t.linkNote })
        ])
      ])
    ]);
    var head = c.querySelector(".section-head");
    if (head && head.nextSibling) { c.insertBefore(fig, head.nextSibling); } else { c.appendChild(fig); }
  }

  /* ---------- avances: línea de tiempo ---------- */

  function day(s) { var p = s.split("-"); return Date.UTC(+p[0], +p[1] - 1, +p[2]) / 864e5; }

  function timeline() {
    var t = T(), c = host("avances");
    if (!c) { return; }
    var sprints = C().progress.sprints;
    var d0 = day(DATA.sprints[0][0]), d1 = day(DATA.sprints[4][1]), span = d1 - d0;
    function pct(d) { return Math.max(0, Math.min(100, (d - d0) / span * 100)); }
    var now = new Date(), today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 864e5;
    var tp = pct(today), showToday = today >= d0 && today <= d1;

    var monthTicks = [[2026, 8], [2026, 9], [2026, 10], [2026, 11], [2027, 0]].map(function (m, i) {
      var d = Date.UTC(m[0], m[1], 1) / 864e5;
      return el("span", { "class": "tl-month", style: "left:" + pct(Math.max(d, d0)) + "%", text: t.months[i] });
    });
    var axis = el("div", { "class": "tl-axis", "aria-hidden": "true" }, monthTicks);

    var rows = sprints.map(function (s, i) {
      var a = DATA.sprints[i], l = pct(day(a[0])), w = pct(day(a[1]) + 1) - l;
      var done = /entregado|delivered/i.test(s.status);
      var cur = today >= day(a[0]) && today <= day(a[1]);
      return el("li", { "class": "tl-row" }, [
        el("div", { "class": "tl-name" }, [
          el("strong", { text: s.name }),
          el("span", { text: s.milestone })
        ]),
        el("div", { "class": "tl-track" }, [
          el("span", { "class": "tl-bar " + (done ? "is-done" : cur ? "is-now" : "is-next"),
            style: "left:" + l + "%;width:" + w + "%", title: s.dates }),
          showToday ? el("span", { "class": "tl-today", style: "left:" + tp + "%" }) : null
        ]),
        el("div", { "class": "tl-dates", text: s.dates })
      ]);
    });
    var defense = el("li", { "class": "tl-row tl-row--end" }, [
      el("div", { "class": "tl-name" }, [el("strong", { text: t.defense })]),
      el("div", { "class": "tl-track" }, [el("span", { "class": "tl-flag", style: "left:100%" })]),
      el("div", { "class": "tl-dates", text: "" })
    ]);
    var legendToday = showToday ? el("p", { "class": "note tl-note" }, [
      el("span", { "class": "tl-today-key", "aria-hidden": "true" }),
      el("span", { text: " " + t.today })
    ]) : null;

    var fig = panel(t.timeTitle, "viz--timeline", [axis, el("ol", { "class": "tl" }, rows.concat([defense])), legendToday]);
    var head = c.querySelector(".section-head");
    var anchor = head ? head.nextElementSibling : null;
    // Debajo de la frase introductoria, si existe
    if (anchor && anchor.tagName === "P" && anchor.nextSibling) { c.insertBefore(fig, anchor.nextSibling); }
    else if (head && head.nextSibling) { c.insertBefore(fig, head.nextSibling); }
    else { c.appendChild(fig); }
  }

  /* ---------- avance en Asana (lee data/asana.json, que escribe tools/sync-asana.mjs) ---------- */

  var ACTIONS_URL = "https://github.com/albrtoguerrero/indiconnect-landing/actions/workflows/sync-asana.yml";
  var asanaToken = 0;

  function asanaPanel(data) {
    var t = T();
    var rows = (data.sections || []).map(function (s) {
      var pct = s.total ? Math.round(s.done / s.total * 100) : 0;
      return el("li", { "class": "hbar" }, [
        el("span", { "class": "hbar-id", text: "" }),
        el("span", { "class": "hbar-name", text: t.asanaRows[s.key] || s.key }),
        el("span", { "class": "hbar-track", role: "img", "aria-label": s.done + "/" + s.total }, [
          el("span", { "class": "hbar-fill", style: "width:" + pct + "%" })
        ]),
        el("span", { "class": "hbar-n", text: s.done + "/" + s.total })
      ]);
    });
    var when = "";
    try {
      when = new Date(data.syncedAt).toLocaleString(lang() === "en" ? "en-GB" : "es-ES", { dateStyle: "medium", timeStyle: "short" });
    } catch (e) { when = String(data.syncedAt || ""); }
    return [
      el("p", { "class": "asana-sum", text: t.asanaSummary(data.done, data.total) }),
      el("ul", { "class": "hbars hbars--asana" }, rows),
      el("p", { "class": "note asana-when", text: t.asanaSynced + ": " + when })
    ];
  }

  function asanaViz() {
    var t = T(), c = host("avances");
    if (!c) { return; }
    var body = el("div", { "class": "asana-body" });
    var btn = el("button", { type: "button", "class": "theme-toggle asana-btn", text: t.asanaBtn });
    var run = el("a", { "class": "theme-toggle asana-btn", href: ACTIONS_URL, target: "_blank", rel: "noopener noreferrer", text: t.asanaRun });
    var status = el("p", { "class": "note", role: "status", "aria-live": "polite" });
    var fig = panel(t.asanaTitle, "viz--asana", [
      el("div", { "class": "asana-actions" }, [btn, run]),
      body, status,
      el("p", { "class": "note", text: t.asanaNote })
    ]);
    var anchor = c.querySelector(".viz--timeline");
    if (anchor && anchor.nextSibling) { c.insertBefore(fig, anchor.nextSibling); } else { c.appendChild(fig); }

    var mine = ++asanaToken;
    function load() {
      btn.disabled = true; btn.textContent = t.asanaBusy; status.textContent = "";
      return fetch("data/asana.json?t=" + Date.now(), { cache: "no-store" })
        .then(function (r) { if (!r.ok) { throw new Error("http " + r.status); } return r.json(); })
        .then(function (d) {
          if (mine !== asanaToken) { return; }
          while (body.firstChild) { body.removeChild(body.firstChild); }
          asanaPanel(d).forEach(function (n) { body.appendChild(n); });
        })
        .catch(function () { if (mine === asanaToken) { status.textContent = t.asanaFail; } })
        .then(function () { if (mine === asanaToken) { btn.disabled = false; btn.textContent = t.asanaBtn; } });
    }
    btn.addEventListener("click", load);
    load();
  }

  /* ---------- catálogo completo de requisitos (js/requirements-all.js) ---------- */

  var REQL = {
    es: {
      title: "Catálogo completo de requisitos",
      summary: function (rf, rnf, out) { return rf + " funcionales y " + rnf + " no funcionales dentro del proyecto, más " + out + " fuera de alcance"; },
      hint: "Despliega para ver todos, agrupados por bloque. Se pueden buscar y filtrar por fase.",
      search: "Buscar por identificador o palabra (RF-57, pago, stock…)",
      all: "Todos", count: function (n, t) { return n + " de " + t + " requisitos"; },
      none: "Ningún requisito coincide.",
      rf: "Requisitos funcionales", rnf: "Requisitos no funcionales", outTitle: "Fuera de alcance",
      th: ["ID", "Requisito", "Fase"], thOut: ["ID", "Requisito", "Motivo"],
      reasonX: "Exclusión del Hito 1", reasonP: "Poco valor para el coste de verificarlo",
      note: "",
      f1: "Fase 1", f2: "Fase 2", out: "Fuera"
    },
    en: {
      title: "Full requirements catalogue",
      summary: function (rf, rnf, out) { return rf + " functional and " + rnf + " non-functional inside the project, plus " + out + " out of scope"; },
      hint: "Expand to see them all, grouped by block. You can search and filter by phase.",
      search: "Search by identifier or word (RF-57, pago, stock…)",
      all: "All", count: function (n, t) { return n + " of " + t + " requirements"; },
      none: "No requirement matches.",
      rf: "Functional requirements", rnf: "Non-functional requirements", outTitle: "Out of scope",
      th: ["ID", "Requirement", "Phase"], thOut: ["ID", "Requirement", "Reason"],
      reasonX: "Milestone 1 exclusion", reasonP: "Low value for the cost of verifying it",
      note: "Requirement texts are shown in Spanish, as written in the backlog.",
      f1: "Phase 1", f2: "Phase 2", out: "Out"
    }
  };

  function allReqs() {
    var D = window.REQ_ALL, c = host("requisitos");
    if (!D || !c) { return; }
    var lg = lang(), t = REQL[lg];
    var rows = [];                       // { tr, text, phase }
    var groupsEls = [];                  // { box, rows }
    var state = { q: "", phase: "all" };

    function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

    function badge(phase) {
      var cls = phase === 1 ? "badge--fase-1" : phase === 2 ? "badge--fase-2" : "badge--fuera";
      return el("span", { "class": "badge " + cls, text: phase === 1 ? t.f1 : phase === 2 ? t.f2 : t.out });
    }

    function table(items, head, out) {
      var body = items.map(function (it) {
        var phase = out ? 0 : it[2];
        var last = out ? (it[2] === "x" ? t.reasonX : t.reasonP) : null;
        var tr = el("tr", {}, [
          el("td", { "class": "req-id", text: it[0] }),
          el("td", { text: it[1] }),
          el("td", {}, out ? [el("span", { "class": "req-reason", text: last })] : [badge(phase)])
        ]);
        rows.push({ tr: tr, hay: norm(it[0] + " " + it[1] + (last ? " " + last : "")), phase: phase });
        return tr;
      });
      return el("div", { "class": "req-table-wrap", tabindex: "0", role: "region", "aria-label": head.join(", ") }, [
        el("table", { "class": "req-table" }, [
          el("thead", {}, [el("tr", {}, head.map(function (h) { return el("th", { scope: "col", text: h }); }))]),
          el("tbody", {}, body)
        ])
      ]);
    }

    function group(title, items, head, out) {
      var start = rows.length;
      var tbl = table(items, head, out);
      var mine = rows.slice(start);
      var p1 = items.filter(function (i) { return !out && i[2] === 1; }).length;
      var p2 = items.filter(function (i) { return !out && i[2] === 2; }).length;
      var meta = out ? String(items.length) : (t.f1 + " " + p1 + " · " + t.f2 + " " + p2);
      var box = el("details", { "class": "req-group" }, [
        el("summary", {}, [
          el("span", { "class": "req-group-name", text: title }),
          el("span", { "class": "req-group-meta", text: meta })
        ]),
        tbl
      ]);
      groupsEls.push({ box: box, rows: mine });
      return box;
    }

    function section(titleText, nodes, total) {
      return el("div", { "class": "req-section" }, [el("h4", { text: titleText + " · " + total })].concat(nodes));
    }

    var rfGroups = D.groups.filter(function (g) { return g.kind === "rf"; });
    var rnfGroups = D.groups.filter(function (g) { return g.kind === "rnf"; });
    var nRf = rfGroups.reduce(function (a, g) { return a + g.items.length; }, 0);
    var nRnf = rnfGroups.reduce(function (a, g) { return a + g.items.length; }, 0);
    var outItems = D.out.rf.concat(D.out.rnf);
    var total = nRf + nRnf + outItems.length;

    var sections = [
      section(t.rf, rfGroups.map(function (g) { return group(g.id + " · " + g[lg], g.items, t.th, false); }), nRf),
      section(t.rnf, rnfGroups.map(function (g) { return group(g.id + " · " + g[lg], g.items, t.th, false); }), nRnf),
      section(t.outTitle, [group(t.outTitle, outItems, t.thOut, true)], outItems.length)
    ];

    var input = el("input", { type: "search", "class": "req-search", placeholder: t.search, "aria-label": t.search });
    var status = el("p", { "class": "note req-status", role: "status", "aria-live": "polite" });
    var empty = el("p", { "class": "note req-empty", text: t.none, hidden: "hidden" });
    var chipDefs = [["all", t.all], ["1", t.f1], ["2", t.f2], ["0", t.out]];
    var chips = chipDefs.map(function (d) {
      return el("button", { type: "button", "class": "chip" + (d[0] === "all" ? " is-on" : ""), "data-phase": d[0], "aria-pressed": d[0] === "all" ? "true" : "false", text: d[1] });
    });

    function apply() {
      var q = norm(state.q).trim(), shown = 0;
      var filtering = q !== "" || state.phase !== "all";
      rows.forEach(function (r) {
        var ok = (state.phase === "all" || String(r.phase) === state.phase) && (q === "" || r.hay.indexOf(q) !== -1);
        r.tr.hidden = !ok;
        if (ok) { shown++; }
      });
      groupsEls.forEach(function (g) {
        var any = g.rows.some(function (r) { return !r.tr.hidden; });
        g.box.hidden = !any;
        if (filtering) { g.box.open = any; }
      });
      Array.prototype.forEach.call(root.querySelectorAll(".req-section"), function (s) {
        s.hidden = !s.querySelector(".req-group:not([hidden])");
      });
      empty.hidden = shown !== 0;
      status.textContent = t.count(shown, total);
    }
    input.addEventListener("input", function () { state.q = input.value; apply(); });
    chips.forEach(function (b) {
      b.addEventListener("click", function () {
        state.phase = b.getAttribute("data-phase");
        chips.forEach(function (x) { var on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
        apply();
      });
    });

    var root = el("details", { "class": "req-all", "data-viz": "1" }, [
      el("summary", {}, [
        el("span", { "class": "req-all-title", text: t.title }),
        el("span", { "class": "req-all-sum", text: t.summary(nRf, nRnf, outItems.length) })
      ]),
      el("div", { "class": "req-body" }, [
        el("p", { "class": "note", text: t.hint + (t.note ? " " + t.note : "") }),
        el("div", { "class": "req-tools" }, [input, el("div", { "class": "chips", role: "group" }, chips)]),
        status, empty
      ].concat(sections))
    ]);
    var anchor = c.querySelector(".viz--blocks");
    if (anchor && anchor.nextSibling) { c.insertBefore(root, anchor.nextSibling); } else { c.appendChild(root); }
    apply();
  }

  /* ---------- barra lateral: iconos, grupos, tarjeta de estado y progreso de lectura ---------- */

  var ICONS = {
    "problema": "M12 3 2.5 20h19L12 3zM12 10v4M12 17.2v.01",
    "como-funciona": "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.7.6 1 1.4 1 2.1h5c0-.7.3-1.5 1-2.1A6 6 0 0 0 12 3z",
    "negocio": "M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M14.5 9.2c-.6-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1.2 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.4-2.5-1.2M12 6.5V8M12 16v1.5",
    "alcance": "M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M7 12a5 5 0 1 0 10 0 5 5 0 1 0-10 0M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0",
    "decisiones": "M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M8 12.5l2.7 2.7L16 9.5",
    "riesgos": "M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6l8-3zM12 8.5v4M12 15.5v.01",
    "requisitos": "M9 6h11M9 12h11M9 18h11M3.5 6l1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17",
    "validacion": "M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M8 12.5l2.7 2.7L16 9.5M19 4v3M17.5 5.5h3",
    "trazabilidad": "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
    "diseno": "M4 4h16v10H4zM8 20h8M12 14v6M7 9h4M7 11.5h7",
    "avances": "M4 20h16M7 17v-5M12 17V6M17 17v-8",
    "documentacion": "M4 5h16v14H4zM4 10h16M9 5v14M13 13h4M13 16h3",
    "evolucion": "M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M12 7v5l3 2",
    "uso-ia": "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z",
    "equipo": "M6 8a3 3 0 1 0 6 0 3 3 0 1 0-6 0M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 11a3 3 0 1 0 0-6M17.5 15.2c2.2.5 3.8 2.2 3.8 4.8"
  };
  var GROUPS = [
    { es: "Contexto", en: "Context", ids: ["problema", "como-funciona", "negocio"] },
    { es: "Definición", en: "Definition", ids: ["alcance", "decisiones", "riesgos", "diseno"] },
    { es: "Requisitos", en: "Requirements", ids: ["requisitos", "validacion", "trazabilidad"] },
    { es: "Seguimiento", en: "Tracking", ids: ["avances", "documentacion", "evolucion", "uso-ia", "equipo"] }
  ];
  var SIDE = {
    es: {
      now: "Ahora",
      left: function (n) { return n === 0 ? "Cierra hoy" : n === 1 ? "Queda 1 día" : "Quedan " + n + " días"; },
      defense: function (n) { return "Defensa en " + n + " días"; },
      done: "Sprints terminados"
    },
    en: {
      now: "Now",
      left: function (n) { return n === 0 ? "Closes today" : n === 1 ? "1 day left" : n + " days left"; },
      defense: function (n) { return "Defence in " + n + " days"; },
      done: "Sprints finished"
    }
  };
  var readBound = false;

  function sideIcon(id) {
    var s = svg("svg", { viewBox: "0 0 24 24", "class": "nav-ico", "aria-hidden": "true", focusable: "false" }, [
      svg("path", { d: ICONS[id] || ICONS.problema })
    ]);
    return s;
  }

  function sidebar() {
    var nav = document.getElementById("site-nav");
    var inner = document.querySelector(".header-inner");
    if (!nav || !inner) { return; }
    var lg = lang();

    // Iconos en cada enlace y rótulos de grupo
    var list = nav.querySelector("ul");
    if (list) {
      Array.prototype.forEach.call(list.querySelectorAll("a"), function (a) {
        if (a.querySelector(".nav-ico")) { return; }
        var id = (a.getAttribute("href") || "").slice(1);
        var label = document.createElement("span");
        label.className = "nav-label";
        label.textContent = a.textContent;
        a.textContent = "";
        a.appendChild(sideIcon(id));
        a.appendChild(label);
      });
      GROUPS.forEach(function (g) {
        var first = list.querySelector('a[href="#' + g.ids[0] + '"]');
        if (!first || !first.parentNode) { return; }
        var li = el("li", { "class": "nav-group", "data-viz": "1", "aria-hidden": "true", text: g[lg] });
        list.insertBefore(li, first.parentNode);
      });
    }

    // Tarjeta de estado: sprint actual según la fecha de hoy
    var S = SIDE[lg], sprints = C().progress.sprints, now = new Date();
    var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 864e5;
    var idx = -1, i;
    for (i = 0; i < DATA.sprints.length; i++) { if (day(DATA.sprints[i][1]) >= today) { idx = i; break; } }
    var finished = DATA.sprints.filter(function (a) { return day(a[1]) < today; }).length;
    var title, sub, pct;
    if (idx === -1) {
      title = S.done + ": " + finished + "/" + DATA.sprints.length; sub = ""; pct = 100;
    } else {
      var a0 = day(DATA.sprints[idx][0]), a1 = day(DATA.sprints[idx][1]);
      pct = today <= a0 ? 0 : Math.round((today - a0) / (a1 - a0 + 1) * 100);
      title = sprints[idx].name + " · " + sprints[idx].milestone;
      sub = S.left(Math.max(0, a1 - today)) + " · " + S.defense(Math.max(0, day("2027-01-15") - today));
    }
    var card = el("div", { "class": "side-card", "data-viz": "1" }, [
      el("div", { "class": "side-card-top" }, [el("span", { "class": "side-dot", "aria-hidden": "true" }), el("span", { text: S.now })]),
      el("strong", { "class": "side-card-title", text: title }),
      el("div", { "class": "side-bar", role: "img", "aria-label": pct + " %" }, [el("span", { style: "width:" + pct + "%" })]),
      sub ? el("span", { "class": "side-card-sub", text: sub }) : null
    ]);
    var brand = inner.querySelector(".brand");
    if (brand && brand.nextSibling) { inner.insertBefore(card, brand.nextSibling); } else { inner.appendChild(card); }

    // Progreso de lectura de la página
    var header = document.getElementById("site-header");
    if (header) { header.appendChild(el("div", { "class": "side-progress", "data-viz": "1", "aria-hidden": "true" }, [el("span", {})])); }
    paintRead();
    if (!readBound) {
      readBound = true;
      window.addEventListener("scroll", paintRead, { passive: true });
      window.addEventListener("resize", paintRead);
    }
  }

  function paintRead() {
    var bar = document.querySelector(".side-progress span");
    if (!bar) { return; }
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(100, Math.max(0, window.scrollY / h * 100)) : 0;
    bar.style.width = p.toFixed(1) + "%";
  }

  /* ---------- arranque ---------- */

  function render() {
    cleanup();
    try {
      sidebar();
      kpis(); flow(); scopeViz(); blocksViz(); allReqs();
      statusViz("decisiones"); commissionViz(); linkViz(); timeline(); asanaViz();
    } catch (e) {
      // Un fallo en un gráfico no debe romper la documentación.
      if (window.console) { console.error("visuals:", e); }
    }
  }

  render();
  window.addEventListener("iclangchange", render);
})();
