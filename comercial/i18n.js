/* Traducciones de la landing comercial.
   El español vive en el propio HTML (atributos data-i18n); aquí está el inglés
   y las cadenas que genera JavaScript. El contenido de evidencia (riesgos,
   requisitos, etc.) viene de ../js/content.js y ../js/content.en.js. */
(function () {
  "use strict";

  var EN = {
    docTitle: "IndiConnect · One cart for all the brands",
    metaDesc: "IndiConnect brings the brands of a textile group into a single cart. For shoppers: one payment and delivery times at a glance. For business owners: cross-brand demand and per-brand sub-orders. Fictional academic project.",
    skip: "Skip to content",
    logoAria: "IndiConnect",
    navAria: "Page sections",
    navBuy: "I'm a shopper",
    navBiz: "I'm a business owner",
    navUs: "About us",
    navDocs: "Documentation",
    banner: "Fictional academic project: synthetic catalogue, simulated payment and no real brands.",
    heroEyebrow: "Multi-brand fashion · one order",
    h1a: "All the group's brands.",
    h1b: "One single cart.",
    heroLead: "Shoppers pay once and see everything together. Sellers receive only their part of the order and gain access to the whole group's demand.",
    ctaBuy: "I'm a shopper",
    ctaBiz: "I'm a business owner",
    tick1: "A single payment",
    tick2: "One sub-order per brand",
    tick3: "Delivery times and shipping at a glance",
    mockCart: "Your cart",
    mockBrands: "3 brands",
    brandA: "Brand A",
    brandB: "Brand B",
    brandC: "Brand C",
    mockP1: "Basic T-shirt",
    mockP2: "Light jacket",
    mockP3: "Sneakers",
    mockPr1: "€19.95",
    mockPr2: "€59.95",
    mockPr3: "€49.95",
    total: "Total",
    mockTotal: "€129.85",
    mockPay: "Pay once",
    chip1: "1 order",
    chip2: "3 sub-orders",
    part1: "Part 1",
    doorBuyT: "For shoppers",
    doorBuyP: "One cart, one payment, and every brand's delivery times and conditions on one screen. Try it with the demo.",
    doorBuyGo: "See the shopper's side",
    part2: "Part 2",
    doorBizT: "For business owners",
    doorBizP: "Business model, scope, risks, requirements and traceability: what you need to know before betting on this platform.",
    doorBizGo: "See the business owner's side",
    brandsAria: "Example brands",
    brandsLabel: "One group, many brands · example brands, fictional",
    bl1: "BRAND A", bl2: "Brand B", bl3: "BRAND C", bl4: "Brand D", bl5: "BRAND E",
    p1Eyebrow: "Part 1 · For shoppers",
    p1Title: "Shop at several brands without repeating everything",
    p1Nav: "Contents of the shopper's part",
    p1a: "The problem", p1b: "How it works", p1c: "Demo", p1d: "Benefits", p1e: "Questions",
    howTitle: "From a cart to an order, and from an order to one sub-order per brand",
    demoTitle: "Fill the cart and watch the order split",
    demoSub: "Synthetic catalogue and prices. Add items from different brands and pay with one click (simulated).",
    demoCatalog: "Example catalogue",
    simFail: "Simulate one brand failing to confirm",
    pay: "Pay (simulated)",
    demoFine1: "Delivery times, shipping and prices in the demo are invented for illustration. If one brand fails, none is confirmed: this is the behaviour currently proposed and it is still under review (see",
    demoFineLink: "open decisions",
    demoFine2: ").",
    advTitle: "Fewer steps, more clarity",
    adv1t: "A single cart",
    adv1p: "Products from several brands together, with a subtotal per brand and an overall total.",
    adv2t: "One payment",
    adv2p: "One checkout for the whole cart, instead of one per store.",
    adv3t: "Delivery times at a glance",
    adv3p: "Each brand's delivery time and shipping cost, on the same screen.",
    adv4t: "Conditions in one place",
    adv4p: "The conditions of all the brands, viewable together.",
    faqBuyTitle: "Questions from shoppers",
    fb1q: "Is this a real shop?",
    fb1a: "No. It is a fictional academic Software Engineering project, not affiliated with Inditex or any other real company or brand. Nothing is sold and no payment is processed.",
    fb2q: "Who sells to me, the group or each brand?",
    fb2a: "In the proposed design, the group is the only seller towards you. Sub-orders only distribute fulfilment (warehouse and shipping) among the brands.",
    fb3q: "What happens if a brand cannot confirm its part?",
    fb3a: "The current proposal is that no part of the order is confirmed, so no half-finished orders are left. This decision is still under review.",
    fb4q: "Is my data stored?",
    fb4a: "No. The demo runs in your browser, has no server or accounts and collects no personal data. The page uses no trackers or third-party resources.",
    p2Eyebrow: "Part 2 · For business owners and brands",
    p2Title: "Cross-brand demand without losing control of your part",
    p2Nav: "Contents of the business owner's part",
    p2a: "Proposal", p2b: "Business model", p2c: "Scope", p2d: "Risks", p2e: "Decisions", p2f: "Requirements", p2g: "Traceability", p2h: "Roadmap",
    offerTitle: "What the platform offers each brand",
    offerSub: "A shared storefront and checkout for the whole group. Each brand receives only its own sub-order to prepare and ship.",
    o1t: "Only your part of the order.",
    o1p: "Each sub-order contains only your brand's items, with its amount, status and identifier.",
    o2t: "Shared visibility.",
    o2p: "Your products appear alongside those of the rest of the group, with no paid placement.",
    o3t: "A single seller towards the customer.",
    o3p: "The group sells; the brands share the fulfilment.",
    o4t: "No half-finished orders.",
    o4p: "If one brand cannot confirm, no part is confirmed (proposal under review).",
    flowAria: "Flow: a cart becomes an order and the order becomes one sub-order per brand",
    flowCart: "Unified cart",
    flowCartS: "Products from several brands",
    flowOrder: "Order",
    flowOrderS: "One payment · seller: the group",
    flowSub: "Sub-order",
    risksSub: "We prefer to say it plainly: these are the unvalidated assumptions and the risks we see.",
    needsTitle: "Identified needs",
    faqBizTitle: "Questions from sellers",
    fv1q: "How does the platform make money?",
    fv1a: "The hypothesis is a commission on each confirmed sub-order. It is unvalidated and, since the brands belong to the same group, it only adds new value if the unified cart generates additional sales.",
    fv2q: "What is validated and what is not?",
    fv2a: "Nothing commercial has been validated with users. No interviews or documented benchmarking have been done: the needs come from the Milestone 1 framing and remain hypotheses until tested.",
    fv3q: "What gets built and what stays out?",
    fv3a: "A prototype with a synthetic catalogue and simulated payment is built. Real shipping, returns, customer service and integration with real shops stay out.",
    fv4q: "Where can I review the details?",
    fv4a1: "In the",
    fv4a2: "documentation landing",
    fv4a3: ", with requirements, acceptance criteria, decisions, risks, progress, evolution and use of AI.",
    p3Eyebrow: "About us",
    p3Title: "A team of three people and a way of working",
    usIntro: "IndiConnect is a university Software Engineering project. We start from a real online-shopping problem, specify it with requirements and testable criteria, and build it by milestones, with traceability as the common thread.",
    statsAria: "The project in numbers",
    finalTitle: "One purchase, all the brands",
    finalSub: "Try it in under a minute or review how it is specified.",
    finalCta1: "Try the demo",
    finalCta2: "See the documentation",
    footTag: "University project · Software Engineering",
    footTeam: "Team: Alberto Guerrero, Lucía Guerra and Mikel Moriel.",
    legalLabel: "Legal notice",
    legal: "Fictional academic project, not affiliated with Inditex or any other real company or brand."
  };

  // Cadenas que genera JavaScript. {x} se sustituye con t(key, {x: ...}).
  var DYN = {
    es: {
      langBtn: "English", langAria: "Cambiar el idioma a inglés", locale: "es-ES",
      problemTitle: "Hoy cada tienda funciona por su cuenta",
      priority: "Prioridad", source: "Fuente",
      seeCriterion: "Ver criterio de aceptación", chainAria: "Necesidad, requisitos y criterio",
      statTeam: "personas en el equipo", statMilestones: "hitos entregados", statNeeds: "necesidades documentadas",
      statCriteria: "criterios de aceptación", statDecisions: "decisiones de diseño registradas", statHyp: "hipótesis aún sin validar",
      ofWord: "de",
      brandA: "Marca A", brandB: "Marca B", brandC: "Marca C",
      days1: "2–3 días", days2: "3–5 días", days3: "2–4 días",
      p_a1: "Camiseta básica", p_a2: "Vaquero recto", p_b1: "Chaqueta ligera", p_b2: "Vestido midi", p_c1: "Zapatillas urbanas", p_c2: "Bolso de mano",
      add: "Añadir al carrito", addAria: "Añadir al carrito: {p}, {b}", cartEmpty: "Tu carrito está vacío. Añade prendas de distintas marcas.",
      remove: "Quitar", removeAria: "Quitar una unidad de {p}", ship: "Envío:", free: "gratis", delivery: "Entrega:",
      failTitle: "Pedido no confirmado",
      failBody: "{b} no ha podido confirmar su parte. Según la propuesta actual no se confirma ninguna: no queda ningún pedido ni subpedido a medias, y tu carrito se conserva.",
      okTitle: "Pedido {id} confirmado: {total}",
      okOne: "Un único pago simulado. El pedido se ha dividido en 1 subpedido:",
      okMany: "Un único pago simulado. El pedido se ha dividido en {n} subpedidos, uno por marca:",
      updated: "Última actualización: "
    },
    en: {
      langBtn: "Español", langAria: "Switch the language to Spanish", locale: "en-GB",
      problemTitle: "Today every store works on its own",
      priority: "Priority", source: "Source",
      seeCriterion: "See acceptance criterion", chainAria: "Need, requirements and criterion",
      statTeam: "people on the team", statMilestones: "milestones delivered", statNeeds: "documented needs",
      statCriteria: "acceptance criteria", statDecisions: "design decisions recorded", statHyp: "hypotheses still unvalidated",
      ofWord: "of",
      brandA: "Brand A", brandB: "Brand B", brandC: "Brand C",
      days1: "2–3 days", days2: "3–5 days", days3: "2–4 days",
      p_a1: "Basic T-shirt", p_a2: "Straight jeans", p_b1: "Light jacket", p_b2: "Midi dress", p_c1: "Urban sneakers", p_c2: "Handbag",
      add: "Add to cart", addAria: "Add to cart: {p}, {b}", cartEmpty: "Your cart is empty. Add items from different brands.",
      remove: "Remove", removeAria: "Remove one unit of {p}", ship: "Shipping:", free: "free", delivery: "Delivery:",
      failTitle: "Order not confirmed",
      failBody: "{b} could not confirm its part. Under the current proposal none is confirmed: no half-finished order or sub-order remains, and your cart is kept.",
      okTitle: "Order {id} confirmed: {total}",
      okOne: "A single simulated payment. The order has been split into 1 sub-order:",
      okMany: "A single simulated payment. The order has been split into {n} sub-orders, one per brand:",
      updated: "Last updated: "
    }
  };

  function lang() { return window.IC_LANG ? window.IC_LANG.get() : "es"; }

  function t(key, vars) {
    var s = (DYN[lang()] && DYN[lang()][key]) || DYN.es[key] || key;
    if (vars) { Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); }); }
    return s;
  }

  // Traduce los elementos con data-i18n / data-i18n-aria. El español original se guarda la primera vez.
  function apply() {
    var en = lang() === "en";
    [].forEach.call(document.querySelectorAll("[data-i18n]"), function (n) {
      if (n.getAttribute("data-es") === null) { n.setAttribute("data-es", n.textContent); }
      var k = n.getAttribute("data-i18n");
      n.textContent = en && EN[k] !== undefined ? EN[k] : n.getAttribute("data-es");
    });
    [].forEach.call(document.querySelectorAll("[data-i18n-aria]"), function (n) {
      if (n.getAttribute("data-es-aria") === null) { n.setAttribute("data-es-aria", n.getAttribute("aria-label") || ""); }
      var k = n.getAttribute("data-i18n-aria");
      n.setAttribute("aria-label", en && EN[k] !== undefined ? EN[k] : n.getAttribute("data-es-aria"));
    });
    var meta = document.querySelector('meta[name="description"]');
    if (meta) {
      if (meta.getAttribute("data-es") === null) { meta.setAttribute("data-es", meta.getAttribute("content")); }
      meta.setAttribute("content", en ? EN.metaDesc : meta.getAttribute("data-es"));
    }
    if (document.documentElement.getAttribute("data-es-title") === null) {
      document.documentElement.setAttribute("data-es-title", document.title);
    }
    document.title = en ? EN.docTitle : document.documentElement.getAttribute("data-es-title");
    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.textContent = t("langBtn");
      btn.setAttribute("aria-label", t("langAria"));
      btn.setAttribute("lang", en ? "es" : "en");
    }
  }

  // Contenido de evidencia en el idioma activo
  function content() {
    return (lang() === "en" && window.CONTENT_EN) ? window.CONTENT_EN : window.CONTENT;
  }

  window.IC_I18N = { t: t, apply: apply, content: content, lang: lang };
})();
