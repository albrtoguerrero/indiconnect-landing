/*
 * Renderiza js/content.js dentro del esqueleto de index.html.
 * No contiene texto de contenido: solo estructura y comportamiento.
 * Todo el texto se inserta con textContent (nunca innerHTML) para que
 * un carácter raro en content.js no pueda romper ni inyectar marcado.
 */
(function () {
  "use strict";

  var C = window.CONTENT;
  if (!C) { return; }

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

  function badge(label) {
    return el("span", { "class": "badge badge--" + slug(label), text: label });
  }

  function fill(id, build) {
    var host = document.getElementById(id);
    var container = el("div", { "class": "container" });
    build(container, id + "-title");
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
    var skip = document.getElementById("skip-link");
    skip.textContent = C.ui.skipLink;

    var brand = document.getElementById("brand-link");
    brand.appendChild(el("span", { "class": "brand-dot", "aria-hidden": "true" }));
    brand.appendChild(el("span", { text: C.brand.name }));

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
    host.appendChild(el("div", { "class": "container" }, [
      el("p", { "class": "eyebrow", text: C.brand.tagline }),
      el("h1", { id: "inicio-title", text: C.hero.title }),
      el("p", { "class": "lead", text: C.hero.value }),
      el("a", { "class": "btn", href: C.hero.cta.href, text: C.hero.cta.label }),
      el("p", { "class": "legal legal--hero", text: C.legal })
    ]));
  }

  function formatDate(iso) {
    var p = iso.split("-");
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    if (isNaN(d.getTime())) { return iso; }
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
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

  function renderTeam() {
    fill("equipo", function (c, hid) {
      c.appendChild(heading(hid, C.team.title));
      c.appendChild(el("p", { "class": "lead", text: C.team.intro }));
      c.appendChild(el("ul", { "class": "cards" }, C.team.members.map(function (m) {
        return el("li", { "class": "card member" }, [
          el("div", { "class": "avatar", "aria-hidden": "true", text: m.name.replace(/[^\p{L}]/gu, "").charAt(0) || "?" }),
          el("h3", { text: m.name }),
          el("p", { "class": "role", text: m.role })
        ]);
      })));
    });
  }

  /* ---------- tema claro/oscuro ---------- */

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

  /* ---------- arranque ---------- */

  renderChrome();
  renderHero();
  renderProblem();
  renderHow();
  renderBusiness();
  renderScope();
  renderDecisions();
  renderRisks();
  renderProgress();
  renderTeam();
  renderFooter();
  initTheme();
})();
