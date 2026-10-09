/*
 * ÚNICA fuente de contenido de la landing.
 * Para actualizar avances al cierre de un sprint edita SOLO este archivo
 * (estados de `progress.sprints`, `lastUpdated`, estados de las decisiones, equipo).
 *
 * Estados válidos:
 *   decisiones/modelo: "Borrador" | "En revisión" | "Aprobado" | "Descartado"
 *   hitos:             "Pendiente" | "En curso" | "Entregado"
 */

// Nombre provisional del grupo y de la plataforma. Cámbialo aquí y solo aquí.
var BRAND_NAME = "IndiConnect";

window.CONTENT = {
  brand: {
    name: BRAND_NAME,
    tagline: "Proyecto universitario · Ingeniería del Software"
  },

  lastUpdated: "2026-10-09", // formato AAAA-MM-DD

  legal: "Proyecto académico ficticio, sin vinculación con Inditex ni con ninguna otra empresa o marca real.",

  ui: {
    skipLink: "Saltar al contenido",
    navLabel: "Secciones de la página",
    themeToDark: "Modo oscuro",
    themeToLight: "Modo claro",
    themeLabel: "Cambiar tema de color",
    updatedLabel: "Última actualización:",
    legalLabel: "Aviso legal",
    noscript: "Esta página necesita JavaScript para mostrar su contenido."
  },

  nav: [
    { id: "problema", label: "Problema" },
    { id: "como-funciona", label: "Cómo funciona" },
    { id: "negocio", label: "Negocio" },
    { id: "alcance", label: "Alcance" },
    { id: "decisiones", label: "Decisiones" },
    { id: "riesgos", label: "Riesgos" },
    { id: "avances", label: "Avances" },
    { id: "equipo", label: "Equipo" }
  ],

  hero: {
    title: "Un solo carrito para todas las marcas del grupo",
    value: "Plataforma ficticia que reúne el catálogo de varias marcas de un mismo grupo textil y, al pagar, divide el pedido en subpedidos: uno por marca.",
    cta: { label: "Cómo funciona", href: "#como-funciona" }
  },

  problem: {
    title: "El problema",
    intro: "Quien compra en varias marcas del mismo grupo debe entrar y pagar por separado en cada tienda online.",
    points: [
      { title: "Un pago por tienda", text: "Cada marca exige su propio carrito, su propio pago y su propia confirmación." },
      { title: "Plazos sin visión conjunta", text: "No se pueden ver a la vez los plazos de entrega de todo lo que se quiere comprar." },
      { title: "Envíos y condiciones dispersos", text: "Los costes de envío y las condiciones de cada marca se consultan por separado." }
    ]
  },

  how: {
    title: "Cómo funciona",
    intro: "El cliente llena un único carrito con productos de varias marcas. Al pagar, el sistema crea un pedido y lo divide en subpedidos por marca.",
    diagramTitle: "Flujo de compra",
    diagramDesc: "Un carrito unificado da lugar a un pedido, que se divide en tres subpedidos: uno para la Marca A, otro para la Marca B y otro para la Marca C.",
    diagram: {
      cart: { title: "Carrito unificado", sub: "Productos de varias marcas" },
      order: { title: "Pedido", sub: "Un único pago simulado" },
      subTitle: "Subpedido",
      brands: ["Marca A", "Marca B", "Marca C"],
      caption: "Un subpedido por marca"
    },
    steps: [
      { title: "Carrito unificado", text: "Se añaden productos de las marcas A, B y C en un mismo carrito." },
      { title: "Pedido", text: "Un único pago simulado confirma el pedido." },
      { title: "Subpedidos por marca", text: "El pedido se reparte en un subpedido por cada marca implicada." }
    ],
    note: "Pago simulado y catálogo sintético: no existe tienda real ni backend en esta página."
  },

  business: {
    title: "Cómo gana dinero",
    status: "Borrador",
    hypothesisNote: "Todo lo que sigue es una hipótesis de trabajo, pendiente de validar.",
    model: "La plataforma funciona como unidad de negocio interna del grupo y cobra a cada marca una comisión por cada subpedido confirmado, a cambio de darle acceso a demanda cruzada.",
    example: {
      tag: "Ejemplo ilustrativo · números inventados",
      intro: "Carrito de 160 € con una comisión del 12 %:",
      caption: "Reparto de comisión en el ejemplo ilustrativo",
      headers: ["Marca", "Importe del subpedido", "Comisión (12 %)"],
      rows: [
        ["Marca A", "80 €", "9,60 €"],
        ["Marca B", "50 €", "6,00 €"],
        ["Marca C", "30 €", "3,60 €"]
      ],
      totalLabel: "Total de comisión",
      totalValue: "19,20 €"
    },
    market: {
      tag: "Referencia externa · no validada para nuestro caso",
      text: "Plataformas como Lyst cobran a sus marcas entre un 12 % y un 15 % por venta."
    },
    caveat: {
      title: "Matiz importante",
      text: "Como todas las marcas son del mismo grupo, la comisión es una transferencia interna. El dinero nuevo solo aparece si el carrito unificado genera ventas adicionales, algo que está por demostrar. La ganancia es de la plataforma como división, no del grupo en conjunto."
    },
    discardedTitle: "Alternativas descartadas",
    discarded: [
      { title: "Modelo Lyst puro", status: "Descartado", text: "Redirigir a la web de cada marca eliminaría el checkout propio y los subpedidos, que son el núcleo del proyecto." },
      { title: "Posicionamiento pagado", status: "Descartado", text: "Las marcas del mismo grupo no compiten entre sí por visibilidad, así que no hay nada que vender." }
    ]
  },

  scope: {
    title: "Alcance y exclusiones",
    inTitle: "Dentro del alcance",
    outTitle: "Fuera del alcance",
    in: [
      "Catálogo sintético",
      "Pago simulado",
      "Demo mínima: carrito con dos marcas y creación de un pedido con sus subpedidos",
      "Monolito modular con HTML, CSS y JavaScript, Node.js y PostgreSQL"
    ],
    out: [
      "Envío real",
      "Devoluciones",
      "Promociones complejas",
      "Atención al cliente",
      "Integración con tiendas reales",
      "Datos personales reales",
      "Datos reales de tarjeta",
      "Scraping"
    ]
  },

  decisions: {
    title: "Decisiones de diseño",
    intro: "Cada decisión muestra su estado actual. Por ahora todas están en Borrador.",
    legendLabel: "Estados posibles",
    legend: ["Borrador", "En revisión", "Aprobado", "Descartado"],
    items: [
      {
        title: "Fallo parcial en el checkout",
        status: "Borrador",
        text: "Confirmación atómica simulada: si falla un subpedido, no se confirma ninguno."
      },
      {
        title: "Vendedor legal único frente al cliente",
        status: "Borrador",
        text: "El vendedor frente al cliente es el grupo. Los subpedidos solo reparten el cumplimiento (envío, almacén)."
      },
      {
        title: "Cuestiones pendientes",
        status: "Borrador",
        text: "Puntos aún sin decidir:",
        list: ["Reserva de stock", "Estados del pedido", "Nombre del agrupador de subpedidos"]
      }
    ]
  },

  risks: {
    title: "Riesgos y supuestos",
    items: [
      {
        kind: "Supuesto sin validar",
        title: "Necesidad real de compra multimarca",
        text: "Suponemos que existe una necesidad real de comprar en varias marcas a la vez y que un carrito común aporta valor. No lo hemos comprobado."
      },
      {
        kind: "Riesgo",
        title: "Crecimiento del alcance",
        text: "El proyecto podría crecer de ejercicio de diseño a plataforma de comercio completa."
      },
      {
        kind: "Riesgo",
        title: "Código generado por IA",
        text: "Podría incorporarse código generado por IA que el equipo no comprenda ni haya probado."
      },
      {
        kind: "Riesgo",
        title: "Fragilidad del modelo agregador",
        text: "Según la prensa del sector, Lyst fue adquirida en 2025 por mucho menos de su valoración de 2021. Los agregadores pueden ser negocios frágiles."
      }
    ]
  },

  progress: {
    title: "Avances",
    intro: "Cinco sprints, cinco hitos. El estado de cada uno se actualiza al cierre del sprint.",
    sprints: [
      {
        name: "Sprint 1",
        dates: "21 sep – 2 oct 2026",
        milestone: "Hito 1",
        text: "Contexto, actores, alcance, exclusiones y elección razonada del enfoque.",
        status: "Entregado",
        note: "Borrador entregado al equipo."
      },
      {
        name: "Sprint 2",
        dates: "5 – 23 oct 2026",
        milestone: "Hito 2",
        text: "Necesidades, requisitos y criterios de aceptación.",
        status: "En curso"
      },
      {
        name: "Sprint 3",
        dates: "26 oct – 13 nov 2026",
        milestone: "Hito 3",
        text: "Análisis del problema, diseño estructurado y alternativas.",
        status: "Pendiente"
      },
      {
        name: "Sprint 4",
        dates: "16 nov – 11 dic 2026",
        milestone: "Hito 4",
        text: "Modelo de dominio y diseño orientado a objetos.",
        status: "Pendiente"
      },
      {
        name: "Sprint 5",
        dates: "14 dic 2026 – 15 ene 2027",
        milestone: "Hito 5",
        text: "Integración, calidad, trazabilidad, dossier final y defensa.",
        status: "Pendiente"
      }
    ]
  },

  team: {
    title: "Equipo",
    intro: "Equipo de 3 personas.",
    members: [
      { name: "Alberto Guerrero", role: "Integrante del equipo" },
      { name: "Lucía Guerra", role: "Integrante del equipo" },
      { name: "Mikel Moriel", role: "Integrante del equipo" }
    ]
  }
};
