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

  lastUpdated: "2026-10-23", // formato AAAA-MM-DD

  legal: "Proyecto académico ficticio, sin vinculación con Inditex ni con ninguna otra empresa o marca real.",

  ui: {
    skipLink: "Saltar al contenido",
    navLabel: "Secciones de la página",
    themeToDark: "Modo oscuro",
    themeToLight: "Modo claro",
    themeLabel: "Cambiar tema de color",
    updatedLabel: "Última actualización:",
    legalLabel: "Aviso legal",
    noscript: "Esta página necesita JavaScript para mostrar su contenido.",
    snapshot: {
      title: "Estado del proyecto",
      current: "Hito actual",
      delivered: "Hitos entregados",
      decisions: "Decisiones de diseño",
      needs: "Necesidades documentadas",
      criteria: "Criterios de aceptación",
      updated: "Actualizado"
    },
    reqNavLabel: "Contenido de esta sección",
    tableRegion: "Tabla desplazable",
    byLabel: "Responsable del cambio:",
    whatLabel: "Qué cambió",
    whyLabel: "Por qué",
    taskLabel: "Tarea en Asana"
  },

  nav: [
    { id: "problema", label: "Problema" },
    { id: "como-funciona", label: "Solución" },
    { id: "negocio", label: "Negocio" },
    { id: "alcance", label: "Alcance" },
    { id: "decisiones", label: "Decisiones" },
    { id: "riesgos", label: "Riesgos" },
    { id: "requisitos", label: "Requisitos" },
    { id: "trazabilidad", label: "Trazabilidad" },
    { id: "avances", label: "Avances" },
    { id: "evolucion", label: "Evolución" },
    { id: "uso-ia", label: "Uso de IA" },
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
        text: "Propuesta de la landing: confirmación atómica simulada, si falla un subpedido no se confirma ninguno. La documentación de Asana recoge tres formulaciones (pendiente, reembolso parcial y todo o nada). Hay que separar el fallo antes de cobrar del fallo posterior al cobro y fijar un único comportamiento."
      },
      {
        title: "Duración de «Recordarme»",
        status: "Borrador",
        text: "Los requisitos de cuenta proponen 30 días y las historias de usuario 10. Falta elegir el valor, registrar el motivo y actualizar requisito, historia y criterios."
      },
      {
        title: "Secuencia única de checkout",
        status: "Borrador",
        text: "La especificación web describe tres pasos en el requisito y cuatro en el diagrama. Falta publicar un único recorrido y comprobar que pantallas, reglas e historias lo siguen."
      },
      {
        title: "Tema oscuro y contraste",
        status: "Borrador",
        text: "Los contrastes previstos para el tema oscuro no alcanzan el mínimo de 4,5:1 que exige el propio requisito de accesibilidad. Falta ajustar los colores o dejar el tema oscuro fuera de la primera versión."
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
        list: ["Reserva de stock y última unidad concurrente", "Compra como invitado", "Estados del pedido", "Nombre del agrupador de subpedidos"]
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
        title: "Uso de IA sin comprensión ni revisión",
        text: "El desarrollo se apoya en herramientas de IA. Existe el riesgo de incorporar código o documentos que el equipo no comprenda ni haya probado. Mitigación: revisión crítica y cruzada entre los tres miembros, criterios de aceptación y pruebas."
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
        status: "Entregado",
        note: "Necesidades, requisitos, historias de usuario, criterios de aceptación y matriz de trazabilidad en Asana, entregados el 23 oct. Quedan decisiones abiertas y fuentes por validar (ver Decisiones y Necesidades)."
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
    intro: "Equipo de tres personas.",
    members: [
      { name: "Alberto Guerrero" },
      { name: "Lucía Guerra" },
      { name: "Mikel Moriel" }
    ]
  }
  ,
  requirements: {
    title: "Necesidades y requisitos",
    status: "Borrador",
    intro: "Resultado del Hito 2. Esta página muestra una selección priorizada del núcleo del proyecto; la documentación completa (necesidades, catálogo ampliado de requisitos, historias de usuario y matriz) está en Asana. Todo está en estado Borrador y ninguna necesidad está validada con usuarios: cada requisito indica la necesidad de la que procede y de dónde sale.",
    sources: {
      title: "Fuentes",
      caption: "Fuentes consultadas y descartadas",
      headers: ["ID", "Fuente", "Tipo", "Uso en el Hito 2"],
      rows: [
        ["F-01", "Documentación del Hito 1: contexto, actores, alcance y exclusiones", "Interna", "Origen de las necesidades y de las exclusiones"],
        ["F-02", "Planteamiento del problema de compra multimarca (Hito 1)", "Interna", "Necesidades N-01 a N-05"],
        ["F-03", "Referencia de mercado: plataformas como Lyst cobran a sus marcas entre un 12 % y un 15 % por venta", "Externa, no validada", "Necesidad N-09 e hipótesis del modelo de negocio"],
        ["F-04", "Prensa del sector sobre la adquisición de Lyst en 2025", "Externa", "Riesgo de fragilidad del modelo agregador"],
        ["F-05", "Enunciado y criterios del Hito 2 de la asignatura", "Académica", "Estructura de los entregables"],
        ["F-06", "Benchmarking de apps y tiendas multimarca", "Pendiente", "Sin resultados documentados todavía; no se ha usado como fuente"],
        ["F-07", "Entrevistas a usuarios", "Descartada", "El equipo no las ha realizado (ver Evolución); las necesidades quedan pendientes de validar con usuarios reales"]
      ]
    },
    hypothesesTitle: "Hipótesis",
    hypotheses: [
      { id: "H-01", text: "Existe una necesidad real de comprar en varias marcas del grupo a la vez.", state: "Sin validar" },
      { id: "H-02", text: "Un carrito unificado puede generar ventas adicionales; solo entonces la comisión es dinero nuevo.", state: "Sin validar" },
      { id: "H-03", text: "La comisión interna cubre el coste de operar la plataforma.", state: "Sin validar" },
      { id: "H-04", text: "Ver plazos, envíos y condiciones de forma conjunta reduce la fricción de compra.", state: "Sin validar" }
    ],
    constraintsTitle: "Restricciones",
    constraints: [
      { id: "R-01", text: "Monolito modular con HTML, CSS y JavaScript, Node.js y PostgreSQL." },
      { id: "R-02", text: "Catálogo sintético y pago simulado; sin datos personales ni de tarjeta reales." },
      { id: "R-03", text: "Sin marcas, logos ni imágenes de empresas reales." },
      { id: "R-04", text: "Landing estática, sin trackers ni recursos de terceros." },
      { id: "R-05", text: "Equipo de tres personas y cinco sprints, hasta el 15 de enero de 2027." },
      { id: "R-06", text: "Desarrollo asistido por IA: todo artefacto debe ser revisado y comprendido por el equipo." }
    ],
    exclusionsTitle: "Exclusiones relevantes",
    exclusions: "Envío real, devoluciones, promociones complejas, atención al cliente, integración con tiendas reales, datos personales reales, datos reales de tarjeta y scraping (definidas en el Hito 1). Si el catálogo ampliado de Asana incluye funciones de esas áreas (devoluciones, seguimiento, atención al cliente, promociones), se consideran catálogo futuro o interfaz simulada y no forman parte del MVP.",
    needs: {
      title: "Necesidades identificadas",
      caption: "Necesidades por actor",
      headers: ["ID", "Actor", "Necesidad", "Fuente", "Prioridad", "Estado"],
      badgeCol: 5,
      rows: [
        ["N-01", "Cliente", "Comprar productos de varias marcas del grupo en un único carrito", "F-01, F-02", "Must", "Borrador"],
        ["N-02", "Cliente", "Pagar una sola vez en lugar de pagar en cada tienda", "F-02", "Must", "Borrador"],
        ["N-03", "Cliente", "Ver los plazos de entrega de todo el pedido de forma conjunta", "F-02", "Should", "Borrador"],
        ["N-04", "Cliente", "Ver los costes de envío de todo el pedido de forma conjunta", "F-02", "Should", "Borrador"],
        ["N-05", "Cliente", "Consultar las condiciones de cada marca en un único lugar", "F-02", "Should", "Borrador"],
        ["N-06", "Grupo", "Ser el único vendedor frente al cliente, repartiendo el cumplimiento entre marcas", "F-01", "Must", "Borrador"],
        ["N-07", "Marca", "Recibir solo su parte del pedido (subpedido) para prepararla y enviarla", "F-01", "Must", "Borrador"],
        ["N-08", "Operador de la plataforma", "Evitar pedidos inconsistentes si falla la confirmación de una marca", "F-01", "Must", "Borrador"],
        ["N-09", "Operador de la plataforma", "Cobrar una comisión por cada subpedido confirmado (hipótesis de negocio)", "F-03", "Could", "Borrador"]
      ]
    },
    functional: {
      title: "Requisitos funcionales principales",
      caption: "Requisitos funcionales principales y su necesidad de origen",
      headers: ["ID", "Requisito", "Necesidad", "Fase"],
      badgeCol: 3,
      rows: [
        ["RF-19", "Añadir productos de varias marcas a un único carrito", "N-01", "Fase 1"],
        ["RF-23", "El carrito muestra el subtotal por marca y el total general", "N-01", "Fase 1"],
        ["RF-28", "El carrito muestra el plazo de entrega de cada marca", "N-03", "Fase 1"],
        ["RF-29", "El carrito muestra los costes de envío por marca y el total", "N-04", "Fase 1"],
        ["RF-30", "El carrito muestra las condiciones de todas las marcas de forma conjunta", "N-05", "Fase 1"],
        ["RF-36", "Un único checkout para todo el carrito", "N-02", "Fase 1"],
        ["RF-41", "El pago es simulado, con resultado de éxito o de fallo", "N-02", "Fase 1"],
        ["RF-44", "El resumen del pedido muestra al grupo como vendedor legal", "N-06", "Fase 1"],
        ["RF-52", "El pedido se divide en un subpedido por marca", "N-07", "Fase 1"],
        ["RF-54", "Cada subpedido tiene su importe, su estado y su identificador", "N-07", "Fase 1"],
        ["RF-57", "Confirmación atómica: si falla un subpedido, no se confirma ninguno", "N-08", "Fase 1"],
        ["RF-63", "Se calcula la comisión por subpedido confirmado", "N-09", "Fase 2"]
      ]
    },
    nonFunctional: {
      title: "Requisitos no funcionales principales",
      caption: "Requisitos no funcionales principales y su origen",
      headers: ["ID", "Requisito", "Origen", "Fase"],
      badgeCol: 3,
      rows: [
        ["RNF-09", "La creación del pedido y de sus subpedidos es transaccional (todo o nada)", "N-08", "Fase 1"],
        ["RNF-11", "El total del pedido coincide siempre con la suma de sus subpedidos", "N-08", "Fase 1"],
        ["RNF-29", "No se almacenan datos reales de tarjeta", "R-02", "Fase 1"],
        ["RNF-31", "Solo se usan datos personales sintéticos", "R-02", "Fase 1"],
        ["RNF-33", "Sin marcas, logos ni imágenes de empresas reales", "R-03", "Fase 1"],
        ["RNF-36", "Sin trackers ni analítica de terceros", "R-04", "Fase 1"],
        ["RNF-37", "Diseño responsive para móvil y escritorio", "Calidad", "Fase 1"],
        ["RNF-40", "Contraste suficiente de texto y controles", "Calidad", "Fase 1"],
        ["RNF-54", "Arquitectura de monolito modular", "R-01", "Fase 1"],
        ["RNF-58", "Pruebas automáticas del flujo carrito → pedido → subpedidos", "N-08", "Fase 1"],
        ["RNF-59", "Pruebas del escenario de fallo atómico", "N-08", "Fase 1"]
      ]
    },
    scopeNote: "Selección de los requisitos principales, con los identificadores del backlog del equipo (RF-xx, RNF-xx). Los documentos de Asana usan otros códigos (por ejemplo RF-BUS-01 o RF-02.1); la tabla de equivalencias entre niveles está pendiente. El alcance propuesto, todavía en revisión, mantiene dentro del proyecto 84 requisitos funcionales y 75 no funcionales, repartidos en Fase 1 (núcleo de la demo) y Fase 2 (ampliación); lo que queda fuera es catálogo futuro."
  },

  traceability: {
    title: "Trazabilidad y criterios de aceptación",
    intro: "Cada necesidad se transforma en requisitos, cada requisito se verifica con un criterio de aceptación y cada criterio tiene una tarea en Asana. Esta versión comprueba que existe la relación entre elementos; todavía no demuestra que las fuentes estén contrastadas ni que cada vínculo sea correcto. Se ampliará con el diseño en el Hito 3.",
    caption: "Matriz de trazabilidad inicial",
    headers: ["Necesidad", "Requisitos", "Criterio de aceptación", "Tarea en Asana"],
    rows: [
      {
        need: "N-01", reqs: "RF-19, RF-23", id: "CA-01", title: "Carrito con dos marcas",
        gherkin: ["Dado un carrito vacío", "Cuando el cliente añade un producto de la Marca A y otro de la Marca B", "Entonces el carrito los muestra agrupados por marca, con subtotal por marca y total general"],
        task: "Requisitos funcionales › Carrito, Checkout y Pagos"
      },
      {
        need: "N-03, N-04, N-05", reqs: "RF-28, RF-29, RF-30", id: "CA-02", title: "Plazos, envíos y condiciones conjuntas",
        gherkin: ["Dado un carrito con productos de dos marcas", "Cuando el cliente abre el carrito", "Entonces ve el plazo de entrega, el coste de envío y las condiciones de cada marca en la misma pantalla"],
        task: "Requisitos funcionales › Carrito, Checkout y Pagos"
      },
      {
        need: "N-02", reqs: "RF-36, RF-41", id: "CA-03", title: "Pago único simulado",
        gherkin: ["Dado un carrito válido", "Cuando el cliente confirma el pago simulado con resultado de éxito", "Entonces se crea un único pedido y no se solicita ningún pago por marca"],
        task: "Requisitos funcionales › Carrito, Checkout y Pagos"
      },
      {
        need: "N-07", reqs: "RF-52, RF-54", id: "CA-04", title: "División en subpedidos",
        gherkin: ["Dado un pedido con artículos de dos marcas", "Cuando se confirma el pedido", "Entonces se crean dos subpedidos, cada uno solo con artículos de su marca y con importe, estado e identificador"],
        task: "Requisitos funcionales › Carrito, Checkout y Pagos"
      },
      {
        need: "N-08", reqs: "RF-57, RNF-09, RNF-11", id: "CA-05", title: "Fallo parcial: todo o nada",
        gherkin: ["Dado un pedido con subpedidos de dos marcas", "Cuando falla la confirmación de uno de ellos", "Entonces no se confirma ninguno y no queda ningún pedido ni subpedido a medias"],
        task: "Requisitos no funcionales › Rendimiento y Arquitectura"
      },
      {
        need: "N-06", reqs: "RF-44", id: "CA-06", title: "Vendedor legal único",
        gherkin: ["Dado el resumen de un pedido", "Cuando el cliente lo revisa antes de pagar", "Entonces el vendedor mostrado es el grupo y no cada marca"],
        task: "Requisitos funcionales › Carrito, Checkout y Pagos"
      },
      {
        need: "N-09", reqs: "RF-63", id: "CA-07", title: "Comisión por subpedido (ejemplo ilustrativo)",
        gherkin: ["Dado un subpedido confirmado de 80 € y una comisión del 12 %", "Cuando se calcula la comisión", "Entonces el resultado es 9,60 €"],
        task: "Requisitos funcionales › Carrito, Checkout y Pagos"
      }
    ],
    asanaTitle: "Referencias en Asana",
    asanaNote: "El tablero de Asana es privado y de acceso restringido a los miembros de la asignatura. Se indican los nombres de las tareas para localizarlas.",
    asana: [
      { name: "[INDICONNECT] Hito 2 – Requisitos y Criterios de Aceptación", text: "Tarea principal del hito, en el Sprint 2.", url: "" },
      { name: "Necesidades identificadas", text: "Subtarea con el documento de necesidades.", url: "" },
      { name: "User stories", text: "Subtarea con las historias de usuario.", url: "" },
      { name: "Requisitos funcionales", text: "Ocho categorías: búsqueda y navegación; cuenta y perfil; catálogo y productos; favoritos y tendencias; notificaciones, recomendaciones e IA; carrito, checkout y pagos; seguimiento, devoluciones y atención al cliente (catálogo futuro, fuera del MVP); pie de página, legales y administración.", url: "" },
      { name: "Requisitos no funcionales", text: "Cuatro categorías: seguridad y privacidad; rendimiento y arquitectura; diseño, usabilidad y accesibilidad; mantenibilidad.", url: "" },
      { name: "Matriz de trazabilidad", text: "Subtarea con la matriz necesidad → requisito.", url: "" },
      { name: "Especificaciones de requisitos en la web", text: "Subtarea de actualización de esta landing.", url: "" }
    ]
  },

  evolution: {
    title: "Evolución del proyecto",
    intro: "Registro de los cambios relevantes durante el Hito 2: qué cambió, quién lo hizo, cuándo y por qué.",
    entries: [
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "Plan de subtareas del Hito 2",
        what: "Se planificaron 11 subtareas con responsable, fecha, entregable y enlace con el Hito 3.",
        why: "Repartir el trabajo entre los tres miembros y dejar cada entregable preparado para el diseño del Hito 3."
      },
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "Se retira la subtarea de entrevistas",
        what: "Se eliminó la subtarea de entrevistas a usuarios.",
        why: "El equipo decidió no realizarlas. Consecuencia: las necesidades se apoyan en el Hito 1 y quedan pendientes de validar con usuarios reales."
      },
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "Backlog largo de requisitos candidatos",
        what: "Se elaboró una lista de 178 candidatos (99 funcionales y 79 no funcionales), sin filtrar.",
        why: "Disponer de una base amplia para filtrar entre los tres miembros."
      },
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "Cambio del criterio de alcance",
        what: "Se dejó de limitar el alcance por tiempo y se clasificaron los requisitos en Fase 1, Fase 2 y fuera de alcance: 84 funcionales y 75 no funcionales dentro del proyecto.",
        why: "Con desarrollo asistido por IA, el límite pasa a ser comprender, probar y trazar lo generado, no escribirlo."
      },
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "Se retira el riesgo de IA de la web",
        what: "Se quitó de la sección de riesgos el riesgo de código generado por IA.",
        why: "Decisión tomada en ese momento; se revirtió el 23 de octubre (ver siguiente entrada)."
      },
      {
        date: "2026-10-23", who: "Alberto Guerrero",
        title: "Se restablece el riesgo de IA y se añade la sección de uso de IA",
        what: "Se volvió a incluir el riesgo de uso de IA sin comprensión ni revisión y se creó la sección «Uso de IA».",
        why: "El Hito 2 exige transparencia sobre el uso de IA, con revisión crítica del equipo y sin sustituir su responsabilidad."
      },
      {
        date: "2026-10-23", who: "Alberto Guerrero",
        title: "Revisión de la valoración docente",
        what: "Se registraron las discrepancias detectadas entre documentos (Recordarme, fallo parcial, checkout, tema oscuro), se aclaró que la landing muestra una selección priorizada, que los identificadores difieren entre documentos y que lo relativo a devoluciones y atención es catálogo futuro. Se marcó el Sprint 2 como entregado.",
        why: "Distinguir lo definido de lo validado y dejar visibles las decisiones abiertas, en lugar de presentar el expediente como cerrado."
      },
      {
        date: "2026-10-23", who: "Alberto Guerrero",
        title: "Landing actualizada con el Hito 2",
        what: "Se añadieron necesidades, requisitos, trazabilidad, criterios de aceptación, fuentes, hipótesis, restricciones, evolución y referencias a Asana.",
        why: "Requisito del Hito 2: la landing debe reflejar de forma comprensible y navegable el trabajo del hito."
      }
    ]
  },

  aiUse: {
    title: "Uso de IA",
    intro: "El proyecto se desarrolla con apoyo de herramientas de IA. Su uso está justificado, es revisado por el equipo y nunca sustituye la responsabilidad del equipo sobre las decisiones de ingeniería.",
    principles: [
      { title: "Para qué", text: "Apoyo en la estructuración y redacción de borradores de documentos, en la elaboración de listas de requisitos y en el código de esta landing." },
      { title: "Revisión crítica", text: "Ningún resultado se adopta sin revisión: el equipo comprueba, corrige o descarta lo que propone la IA y es responsable de lo que entrega." },
      { title: "Datos", text: "Los prompts no contienen datos personales, credenciales ni información sensible." },
      { title: "Dónde se documenta", text: "Los prompts utilizados en el Hito 2, con su contexto y su revisión, están documentados en la tarea del Hito 2 en Asana." }
    ]
  }

};
