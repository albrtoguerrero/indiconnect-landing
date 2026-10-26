/* Landing comercial: rellena las secciones de evidencia desde ../js/content.js,
   la misma fuente que la landing documental, para que ambas no se desincronicen.
   Todo texto se inserta con textContent. */
(function () {
  "use strict";
  var C = window.CONTENT;
  if (!C) { return; }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") { n.textContent = attrs[k]; } else { n.setAttribute(k, attrs[k]); }
    });
    (kids || []).forEach(function (c) { if (c) { n.appendChild(c); } });
    return n;
  }
  function $(id) { return document.getElementById(id); }
  function setText(id, t) { var n = $(id); if (n) { n.textContent = t; } }
  function fill(id, nodes) { var n = $(id); if (n) { nodes.forEach(function (c) { n.appendChild(c); }); } }

  function slug(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function badge(status) { return el("span", { "class": "badge badge--" + slug(status), text: status }); }
  function reveal(n) { n.classList.add("reveal"); return n; }

  function dateEs(iso) {
    var p = iso.split("-");
    return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  }

  /* ---------- Parte 1: comprador ---------- */

  function renderBuyer() {
    setText("c-problema-title", "Hoy cada tienda funciona por su cuenta");
    setText("c-problema-intro", C.problem.intro);
    fill("c-problema-list", C.problem.points.map(function (p, i) {
      return reveal(el("li", { "class": "card" }, [
        el("span", { "class": "ico", "aria-hidden": "true", text: String(i + 1) }),
        el("h4", { text: p.title }),
        el("p", { text: p.text })
      ]));
    }));
    fill("c-como-list", C.how.steps.map(function (s, i) {
      return reveal(el("li", {}, [
        el("span", { "class": "num", text: String(i + 1) }),
        el("h4", { text: s.title }),
        el("p", { text: s.text })
      ]));
    }));
  }

  /* ---------- Parte 2: empresario ---------- */

  function renderBusiness() {
    var b = C.business;
    setText("biz-title", b.title);
    setText("biz-hyp", b.hypothesisNote);
    setText("biz-model", b.model);
    fill("biz-caveat", [el("strong", { text: b.caveat.title + ". " }), document.createTextNode(b.caveat.text)]);
    fill("biz-market", [el("span", { "class": "tag", text: b.market.tag }), el("p", { text: b.market.text })]);

    var ex = b.example;
    var rows = ex.rows.map(function (r) {
      return el("tr", {}, [el("th", { scope: "row", text: r[0] }), el("td", { text: r[1] }), el("td", { text: r[2] })]);
    });
    fill("biz-example", [
      el("span", { "class": "tag", text: ex.tag }),
      el("h4", { text: ex.intro }),
      el("table", {}, [
        el("caption", { "class": "sr", text: ex.caption }),
        el("thead", {}, [el("tr", {}, ex.headers.map(function (h) { return el("th", { scope: "col", text: h }); }))]),
        el("tbody", {}, rows),
        el("tfoot", {}, [el("tr", {}, [el("th", { scope: "row", text: ex.totalLabel }), el("td", {}), el("td", { text: ex.totalValue })])])
      ])
    ]);

    setText("biz-disc-title", b.discardedTitle);
    fill("biz-discarded", b.discarded.map(function (d) {
      return reveal(el("li", { "class": "card" }, [
        el("div", { "class": "card-head" }, [el("h4", { text: d.title }), badge(d.status)]),
        el("p", { text: d.text })
      ]));
    }));

    var s = C.scope;
    setText("scope-title", s.title);
    setText("scope-in-title", s.inTitle);
    setText("scope-out-title", s.outTitle);
    fill("scope-in", s.in.map(function (t) { return el("li", { text: t }); }));
    fill("scope-out", s.out.map(function (t) { return el("li", { text: t }); }));

    setText("risks-title", C.risks.title);
    fill("risks-list", C.risks.items.map(function (r) {
      return reveal(el("li", { "class": "card" }, [
        el("span", { "class": "kind", text: r.kind }),
        el("h4", { text: r.title }),
        el("p", { text: r.text })
      ]));
    }));

    var d = C.decisions;
    setText("dec-title", d.title);
    setText("dec-intro", d.intro);
    fill("dec-list", d.items.map(function (i) {
      return reveal(el("li", { "class": "card" }, [
        el("div", { "class": "card-head" }, [el("h4", { text: i.title }), badge(i.status)]),
        el("p", { text: i.text }),
        i.list ? el("ul", { "class": "mini" }, i.list.map(function (t) { return el("li", { text: t }); })) : null
      ]));
    }));
  }

  function textTable(t) {
    return el("div", { "class": "table-wrap", tabindex: "0", role: "region", "aria-label": t.caption }, [
      el("table", { "class": "table" }, [
        el("caption", { "class": "sr", text: t.caption }),
        el("thead", {}, [el("tr", {}, t.headers.map(function (h) { return el("th", { scope: "col", text: h }); }))]),
        el("tbody", {}, t.rows.map(function (r) {
          return el("tr", {}, r.map(function (c, i) {
            return el("td", {}, [t.badgeCol === i ? badge(c) : document.createTextNode(c)]);
          }));
        }))
      ])
    ]);
  }

  function accordion(title, body) {
    return reveal(el("details", { "class": "acc-item" }, [el("summary", { text: title }), body]));
  }

  function renderRequirements() {
    var r = C.requirements;
    setText("req-title", r.title);
    setText("req-intro", r.intro);

    fill("req-needs", r.needs.rows.map(function (n) {
      return reveal(el("li", { "class": "need" }, [
        el("div", { "class": "need-top" }, [el("span", { "class": "idc", text: n[0] }), badge(n[5])]),
        el("p", { "class": "need-text", text: n[2] }),
        el("p", { "class": "need-meta", text: n[1] + " · Prioridad " + n[4] + " · Fuente " + n[3] })
      ]));
    }));
    fill("req-hyp", r.hypotheses.map(function (h) {
      return el("li", {}, [el("span", { "class": "idc", text: h.id }), el("span", { text: h.text }), badge(h.state)]);
    }));
    fill("req-cons", r.constraints.map(function (h) {
      return el("li", {}, [el("span", { "class": "idc", text: h.id }), el("span", { text: h.text })]);
    }));
    fill("req-excl", [el("strong", { text: r.exclusionsTitle + ". " }), document.createTextNode(r.exclusions)]);
    fill("req-tables", [
      accordion(r.sources.title + " (" + r.sources.rows.length + ")", textTable(r.sources)),
      accordion(r.functional.title + " (" + r.functional.rows.length + ")", textTable(r.functional)),
      accordion(r.nonFunctional.title + " (" + r.nonFunctional.rows.length + ")", textTable(r.nonFunctional))
    ]);
    setText("req-scope-note", r.scopeNote);
  }

  function renderTraceability() {
    var t = C.traceability;
    setText("tr-title", t.title);
    setText("tr-intro", t.intro);
    fill("tr-list", t.rows.map(function (row) {
      return reveal(el("li", { "class": "tr" }, [
        el("div", { "class": "tr-chain", "aria-label": "Necesidad, requisitos y criterio" }, [
          el("span", { "class": "idc", text: row.need }),
          el("span", { "class": "tr-arrow", "aria-hidden": "true", text: "→" }),
          el("span", { "class": "idc idc--req", text: row.reqs }),
          el("span", { "class": "tr-arrow", "aria-hidden": "true", text: "→" }),
          el("span", { "class": "idc idc--ca", text: row.id })
        ]),
        el("h4", { text: row.title }),
        el("details", { "class": "gh" }, [
          el("summary", { text: "Ver criterio de aceptación" }),
          el("pre", { "class": "gherkin", text: row.gherkin.join("\n") })
        ])
      ]));
    }));
  }

  function renderProgress() {
    var p = C.progress;
    setText("pg-title", p.title);
    setText("pg-intro", p.intro);
    fill("pg-list", p.sprints.map(function (s) {
      var cls = "rm" + (s.status === "Entregado" ? " rm--done" : s.status === "En curso" ? " rm--now" : "");
      return reveal(el("li", { "class": cls }, [
        el("div", { "class": "rm-top" }, [el("span", { "class": "rm-ms", text: s.milestone }), badge(s.status)]),
        el("h4", { text: s.name }),
        el("p", { "class": "rm-dates", text: s.dates }),
        el("p", { text: s.text }),
        s.note ? el("p", { "class": "rm-note", text: s.note }) : null
      ]));
    }));

    var e = C.evolution;
    var list = el("ol", { "class": "evo" }, e.entries.slice().reverse().map(function (x) {
      return el("li", {}, [
        el("div", { "class": "evo-top" }, [el("time", { datetime: x.date, text: dateEs(x.date) }), el("span", { "class": "evo-who", text: x.who })]),
        el("h5", { text: x.title }),
        el("p", {}, [el("strong", { text: "Qué cambió: " }), document.createTextNode(x.what)]),
        el("p", {}, [el("strong", { text: "Por qué: " }), document.createTextNode(x.why)])
      ]);
    }));
    fill("evo-wrap", [accordion(e.title + " (" + e.entries.length + ")", el("div", {}, [el("p", { "class": "fine", text: e.intro }), list]))]);
  }

  /* ---------- Parte 3: quiénes somos ---------- */

  function renderUs() {
    fill("team-list", C.team.members.map(function (m) {
      var initials = m.name.split(" ").map(function (w) { return w.charAt(0); }).slice(0, 2).join("");
      return reveal(el("li", { "class": "member" }, [
        el("span", { "class": "avatar", "aria-hidden": "true", text: initials }),
        el("span", { "class": "member-name", text: m.name })
      ]));
    }));

    var sp = C.progress.sprints;
    var delivered = sp.filter(function (s) { return s.status === "Entregado"; }).length;
    var unvalidated = C.requirements.hypotheses.filter(function (h) { return h.state === "Sin validar"; }).length;
    var stats = [
      [String(C.team.members.length), "personas en el equipo"],
      [delivered + " de " + sp.length, "hitos entregados"],
      [String(C.requirements.needs.rows.length), "necesidades documentadas"],
      [String(C.traceability.rows.length), "criterios de aceptación"],
      [String(C.decisions.items.length), "decisiones de diseño registradas"],
      [String(unvalidated), "hipótesis aún sin validar"]
    ];
    fill("stats", stats.map(function (s) {
      return reveal(el("div", { "class": "stat" }, [el("strong", { text: s[0] }), el("span", { text: s[1] })]));
    }));

    var a = C.aiUse;
    setText("ai-title", a.title);
    setText("ai-intro", a.intro);
    fill("ai-list", a.principles.map(function (p) {
      return reveal(el("li", { "class": "card" }, [el("h4", { text: p.title }), el("p", { text: p.text })]));
    }));

    setText("foot-updated", "Última actualización: " + dateEs(C.lastUpdated));
  }

  /* ---------- navegación activa y revelado ---------- */

  function initSpy() {
    if (!("IntersectionObserver" in window)) { return; }
    var links = {};
    [].forEach.call(document.querySelectorAll("#top-nav a[href^='#']"), function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var cur = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var l = links[en.target.id];
        if (!l || !en.isIntersecting) { return; }
        if (cur) { cur.removeAttribute("aria-current"); }
        cur = l; l.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    Object.keys(links).forEach(function (id) { var s = $(id); if (s) { io.observe(s); } });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      [].forEach.call(items, function (n) { n.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    [].forEach.call(items, function (n) { io.observe(n); });
  }

  renderBuyer();
  renderBusiness();
  renderRequirements();
  renderTraceability();
  renderProgress();
  renderUs();
  initSpy();
  initReveal();
})();
