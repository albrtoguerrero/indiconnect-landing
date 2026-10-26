/* Ilustraciones de producto originales (SVG), con luz, sombra y detalles de costura.
   Sirven de "foto" por defecto: sin imágenes de terceros ni marcas reales.
   Si existe una foto propia (ver PHOTOS en demo.js), se usa en su lugar. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var uid = 0;

  function s(tag, attrs, kids) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }

  // Oscurece un color #rrggbb una fracción f (0..1)
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.round(((n >> 16) & 255) * (1 - f));
    var g = Math.round(((n >> 8) & 255) * (1 - f));
    var b = Math.round((n & 255) * (1 - f));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  var SHAPES = {
    tee: function (fill, edge) {
      return [
        s("path", { d: "M30 14 L10 26 L18 43 L28 37 L28 84 L72 84 L72 37 L82 43 L90 26 L70 14 Q50 27 30 14Z", fill: fill, stroke: edge, "stroke-width": 1.2, "stroke-linejoin": "round" }),
        s("path", { d: "M30 14 Q50 27 70 14", fill: "none", stroke: edge, "stroke-width": 2.4, "stroke-linecap": "round" }),
        s("path", { d: "M28 37 L28 84 M72 37 L72 84", stroke: "#fff", "stroke-opacity": ".25", "stroke-width": 1, fill: "none" }),
        s("path", { d: "M36 30 Q44 52 40 80", stroke: "#fff", "stroke-opacity": ".18", "stroke-width": 5, fill: "none", "stroke-linecap": "round" })
      ];
    },
    jeans: function (fill, edge) {
      return [
        s("path", { d: "M28 8 H72 L79 90 H55 L50 42 L45 90 H21Z", fill: fill, stroke: edge, "stroke-width": 1.2, "stroke-linejoin": "round" }),
        s("path", { d: "M28 17 H72", stroke: edge, "stroke-width": 1.6, fill: "none" }),
        s("path", { d: "M50 17 V42", stroke: "#fff", "stroke-opacity": ".4", "stroke-width": 1, "stroke-dasharray": "2 2", fill: "none" }),
        s("path", { d: "M31 20 Q38 30 46 22 M69 20 Q62 30 54 22", stroke: "#fff", "stroke-opacity": ".45", "stroke-width": 1, "stroke-dasharray": "2 2", fill: "none" }),
        s("rect", { x: 47, y: 9, width: 6, height: 6, rx: 1.5, fill: "#f2c94c", stroke: edge, "stroke-width": .6 }),
        s("path", { d: "M33 30 L28 84", stroke: "#fff", "stroke-opacity": ".15", "stroke-width": 5, fill: "none", "stroke-linecap": "round" })
      ];
    },
    jacket: function (fill, edge) {
      return [
        s("path", { d: "M34 12 L8 30 L13 78 L29 78 L29 36 L50 30 L71 36 L71 78 L87 78 L92 30 L66 12 L50 22Z", fill: fill, stroke: edge, "stroke-width": 1.2, "stroke-linejoin": "round" }),
        s("path", { d: "M50 22 V86", stroke: edge, "stroke-width": 1.6, fill: "none" }),
        s("path", { d: "M34 12 L50 22 L66 12 L62 8 L50 14 L38 8Z", fill: shade(fill, .18), stroke: edge, "stroke-width": 1, "stroke-linejoin": "round" }),
        s("rect", { x: 13, y: 74, width: 16, height: 8, rx: 2, fill: shade(fill, .22), stroke: edge, "stroke-width": .8 }),
        s("rect", { x: 71, y: 74, width: 16, height: 8, rx: 2, fill: shade(fill, .22), stroke: edge, "stroke-width": .8 }),
        s("rect", { x: 49, y: 40, width: 2, height: 7, rx: 1, fill: "#e6e6e6" }),
        s("path", { d: "M20 38 L17 70", stroke: "#fff", "stroke-opacity": ".22", "stroke-width": 4, fill: "none", "stroke-linecap": "round" })
      ];
    },
    dress: function (fill, edge) {
      return [
        s("path", { d: "M38 6 H62 L58 32 L80 91 H20 L42 32Z", fill: fill, stroke: edge, "stroke-width": 1.2, "stroke-linejoin": "round" }),
        s("path", { d: "M42 32 Q50 38 58 32", fill: "none", stroke: edge, "stroke-width": 1.4 }),
        s("path", { d: "M40 40 H60", stroke: shade(fill, .3), "stroke-width": 3, fill: "none" }),
        s("path", { d: "M44 46 L32 88 M50 46 V90 M56 46 L68 88", stroke: "#fff", "stroke-opacity": ".2", "stroke-width": 1.2, fill: "none" }),
        s("path", { d: "M38 6 L38 20 M62 6 L62 20", stroke: edge, "stroke-width": 1.4, fill: "none" })
      ];
    },
    shoe: function (fill, edge) {
      return [
        s("path", { d: "M8 72 H94 V78 Q50 86 8 78Z", fill: "#f7f7f7", stroke: "#cfcfcf", "stroke-width": 1 }),
        s("path", { d: "M10 72 L12 44 Q30 38 42 50 L50 58 H84 Q95 60 95 70 V72Z", fill: fill, stroke: edge, "stroke-width": 1.2, "stroke-linejoin": "round" }),
        s("path", { d: "M62 58 Q80 60 94 70 L95 72 H70Z", fill: "#fff", "fill-opacity": ".85" }),
        s("path", { d: "M22 44 L30 50 M28 41 L36 49 M34 40 L42 49", stroke: "#fff", "stroke-width": 1.6, "stroke-linecap": "round", fill: "none" }),
        s("path", { d: "M10 72 L12 56 Q18 60 24 60", fill: "none", stroke: shade(fill, .25), "stroke-width": 1.4 })
      ];
    },
    bag: function (fill, edge) {
      return [
        s("path", { d: "M34 38 V28 Q50 6 66 28 V38", fill: "none", stroke: edge, "stroke-width": 3, "stroke-linecap": "round" }),
        s("path", { d: "M18 38 H82 L90 88 H10Z", fill: fill, stroke: edge, "stroke-width": 1.2, "stroke-linejoin": "round" }),
        s("path", { d: "M18 38 H82 L84 52 Q50 62 16 52Z", fill: shade(fill, .16), stroke: edge, "stroke-width": 1 }),
        s("circle", { cx: 50, cy: 55, r: 4.2, fill: "#f2c94c", stroke: edge, "stroke-width": .8 }),
        s("path", { d: "M24 62 L20 84", stroke: "#fff", "stroke-opacity": ".22", "stroke-width": 4, fill: "none", "stroke-linecap": "round" })
      ];
    }
  };

  /* shape: tee | jeans | jacket | dress | shoe | bag ; color: #rrggbb */
  function draw(shape, color) {
    var id = "g" + (++uid);
    var edge = shade(color, .35);
    var svg = s("svg", { viewBox: "0 0 100 100", "aria-hidden": "true", focusable: "false", "class": "art" }, [
      s("defs", {}, [
        s("linearGradient", { id: id, x1: "0", y1: "0", x2: "1", y2: "1" }, [
          s("stop", { offset: "0", "stop-color": shade(color, -0.0) }),
          s("stop", { offset: "1", "stop-color": shade(color, .28) })
        ])
      ]),
      s("ellipse", { cx: 50, cy: 91, rx: 30, ry: 4, fill: "#000", "fill-opacity": ".16", "class": "art-shadow" })
    ]);
    var g = s("g", { "class": "art-body" });
    SHAPES[shape]("url(#" + id + ")", edge).forEach(function (p) { g.appendChild(p); });
    svg.appendChild(g);
    return svg;
  }

  window.ICArt = { draw: draw };
})();
