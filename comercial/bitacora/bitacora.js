/* Bitácora de prompts: varios autores, filtrable por entregable. Todo con textContent. */
(function () {
  "use strict";

  var TZ = "Europe/Madrid";
  var TXT = {
    es: {
      eyebrow: "Registro de trabajo", title: "Bitácora de prompts",
      intro: "Cada petición recibida para construir estas landings y las instrucciones que se emitieron para resolverla (órdenes, ediciones y consultas), de todo el equipo, con su fecha, su hora y sus detalles. Las horas se muestran en horario de Madrid; los JSON guardan la hora UTC original.",
      search: "Buscar en los prompts…", qlabel: "Buscar",
      authorL: "Autor", topicL: "Entregable", allA: "Todo el equipo", allT: "Todos los entregables",
      total: "Prompts", acts: "Instrucciones", days: "Días con actividad", words: "Palabras", authors: "Autores",
      count: "{n} de {t} prompts", one: "1 de {t} prompts", none: "Ningún prompt coincide con los filtros.",
      chars: "{n} caracteres", wordsN: "{n} palabras", gap: "{g} desde el anterior", first1: "primer prompt de {a}",
      session: "sesión {s}", mode: "modo {m}", utc: "UTC {t}",
      cut: "Texto abreviado: se muestran los primeros {p} de {n} caracteres.",
      actsOf: "Instrucciones emitidas ({n})", cmd: "Detalle", untagged: "Sin entregable",
      openDoc: "Ver el entregable", share: "Copiar enlace a esta vista", copied: "Enlace copiado",
      note: "Registro generado automáticamente. Se eliminan correos y claves, y los textos largos se abrevian.",
      err: "No se ha podido cargar la bitácora.", min: "{n} min", h: "{n} h", d: "{n} d", s: "{n} s"
    },
    en: {
      eyebrow: "Work record", title: "Prompt log",
      intro: "Every request received to build these landing pages and the instructions issued to carry it out (commands, edits and lookups), from the whole team, with date, time and details. Times are shown in Madrid time; the JSON files keep the original UTC time.",
      search: "Search the prompts…", qlabel: "Search",
      authorL: "Author", topicL: "Deliverable", allA: "Whole team", allT: "All deliverables",
      total: "Prompts", acts: "Instructions", days: "Active days", words: "Words", authors: "Authors",
      count: "{n} of {t} prompts", one: "1 of {t} prompts", none: "No prompt matches the filters.",
      chars: "{n} characters", wordsN: "{n} words", gap: "{g} since the previous one", first1: "{a}'s first prompt",
      session: "session {s}", mode: "{m} mode", utc: "UTC {t}",
      cut: "Shortened text: showing the first {p} of {n} characters.",
      actsOf: "Instructions issued ({n})", cmd: "Details", untagged: "No deliverable",
      openDoc: "Open the deliverable", share: "Copy link to this view", copied: "Link copied",
      note: "Automatically generated record. Emails and keys are removed, and long texts are shortened.",
      err: "The log could not be loaded.", min: "{n} min", h: "{n} h", d: "{n} d", s: "{n} s"
    }
  };

  var entries = [], actions = {}, authors = [], topics = [], topicById = {};
  var fAuthor = "", fTopic = "", query = "";

  function lang() { return window.IC_LANG ? window.IC_LANG.get() : "es"; }
  function t(k, v) {
    var s = TXT[lang()][k] || TXT.es[k] || k;
    if (v) { Object.keys(v).forEach(function (x) { s = s.split("{" + x + "}").join(v[x]); }); }
    return s;
  }
  function tName(id) {
    var o = topicById[id];
    return o ? (lang() === "en" ? o.en : o.es) : id;
  }
  function loc() { return lang() === "en" ? "en-GB" : "es-ES"; }
  function fmt(opts, ts) { return new Intl.DateTimeFormat(loc(), Object.assign({ timeZone: TZ }, opts)).format(new Date(ts)); }
  function dayKey(ts) { return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(ts)); }
  function gapText(sec) {
    if (sec < 60) { return t("s", { n: sec }); }
    if (sec < 3600) { return t("min", { n: Math.round(sec / 60) }); }
    if (sec < 86400) { return t("h", { n: Math.round(sec / 3600) }); }
    return t("d", { n: Math.round(sec / 86400) });
  }
  function node(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text !== undefined) { n.textContent = text; }
    return n;
  }
  function $(id) { return document.getElementById(id); }
  function authorName(id) {
    var a = authors.filter(function (x) { return x.id === id; })[0];
    return a ? a.name : id;
  }

  function visible() {
    var q = query.trim().toLowerCase();
    return entries.filter(function (e) {
      if (fAuthor && e.author !== fAuthor) { return false; }
      if (fTopic) {
        var tp = e.topics && e.topics.length ? e.topics : ["_none"];
        if (tp.indexOf(fTopic) === -1) { return false; }
      }
      if (!q) { return true; }
      if (e.text.toLowerCase().indexOf(q) !== -1) { return true; }
      return (actions[e.author + "|" + e.n] || []).some(function (a) {
        return (a.text + " " + a.tool + " " + (a.extra || "")).toLowerCase().indexOf(q) !== -1;
      });
    });
  }

  function syncUrl() {
    var p = new URLSearchParams(window.location.search);
    ["tema", "autor"].forEach(function (k) { p.delete(k); });
    if (fTopic) { p.set("tema", fTopic); }
    if (fAuthor) { p.set("autor", fAuthor); }
    var qs = p.toString();
    try { history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : "")); } catch (e) { /* entorno sin History API */ }
  }

  function renderStats(list) {
    var words = 0, days = {}, acts = 0, who = {};
    list.forEach(function (e) {
      words += e.words; days[dayKey(e.ts)] = 1; who[e.author] = 1;
      acts += (actions[e.author + "|" + e.n] || []).length;
    });
    var dl = $("lg-stats");
    dl.textContent = "";
    [[t("total"), list.length], [t("acts"), acts.toLocaleString(loc())], [t("authors"), Object.keys(who).length],
      [t("days"), Object.keys(days).length], [t("words"), words.toLocaleString(loc())]].forEach(function (r) {
      var d = node("div");
      d.appendChild(node("dt", "", r[0]));
      d.appendChild(node("dd", "", String(r[1])));
      dl.appendChild(d);
    });
  }

  function chip(box, label, pressed, onClick) {
    var b = node("button", "", label);
    b.type = "button";
    b.setAttribute("aria-pressed", String(pressed));
    b.addEventListener("click", onClick);
    box.appendChild(b);
  }

  function renderFilters() {
    var ab = $("lg-authors"), tb = $("lg-chips"), tc = {}, ac = {};
    ab.textContent = ""; tb.textContent = "";
    entries.forEach(function (e) {
      ac[e.author] = (ac[e.author] || 0) + 1;
      (e.topics && e.topics.length ? e.topics : ["_none"]).forEach(function (k) { tc[k] = (tc[k] || 0) + 1; });
    });
    ab.appendChild(node("span", "log-flabel", t("authorL")));
    chip(ab, t("allA") + " · " + entries.length, fAuthor === "", function () { fAuthor = ""; renderAll(); });
    authors.forEach(function (a) {
      chip(ab, a.name + " · " + (ac[a.id] || 0), fAuthor === a.id, function () { fAuthor = a.id; renderAll(); });
    });
    tb.appendChild(node("span", "log-flabel", t("topicL")));
    chip(tb, t("allT"), fTopic === "", function () { fTopic = ""; renderAll(); });
    topics.forEach(function (o) {
      if (!tc[o.id]) { return; }
      chip(tb, tName(o.id) + " · " + tc[o.id], fTopic === o.id, function () { fTopic = o.id; renderAll(); });
    });
    if (tc._none) { chip(tb, t("untagged") + " · " + tc._none, fTopic === "_none", function () { fTopic = "_none"; renderAll(); }); }
  }

  function actionsBox(list) {
    var box = node("details", "log-acts");
    box.appendChild(node("summary", "", t("actsOf", { n: list.length })));
    var ol = node("ol", "log-actlist");
    list.forEach(function (a) {
      var li = node("li"), row = node("div", "log-act");
      var tm = node("time", "log-time", fmt({ hour: "2-digit", minute: "2-digit", second: "2-digit" }, a.ts));
      tm.setAttribute("datetime", a.ts);
      row.appendChild(tm);
      row.appendChild(node("span", "log-tool", a.tool));
      row.appendChild(node("span", "log-acttext", a.text));
      li.appendChild(row);
      if (a.extra && a.extra !== a.text) {
        var d = node("details", "log-extra");
        d.appendChild(node("summary", "", t("cmd")));
        d.appendChild(node("pre", "log-code", a.extra));
        li.appendChild(d);
      }
      ol.appendChild(li);
    });
    box.appendChild(ol);
    return box;
  }

  function renderList(items) {
    var list = $("lg-list"), last = "";
    list.textContent = "";
    $("lg-count").textContent = items.length === 1 ? t("one", { t: entries.length }) : t("count", { n: items.length, t: entries.length });
    if (!items.length) { list.appendChild(node("p", "log-empty", t("none"))); return; }
    items.forEach(function (e) {
      var k = dayKey(e.ts);
      if (k !== last) {
        var dl = fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }, e.ts);
        list.appendChild(node("h2", "log-day", dl.charAt(0).toUpperCase() + dl.slice(1)));
        last = k;
      }
      var card = node("article", "log-item");
      var head = node("div", "log-head");
      head.appendChild(node("span", "log-n", "#" + e.n));
      head.appendChild(node("span", "log-author", authorName(e.author)));
      var tm = node("time", "log-time", fmt({ hour: "2-digit", minute: "2-digit", second: "2-digit" }, e.ts));
      tm.setAttribute("datetime", e.ts);
      head.appendChild(tm);
      head.appendChild(node("span", "", t("utc", { t: e.ts.slice(11, 19) })));
      head.appendChild(node("span", "", e.gap === 0 && e.n === 1 ? t("first1", { a: authorName(e.author) }) : t("gap", { g: gapText(e.gap) })));
      card.appendChild(head);
      card.appendChild(node("p", "log-text", e.text));
      var meta = node("div", "log-meta");
      (e.topics && e.topics.length ? e.topics : ["_none"]).forEach(function (id) {
        var o = topicById[id];
        if (o) {
          var a = node("a", "log-topic", tName(id));
          a.href = o.link;
          a.title = t("openDoc");
          meta.appendChild(a);
        } else {
          meta.appendChild(node("span", "log-topic", t("untagged")));
        }
      });
      [t("chars", { n: e.chars }), t("wordsN", { n: e.words }), t("session", { s: e.session })]
        .concat(e.mode ? [t("mode", { m: e.mode })] : [])
        .forEach(function (m) { meta.appendChild(node("span", "", m)); });
      card.appendChild(meta);
      if (e.truncated) { card.appendChild(node("p", "log-note", t("cut", { p: 700, n: e.chars }))); }
      var acts = actions[e.author + "|" + e.n];
      if (acts) { card.appendChild(actionsBox(acts)); }
      list.appendChild(card);
    });
  }

  function csv() {
    var rows = [["author", "n", "utc", "madrid", "deliverables", "chars", "words", "gap_seconds", "session", "mode", "instructions", "text"]];
    visible().forEach(function (e) {
      rows.push([e.author, e.n, e.ts, new Intl.DateTimeFormat("sv-SE", { timeZone: TZ, dateStyle: "short", timeStyle: "medium" }).format(new Date(e.ts)),
        (e.topics || []).join(" "), e.chars, e.words, e.gap, e.session, e.mode, e.actions || 0, e.text]);
    });
    var body = rows.map(function (r) {
      return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(",");
    }).join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + body], { type: "text/csv;charset=utf-8" }));
    a.download = "prompts.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function renderStatic() {
    $("lg-eyebrow").textContent = t("eyebrow");
    $("lg-title").textContent = t("title");
    $("lg-intro").textContent = t("intro");
    $("lg-note").textContent = t("note");
    $("lg-qlabel").textContent = t("qlabel");
    $("lg-q").placeholder = t("search");
    $("lg-share").textContent = t("share");
  }

  function renderAll() {
    renderStatic();
    if (!entries.length) { return; }
    var items = visible();
    renderStats(items); renderFilters(); renderList(items); syncUrl();
  }

  function fetchJson(u) {
    return fetch(u, { cache: "no-cache" }).then(function (r) { if (!r.ok) { throw new Error(u + " " + r.status); } return r.json(); });
  }

  function init() {
    if (!$("lg-list")) { return; }
    renderStatic();
    var p = new URLSearchParams(window.location.search);
    fTopic = p.get("tema") || ""; fAuthor = p.get("autor") || "";
    Promise.all([fetchJson("topics.json"), fetchJson("data/index.json")]).then(function (r) {
      topics = r[0].topics; authors = r[1].authors;
      topics.forEach(function (o) { topicById[o.id] = o; });
      return Promise.all(authors.map(function (a) { return fetchJson("data/" + a.file); }));
    }).then(function (files) {
      files.forEach(function (d) {
        d.entries.forEach(function (e) { e.author = d.author; entries.push(e); });
        d.actions.forEach(function (a) { var k = d.author + "|" + a.p; (actions[k] = actions[k] || []).push(a); });
      });
      entries.sort(function (a, b) { return a.ts < b.ts ? -1 : 1; });
      renderAll();
    }).catch(function () { $("lg-count").textContent = t("err"); });
    $("lg-q").addEventListener("input", function (ev) { query = ev.target.value; renderAll(); });
    $("lg-csv").addEventListener("click", function () { if (entries.length) { csv(); } });
    $("lg-share").addEventListener("click", function () {
      var done = function () { $("lg-share").textContent = t("copied"); setTimeout(renderStatic, 1800); };
      if (navigator.clipboard) { navigator.clipboard.writeText(window.location.href).then(done, function () { /* sin permiso de portapapeles */ }); }
    });
    window.addEventListener("iclangchange", renderAll);
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); } else { init(); }
})();
