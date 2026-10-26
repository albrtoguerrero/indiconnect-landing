/* Demo del carrito unificado: catálogo sintético, sin servidor, sin datos personales.
   Todo texto se inserta con textContent. Precios, plazos y envíos son valores inventados. */
(function () {
  "use strict";
  var I = window.IC_I18N;
  if (!I || !window.ICArt) { return; }
  var t = I.t;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var BRANDS = {
    A: { key: "brandA", color: "var(--sw-a)", ship: 3.95, freeFrom: 50, days: "days1", bd: "bd-a" },
    B: { key: "brandB", color: "var(--sw-b)", ship: 4.95, freeFrom: 60, days: "days2", bd: "bd-b" },
    C: { key: "brandC", color: "var(--sw-c)", ship: 2.95, freeFrom: null, days: "days3", bd: "bd-c" }
  };

  var PRODUCTS = [
    { id: "a1", brand: "A", price: 19.95, shape: "tee", color: "#5b6cff" },
    { id: "a2", brand: "A", price: 39.95, shape: "jeans", color: "#3b5b8c" },
    { id: "b1", brand: "B", price: 59.95, shape: "jacket", color: "#e0673d" },
    { id: "b2", brand: "B", price: 45.95, shape: "dress", color: "#1f9d7a" },
    { id: "c1", brand: "C", price: 49.95, shape: "shoe", color: "#2a9d8f" },
    { id: "c2", brand: "C", price: 29.95, shape: "bag", color: "#b9783f" }
  ];

  /* Fotos propias opcionales: id -> ruta relativa (por ejemplo { a1: "img/a1.jpg" }).
     Mientras no haya foto se muestra la ilustración. Ver img/LEEME.txt. */
  var PHOTOS = {};

  var cart = {};          // id -> cantidad
  var orderSeq = 1001;
  var lastAdded = null;   // para animar solo la línea recién añadida
  var lastTotal = 0;

  function money(n) {
    return new Intl.NumberFormat(t("locale"), { style: "currency", currency: "EUR" }).format(Math.round(n * 100) / 100);
  }
  function pname(p) { return t("p_" + p.id); }
  function bname(code) { return t(BRANDS[code].key); }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") { n.textContent = attrs[k]; } else { n.setAttribute(k, attrs[k]); }
    });
    (kids || []).forEach(function (c) { if (c) { n.appendChild(c); } });
    return n;
  }
  function $(id) { return document.getElementById(id); }
  function clear(n) { while (n.firstChild) { n.removeChild(n.firstChild); } }
  function byId(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }

  function visual(p) {
    var box = el("div", { "class": "prod-img " + BRANDS[p.brand].bd }, [window.ICArt.draw(p.shape, p.color)]);
    if (PHOTOS[p.id]) {
      var img = el("img", { src: PHOTOS[p.id], alt: pname(p), loading: "lazy" });
      img.addEventListener("error", function () { img.remove(); });
      box.appendChild(img);
    }
    return box;
  }

  /* Agrupa el carrito por marca y calcula subtotal, envío y total. */
  function groups() {
    var out = {};
    Object.keys(cart).forEach(function (id) {
      var p = byId(id);
      if (!out[p.brand]) { out[p.brand] = { brand: p.brand, lines: [], subtotal: 0 }; }
      out[p.brand].lines.push({ p: p, qty: cart[id] });
      out[p.brand].subtotal += p.price * cart[id];
    });
    return Object.keys(out).sort().map(function (k) {
      var g = out[k], b = BRANDS[k];
      g.shipping = (b.freeFrom !== null && g.subtotal >= b.freeFrom) ? 0 : b.ship;
      g.total = g.subtotal + g.shipping;
      return g;
    });
  }

  function renderCatalog() {
    var ul = $("catalog");
    clear(ul);
    PRODUCTS.forEach(function (p) {
      var btn = el("button", { type: "button", "aria-label": t("addAria", { p: pname(p), b: bname(p.brand) }) }, [
        el("span", { "class": "plus", "aria-hidden": "true", text: "+" }),
        document.createTextNode(" " + t("add"))
      ]);
      var card = el("li", { "class": "prod" }, [
        visual(p),
        el("span", { "class": "prod-brand" }, [
          el("i", { "class": "sw", style: "background:" + BRANDS[p.brand].color }),
          el("span", { text: bname(p.brand) })
        ]),
        el("span", { "class": "prod-name", text: pname(p) }),
        el("span", { "class": "prod-price", text: money(p.price) }),
        btn
      ]);
      btn.addEventListener("click", function () {
        card.classList.remove("flash");
        void card.offsetWidth;   // reinicia la animación
        card.classList.add("flash");
        fly(card.querySelector(".prod-img"));
        add(p.id);
      });
      ul.appendChild(card);
    });
  }

  // La miniatura del producto "vuela" hasta el carrito
  function fly(from) {
    var to = $("cart-title");
    if (reduce || !from || !to || !from.animate) { return; }
    var a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    var ghost = from.cloneNode(true);
    ghost.removeAttribute("id");
    ghost.setAttribute("aria-hidden", "true");
    ghost.className += " fly";
    ghost.style.cssText = "position:fixed;z-index:80;pointer-events:none;margin:0;left:" + a.left + "px;top:" + a.top + "px;width:" + a.width + "px;height:" + a.height + "px";
    document.body.appendChild(ghost);
    var dx = b.left + b.width / 2 - (a.left + a.width / 2);
    var dy = b.top + b.height / 2 - (a.top + a.height / 2);
    var anim = ghost.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: "translate(" + dx * 0.6 + "px," + (dy * 0.6 - 60) + "px) scale(.6)", opacity: .95, offset: .55 },
      { transform: "translate(" + dx + "px," + dy + "px) scale(.12)", opacity: 0 }
    ], { duration: 650, easing: "cubic-bezier(.5,0,.2,1)" });
    anim.onfinish = function () { ghost.remove(); };
  }

  function add(id) { cart[id] = (cart[id] || 0) + 1; lastAdded = id; clearResult(); renderCart(); }
  function remove(id) {
    if (cart[id] > 1) { cart[id] -= 1; } else { delete cart[id]; }
    lastAdded = null;
    renderCart();
  }

  function renderCart() {
    var host = $("cart");
    clear(host);
    var gs = groups();
    var total = 0, count = 0;

    if (!gs.length) { host.appendChild(el("p", { "class": "cart-empty", text: t("cartEmpty") })); }
    gs.forEach(function (g) {
      var b = BRANDS[g.brand];
      total += g.total;
      var isNewBrand = lastAdded && byId(lastAdded).brand === g.brand && g.lines.length === 1 && g.lines[0].qty === 1;
      var box = el("div", { "class": "cart-brand" + (isNewBrand ? " new" : "") }, [
        el("h4", {}, [el("i", { "class": "sw", style: "background:" + b.color }), el("span", { text: bname(g.brand) })])
      ]);
      g.lines.forEach(function (l) {
        count += l.qty;
        var rm = el("button", { type: "button", text: t("remove"), "aria-label": t("removeAria", { p: pname(l.p) }) });
        rm.addEventListener("click", function () { remove(l.p.id); });
        box.appendChild(el("div", { "class": "cart-line" + (l.p.id === lastAdded && !isNewBrand ? " new" : "") }, [
          el("span", { "class": "line-name" }, [
            el("span", { "class": "line-thumb " + b.bd }, [window.ICArt.draw(l.p.shape, l.p.color)]),
            document.createTextNode(l.qty + " × " + pname(l.p))
          ]),
          el("span", {}, [document.createTextNode(money(l.p.price * l.qty) + " "), rm])
        ]));
      });
      box.appendChild(el("div", { "class": "cart-meta" }, [
        el("span", { text: t("ship") + " " + (g.shipping === 0 ? t("free") : money(g.shipping)) }),
        el("span", { text: t("delivery") + " " + t(b.days) })
      ]));
      host.appendChild(box);
    });

    var totalEl = $("cart-total");
    totalEl.textContent = money(total);
    if (total !== lastTotal) {
      [totalEl, $("cart-count")].forEach(function (n) { n.classList.remove("bump"); void n.offsetWidth; n.classList.add("bump"); });
    }
    $("cart-count").textContent = String(count);
    lastTotal = total;
    lastAdded = null;
    $("pay").disabled = !gs.length;
  }

  function clearResult() { clear($("result")); }

  // Confeti con elementos CSS; solo se genera si el usuario admite movimiento
  function confetti(host) {
    if (reduce) { return; }
    var colors = ["#6a5df0", "#e8590c", "#1f9d7a", "#f2c94c", "#e0673d", "#3b5b8c"];
    var wrap = el("div", { "class": "confetti", "aria-hidden": "true" });
    for (var i = 0; i < 26; i++) {
      var p = el("i", {});
      p.style.cssText = "--x:" + (Math.random() * 100).toFixed(1) + "%;--dx:" + ((Math.random() - .5) * 120).toFixed(0) + "px;--r:" + (Math.random() * 720 - 360).toFixed(0) + "deg;--d:" + (Math.random() * .25).toFixed(2) + "s;background:" + colors[i % colors.length];
      wrap.appendChild(p);
    }
    host.appendChild(wrap);
    setTimeout(function () { wrap.remove(); }, 2000);
  }

  function pay() {
    var gs = groups();
    if (!gs.length) { return; }
    var res = $("result");
    clear(res);
    var failing = $("sim-fail").checked ? gs[gs.length - 1] : null;

    if (failing) {
      res.appendChild(el("div", { "class": "result-box result-box--bad" }, [
        el("h4", {}, [el("span", { "class": "tick-badge", "aria-hidden": "true" }), document.createTextNode(t("failTitle"))]),
        el("p", { text: t("failBody", { b: bname(failing.brand) }) })
      ]));
      return;
    }

    var id = "PED-" + (orderSeq++);
    var list = el("ul", {});
    var total = 0;
    gs.forEach(function (g, idx) {
      total += g.total;
      list.appendChild(el("li", { style: "--i:" + idx }, [
        el("span", { text: id + "-" + g.brand + " · " + bname(g.brand) }),
        el("strong", { text: money(g.total) })
      ]));
    });
    var box = el("div", { "class": "result-box result-box--ok" }, [
      el("h4", {}, [el("span", { "class": "tick-badge", "aria-hidden": "true" }), document.createTextNode(t("okTitle", { id: id, total: money(total) }))]),
      el("p", { text: gs.length === 1 ? t("okOne") : t("okMany", { n: gs.length }) }),
      list
    ]);
    res.appendChild(box);
    confetti(box);
    cart = {};
    renderCart();
  }

  function renderAll() { renderCatalog(); renderCart(); }

  renderAll();
  $("pay").addEventListener("click", pay);
  $("sim-fail").addEventListener("change", clearResult);
  window.addEventListener("iclangchange", function () { clearResult(); renderAll(); });
})();
