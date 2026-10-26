/*
 * Idioma compartido por la landing documental y la comercial.
 * Orden de prioridad: ?lang=en|es en la URL, elección guardada, español.
 * Al cambiar, se guarda y se emite el evento "iclangchange".
 */
(function () {
  "use strict";
  var KEY = "indiconnect-lang";
  var cur = "es";

  function valid(v) { return v === "es" || v === "en"; }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* almacenamiento bloqueado: el idioma solo dura esta visita */ }
  }

  try {
    var s = localStorage.getItem(KEY);
    if (valid(s)) { cur = s; }
  } catch (e) { /* sin almacenamiento: se queda en español */ }

  try {
    var q = new URLSearchParams(window.location.search).get("lang");
    if (valid(q)) { cur = q; save(q); }
  } catch (e) { /* URLSearchParams no disponible: se ignora el parámetro */ }

  document.documentElement.lang = cur;

  window.IC_LANG = {
    get: function () { return cur; },
    set: function (l) {
      if (!valid(l) || l === cur) { return; }
      cur = l;
      save(l);
      document.documentElement.lang = l;
      window.dispatchEvent(new Event("iclangchange"));
    },
    toggle: function () { this.set(cur === "es" ? "en" : "es"); }
  };
})();
