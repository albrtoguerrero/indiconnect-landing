/* Demo del carrito unificado: catálogo sintético, sin servidor, sin datos personales.
   Todo texto se inserta con textContent. Precios, plazos y envíos son valores inventados. */
(function () {
  "use strict";

  var BRANDS = {
    A: { name: "Marca A", color: "var(--sw-a)", ship: 3.95, freeFrom: 50, days: "2–3 días" },
    B: { name: "Marca B", color: "var(--sw-b)", ship: 4.95, freeFrom: 60, days: "3–5 días" },
    C: { name: "Marca C", color: "var(--sw-c)", ship: 2.95, freeFrom: null, days: "2–4 días" }
  };

  var PRODUCTS = [
    { id: "a1", brand: "A", name: "Camiseta básica", price: 19.95, shape: "tee" },
    { id: "a2", brand: "A", name: "Vaquero recto", price: 39.95, shape: "jeans" },
    { id: "b1", brand: "B", name: "Chaqueta ligera", price: 59.95, shape: "jacket" },
    { id: "b2", brand: "B", name: "Vestido midi", price: 45.95, shape: "dress" },
    { id: "c1", brand: "C", name: "Zapatillas urbanas", price: 49.95, shape: "shoe" },
    { id: "c2", brand: "C", name: "Bolso de mano", price: 29.95, shape: "bag" }
  ];

  var SHAPES = {
    tee: ["M20 10 L8 18 L13 28 L19 25 L19 54 L45 54 L45 25 L51 28 L56 18 L44 10 Q32 18 20 10Z"],
    jeans: ["M18 8 H46 L50 56 H36 L32 28 L28 56 H14Z"],
    jacket: ["M22 8 L6 20 L10 54 L22 54 L22 26 L32 22 L42 26 L42 54 L54 54 L58 20 L42 8 L32 18Z"],
    dress: ["M24 6 H40 L38 22 L50 58 H14 L26 22Z"],
    shoe: ["M6 40 L6 28 L22 26 L30 36 H52 Q58 38 58 44 V48 H6Z"],
    bag: ["M14 24 H50 L54 54 H10Z"]
  };

  var NS = "http://www.w3.org/2000/svg";
  var cart = {};       // id -> cantidad
  var orderSeq = 1001;

  var fmt = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
  function money(n) { return fmt.format(Math.round(n * 100) / 100); }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") { n.textContent = attrs[k]; } else { n.setAttribute(k, attrs[k]); }
    });
    (kids || []).forEach(function (c) { if (c) { n.appendChild(c); } });
    return n;
  }

  function icon(p) {
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 64 64");
    svg.setAttribute("aria-hidden", "true");
    SHAPES[p.shape].forEach(function (d) {
      var path = document.createElementNS(NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", BRANDS[p.brand].color);
      path.setAttribute("opacity", ".9");
      svg.appendChild(path);
    });
    if (p.shape === "bag") {
      var h = document.createElementNS(NS, "path");
      h.setAttribute("d", "M24 24 V18 Q32 8 40 18 V24");
      h.setAttribute("fill", "none");
      h.setAttribute("stroke", BRANDS[p.brand].color);
      h.setAttribute("stroke-width", "3");
      svg.appendChild(h);
    }
    return svg;
  }

  function byId(id) {
    return PRODUCTS.filter(function (p) { return p.id === id; })[0];
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
    var ul = document.getElementById("catalog");
    PRODUCTS.forEach(function (p) {
      var btn = el("button", { type: "button", text: "Añadir al carrito", "aria-label": "Añadir al carrito: " + p.name + ", " + BRANDS[p.brand].name });
      btn.addEventListener("click", function () { add(p.id); });
      ul.appendChild(el("li", { "class": "prod" }, [
        el("div", { "class": "prod-img" }, [icon(p)]),
        el("span", { "class": "prod-brand" }, [
          el("i", { "class": "sw", style: "background:" + BRANDS[p.brand].color }),
          el("span", { text: BRANDS[p.brand].name })
        ]),
        el("span", { "class": "prod-name", text: p.name }),
        el("span", { "class": "prod-price", text: money(p.price) }),
        btn
      ]));
    });
  }

  function add(id) { cart[id] = (cart[id] || 0) + 1; clearResult(); renderCart(); }
  function remove(id) {
    if (cart[id] > 1) { cart[id] -= 1; } else { delete cart[id]; }
    renderCart();
  }

  function renderCart() {
    var host = document.getElementById("cart");
    host.textContent = "";
    var gs = groups();
    var total = 0;

    if (!gs.length) {
      host.appendChild(el("p", { "class": "cart-empty", text: "Tu carrito está vacío. Añade prendas de distintas marcas." }));
    }
    gs.forEach(function (g) {
      var b = BRANDS[g.brand];
      total += g.total;
      var box = el("div", { "class": "cart-brand" }, [
        el("h4", {}, [el("i", { "class": "sw", style: "background:" + b.color }), el("span", { text: b.name })])
      ]);
      g.lines.forEach(function (l) {
        var rm = el("button", { type: "button", text: "Quitar", "aria-label": "Quitar una unidad de " + l.p.name });
        rm.addEventListener("click", function () { remove(l.p.id); });
        box.appendChild(el("div", { "class": "cart-line" }, [
          el("span", { text: l.qty + " × " + l.p.name }),
          el("span", {}, [document.createTextNode(money(l.p.price * l.qty) + " "), rm])
        ]));
      });
      box.appendChild(el("div", { "class": "cart-meta" }, [
        el("span", { text: "Envío: " + (g.shipping === 0 ? "gratis" : money(g.shipping)) }),
        el("span", { text: "Entrega: " + b.days })
      ]));
      host.appendChild(box);
    });

    document.getElementById("cart-total").textContent = money(total);
    document.getElementById("pay").disabled = !gs.length;
  }

  function clearResult() { document.getElementById("result").textContent = ""; }

  function pay() {
    var gs = groups();
    if (!gs.length) { return; }
    var res = document.getElementById("result");
    res.textContent = "";
    var failing = document.getElementById("sim-fail").checked ? gs[gs.length - 1] : null;

    if (failing) {
      res.appendChild(el("div", { "class": "result-box result-box--bad" }, [
        el("h4", { text: "Pedido no confirmado" }),
        el("p", { text: BRANDS[failing.brand].name + " no ha podido confirmar su parte. Según la propuesta actual no se confirma ninguna: no queda ningún pedido ni subpedido a medias, y tu carrito se conserva." })
      ]));
      return;
    }

    var id = "PED-" + (orderSeq++);
    var list = el("ul", {});
    var total = 0;
    gs.forEach(function (g) {
      total += g.total;
      list.appendChild(el("li", {}, [
        el("span", { text: id + "-" + g.brand + " · " + BRANDS[g.brand].name }),
        el("strong", { text: money(g.total) })
      ]));
    });
    res.appendChild(el("div", { "class": "result-box result-box--ok" }, [
      el("h4", { text: "Pedido " + id + " confirmado: " + money(total) }),
      el("p", { text: "Un único pago simulado. El pedido se ha dividido en " + gs.length + (gs.length === 1 ? " subpedido:" : " subpedidos, uno por marca:") }),
      list
    ]));
    cart = {};
    renderCart();
  }

  renderCatalog();
  renderCart();
  document.getElementById("pay").addEventListener("click", pay);
  document.getElementById("sim-fail").addEventListener("change", clearResult);
})();
