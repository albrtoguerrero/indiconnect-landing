/*
 * Renderiza js/content.js dentro del esqueleto de index.html.
 * No contiene texto de contenido: solo estructura y comportamiento.
 * Todo el texto se inserta con textContent (nunca innerHTML) para que
 * un carácter raro en content.js no pueda romper ni inyectar marcado.
 */
(function () {
  "use strict";

  if (!window.CONTENT) { return; }

  // Contenido en el idioma elegido (js/lang.js); si falta la traducción, español.
  function pick() {
    return (window.IC_LANG && window.IC_LANG.get() === "en" && window.CONTENT_EN) ? window.CONTENT_EN : window.CONTENT;
  }
  var C = pick();

  var SVG_NS = "http://www.w3.org/2000/svg";

  /* ---------- utilidades ---------- */

  function make(ns, tag, attrs, kids) {
    var n = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") { n.textContent = attrs[k]; }
      else { n.setAttribute(k, attrs[k]); }
    });
    (kids || []).forEach(function (kid) { if (kid) { n.appendChild(kid); } });
    return n;
  }
  function el(tag, attrs, kids) { return make(null, tag, attrs, kids); }
  function svg(tag, attrs, kids) { return make(SVG_NS, tag, attrs, kids); }

  function slug(label) {
    return label.toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  // El estado se guarda siempre con su identificador en español (clase CSS y cálculos);
  // solo el texto visible se traduce.
  function badge(label) {
    var shown = (C.ui.statusLabels && C.ui.statusLabels[label]) || label;
    return el("span", { "class": "badge badge--" + slug(label), text: shown });
  }

  // Sección de la documental -> entregable de la bitácora de prompts (comercial/bitacora/topics.json)
  var PROMPT_TOPIC = {
    alcance: "alcance", negocio: "negocio", decisiones: "decisiones", riesgos: "riesgos",
    requisitos: "rf", trazabilidad: "hu", avances: "planificacion"
  };

  function fill(id, build) {
    var host = document.getElementById(id);
    var container = el("div", { "class": "container" });
    build(container, id + "-title");
    var topic = PROMPT_TOPIC[id], head = container.querySelector(".section-head");
    if (topic && head && C.ui.promptsLink) {
      head.appendChild(el("a", { "class": "prompts-link", href: "comercial/bitacora/?tema=" + topic, text: C.ui.promptsLink }));
    }
    host.appendChild(container);
    var h = container.querySelector("h2");
    if (h) { host.setAttribute("aria-labelledby", h.id); }
  }

  function heading(id, text, extra) {
    return el("div", { "class": "section-head" }, [
      el("h2", { id: id, text: text }),
      extra
    ]);
  }

  function list(items, cls) {
    return el("ul", { "class": cls || "" }, items.map(function (t) {
      return el("li", { text: t });
    }));
  }

  /* ---------- cabecera, hero y pie ---------- */

  function renderChrome() {
    document.title = C.brand.name + " · " + C.brand.tagline;
    var lb = document.getElementById("lang-toggle");
    if (lb) {
      lb.textContent = C.ui.langToggle.label;
      lb.setAttribute("aria-label", C.ui.langToggle.aria);
      lb.setAttribute("lang", window.IC_LANG && window.IC_LANG.get() === "en" ? "es" : "en");
    }
    var md = document.querySelector('meta[name="description"]');
    if (md) {
      if (!md.getAttribute("data-es")) { md.setAttribute("data-es", md.getAttribute("content")); }
      md.setAttribute("content", window.IC_LANG && window.IC_LANG.get() === "en" ? C.ui.metaDescription : md.getAttribute("data-es"));
    }
    var skip = document.getElementById("skip-link");
    skip.textContent = C.ui.skipLink;

    var brand = document.getElementById("brand-link");
    brand.appendChild(el("span", { "class": "brand-dot", "aria-hidden": "true" }));
    brand.appendChild(el("span", { "class": "brand-text" }, [
      el("span", { "class": "brand-name", text: C.brand.name }),
      el("span", { "class": "brand-sub", text: C.brand.tagline })
    ]));

    var nav = document.getElementById("site-nav");
    nav.setAttribute("aria-label", C.ui.navLabel);
    nav.appendChild(el("ul", {}, C.nav.map(function (n) {
      return el("li", {}, [el("a", { href: "#" + n.id, text: n.label })]);
    })));

    var ns = document.querySelector("noscript .noscript");
    if (ns) { ns.textContent = C.ui.noscript; }
  }

  function renderHero() {
    var host = document.getElementById("inicio");
    host.setAttribute("aria-labelledby", "inicio-title");
    host.appendChild(el("div", { "class": "container hero-grid" }, [
      el("div", { "class": "hero-text" }, [
        el("p", { "class": "eyebrow", text: C.brand.tagline }),
        el("h1", { id: "inicio-title", text: C.hero.title }),
        el("p", { "class": "lead", text: C.hero.value }),
        el("div", { "class": "cta-group" }, [
          el("a", { "class": "btn", href: C.hero.cta.href, text: C.hero.cta.label }),
          C.hero.cta2 ? el("a", { "class": "btn btn--ghost", href: C.hero.cta2.href, text: C.hero.cta2.label }) : null
        ]),
      ]),
      renderHeroTimeline()
    ]));
  }

  // Cronograma de la portada: se calcula a partir de C.progress, sin datos escritos a mano.
  function renderHeroTimeline() {
    var sp = C.progress.sprints;
    return el("aside", { "class": "hero-steps", "aria-labelledby": "hero-steps-title" }, [
      el("h2", { id: "hero-steps-title", "class": "hero-steps-title", text: C.ui.heroTimelineTitle }),
      el("ol", {}, sp.map(function (x) {
        var attrs = { "class": "hero-step hero-step--" + slug(x.status) };
        if (x.status === "En curso") { attrs["aria-current"] = "step"; }
        return el("li", attrs, [
          el("span", { "class": "hero-step-dot", "aria-hidden": "true" }),
          el("div", {}, [
            el("p", { "class": "hero-step-name" }, [document.createTextNode(x.milestone + " · " + x.name + " "), badge(x.status)]),
            el("p", { "class": "hero-step-dates", text: x.dates })
          ])
        ]);
      })),
      el("p", { "class": "hero-step-defence", text: C.ui.heroDefence }),
      el("a", { "class": "hero-step-link", href: "#documentacion", text: C.ui.heroTimelineLink + " →" })
    ]);
  }

  function formatDate(iso) {
    var p = iso.split("-");
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    if (isNaN(d.getTime())) { return iso; }
    return d.toLocaleDateString(C.ui.locale || "es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  }

  function renderFooter() {
    var host = document.getElementById("site-footer");
    host.appendChild(el("div", { "class": "container" }, [
      el("p", { "class": "legal-label", text: C.ui.legalLabel }),
      el("p", { "class": "legal", text: C.legal }),
      el("p", { "class": "updated" }, [
        document.createTextNode(C.ui.updatedLabel + " "),
        el("time", { datetime: C.lastUpdated, text: formatDate(C.lastUpdated) })
      ])
    ]));
  }

  /* ---------- secciones ---------- */

  function renderProblem() {
    fill("problema", function (c, hid) {
      var p = C.problem;
      c.appendChild(heading(hid, p.title));
      c.appendChild(el("p", { "class": "lead", text: p.intro }));
      c.appendChild(el("ul", { "class": "cards" }, p.points.map(function (pt) {
        return el("li", { "class": "card" }, [
          el("h3", { text: pt.title }),
          el("p", { text: pt.text })
        ]);
      })));
    });
  }

  function renderDiagram(d, title, desc) {
    function box(x, y, w, h, t, s, cls) {
      var kids = [
        svg("rect", { x: x, y: y, width: w, height: h, rx: 10, "class": "dg-box " + (cls || "") }),
        svg("text", { x: x + w / 2, y: y + (s ? h / 2 - 3 : h / 2 + 5), "class": "dg-title", "text-anchor": "middle", text: t })
      ];
      if (s) {
        kids.push(svg("text", { x: x + w / 2, y: y + h / 2 + 15, "class": "dg-sub", "text-anchor": "middle", text: s }));
      }
      return svg("g", {}, kids);
    }
    function arrow(path) {
      return svg("path", { d: path, "class": "dg-arrow", "marker-end": "url(#dg-head)" });
    }

    var s = svg("svg", {
      viewBox: "0 0 360 390", "class": "diagram", role: "img",
      "aria-labelledby": "dg-t dg-d", focusable: "false"
    }, [
      svg("title", { id: "dg-t", text: title }),
      svg("desc", { id: "dg-d", text: desc }),
      svg("defs", {}, [
        svg("marker", { id: "dg-head", viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, [
          svg("path", { d: "M0 0 L10 5 L0 10 z", "class": "dg-head" })
        ])
      ]),
      arrow("M180 72 V108"),
      arrow("M180 172 V200 H60 V248"),
      arrow("M180 172 V248"),
      arrow("M180 172 V200 H300 V248"),
      box(50, 10, 260, 62, d.cart.title, d.cart.sub, "dg-box--cart"),
      box(50, 110, 260, 62, d.order.title, d.order.sub, "dg-box--order"),
      box(10, 250, 100, 70, d.subTitle, d.brands[0], "dg-box--sub"),
      box(130, 250, 100, 70, d.subTitle, d.brands[1], "dg-box--sub"),
      box(250, 250, 100, 70, d.subTitle, d.brands[2], "dg-box--sub"),
      svg("text", { x: 180, y: 350, "class": "dg-cap", "text-anchor": "middle", text: d.caption })
    ]);
    return s;
  }

  function renderHow() {
    fill("como-funciona", function (c, hid) {
      var h = C.how;
      c.appendChild(heading(hid, h.title));
      c.appendChild(el("p", { "class": "lead", text: h.intro }));
      c.appendChild(el("div", { "class": "how-grid" }, [
        el("figure", { "class": "figure" }, [
          renderDiagram(h.diagram, h.diagramTitle, h.diagramDesc)
        ]),
        el("ol", { "class": "steps" }, h.steps.map(function (st) {
          return el("li", {}, [
            el("h3", { text: st.title }),
            el("p", { text: st.text })
          ]);
        }))
      ]));
      c.appendChild(el("p", { "class": "note", text: h.note }));
    });
  }

  function renderBusiness() {
    fill("negocio", function (c, hid) {
      var b = C.business;
      c.appendChild(heading(hid, b.title, badge(b.status)));
      c.appendChild(el("p", { "class": "hypothesis", text: b.hypothesisNote }));
      c.appendChild(el("p", { "class": "lead", text: b.model }));

      var ex = b.example;
      var table = el("table", {}, [
        el("caption", { text: ex.caption }),
        el("thead", {}, [el("tr", {}, ex.headers.map(function (t) {
          return el("th", { scope: "col", text: t });
        }))]),
        el("tbody", {}, ex.rows.map(function (r) {
          return el("tr", {}, r.map(function (cell, i) {
            return i === 0 ? el("th", { scope: "row", text: cell }) : el("td", { text: cell });
          }));
        })),
        el("tfoot", {}, [el("tr", {}, [
          el("th", { scope: "row", colspan: 2, text: ex.totalLabel }),
          el("td", { text: ex.totalValue })
        ])])
      ]);
      c.appendChild(el("div", { "class": "panel" }, [
        el("p", { "class": "tag", text: ex.tag }),
        el("p", { text: ex.intro }),
        el("div", { "class": "table-wrap", tabindex: "0", role: "region", "aria-label": ex.caption }, [table])
      ]));

      c.appendChild(el("div", { "class": "panel panel--soft" }, [
        el("p", { "class": "tag", text: b.market.tag }),
        el("p", { text: b.market.text })
      ]));

      c.appendChild(el("div", { "class": "panel panel--warn" }, [
        el("h3", { text: b.caveat.title }),
        el("p", { text: b.caveat.text })
      ]));

      c.appendChild(el("h3", { "class": "sub-title", text: b.discardedTitle }));
      c.appendChild(el("ul", { "class": "cards" }, b.discarded.map(function (d) {
        return el("li", { "class": "card" }, [
          el("div", { "class": "card-top" }, [el("h4", { text: d.title }), badge(d.status)]),
          el("p", { text: d.text })
        ]);
      })));
    });
  }

  function renderScope() {
    fill("alcance", function (c, hid) {
      var s = C.scope;
      c.appendChild(heading(hid, s.title));
      c.appendChild(el("div", { "class": "two-col" }, [
        el("div", { "class": "panel panel--in" }, [el("h3", { text: s.inTitle }), list(s["in"], "check-list")]),
        el("div", { "class": "panel panel--out" }, [el("h3", { text: s.outTitle }), list(s.out, "cross-list")])
      ]));
    });
  }

  function renderDecisions() {
    fill("decisiones", function (c, hid) {
      var d = C.decisions;
      c.appendChild(heading(hid, d.title));
      c.appendChild(el("p", { "class": "lead", text: d.intro }));
      c.appendChild(el("ul", { "class": "legend", "aria-label": d.legendLabel }, d.legend.map(function (l) {
        return el("li", {}, [badge(l)]);
      })));
      c.appendChild(el("ul", { "class": "cards" }, d.items.map(function (it) {
        return el("li", { "class": "card" }, [
          el("div", { "class": "card-top" }, [el("h3", { text: it.title }), badge(it.status)]),
          el("p", { text: it.text }),
          it.list ? list(it.list, "plain-list") : null
        ]);
      })));
    });
  }

  function renderRisks() {
    fill("riesgos", function (c, hid) {
      c.appendChild(heading(hid, C.risks.title));
      c.appendChild(el("ul", { "class": "cards" }, C.risks.items.map(function (r) {
        return el("li", { "class": "card" }, [
          el("p", { "class": "tag", text: r.kind }),
          el("h3", { text: r.title }),
          el("p", { text: r.text })
        ]);
      })));
    });
  }

  function renderProgress() {
    fill("avances", function (c, hid) {
      var p = C.progress;
      c.appendChild(heading(hid, p.title));
      c.appendChild(el("p", { "class": "lead", text: p.intro }));
      c.appendChild(el("ol", { "class": "timeline" }, p.sprints.map(function (s) {
        var attrs = { "class": "tl-item tl-item--" + slug(s.status) };
        if (s.status === "En curso") { attrs["aria-current"] = "step"; }
        return el("li", attrs, [
          el("div", { "class": "card" }, [
            el("div", { "class": "card-top" }, [
              el("h3", { text: s.name + " · " + s.milestone }),
              badge(s.status)
            ]),
            el("p", { "class": "dates", text: s.dates }),
            el("p", { text: s.text }),
            s.note ? el("p", { "class": "note", text: s.note }) : null
          ])
        ]);
      })));
    });
  }

  // Convierte las notas de Asana (texto plano) en párrafos, listas y rótulos.
  function notesToNodes(text) {
    var nodes = [], ul = null;
    String(text || "").split("\n").forEach(function (raw) {
      var t = raw.trim();
      if (!t || /^-{3,}$/.test(t)) { ul = null; return; }
      var item = null;
      if (/^[•\-–]\s+/.test(t)) { item = t.replace(/^[•\-–]\s+/, ""); }
      else if (/^\s{4}\S/.test(raw)) { item = t; }
      if (item !== null) {
        if (!ul) { ul = el("ul"); nodes.push(ul); }
        ul.appendChild(el("li", { text: item }));
        return;
      }
      ul = null;
      var h = t.match(/^[—–-]{2,}\s*(.+?)\s*[—–-]{2,}$/);
      nodes.push(h ? el("h5", { text: h[1] }) : el("p", { text: t }));
    });
    return nodes;
  }

  function dateOrDash(iso) { return iso ? formatDate(iso) : "—"; }

  function hitoDetails(a, h) {
    var kids = [
      el("summary", {}, [
        el("span", { "class": "hito-name", text: a.hitoLabel + " " + h.n + " · " + h.title }),
        badge(h.status),
        el("span", { "class": "hito-dates", text: dateOrDash(h.start) + " – " + dateOrDash(h.end) })
      ])
    ];
    var body = [];
    if (h.notes) {
      body.push(el("h4", { text: a.descTitle }));
      notesToNodes(h.notes).forEach(function (n) { body.push(n); });
    }
    if (h.n === 3) {
      body.push(el("h4", { text: a.statementTitle }));
      body.push(el("p", { text: a.statementIntro }));
      body.push(el("div", { "class": "two-col two-col--top" }, [
        el("div", {}, [el("h5", { text: a.statementMinTitle }), list(a.statementMin)]),
        el("div", {}, [el("h5", { text: a.statementEvTitle }), list(a.statementEv)])
      ]));
      body.push(el("p", { "class": "note", text: a.statementNote }));
    }
    body.push(el("h4", { text: a.subtasksTitle }));
    if (h.subtasks.length) {
      body.push(textTable({
        caption: a.subtasksCaption + " · " + a.hitoLabel + " " + h.n,
        headers: a.subtasksHeaders,
        rows: h.subtasks.map(function (s) {
          return [s.name, s.owner || a.noOwner, dateOrDash(s.due), s.done ? a.doneLabel : a.pendingLabel];
        })
      }));
      h.subtasks.forEach(function (s) {
        if (!s.notes) { return; }
        body.push(el("details", { "class": "subnote" }, [
          el("summary", { text: a.notesOf + " «" + s.name + "»" }),
          el("div", { "class": "subnote-body" }, notesToNodes(s.notes))
        ]));
      });
    } else {
      body.push(el("p", { "class": "note", text: a.noSubtasks }));
    }
    if (h.n === 3) {
      body.push(el("h4", { text: a.planTitle }));
      body.push(el("p", { "class": "note", text: a.planNote }));
      body.push(textTable({ caption: a.planCaption, headers: a.planHeaders, rows: a.plan }));
    }
    kids.push(el("div", { "class": "hito-body" }, body));
    var attrs = { "class": "hito hito--" + slug(h.status) };
    if (h.status === "En curso") { attrs.open = ""; }
    return el("details", attrs, kids);
  }

  function renderValidation() {
    fill("validacion", function (c, hid) {
      var v = C.validation, lb = v.labels;
      c.appendChild(heading(hid, v.title, el("span", { "class": "badge badge--sin-validar", text: v.asOf })));
      c.appendChild(el("p", { "class": "lead", text: v.intro }));
      c.appendChild(el("p", { "class": "note", text: v.limits }));
      c.appendChild(el("div", { "class": "two-col two-col--top" }, [
        el("div", {}, [subTitle(v.methodTitle), list(v.method)]),
        el("div", {}, [subTitle(v.guideTitle), el("ol", {}, v.guide.map(function (q) { return el("li", { text: q }); }))])
      ]));
      c.appendChild(subTitle(v.resultsTitle));
      c.appendChild(textTable({ caption: v.resultsCaption, headers: v.resultsHeaders, rows: v.results, badgeCol: 4 }));
      c.appendChild(subTitle(v.readTitle));
      c.appendChild(list(v.read));
      c.appendChild(subTitle(v.themesTitle));
      c.appendChild(textTable({ caption: v.themesCaption, headers: v.themesHeaders, rows: v.themes }));
      c.appendChild(subTitle(v.nextTitle));
      c.appendChild(list(v.next));
      c.appendChild(subTitle(v.interviewsTitle));
      c.appendChild(el("p", { "class": "note", text: v.interviewsIntro }));
      c.appendChild(el("div", { "class": "hitos" }, v.interviews.map(function (iv) {
        var codes = [iv.h1, iv.h2, iv.h3].map(function (k, n) { return "H-0" + (n + 1) + ": " + v.codeNames[k]; }).join(" · ");
        var themes = iv.themes.map(function (t) { return v.themeNames[t]; }).join(", ");
        var body = [
          el("p", { "class": "note", text: lb.synthetic + " · " + lb.habit + ": " + iv.habit }),
          el("h4", { text: lb.q[0] }), el("p", { text: iv.q1 }),
          el("h4", { text: lb.q[1] }), el("p", { text: iv.q2 }),
          el("h4", { text: lb.q[2] }), el("p", { text: iv.q3 }),
          el("p", { "class": "note", text: lb.ratings + ": " + codes + " · " + lb.themes + ": " + themes })
        ];
        return el("details", { "class": "hito" }, [
          el("summary", {}, [
            el("span", { "class": "hito-name", text: iv.id + " · " + iv.profile + ", " + iv.age + " " + lb.age }),
            el("span", { "class": "hito-dates", text: codes })
          ]),
          el("div", { "class": "hito-body" }, body)
        ]);
      })));
    });
  }

  function renderArchive() {
    fill("documentacion", function (c, hid) {
      var a = C.archive;
      c.appendChild(heading(hid, a.title, el("span", { "class": "badge badge--sin-validar", text: a.asOf })));
      c.appendChild(el("p", { "class": "lead", text: a.intro }));
      c.appendChild(el("p", { "class": "note", text: a.limits }));
      c.appendChild(subTitle(a.hitosTitle));
      c.appendChild(el("div", { "class": "hitos" }, a.hitos.map(function (h) { return hitoDetails(a, h); })));
      c.appendChild(subTitle(a.linksTitle));
      var table = el("table", { "class": "table--text" }, [
        el("caption", { text: a.linksCaption }),
        el("thead", {}, [el("tr", {}, a.linksHeaders.map(function (h) { return el("th", { scope: "col", text: h }); }))]),
        el("tbody", {}, a.links.map(function (r) {
          return el("tr", {}, [
            el("th", { scope: "row", text: r[0] }),
            el("td", {}, [el("a", { href: r[1], rel: "noopener", text: r[1] })])
          ]);
        }))
      ]);
      c.appendChild(tableWrap(a.linksCaption, table));
    });
  }

  /* ---------- vistas: la landing se reparte en cuatro, sin un único scroll ---------- */

  var VIEWS = [
    { id: "contexto", sections: ["inicio", "problema", "como-funciona", "negocio"] },
    { id: "definicion", sections: ["alcance", "decisiones", "riesgos", "diseno"] },
    { id: "requisitos", sections: ["requisitos", "validacion", "trazabilidad"] },
    { id: "seguimiento", sections: ["avances", "documentacion", "evolucion", "uso-ia", "equipo"] }
  ];
  var currentView = null;

  function viewOfSection(secId) {
    for (var i = 0; i < VIEWS.length; i++) {
      if (VIEWS[i].sections.indexOf(secId) !== -1) { return VIEWS[i].id; }
    }
    return null;
  }

  function viewOfNode(node) {
    var sec = node && node.closest ? node.closest("main > section") : null;
    return sec ? viewOfSection(sec.id) : null;
  }

  function applyView(id) {
    if (!id) { id = VIEWS[0].id; }
    currentView = id;
    VIEWS.forEach(function (v) {
      v.sections.forEach(function (s) {
        var n = document.getElementById(s);
        if (n) { n.classList.toggle("view-off", v.id !== id); }
      });
    });
    [].forEach.call(document.querySelectorAll("#view-tabs a"), function (a) {
      if (a.getAttribute("data-view") === id) { a.setAttribute("aria-current", "page"); }
      else { a.removeAttribute("aria-current"); }
    });
  }

  function renderViewTabs() {
    var host = document.getElementById("view-tabs");
    if (!host) { return; }
    host.setAttribute("aria-label", C.ui.viewsLabel);
    host.appendChild(el("div", { "class": "container" }, [el("ul", {}, VIEWS.map(function (v) {
      return el("li", {}, [el("a", { href: "#" + v.sections[0], "data-view": v.id, text: C.ui.viewLabels[v.id] })]);
    }))]));
  }

  function routeFromHash(initial) {
    var id = "";
    try { id = decodeURIComponent((window.location.hash || "").slice(1)); } catch (e) { id = ""; }
    var target = id ? document.getElementById(id) : null;
    var view = target ? viewOfNode(target) || viewOfSection(id) : (currentView || VIEWS[0].id);
    applyView(view);
    if (target) { target.scrollIntoView({ block: "start" }); }
    else if (!initial) { window.scrollTo(0, 0); }
  }

  function renderTeam() {
    fill("equipo", function (c, hid) {
      c.appendChild(heading(hid, C.team.title));
      c.appendChild(el("p", { "class": "lead", text: C.team.intro }));
      c.appendChild(el("ul", { "class": "cards" }, C.team.members.map(function (m) {
        return el("li", { "class": "card member" }, [
          el("div", { "class": "avatar", "aria-hidden": "true", text: m.name.replace(/[^\p{L}]/gu, "").charAt(0) || "?" }),
          el("h3", { text: m.name }),
          m.role ? el("p", { "class": "role", text: m.role }) : null
        ]);
      })));
    });
  }

  /* ---------- Hito 2: requisitos, trazabilidad, evolución, uso de IA ---------- */

  function tableWrap(caption, table) {
    return el("div", { "class": "panel" }, [
      el("div", { "class": "table-wrap", tabindex: "0", role: "region", "aria-label": caption }, [table])
    ]);
  }

  function textTable(t) {
    var table = el("table", { "class": "table--text" }, [
      el("caption", { text: t.caption }),
      el("thead", {}, [el("tr", {}, t.headers.map(function (h) {
        return el("th", { scope: "col", text: h });
      }))]),
      el("tbody", {}, t.rows.map(function (r) {
        return el("tr", {}, r.map(function (cell, i) {
          if (i === 0) { return el("th", { scope: "row", text: cell }); }
          if (i === t.badgeCol) { return el("td", {}, [badge(cell)]); }
          return el("td", { text: cell });
        }));
      }))
    ]);
    return tableWrap(t.caption, table);
  }

  function subTitle(text, id) {
    var attrs = { "class": "sub-title", text: text };
    if (id) { attrs.id = id; }
    return el("h3", attrs);
  }

  // Hipótesis con un desplegable que explica por qué tienen su estado.
  function hypothesisList(items, lb) {
    return el("ul", { "class": "id-list" }, items.map(function (it) {
      var kids = [el("strong", { text: it.id }), el("span", { text: it.text }), it.state ? badge(it.state) : null];
      if (it.why) {
        var w = it.why, partial = /^Parcialmente/.test(it.state || "");
        kids.push(el("details", { "class": "subnote hyp-why" }, [
          el("summary", { text: partial ? lb.whyLabelPartial : lb.whyLabel }),
          el("div", { "class": "subnote-body" }, [
            el("p", { text: w.summary }),
            list(w.points),
            el("h5", { text: lb.quotesLabel }),
            el("div", {}, w.quotes.map(function (qt) {
              return el("blockquote", { "class": "hyp-quote" }, [el("p", { text: "«" + qt[1] + "»" }), el("footer", { text: qt[0] })]);
            })),
            el("p", { "class": "note", text: w.limit }),
            el("p", {}, [el("a", { href: "#validacion", text: lb.seeAll })])
          ])
        ]));
      }
      return el("li", {}, kids);
    }));
  }

  function idList(items) {
    return el("ul", { "class": "id-list" }, items.map(function (it) {
      return el("li", {}, [
        el("strong", { text: it.id }),
        el("span", { text: it.text }),
        it.state ? badge(it.state) : null
      ]);
    }));
  }

  // Filtro de texto para las tablas de una sección (oculta filas, no las elimina).
  function filterBox(scopeId) {
    var input = el("input", { type: "search", id: scopeId + "-filter", "class": "filter-input",
      placeholder: C.ui.filterPlaceholder, autocomplete: "off", spellcheck: "false" });
    var status = el("p", { "class": "filter-status", role: "status", "aria-live": "polite" });
    var wrap = el("div", { "class": "filter" }, [
      el("label", { "for": scopeId + "-filter", text: C.ui.filterLabel }),
      el("div", { "class": "filter-row" }, [
        input,
        el("button", { type: "button", "class": "btn btn--ghost filter-clear", text: C.ui.filterClear })
      ]),
      status
    ]);
    function norm(t) { return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
    function run() {
      var q = norm(input.value.trim());
      var rows = [].slice.call(document.querySelectorAll("#" + scopeId + " .table--text tbody tr"));
      var shown = 0;
      rows.forEach(function (r) {
        var hit = !q || norm(r.textContent).indexOf(q) !== -1;
        r.hidden = !hit;
        if (hit) { shown += 1; }
      });
      status.textContent = !q ? "" : (shown ? C.ui.filterCount.replace("{n}", shown).replace("{total}", rows.length) : C.ui.filterNone);
    }
    input.addEventListener("input", run);
    wrap.querySelector("button").addEventListener("click", function () { input.value = ""; run(); input.focus(); });
    return wrap;
  }

  function renderRequirements() {
    fill("requisitos", function (c, hid) {
      var r = C.requirements;
      c.appendChild(heading(hid, r.title, badge(r.status)));
      c.appendChild(el("p", { "class": "lead", text: r.intro }));

      var parts = [
        ["req-fuentes", r.sources.title],
        ["req-hipotesis", r.hypothesesTitle + " " + C.ui.and + " " + r.constraintsTitle.toLowerCase()],
        ["req-exclusiones", r.exclusionsTitle],
        ["req-necesidades", r.needs.title],
        ["req-funcionales", r.functional.title],
        ["req-nofuncionales", r.nonFunctional.title]
      ];
      c.appendChild(el("nav", { "class": "pills", "aria-label": C.ui.reqNavLabel }, [
        el("ul", {}, parts.map(function (pt) {
          return el("li", {}, [el("a", { href: "#" + pt[0], text: pt[1] })]);
        }))
      ]));

      c.appendChild(filterBox("requisitos"));
      c.appendChild(subTitle(r.sources.title, "req-fuentes"));
      c.appendChild(textTable(r.sources));
      c.appendChild(el("div", { "class": "two-col two-col--top", id: "req-hipotesis" }, [
        el("div", {}, [subTitle(r.hypothesesTitle), hypothesisList(r.hypotheses, r.hypothesesWhy)]),
        el("div", {}, [subTitle(r.constraintsTitle), idList(r.constraints)])
      ]));
      c.appendChild(subTitle(r.exclusionsTitle, "req-exclusiones"));
      c.appendChild(el("div", { "class": "panel panel--out" }, [el("p", { text: r.exclusions })]));

      c.appendChild(subTitle(r.needs.title, "req-necesidades"));
      c.appendChild(textTable(r.needs));
      c.appendChild(subTitle(r.functional.title, "req-funcionales"));
      c.appendChild(textTable(r.functional));
      c.appendChild(subTitle(r.nonFunctional.title, "req-nofuncionales"));
      c.appendChild(textTable(r.nonFunctional));
      c.appendChild(el("p", { "class": "note", text: r.scopeNote }));
    });
  }

  function renderTraceability() {
    fill("trazabilidad", function (c, hid) {
      var t = C.traceability;
      c.appendChild(heading(hid, t.title));
      c.appendChild(el("p", { "class": "lead", text: t.intro }));

      var table = el("table", { "class": "table--text" }, [
        el("caption", { text: t.caption }),
        el("thead", {}, [el("tr", {}, t.headers.map(function (h) {
          return el("th", { scope: "col", text: h });
        }))]),
        el("tbody", {}, t.rows.map(function (r) {
          return el("tr", {}, [
            el("th", { scope: "row", text: r.need }),
            el("td", { text: r.reqs }),
            el("td", {}, [el("details", {}, [
              el("summary", { text: r.id + " · " + r.title }),
              el("pre", { "class": "gherkin", text: r.gherkin.join("\n") })
            ])]),
            el("td", { text: r.task })
          ]);
        }))
      ]);
      c.appendChild(filterBox("trazabilidad"));
      c.appendChild(tableWrap(t.caption, table));

      c.appendChild(subTitle(t.asanaTitle));
      c.appendChild(el("p", { "class": "note", text: t.asanaNote }));
      c.appendChild(el("ul", { "class": "ref-list" }, t.asana.map(function (a) {
        var nameNode = a.url
          ? el("a", { href: a.url, text: a.name })
          : el("strong", { text: a.name });
        return el("li", {}, [nameNode, el("span", { text: a.text })]);
      })));
    });
  }

  function renderDesign() {
    fill("diseno", function (c, hid) {
      var d = C.design;
      c.appendChild(heading(hid, d.title));
      c.appendChild(el("p", { "class": "lead", text: d.intro }));
      c.appendChild(el("p", { "class": "note", text: d.status }));
      if (d.docFile) {
        c.appendChild(el("p", {}, [el("a", { href: "docs/hito3/" + d.docFile, download: "", text: d.docLabel })]));
      }
      var table = el("table", { "class": "table--text" }, [
        el("caption", { text: d.blocksCaption }),
        el("thead", {}, [el("tr", {}, d.blocksHeaders.map(function (h) {
          return el("th", { scope: "col", text: h });
        }))]),
        el("tbody", {}, d.blocks.map(function (b) {
          return el("tr", {}, [
            el("th", { scope: "row", text: b.name }),
            el("td", { text: b.text }),
            el("td", {}, [el("a", { href: "docs/hito3/" + b.pdf, text: d.pdfLabel })]),
            el("td", {}, [el("a", { href: "docs/hito3/" + b.drawio, download: "", text: d.drawioLabel })])
          ]);
        }))
      ]);
      c.appendChild(tableWrap(d.blocksCaption, table));
      c.appendChild(el("p", { "class": "note", text: d.openNote }));
      c.appendChild(subTitle(d.evidenceTitle));
      c.appendChild(textTable({ caption: d.evidenceCaption, headers: d.evidenceHeaders, badgeCol: 1, rows: d.evidence }));
    });
  }

  function renderEvolution() {
    fill("evolucion", function (c, hid) {
      var e = C.evolution;
      c.appendChild(heading(hid, e.title));
      c.appendChild(el("p", { "class": "lead", text: e.intro }));
      c.appendChild(el("ol", { "class": "timeline" }, e.entries.map(function (en) {
        return el("li", { "class": "tl-item" }, [
          el("div", { "class": "card" }, [
            el("h3", { text: en.title }),
            el("p", { "class": "dates" }, [
              el("time", { datetime: en.date, text: formatDate(en.date) }),
              document.createTextNode(" · " + C.ui.byLabel + " " + en.who)
            ]),
            el("p", {}, [el("strong", { text: C.ui.whatLabel + ": " }), document.createTextNode(en.what)]),
            el("p", {}, [el("strong", { text: C.ui.whyLabel + ": " }), document.createTextNode(en.why)])
          ])
        ]);
      })));
    });
  }

  function renderAiUse() {
    fill("uso-ia", function (c, hid) {
      var a = C.aiUse;
      c.appendChild(heading(hid, a.title));
      c.appendChild(el("p", { "class": "lead", text: a.intro }));
      c.appendChild(el("ul", { "class": "cards" }, a.principles.map(function (p) {
        return el("li", { "class": "card" }, [
          el("h3", { text: p.title }),
          el("p", { text: p.text })
        ]);
      })));
      if (a.model) {
        c.appendChild(el("h3", { "class": "sub-title", text: a.modelTitle }));
        c.appendChild(el("dl", { "class": "ai-model" }, a.model.map(function (r) {
          return el("div", {}, [el("dt", { text: r[0] }), el("dd", { text: r[1] })]);
        })));
        c.appendChild(el("p", { "class": "note", text: a.modelNote }));
      }
      if (a.rules) {
        c.appendChild(el("h3", { "class": "sub-title", text: a.rulesTitle }));
        c.appendChild(el("p", { "class": "lead", text: a.rulesIntro }));
        c.appendChild(el("ul", { "class": "cards cards--rules" }, a.rules.map(function (r) {
          return el("li", { "class": "card" }, [
            el("h4", { text: r.title }),
            el("p", { text: r.text })
          ]);
        })));
      }
      if (a.logLink) {
        c.appendChild(el("p", {}, [el("a", { "class": "btn btn--ghost", href: a.logLink.href, text: a.logLink.label })]));
      }
    });
  }

  /* ---------- tema claro/oscuro ---------- */

  var paintTheme = null;

  function initTheme() {
    var root = document.documentElement;
    var btn = document.getElementById("theme-toggle");
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var KEY = "theme";

    function stored() {
      try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }
    function save(v) {
      try { localStorage.setItem(KEY, v); } catch (e) { /* almacenamiento bloqueado: el tema solo dura esta visita */ }
    }
    function effective() {
      return root.getAttribute("data-theme") || (mq.matches ? "dark" : "light");
    }
    function paint() {
      btn.textContent = effective() === "dark" ? C.ui.themeToLight : C.ui.themeToDark;
      btn.setAttribute("aria-label", C.ui.themeLabel + ": " + btn.textContent);
    }

    var s = stored();
    if (s === "light" || s === "dark") { root.setAttribute("data-theme", s); }
    paintTheme = paint;
    paint();

    btn.addEventListener("click", function () {
      var next = effective() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save(next);
      paint();
    });
    var onChange = function () { paint(); };
    if (mq.addEventListener) { mq.addEventListener("change", onChange); }
  }

  /* ---------- sección activa en la navegación ---------- */

  var spy = null;

  function initNavSpy() {
    if (spy) { spy.disconnect(); spy = null; }
    if (!("IntersectionObserver" in window)) { return; }
    var nav = document.getElementById("site-nav");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var links = {};
    [].forEach.call(nav.querySelectorAll("a"), function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = links[en.target.id];
        if (!en.isIntersecting || !link) { return; }
        if (current) { current.removeAttribute("aria-current"); }
        current = link;
        current.setAttribute("aria-current", "true");
        var vertical = nav.scrollHeight > nav.clientHeight && nav.scrollWidth <= nav.clientWidth;
        nav.scrollTo(vertical ? {
          top: current.offsetTop - (nav.clientHeight - current.offsetHeight) / 2,
          behavior: reduce ? "auto" : "smooth"
        } : {
          left: current.offsetLeft - (nav.clientWidth - current.offsetWidth) / 2,
          behavior: reduce ? "auto" : "smooth"
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    spy = io;
    Object.keys(links).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) { io.observe(sec); }
    });
  }

  /* ---------- buscador global y botón de volver arriba ---------- */

  var MAX_RESULTS = 30;

  function norm(t) { return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

  // Índice construido a partir del DOM ya renderizado (mismo idioma que se está viendo).
  function buildIndex() {
    var items = [];
    HOSTS.forEach(function (id) {
      var host = document.getElementById(id);
      if (!host) { return; }
      var h2 = host.querySelector("h2");
      var section = h2 ? h2.textContent : id;
      [].forEach.call(host.querySelectorAll("h3, h4, p, summary, tr, pre, li"), function (n) {
        if (n.closest(".filter, .hero-steps-title") || n.classList.contains("tag")) { return; }
        if (n.tagName === "LI" && n.querySelector("p, h3, h4, ul, summary, pre")) { return; }
        if (n.tagName === "P" && n.closest("tr")) { return; }
        var raw = n.tagName === "TR"
          ? [].map.call(n.children, function (c) { return c.textContent.replace(/\s+/g, " ").trim(); }).join(" · ")
          : [].map.call(n.childNodes, function (c) { return c.textContent; }).join(" ");
        var text = raw.replace(/\s+/g, " ").trim();
        if (text.length < 3) { return; }
        items.push({ node: n, text: text, key: norm(text), section: section, sectionId: id });
      });
    });
    return items;
  }

  function snippet(text, words) {
    var at = norm(text).indexOf(words[0]);
    var start = Math.max(0, at - 50);
    var out = text.slice(start, start + 150);
    return (start > 0 ? "… " : "") + out + (start + 150 < text.length ? " …" : "");
  }

  function goTo(item) {
    var n = item.node;
    var v = viewOfNode(n);
    if (v) { applyView(v); }
    var d = n.closest("details");
    while (d) { d.open = true; d = d.parentElement ? d.parentElement.closest("details") : null; }
    if (n.hidden) { n.hidden = false; }
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    n.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    n.classList.add("search-hit");
    setTimeout(function () { n.classList.remove("search-hit"); }, 2600);
  }

  var openSearch = function () {};

  function syncTop() {
    var t = document.getElementById("to-top");
    if (t) { t.hidden = window.scrollY < 700; }
  }

  function initSearchUi() {
    var old = document.getElementById("search-dialog");
    if (old) { old.remove(); }
    var oldTop = document.getElementById("to-top");
    if (oldTop) { oldTop.remove(); }

    var btn = document.getElementById("search-btn");
    if (btn) {
      btn.textContent = C.ui.searchBtn;
      btn.setAttribute("aria-label", C.ui.searchTitle + " (/)");
    }

    var input = el("input", { type: "search", id: "search-input", "class": "filter-input", placeholder: C.ui.searchPlaceholder, autocomplete: "off", spellcheck: "false" });
    var status = el("p", { "class": "filter-status", role: "status", "aria-live": "polite" });
    var results = el("ul", { "class": "search-results" });
    var closeBtn = el("button", { type: "button", "class": "btn btn--ghost filter-clear", text: C.ui.searchClose });
    var dialog = el("dialog", { id: "search-dialog", "class": "search-dialog", "aria-labelledby": "search-title" }, [
      el("div", { "class": "search-head" }, [
        el("h2", { id: "search-title", text: C.ui.searchTitle }),
        closeBtn
      ]),
      el("label", { "for": "search-input", "class": "sr-only", text: C.ui.searchTitle }),
      input, status, results,
      el("p", { "class": "search-hint", text: C.ui.searchHint })
    ]);
    document.body.appendChild(dialog);

    var index = null;
    function run() {
      clear(results);
      var q = input.value.trim();
      if (!q) { status.textContent = ""; return; }
      if (!index) { index = buildIndex(); }
      var words = norm(q).split(/\s+/).filter(Boolean);
      var hits = index.filter(function (it) { return words.every(function (w) { return it.key.indexOf(w) !== -1; }); });
      if (!hits.length) { status.textContent = C.ui.searchNone.replace("{q}", q); return; }
      status.textContent = (hits.length === 1 ? C.ui.searchOne : C.ui.searchCount.replace("{n}", hits.length)) + (hits.length > MAX_RESULTS ? " · " + C.ui.searchMore.replace("{n}", MAX_RESULTS) : "");
      hits.slice(0, MAX_RESULTS).forEach(function (it) {
        var b = el("button", { type: "button", "class": "search-item" }, [
          el("span", { "class": "search-sec", text: it.section }),
          el("span", { "class": "search-txt", text: snippet(it.text, words) })
        ]);
        b.addEventListener("click", function () { dialog.close(); goTo(it); });
        results.appendChild(el("li", {}, [b]));
      });
    }
    input.addEventListener("input", run);
    closeBtn.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) { dialog.close(); } });
    dialog.addEventListener("close", function () { if (btn) { btn.focus(); } });

    openSearch = function () {
      index = null;            // se reconstruye por si el contenido cambió (idioma)
      if (typeof dialog.showModal === "function") { dialog.showModal(); }
      input.focus(); input.select();
      run();
    };
    if (btn) { btn.onclick = openSearch; }

    var top = el("button", { type: "button", id: "to-top", "class": "to-top", hidden: "", "aria-label": C.ui.backToTop, title: C.ui.backToTop, text: "↑" });
    top.addEventListener("click", function () {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      document.getElementById("main").focus({ preventScroll: true });
    });
    document.body.appendChild(top);
    syncTop();
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) { return; }
    var a = document.activeElement;
    if (a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.tagName === "SELECT" || a.isContentEditable)) { return; }
    e.preventDefault();
    openSearch();
  });
  window.addEventListener("scroll", syncTop, { passive: true });

  /* ---------- idioma ---------- */

  var HOSTS = ["inicio", "problema", "como-funciona", "negocio", "alcance", "decisiones", "riesgos",
    "requisitos", "validacion", "trazabilidad", "diseno", "avances", "documentacion", "evolucion", "uso-ia", "equipo"];

  function clear(node) {
    while (node.firstChild) { node.removeChild(node.firstChild); }
  }

  function renderAll() {
    C = pick();
    HOSTS.concat(["site-nav", "brand-link", "site-footer", "view-tabs"]).forEach(function (id) {
      var n = document.getElementById(id);
      if (n) { clear(n); if (n.hasAttribute("aria-labelledby")) { n.removeAttribute("aria-labelledby"); } }
    });
    renderChrome();
    renderViewTabs();
    renderHero();
    renderProblem();
    renderHow();
    renderBusiness();
    renderScope();
    renderDecisions();
    renderRisks();
    renderRequirements();
    renderTraceability();
    renderDesign();
    renderProgress();
    renderArchive();
    renderValidation();
    renderEvolution();
    renderAiUse();
    renderTeam();
    renderFooter();
    applyView(currentView);
    initNavSpy();
    initSearchUi();
    if (paintTheme) { paintTheme(); }
  }

  /* ---------- arranque ---------- */

  renderAll();
  routeFromHash(true);
  window.addEventListener("hashchange", function () { routeFromHash(false); });
  initTheme();
  var lbtn = document.getElementById("lang-toggle");
  if (lbtn && window.IC_LANG) {
    lbtn.addEventListener("click", function () { window.IC_LANG.toggle(); });
    window.addEventListener("iclangchange", function () {
      var y = window.scrollY;
      renderAll();
      window.scrollTo(0, y);
    });
  }
})();
