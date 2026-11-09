/*
 * English version of js/content.js. Same structure, same keys.
 * Status values (Borrador, En revisión, Aprobado, Descartado, Pendiente, En curso,
 * Entregado, Sin validar, Fase 1, Fase 2) stay as the Spanish identifiers because the
 * badge colours and the calculated summary depend on them; ui.statusLabels translates
 * them for display only.
 */

window.CONTENT_EN = {
  brand: {
    name: window.CONTENT.brand.name,
    tagline: "University project · Software Engineering"
  },

  lastUpdated: window.CONTENT.lastUpdated,

  legal: "Fictional academic project, not affiliated with Inditex or any other real company or brand.",

  ui: {
    skipLink: "Skip to content",
    navLabel: "Page sections",
    themeToDark: "Dark mode",
    themeToLight: "Light mode",
    themeLabel: "Change colour theme",
    updatedLabel: "Last updated:",
    legalLabel: "Legal notice",
    noscript: "This page needs JavaScript to display its content.",
    locale: "en-GB",
    and: "and",
    ofWord: "of",
    inDraft: "in Draft",
    approved: "approved",
    metaDescription: "Landing page of a fictional academic Software Engineering project: a unified cart with per-brand sub-orders.",
    langToggle: { label: "Español", aria: "Switch the language to Spanish" },
    statusLabels: {
      "Borrador": "Draft",
      "En revisión": "In review",
      "Aprobado": "Approved",
      "Descartado": "Discarded",
      "Pendiente": "Pending",
      "En curso": "In progress",
      "Entregado": "Delivered",
      "Sin validar": "Unvalidated",
      "Fase 1": "Phase 1",
      "Fase 2": "Phase 2"
    },
    snapshot: {
      title: "Project status",
      current: "Current milestone",
      delivered: "Milestones delivered",
      decisions: "Design decisions",
      needs: "Documented needs",
      criteria: "Acceptance criteria",
      updated: "Updated"
    },
    heroTimelineTitle: "Project schedule",
    heroTimelineLink: "See the documentation",
    heroDefence: "Group defence: 15 January 2027",
    viewLabels: { contexto: "Context", definicion: "Definition", requisitos: "Requirements", seguimiento: "Tracking" },
    viewsLabel: "Page views",
    searchBtn: "Search",
    promptsLink: "View the prompts for this section",
    searchTitle: "Search the documentation",
    searchPlaceholder: "A word or an ID (RF-36, payment, S-01…)",
    searchClose: "Close",
    searchHint: "Tip: press / at any time to open the search.",
    searchCount: "{n} results",
    searchOne: "1 result",
    searchMore: "Showing the first {n}. Refine your search to see the rest.",
    searchNone: "No results for “{q}”.",
    backToTop: "Back to top",
    reqNavLabel: "Contents of this section",
    filterLabel: "Filter table rows",
    filterPlaceholder: "Type an ID or a word (RF-36, payment, N-02…)",
    filterClear: "Clear filter",
    filterCount: "{n} of {total} rows visible",
    filterNone: "No row matches the filter.",
    tableRegion: "Scrollable table",
    byLabel: "Changed by:",
    whatLabel: "What changed",
    whyLabel: "Why",
    taskLabel: "Asana task"
  },

  nav: [
    { id: "problema", label: "Problem" },
    { id: "como-funciona", label: "Solution" },
    { id: "negocio", label: "Business" },
    { id: "alcance", label: "Scope" },
    { id: "decisiones", label: "Decisions" },
    { id: "riesgos", label: "Risks" },
    { id: "diseno", label: "Design" },
    { id: "requisitos", label: "Requirements" },
    { id: "trazabilidad", label: "Traceability" },
    { id: "avances", label: "Progress" },
    { id: "documentacion", label: "Documentation" },
    { id: "evolucion", label: "Evolution" },
    { id: "uso-ia", label: "Use of AI" },
    { id: "equipo", label: "Team" }
  ],

  hero: {
    title: "One cart for all the group's brands",
    value: "A fictional platform that brings together the catalogue of several brands from the same textile group and, at checkout, splits the order into sub-orders: one per brand.",
    cta: { label: "How it works", href: "#como-funciona" },
    cta2: { label: "See the commercial landing", href: "comercial/" }
  },

  problem: {
    title: "The problem",
    intro: "Anyone who shops at several brands of the same group has to enter and pay separately in each online store.",
    points: [
      { title: "One payment per store", text: "Each brand requires its own cart, its own payment and its own confirmation." },
      { title: "No joint view of delivery times", text: "You cannot see the delivery times of everything you want to buy at the same time." },
      { title: "Scattered shipping and conditions", text: "Shipping costs and each brand's conditions have to be checked separately." }
    ]
  },

  how: {
    title: "How it works",
    intro: "The customer fills a single cart with products from several brands. At checkout, the system creates one order and splits it into per-brand sub-orders.",
    diagramTitle: "Purchase flow",
    diagramDesc: "A unified cart leads to one order, which is split into three sub-orders: one for Brand A, one for Brand B and one for Brand C.",
    diagram: {
      cart: { title: "Unified cart", sub: "Products from several brands" },
      order: { title: "Order", sub: "One simulated payment" },
      subTitle: "Sub-order",
      brands: ["Brand A", "Brand B", "Brand C"],
      caption: "One sub-order per brand"
    },
    steps: [
      { title: "Unified cart", text: "Products from brands A, B and C are added to the same cart." },
      { title: "Order", text: "A single simulated payment confirms the order." },
      { title: "Per-brand sub-orders", text: "The order is split into one sub-order for each brand involved." }
    ],
    note: "Simulated payment and synthetic catalogue: there is no real shop or backend on this page."
  },

  business: {
    title: "How it makes money",
    status: "Sin validar",
    hypothesisNote: "Everything below is a working hypothesis, pending validation.",
    model: "The platform works as an internal business unit of the group and charges each brand a commission on every confirmed sub-order, in exchange for access to cross-brand demand.",
    example: {
      tag: "Illustrative example · invented numbers",
      intro: "A €160 cart with a 12 % commission:",
      caption: "Commission split in the illustrative example",
      headers: ["Brand", "Sub-order amount", "Commission (12 %)"],
      rows: [
        ["Brand A", "€80", "€9.60"],
        ["Brand B", "€50", "€6.00"],
        ["Brand C", "€30", "€3.60"]
      ],
      totalLabel: "Total commission",
      totalValue: "€19.20"
    },
    market: {
      tag: "External reference · not validated for our case",
      text: "Platforms such as Lyst charge their brands between 12 % and 15 % per sale."
    },
    caveat: {
      title: "Important caveat",
      text: "Since all the brands belong to the same group, the commission is an internal transfer. New money only appears if the unified cart generates additional sales, which remains to be shown. The gain belongs to the platform as a division, not to the group as a whole."
    },
    discardedTitle: "Discarded alternatives",
    discarded: [
      { title: "Pure Lyst model", status: "Descartado", text: "Redirecting to each brand's website would remove our own checkout and the sub-orders, which are the core of the project." },
      { title: "Paid placement", status: "Descartado", text: "Brands in the same group do not compete with each other for visibility, so there is nothing to sell." }
    ]
  },

  scope: {
    title: "Scope and exclusions",
    inTitle: "In scope",
    outTitle: "Out of scope",
    in: [
      "Synthetic catalogue",
      "Simulated payment",
      "Minimal demo: a cart with two brands and the creation of an order with its sub-orders",
      "Modular monolith with HTML, CSS and JavaScript, Node.js and PostgreSQL"
    ],
    out: [
      "Real shipping",
      "Returns",
      "Complex promotions",
      "Customer service",
      "Integration with real shops",
      "Real personal data",
      "Real card data",
      "Scraping"
    ]
  },

  decisions: {
    title: "Design decisions",
    intro: "Each decision shows its status as of 9 November 2026. Approved: adopted. Discarded: alternative rejected. They come from the Milestone 2 backlog and scope; Phase 2 only opens once the core is verified.",
    legendLabel: "Possible statuses",
    legend: ["Borrador", "En revisión", "Aprobado", "Descartado"],
    items: [
      {
        title: "Partial failure at checkout",
        status: "Aprobado",
        text: "Simulated atomic confirmation: if one sub-order fails none is confirmed (all or nothing), and if payment fails no order is created. Since payment is simulated there is no real charge to refund. It belongs to Phase 1 (RF-57, RF-58, RNF-09 to RNF-12)."
      },
      {
        title: "Pending order or partial refund",
        status: "Descartado",
        text: "These are the other two formulations in Asana for partial failure. They are discarded because they add statuses and rules that do not fit the demo and clash with atomicity."
      },
      {
        title: "Duration of “Remember me”",
        status: "Aprobado",
        text: "10 days is adopted, the user stories’ value and the more cautious one; the 30 days of the account requirements are discarded. The account belongs to Phase 2: when it opens, requirement, story and criteria are updated."
      },
      {
        title: "A single checkout sequence",
        status: "Aprobado",
        text: "Three steps: contact and delivery address, shipping, and review with payment. In Phase 1 the shipping step is skipped and each brand’s default method is used (RNF-45). The four-step diagram is discarded."
      },
      {
        title: "Dark theme and contrast",
        status: "Aprobado",
        text: "The 4.5:1 minimum contrast is mandatory in Phase 1 (RNF-40) and is met with the light theme. Light and dark mode moves to Phase 2 (RNF-44), when the colours are adjusted."
      },
      {
        title: "Single legal seller towards the customer",
        status: "Aprobado",
        text: "The seller towards the customer is the group. Sub-orders only distribute fulfilment (shipping, warehouse)."
      },
      {
        title: "Stock reservation",
        status: "Aprobado",
        text: "Stock is deducted in the same transaction that confirms the order and released if it fails (RF-61 and RF-62, Phase 2)."
      },
      {
        title: "Guest checkout",
        status: "Aprobado",
        text: "Customers can buy without an account: the first checkout step does not require registration (RF-47, Phase 2)."
      },
      {
        title: "Order statuses",
        status: "Aprobado",
        text: "Sub-order: Pending, Confirmed, Prepared, Shipped and Cancelled. The order status is derived from those of its sub-orders (RF-59, Phase 2)."
      },
      {
        title: "Name of the sub-order grouping",
        status: "Aprobado",
        text: "“Order” for the parent and “Sub-order” for each child, one per brand. These are the terms used on this page and the ones the Milestone 4 glossary will use."
      }
    ]
  },

  risks: {
    title: "Risks and assumptions",
    items: [
      {
        kind: "Unvalidated assumption",
        title: "Real need for multi-brand shopping",
        text: "We assume there is a real need to buy from several brands at once and that a shared cart adds value. We have not checked it."
      },
      {
        kind: "Risk",
        title: "Scope creep",
        text: "The project could grow from a design exercise into a full e-commerce platform."
      },
      {
        kind: "Risk",
        title: "Use of AI without understanding or review",
        text: "Development is supported by AI tools. There is a risk of incorporating code or documents that the team neither understands nor has tested. Mitigation: critical, cross-review among the three members, acceptance criteria and tests."
      },
      {
        kind: "Risk",
        title: "Fragility of the aggregator model",
        text: "According to the trade press, Lyst was acquired in 2025 for far less than its 2021 valuation. Aggregators can be fragile businesses."
      }
    ]
  },

  progress: {
    title: "Progress",
    intro: "Five sprints, five milestones. The status of each one is updated at the end of the sprint.",
    sprints: [
      {
        name: "Sprint 1",
        dates: "21 Sep – 2 Oct 2026",
        milestone: "Milestone 1",
        text: "Context, actors, scope, exclusions and a reasoned choice of approach.",
        status: "Entregado",
        note: "Draft delivered to the team."
      },
      {
        name: "Sprint 2",
        dates: "5 – 23 Oct 2026",
        milestone: "Milestone 2",
        text: "Needs, requirements and acceptance criteria.",
        status: "Entregado",
        note: "Needs, requirements, user stories, acceptance criteria and traceability matrix in Asana, delivered on 23 Oct. Open decisions and unvalidated sources remain (see Decisions and Needs)."
      },
      {
        name: "Sprint 3",
        dates: "26 Oct – 13 Nov 2026",
        milestone: "Milestone 3",
        text: "Problem analysis, structured design and alternatives.",
        status: "En curso",
        note: "Design document and annexes uploaded to Asana on 9 November. The 13 November Sprint Review is still to come."
      },
      {
        name: "Sprint 4",
        dates: "16 Nov – 11 Dec 2026",
        milestone: "Milestone 4",
        text: "Domain model, detailed design and AI-assisted construction.",
        status: "Pendiente"
      },
      {
        name: "Sprint 5",
        dates: "14 Dec 2026 – 15 Jan 2027",
        milestone: "Milestone 5",
        text: "Integration, quality, traceability, final dossier and defence.",
        status: "Pendiente"
      }
    ]
  },

  team: {
    title: "Team",
    intro: "A team of three people.",
    members: window.CONTENT.team.members
  },

  requirements: {
    title: "Needs and requirements",
    status: "Aprobado",
    intro: "Result of Milestone 2. This page shows a prioritised selection of the core of the project; the full documentation (needs, extended requirements catalogue, user stories and matrix) is in Asana. Approved means accepted for the project scope, not validated with users: no need has been yet. Each requirement states the need it comes from and where that need originates.",
    sources: {
      title: "Sources",
      caption: "Sources consulted and discarded",
      headers: ["ID", "Source", "Type", "Use in Milestone 2"],
      rows: [
        ["F-01", "Milestone 1 documentation: context, actors, scope and exclusions", "Internal", "Origin of the needs and of the exclusions"],
        ["F-02", "Statement of the multi-brand shopping problem (Milestone 1)", "Internal", "Needs N-01 to N-05"],
        ["F-03", "Market reference: platforms such as Lyst charge their brands between 12 % and 15 % per sale", "External, not validated", "Need N-09 and business model hypothesis"],
        ["F-04", "Trade press on the 2025 acquisition of Lyst", "External", "Risk of the aggregator model's fragility"],
        ["F-05", "Statement and criteria of the subject's Milestone 2", "Academic", "Structure of the deliverables"],
        ["F-06", "Benchmarking of multi-brand apps and stores", "Pending", "No documented results yet; not used as a source"],
        ["F-07", "User interviews", "Discarded", "The team has not carried them out (see Evolution); the needs remain to be validated with real users"]
      ]
    },
    hypothesesTitle: "Hypotheses",
    hypotheses: [
      { id: "H-01", text: "There is a real need to buy from several brands of the group at the same time.", state: "Sin validar" },
      { id: "H-02", text: "A unified cart can generate additional sales; only then is the commission new money.", state: "Sin validar" },
      { id: "H-03", text: "Seeing delivery times, shipping and conditions together reduces purchase friction.", state: "Sin validar" }
    ],
    constraintsTitle: "Constraints",
    constraints: [
      { id: "R-01", text: "Modular monolith with HTML, CSS and JavaScript, Node.js and PostgreSQL." },
      { id: "R-02", text: "Synthetic catalogue and simulated payment; no real personal or card data." },
      { id: "R-03", text: "No brands, logos or images of real companies." },
      { id: "R-04", text: "Static landing page, no trackers or third-party resources." },
      { id: "R-05", text: "A team of three people and five sprints, until 15 January 2027." },
      { id: "R-06", text: "AI-assisted development: every artefact must be reviewed and understood by the team." }
    ],
    exclusionsTitle: "Relevant exclusions",
    exclusions: "Real shipping, returns, complex promotions, customer service, integration with real shops, real personal data, real card data and scraping (defined in Milestone 1). If the extended Asana catalogue includes functions in those areas (returns, tracking, customer service, promotions), they are treated as a future catalogue or a simulated interface and are not part of the MVP.",
    needs: {
      title: "Identified needs",
      caption: "Needs by actor",
      headers: ["ID", "Actor", "Need", "Source", "Priority", "Status"],
      badgeCol: 5,
      rows: [
        ["N-01", "Customer", "Buy products from several brands of the group in a single cart", "F-01, F-02", "Must", "Aprobado"],
        ["N-02", "Customer", "Pay once instead of paying in each store", "F-02", "Must", "Aprobado"],
        ["N-03", "Customer", "See the delivery times of the whole order together", "F-02", "Should", "Aprobado"],
        ["N-04", "Customer", "See the shipping costs of the whole order together", "F-02", "Should", "Aprobado"],
        ["N-05", "Customer", "Check each brand's conditions in a single place", "F-02", "Should", "Aprobado"],
        ["N-06", "Group", "Be the only seller towards the customer, distributing fulfilment among brands", "F-01", "Must", "Aprobado"],
        ["N-07", "Brand", "Receive only its part of the order (sub-order) to prepare and ship it", "F-01", "Must", "Aprobado"],
        ["N-08", "Platform operator", "Avoid inconsistent orders if one brand's confirmation fails", "F-01", "Must", "Aprobado"],
        ["N-09", "Platform operator", "Charge a commission for each confirmed sub-order (business hypothesis)", "F-03", "Could", "Aprobado"]
      ]
    },
    functional: {
      title: "Main functional requirements",
      caption: "Main functional requirements and the need they come from",
      headers: ["ID", "Requirement", "Need", "Phase"],
      badgeCol: 3,
      rows: [
        ["RF-19", "Add products from several brands to a single cart", "N-01", "Fase 1"],
        ["RF-23", "The cart shows the subtotal per brand and the overall total", "N-01", "Fase 1"],
        ["RF-28", "The cart shows each brand's delivery time", "N-03", "Fase 1"],
        ["RF-29", "The cart shows shipping costs per brand and the total", "N-04", "Fase 1"],
        ["RF-30", "The cart shows the conditions of all the brands together", "N-05", "Fase 1"],
        ["RF-36", "A single checkout for the whole cart", "N-02", "Fase 1"],
        ["RF-41", "Payment is simulated, with a success or failure result", "N-02", "Fase 1"],
        ["RF-44", "The order summary shows the group as the legal seller", "N-06", "Fase 1"],
        ["RF-52", "The order is split into one sub-order per brand", "N-07", "Fase 1"],
        ["RF-54", "Each sub-order has its own amount, status and identifier", "N-07", "Fase 1"],
        ["RF-57", "Atomic confirmation: if one sub-order fails, none is confirmed", "N-08", "Fase 1"],
        ["RF-63", "The commission is calculated per confirmed sub-order", "N-09", "Fase 2"]
      ]
    },
    nonFunctional: {
      title: "Main non-functional requirements",
      caption: "Main non-functional requirements and their origin",
      headers: ["ID", "Requirement", "Origin", "Phase"],
      badgeCol: 3,
      rows: [
        ["RNF-09", "Creating the order and its sub-orders is transactional (all or nothing)", "N-08", "Fase 1"],
        ["RNF-11", "The order total always equals the sum of its sub-orders", "N-08", "Fase 1"],
        ["RNF-29", "No real card data is stored", "R-02", "Fase 1"],
        ["RNF-31", "Only synthetic personal data is used", "R-02", "Fase 1"],
        ["RNF-33", "No brands, logos or images of real companies", "R-03", "Fase 1"],
        ["RNF-36", "No third-party trackers or analytics", "R-04", "Fase 1"],
        ["RNF-37", "Responsive design for mobile and desktop", "Quality", "Fase 1"],
        ["RNF-40", "Sufficient contrast for text and controls", "Quality", "Fase 1"],
        ["RNF-54", "Modular monolith architecture", "R-01", "Fase 1"],
        ["RNF-58", "Automated tests of the cart → order → sub-orders flow", "N-08", "Fase 1"],
        ["RNF-59", "Tests of the atomic failure scenario", "N-08", "Fase 1"]
      ]
    },
    scopeNote: "A selection of the main requirements, with the identifiers of the team's backlog (RF-xx, RNF-xx). The Asana documents use other codes (for example RF-BUS-01 or RF-02.1); the equivalence table between levels is still pending. The proposed scope, still under review, keeps 84 functional and 75 non-functional requirements inside the project, split into Phase 1 (core of the demo) and Phase 2 (extension); whatever stays out is future catalogue."
  },

  traceability: {
    title: "Traceability and acceptance criteria",
    intro: "Each need becomes requirements, each requirement is verified by an acceptance criterion and each criterion has a task in Asana. This version checks that the relationship between elements exists; it does not yet show that the sources have been verified or that each link is correct. It will be extended with the design in Milestone 3.",
    caption: "Initial traceability matrix",
    headers: ["Need", "Requirements", "Acceptance criterion", "Asana task"],
    rows: [
      {
        need: "N-01", reqs: "RF-19, RF-23", id: "CA-01", title: "Cart with two brands",
        gherkin: ["Given an empty cart", "When the customer adds a product from Brand A and another from Brand B", "Then the cart shows them grouped by brand, with a subtotal per brand and an overall total"],
        task: "Functional requirements › Cart, Checkout and Payments"
      },
      {
        need: "N-03, N-04, N-05", reqs: "RF-28, RF-29, RF-30", id: "CA-02", title: "Joint delivery times, shipping and conditions",
        gherkin: ["Given a cart with products from two brands", "When the customer opens the cart", "Then they see each brand's delivery time, shipping cost and conditions on the same screen"],
        task: "Functional requirements › Cart, Checkout and Payments"
      },
      {
        need: "N-02", reqs: "RF-36, RF-41", id: "CA-03", title: "Single simulated payment",
        gherkin: ["Given a valid cart", "When the customer confirms the simulated payment with a success result", "Then a single order is created and no per-brand payment is requested"],
        task: "Functional requirements › Cart, Checkout and Payments"
      },
      {
        need: "N-07", reqs: "RF-52, RF-54", id: "CA-04", title: "Split into sub-orders",
        gherkin: ["Given an order with items from two brands", "When the order is confirmed", "Then two sub-orders are created, each with only items from its brand and with an amount, status and identifier"],
        task: "Functional requirements › Cart, Checkout and Payments"
      },
      {
        need: "N-08", reqs: "RF-57, RNF-09, RNF-11", id: "CA-05", title: "Partial failure: all or nothing",
        gherkin: ["Given an order with sub-orders from two brands", "When the confirmation of one of them fails", "Then none is confirmed and no half-finished order or sub-order remains"],
        task: "Non-functional requirements › Performance and Architecture"
      },
      {
        need: "N-06", reqs: "RF-44", id: "CA-06", title: "Single legal seller",
        gherkin: ["Given an order summary", "When the customer reviews it before paying", "Then the seller shown is the group and not each brand"],
        task: "Functional requirements › Cart, Checkout and Payments"
      },
      {
        need: "N-09", reqs: "RF-63", id: "CA-07", title: "Commission per sub-order (illustrative example)",
        gherkin: ["Given a confirmed sub-order of €80 and a 12 % commission", "When the commission is calculated", "Then the result is €9.60"],
        task: "Functional requirements › Cart, Checkout and Payments"
      }
    ],
    asanaTitle: "References in Asana",
    asanaNote: "The Asana board is private and restricted to members of the course. Task names are given so they can be located.",
    asana: [
      { name: "[INDICONNECT] Milestone 2 – Requirements and Acceptance Criteria", text: "Main task of the milestone, in Sprint 2.", url: "" },
      { name: "Identified needs", text: "Subtask with the needs document.", url: "" },
      { name: "User stories", text: "Subtask with the user stories.", url: "" },
      { name: "Functional requirements", text: "Eight categories: search and navigation; account and profile; catalogue and products; favourites and trends; notifications, recommendations and AI; cart, checkout and payments; tracking, returns and customer service (future catalogue, out of the MVP); footer, legal and administration.", url: "" },
      { name: "Non-functional requirements", text: "Four categories: security and privacy; performance and architecture; design, usability and accessibility; maintainability.", url: "" },
      { name: "Traceability matrix", text: "Subtask with the need → requirement matrix.", url: "" },
      { name: "Requirement specifications on the web", text: "Subtask for updating this landing page.", url: "" }
    ]
  },

  design: {
    "title": "System design (Milestone 3)",
    "intro": "Every functional block, A1 to A7, is designed with four views: processes (DFD), data (ER), architecture and interfaces (low-fidelity wireframes). The views are delivered as PDF and their diagrams are also available as editable .drawio files.",
    "status": "Status on 9 November 2026: the per-block views, their editable sources and the design document (version 1.0) are delivered. Only the link from each deliverable to Asana is still in progress.",
    "docLabel": "Open the design document (Word, 88 pages, in Spanish)",
    "docFile": "IndiConnect_Hito3_Documento_de_diseno.docx",
    "blocksCaption": "Design views per functional block",
    "blocksHeaders": [
      "Block",
      "Content",
      "Views",
      "Editable diagrams"
    ],
    "pdfLabel": "Open PDF",
    "drawioLabel": "Download .drawio",
    "openNote": "The .drawio files can be opened and edited in app.diagrams.net or draw.io Desktop. The PDFs are written in Spanish.",
    "evidenceTitle": "Milestone 3 deliverables",
    "evidenceCaption": "Status of the minimum Milestone 3 deliverables",
    "evidenceHeaders": [
      "Deliverable",
      "Status",
      "Situation"
    ],
    "blocks": [
      {
        "name": "A1 · Catalogue and navigation",
        "text": "5 diagrams: context, DFD, ER, architecture and navigation",
        "pdf": "Bloque-A1_Catalogo-y-navegacion_4-vistas.pdf",
        "drawio": "Bloque-A1_Catalogo-y-navegacion.drawio"
      },
      {
        "name": "A2 · Unified cart",
        "text": "5 diagrams: context, DFD, ER, architecture and navigation",
        "pdf": "Bloque-A2_Carrito-unificado_4-vistas.pdf",
        "drawio": "Bloque-A2_Carrito-unificado.drawio"
      },
      {
        "name": "A3 · Checkout and simulated payment",
        "text": "5 diagrams: context, DFD, ER, architecture and navigation",
        "pdf": "Bloque-A3_Checkout-y-pago-simulado_4-vistas.pdf",
        "drawio": "Bloque-A3_Checkout-y-pago-simulado.drawio"
      },
      {
        "name": "A4 · Order and sub-orders",
        "text": "6 diagrams: context, DFD, ER, architecture and navigation (with a level-2 DFD)",
        "pdf": "Bloque-A4_Pedido-y-subpedidos_4-vistas.pdf",
        "drawio": "Bloque-A4_Pedido-y-subpedidos.drawio"
      },
      {
        "name": "A5 · Tracking and customer account",
        "text": "5 diagrams: context, DFD, ER, architecture and navigation",
        "pdf": "Bloque-A5_Seguimiento-y-cuenta-del-cliente_4-vistas.pdf",
        "drawio": "Bloque-A5_Seguimiento-y-cuenta-del-cliente.drawio"
      },
      {
        "name": "A6 · Brands and group operations",
        "text": "5 diagrams: context, DFD, ER, architecture and navigation",
        "pdf": "Bloque-A6_Marcas-y-operacion-del-grupo_4-vistas.pdf",
        "drawio": "Bloque-A6_Marcas-y-operacion-del-grupo.drawio"
      },
      {
        "name": "A7 · Data and support",
        "text": "5 diagrams: context, DFD, ER, architecture and navigation",
        "pdf": "Bloque-A7_Datos-y-soporte_4-vistas.pdf",
        "drawio": "Bloque-A7_Datos-y-soporte.drawio"
      },
      {
        "name": "General index",
        "text": "Dependencies between the seven blocks",
        "pdf": "00_Indice-general_4-vistas.pdf",
        "drawio": "00_Indice-general.drawio"
      }
    ],
    "evidence": [
      [
        "Problem analysis",
        "Entregado",
        "Section 2 of the design document, with the problem tree, needs and hypotheses."
      ],
      [
        "Alternatives",
        "Entregado",
        "Section 3: three architecture alternatives compared, plus the per-block design decisions."
      ],
      [
        "High-level logical architecture",
        "Entregado",
        "An architecture view for every block, by layers."
      ],
      [
        "DFDs or main flows",
        "Entregado",
        "Context and level-1 DFD per block; level 2 in A4."
      ],
      [
        "Conceptual data model (ER)",
        "Entregado",
        "One entity-relationship diagram per block."
      ],
      [
        "Business rules",
        "Entregado",
        "Section 7: a single catalogue of 72 rules; proposed rules and thresholds to define are listed in section 10."
      ],
      [
        "Low-fidelity wireframes",
        "Entregado",
        "Screens and states inside each block's PDF."
      ],
      [
        "Updated traceability matrix",
        "Entregado",
        "Section 9 and Annex A: the full chain for the 84 FRs down to the screen. 72 FRs still have no linked need."
      ],
      [
        "Glossary",
        "Entregado",
        "Section 11 of the design document."
      ],
      [
        "Editable source diagrams (.drawio)",
        "Entregado",
        "37 diagrams in 8 files, downloadable in the table above."
      ],
      [
        "Link to Asana and to this landing",
        "En curso",
        "Hito 3 tasks are in Asana; the link from each deliverable will be completed on publication."
      ],
      [
        "Change log",
        "Entregado",
        "Section 12 of the design document, besides each block's own log."
      ]
    ]
  },

  archive: {
      "title": "Documentation",
      "intro": "A copy on this landing of what the team keeps on the course Asana board, so it survives if we lose access. It comes from the board export of 9 November 2026: each milestone unfolds into its description and its subtasks.",
      "limits": "Not included: Asana comments and attached files, the other groups' tasks (Food4All and LearnCode), the sprint ceremonies and the metrics dashboard. The descriptions are copied as they are on the board, in Spanish, and the data is as of the date shown: it does not sync by itself.",
      "asOf": "Copy as of 9 November 2026",
      "statementTitle": "Milestone 3 brief",
      "statementIntro": "Turn the prioritised Milestone 2 requirements into analysis and structured-design artefacts: a coherent, editable and traceable design document, linked to the Asana tasks and to the documentation landing. Format: team work with an individual check of understanding and contribution during reviews, defences or Sprint Reviews.",
      "statementMinTitle": "Minimum deliverable",
      "statementMin": [
          "Problem analysis.",
          "Alternatives.",
          "High-level logical architecture.",
          "DFDs or main flows.",
          "Conceptual data model or ER diagram.",
          "Business rules.",
          "Low-fidelity wireframes.",
          "Updated traceability matrix.",
          "Glossary."
      ],
      "statementEvTitle": "Mandatory evidence",
      "statementEv": [
          "Design document and annexes.",
          "Editable source diagrams in .drawio format.",
          "Low-fidelity wireframes or prototypes.",
          "Link to Asana and to the updated documentation landing.",
          "Updated traceability matrix: need → requirement → process or DFD → component → screen.",
          "Change log: what changed, who changed it, when and why."
      ],
      "statementNote": "Summarised from the brief as recorded in the Asana task and by the team; the “Delivery conditions” section is not archived because its text is not available.",
      "planTitle": "Team work plan for Milestone 3",
      "planCaption": "Milestone 3 subtasks, their exit criterion and where each result ends up",
      "planHeaders": [
          "Subtask",
          "Exit criterion",
          "Where it ends up"
      ],
      "plan": [
          [
              "Problem analysis",
              "A section of the design document setting out the problem, actors and constraints, traceable to the Milestone 2 needs.",
              "Section 2 of the design document"
          ],
          [
              "Design alternatives",
              "At least two reasoned alternatives per relevant decision, with the chosen one and the reason.",
              "Section 3 of the design document"
          ],
          [
              "DFD view of blocks A1–A7",
              "One DFD per functional block, consistent with the Milestone 2 backlog.",
              "Each block's PDF and section 5"
          ],
          [
              "ER view of blocks A1–A7",
              "An entity-relationship model per block, with no contradictions between blocks.",
              "Each block's PDF and section 6"
          ],
          [
              "Architecture view of blocks A1–A7",
              "Components and interfaces per block, aligned with the DFD and the ER model.",
              "Each block's PDF and section 4"
          ],
          [
              "Wireframes of blocks A1–A7",
              "A low-fidelity wireframe of each block's key screens, traceable to its requirements.",
              "Each block's PDF and section 8"
          ],
          [
              "Business rules",
              "A catalogue of rules with an identifier, linked to the requirements that originate them.",
              "Section 7 of the design document"
          ],
          [
              "Updated traceability matrix",
              "A need → requirement → process or DFD → component → screen matrix, updated from Milestone 2.",
              "Section 9 and Annex A"
          ],
          [
              "Glossary",
              "Domain terms defined once and used the same way throughout the document.",
              "Section 11 of the design document"
          ],
          [
              "Milestone 3 change log",
              "A record of what changed, who, when and why, since Milestone 2.",
              "Section 12 of the design document"
          ],
          [
              "Editable source diagrams (.drawio)",
              "DFD, ER, architecture and navigation of blocks A1–A7 as .drawio files in the repository.",
              "docs/hito3 folder: 8 files with 37 diagrams"
          ],
          [
              "Milestone 3 Word document (analysis and architecture)",
              "A coherent, editable and traceable design document that brings everything together.",
              "Design section of this landing"
          ],
          [
              "Links to Asana and to the landing in the document",
              "The document links to the Asana board and to the documentation landing, and the landing reflects Milestone 3.",
              "Cover and section 13 of the document"
          ],
          [
              "Individual feasibility analysis",
              "A personal analysis with a verdict per dimension and risks, based on the current hypotheses H-01 to H-03.",
              "Each member's own document; not published here"
          ],
          [
              "Cross-review and delivery of Milestone 3",
              "Review by the three members and delivery on 13 Nov 2026.",
              "Pending: cross-review before 13 November"
          ]
      ],
      "linksTitle": "Where everything is",
      "links": [
          [
              "Course Asana board (private, members only)",
              "https://app.asana.com/1/1210398551117865/project/1218693735718662/board/1218693735718678"
          ],
          [
              "Documentation landing",
              "https://albrtoguerrero.github.io/indiconnect-landing/"
          ],
          [
              "Repository",
              "https://github.com/albrtoguerrero/indiconnect-landing"
          ],
          [
              "Milestone 3 files (document, PDFs and .drawio)",
              "https://github.com/albrtoguerrero/indiconnect-landing/tree/main/docs/hito3"
          ]
      ],
      "linksHeaders": [
          "Resource",
          "Address"
      ],
      "linksCaption": "Project links",
      "hitosTitle": "Milestones",
      "hitoLabel": "Milestone",
      "descTitle": "Milestone description",
      "subtasksTitle": "Subtasks",
      "subtasksCaption": "Milestone subtasks on the board",
      "subtasksHeaders": [
          "Subtask",
          "Owner",
          "Date",
          "Status"
      ],
      "doneLabel": "Done",
      "pendingLabel": "Pending",
      "noOwner": "Unassigned",
      "noSubtasks": "This milestone has no subtasks on the board.",
      "notesOf": "Notes on",
      "planNote": "These 15 subtasks are the team's internal plan; on the course board Milestone 3 only has the subtask “Análisis”.",
      "hitos": [
          {
              "n": 1,
              "title": "Contexto, actores y alcance",
              "start": "2026-09-21",
              "end": "2026-10-02",
              "status": "Entregado",
              "notes": "Definir el contexto del sistema agregador de apps Inditex (Zara, Pull&Bear, Massimo Dutti, etc.).\n\n📌 Entregables:\n• Descripción del contexto del sistema\n• Identificación de actores (usuarios finales, sistemas Inditex, pasarelas de pago…)\n• Alcance funcional y exclusiones razonadas\n• Elección razonada del enfoque (monolito vs microservicios, nativo vs web…)\n\n💬 Comentario sugerido al entregar: indicar qué apps de Inditex se integran y cuáles quedan fuera del alcance.\n\n📎 Adjuntar: documento PDF con diagrama de contexto (UML o C4 nivel 1).",
              "subtasks": [
                  {
                      "name": "Naming",
                      "owner": "Alberto Guerrero",
                      "due": "2026-09-23",
                      "done": true,
                      "notes": ""
                  },
                  {
                      "name": "Integrantes del Grupo",
                      "owner": "Lucía Guerra",
                      "due": "2026-09-23",
                      "done": true,
                      "notes": "Alberto Guerrero Morales, Mikel Fernández Moriel y Lucía Guerra Escudero."
                  },
                  {
                      "name": "Mercado",
                      "owner": "Mikel Moriel",
                      "due": "2026-09-23",
                      "done": true,
                      "notes": "Ámbito: España (territorio nacional)\n    Cliente: Comprador online en España\n    Moneda e idioma: Euro (€) y español\n    Contexto: E-commerce de moda (ropa, calzado y accesorios). En 2024, 29,4 millones de personas compraron por internet en España, el 76% adquirió moda y el 83,6% utilizó el smartphone."
                  },
                  {
                      "name": "Competencia",
                      "owner": "Lucía Guerra",
                      "due": "2026-09-23",
                      "done": true,
                      "notes": "Competencia directa: Las webs y apps oficiales e independientes de Zara, Pull&Bear, Stradivarius y Bershka.\n    Alternativas del mercado: Marketplaces de moda multimarca como Zalando, ASOS o Farfetch.\n\n----------------------------------------\n\n—— ANÁLISIS DE COMPETENCIA ——\n\n1. Nombre actual del proyecto\n\nPara esta entrega vamos a mantener el nombre actual, ya que se trata de un proyecto académico y de un MVP, por lo que el objetivo principal ahora mismo es desarrollar y validar la idea.\nAun así, consideramos que la comprobación del nombre debería hacerse desde las primeras fases de un proyecto. De esta forma se pueden evitar problemas posteriores relacionados con marcas registradas, nombres de empresas, dominios web o usuarios en redes sociales.\n\n2. Cómo elegiríamos un nombre en futuros proyectos\n\nEn futuros proyectos seguiríamos un proceso más claro antes de decidir el nombre definitivo.\nPrimero definiríamos qué queremos transmitir con la marca: qué hace el producto, a quién va dirigido y qué imagen queremos dar.\nDespués generaríamos varias opciones de nombres, intentando evitar nombres demasiado genéricos o descriptivos. Buscaríamos nombres fáciles de recordar, pronunciar y utilizar tanto en España como, si fuese necesario, en otros países.\nUna vez tengamos varias opciones, comprobaríamos:\n    Si el nombre está registrado como marca en la OEPM o en la EUIPO.\n    Si existe alguna sociedad con un nombre igual o muy parecido en el Registro Mercantil Central.\n    Si están disponibles dominios como .com, .es, .io o .app.\n    Si el nombre o uno similar ya se está utilizando en Instagram, TikTok, X, LinkedIn, App Store o Play Store.\nDespués de estas comprobaciones compararíamos los candidatos teniendo en cuenta principalmente la disponibilidad legal y digital, pero también que el nombre sea fácil de recordar y que pueda utilizarse en otros mercados en el futuro.\nComo referencia, podríamos valorar cada nombre de esta forma: 40 % disponibilidad legal, 30 % disponibilidad digital, 20 % facilidad para recordarlo y pronunciarlo y 10 % posibilidad de utilizarlo internacionalmente.\n\n3. Uso de IA como apoyo para buscar nombres\n\nTambién podemos utilizar herramientas de IA para ayudarnos en la fase inicial de búsqueda de nombres, aunque la comprobación final tendría que realizarse siempre en las fuentes oficiales.\nUn prompt que podríamos utilizar sería:\n\n> Necesito buscar un nombre para un proyecto que consiste en [descripción del proyecto].\nPropón 10 nombres diferentes que sean fáciles de recordar y que no sean excesivamente genéricos o descriptivos.\nPara las mejores opciones, indica posibles variantes del nombre para redes sociales y dominios web, qué clases de Niza podrían estar relacionadas con el proyecto y qué alternativas podríamos utilizar si el nombre ya estuviese registrado.\nLa disponibilidad de los nombres se comprobará posteriormente en la OEPM, EUIPO, Registro Mercantil y registradores de dominios.\n\n4. Qué vamos a hacer a partir de ahora\n\nPara este proyecto mantendremos el nombre actual para no modificar el alcance de la entrega. Además, dejaremos este procedimiento documentado para tenerlo en cuenta desde el principio en futuros proyectos.\nDe esta forma, antes de decidir definitivamente un nombre, comprobaremos primero su disponibilidad legal, comercial y digital, evitando tener que cambiarlo cuando el proyecto ya esté avanzado."
                  },
                  {
                      "name": "Alcance",
                      "owner": "Lucía Guerra",
                      "due": "2026-09-23",
                      "done": true,
                      "notes": "Dentro del alcance:\n    Catálogo simulado de productos de Zara, Pull&Bear, Stradivarius y Bershka.\n    Carrito de compra unificado multimarca.\n    Checkout y pago único simulado.\n    Creación de un pedido global (Order) fragmentado en subpedidos (SubOrders) por marca.\nFuera del alcance:\n    Integración comercial real con Inditex o pasarela de pago real.\n    Logística de envíos reales, devoluciones, promociones y atención al cliente.\n    Scraping de webs oficiales o recopilación de datos reales de clientes."
                  },
                  {
                      "name": "Actores",
                      "owner": "Lucía Guerra",
                      "due": "2026-09-23",
                      "done": true,
                      "notes": "Cliente: Usuario en España que navega por el catálogo, añade productos al carrito unificado y realiza la compra.\n    Administrador de Plataforma: Gestiona el catálogo de productos y supervisa el estado de los pedidos y subpedidos.\n    Sistema de Marca: Entidad simulada correspondiente a cada marca (Zara, Pull&Bear, Stradivarius, Bershka) que recibe y gestiona la parte del pedido correspondiente."
                  },
                  {
                      "name": "Landing Documental",
                      "owner": "Alberto Guerrero",
                      "due": "2026-09-23",
                      "done": true,
                      "notes": "Landing documental y comercial del proyecto (agregador de marcas con carrito unificado y subpedidos por marca). Recoge los avances documentados y el planteamiento comercial. Enlace a la landing: https://albrtoguerrero.github.io/indiconnect-landing/"
                  }
              ]
          },
          {
              "n": 2,
              "title": "Requisitos y Criterios de Aceptación",
              "start": "2026-10-01",
              "end": "2026-10-23",
              "status": "Entregado",
              "notes": "Elicitar y documentar los requisitos del agregador de apps Inditex.\n\n📌 Entregables:\n• Necesidades identificadas (entrevistas, benchmarking de apps Inditex)\n• Requisitos funcionales y no funcionales (rendimiento, seguridad, accesibilidad)\n• User Stories con criterios de aceptación (formato Gherkin recomendado)\n• Matriz de trazabilidad inicial (necesidad → requisito)\n\n💬 Comentario sugerido: indicar fuentes de información usadas para elicitar requisitos.\n\n📎 Adjuntar: documento de requisitos + backlog en formato tabla.",
              "subtasks": [
                  {
                      "name": "ENLACE LANDING COMERCIAL ",
                      "owner": "",
                      "due": "",
                      "done": true,
                      "notes": "https://albrtoguerrero.github.io/indiconnect-landing/comercial/"
                  },
                  {
                      "name": "Necesidades identificadas",
                      "owner": "Mikel Moriel",
                      "due": "2026-10-21",
                      "done": true,
                      "notes": ""
                  },
                  {
                      "name": "Especificaciones de requisitos en la web",
                      "owner": "Alberto Guerrero",
                      "due": "2026-10-23",
                      "done": true,
                      "notes": ""
                  },
                  {
                      "name": "ENLACE LANDING DOCUMENTAL",
                      "owner": "Alberto Guerrero",
                      "due": "2026-10-23",
                      "done": true,
                      "notes": "https://albrtoguerrero.github.io/indiconnect-landing/"
                  },
                  {
                      "name": "User stories ",
                      "owner": "Alberto Guerrero",
                      "due": "2026-10-24",
                      "done": true,
                      "notes": ""
                  },
                  {
                      "name": "Requisitos funcionales",
                      "owner": "Lucía Guerra",
                      "due": "2026-10-24",
                      "done": true,
                      "notes": ""
                  },
                  {
                      "name": "Requisitos no funcionales",
                      "owner": "Lucía Guerra",
                      "due": "2026-10-24",
                      "done": true,
                      "notes": ""
                  },
                  {
                      "name": "Matriz de trazabilidad",
                      "owner": "Mikel Moriel",
                      "due": "2026-10-24",
                      "done": true,
                      "notes": ""
                  }
              ]
          },
          {
              "n": 3,
              "title": "Análisis y Diseño Estructurado",
              "start": "2026-10-26",
              "end": "2026-11-13",
              "status": "En curso",
              "notes": "Análisis del problema y diseño estructurado del agregador de apps Inditex.\n\n📌 Entregables:\n• Análisis del problema: árbol de problemas, causas y efectos\n• Arquitectura de alto nivel (diagrama de componentes)\n• Diseño estructurado: DFD o diagramas de flujo principales\n• Evaluación de alternativas de diseño con justificación\n• Prototipo de baja fidelidad (wireframes) de las pantallas principales\n\n💬 Comentario sugerido: justificar la elección de arquitectura frente a alternativas descartadas.\n\n📎 Adjuntar: documento de diseño + wireframes (Figma, Balsamiq o similar).",
              "subtasks": [
                  {
                      "name": "Análisis",
                      "owner": "",
                      "due": "",
                      "done": false,
                      "notes": ""
                  }
              ]
          },
          {
              "n": 4,
              "title": "Modelo de dominio, diseño detallado y construcción asistida por IA",
              "start": "2026-11-16",
              "end": "2026-12-11",
              "status": "Pendiente",
              "notes": "Marco docente actualizado · 08/11/2026\n\nHito 4: Modelo de dominio, diseño detallado y construcción asistida por IA. Inicio 16/11/2026; entrega 11/12/2026; peso integrado conservado: 12% (0.12). Sin porcentajes extra para código, herramienta IA o landing. Se preservan estado, roles, responsables y fechas existentes; el equipo confirma responsables de subtareas pendientes.\n\nAcordar equipo/docente un alcance acotado desde requisitos, criterios de aceptación y artefactos reales de H3 (referencia 1218693472298303). Candidato, no obligación: catálogo ficticio multimarca → variantes → cesta → cantidades → totales/disponibilidad. No imponer totalidad del producto, login ni nuevas funciones no aprobadas. Explicitar los servicios externos simulados; no exigir APIs Inditex reales ni IA dentro del producto.\n\nBacklog en siete bloques: alcance/requisitos/aceptación; modelo de dominio/diseño OO; entorno/repositorio; secuencias/construcción del flujo principal; estados/excepciones/construcción; revisión IA/refactor/contraste diseño-código; entrega/demo/documentación/trazabilidad.\n\nCalendario orientativo dentro de H4: 16/11 comienza alcance/modelo/entorno; 20/11 primer incremento y responsabilidades; 23/11 enseñanza/aplicación de interacciones y secuencias al flujo principal; 27/11 estados y excepciones; 30/11 revisión y refactor; 04/12 clínica de demo previa y correcciones; 11/12 entrega. Objetivos de siete bloques: 20/20/20/23/27/30 de noviembre y 11 de diciembre. No exigir construcción antes de la enseñanza necesaria.\n\nDiseño: distinguir modelo de dominio conceptual de clases de código. Aplicar UML pertinente; representar clases reales si existen. Se admiten funciones/componentes si se justifica correspondencia con responsabilidades del diseño. Aprender y explicar abstracción, encapsulación, herencia y polimorfismo, sin forzar herencia ni patrones. Mantener diagramas editables .drawio con draw.io.\n\nDefinición de terminado: programa ejecutable de extremo a extremo para el alcance acordado; código exportable y repositorio Git versionado, README de instalación/ejecución/comprobación, dependencias y datos ficticios. Entorno reproducible y seguro; Git local/exportable válido, sin GitHub público ni cuentas premium obligatorias. Secuencias e interacciones coherentes con implementación; estados y excepciones relevantes sin cantidad fija; comprobaciones básicas desde construcción. Trazabilidad requisito → diseño → módulo/archivo → comprobación → evidencia. Landing documental y comercial actualizada, con registro quién, qué, cuándo y por qué. Cada alumno explica, modifica y verifica una parte.\n\nUso de IA como asistencia a programar, no como obligación funcional del producto: registrar objetivo, herramienta, prompts, respuesta relevante, cambios, revisión humana y versión. Entregar prompts revisados/anonimizados; sin secretos ni datos personales. Los prompts son evidencia, no sustituyen responsabilidad ni verificación humana. Demostrar implementación y modelos en Review4. H5 permanece exactamente integración, calidad y dossier final.\n\nContenido previo conservado · referencia histórica (ejemplos previos no amplían el alcance aprobado ni obligan a patrones o APIs)\n\nModelo de dominio y diseño orientado a objetos del agregador de apps Inditex.\n\n📌 Entregables:\n• Modelo de dominio: diagrama de clases UML con relaciones\n• Diagrama de secuencia de los casos de uso principales (login, búsqueda, carrito unificado)\n• Diagrama de estados (pedido, sesión de usuario)\n• Patrones de diseño aplicados y justificación (Adapter para APIs Inditex, Facade…)\n• Actualización de la matriz de trazabilidad\n\n💬 Comentario sugerido: justificar qué patrones GoF se aplican y por qué.\n\n📎 Adjuntar: diagramas UML (StarUML, draw.io o similar) + documento.",
              "subtasks": [
                  {
                      "name": "H4-01 · Alcance funcional de construcción, requisitos y criterios de aceptación",
                      "owner": "",
                      "due": "2026-11-20",
                      "done": false,
                      "notes": "Marco docente actualizado · 08/11/2026\nInicio 16/11, objetivo orientativo 20/11. Acordar equipo/docente alcance acotado desde requisitos y artefactos reales H3 1218693472298303, IDs y criterios verificables, entradas/salidas/exclusiones. Candidato no obligatorio: catálogo ficticio multimarca → variantes → cesta → cantidades → totales/disponibilidad. No exigir totalidad del producto ni nuevas funciones no aprobadas. Servicios externos simulados explícitos; preparar comprobaciones y trazabilidad. Responsabilidades pendientes equipo confirma, primer incremento 20/11 según enseñanza. H4 entrega 11/12, 12% integrado sin porcentaje extra."
                  },
                  {
                      "name": "H4-02 · Modelo de dominio y diseño OO",
                      "owner": "",
                      "due": "2026-11-20",
                      "done": false,
                      "notes": "Marco docente actualizado · 08/11/2026\nInicio 16/11, objetivo orientativo 20/11; modelo desde alcance acordado y requisitos H3, responsabilidades y diseño detallado. Modelo de dominio conceptual distinto de clases de código. UML pertinente: clases reales si existen; funciones/componentes admitidos justificando correspondencia. Aprender/explicar abstracción, encapsulación, herencia y polimorfismo sin forzar herencia/patrones ni IA dentro producto. Diagramas editables .drawio con draw.io, trazabilidad al requisito y actualización con código. Responsable pendiente equipo confirma. H4 entrega 11/12, 12% integrado, sin peso extra."
                  },
                  {
                      "name": "H4-03 · Entorno y repositorio reproducible y seguro",
                      "owner": "",
                      "due": "2026-11-20",
                      "done": false,
                      "notes": "Marco docente actualizado · 08/11/2026\nInicio 16/11, objetivo orientativo 20/11. Preparar código exportable/repositorio Git versionado; Git local/exportable válido, no GitHub público ni cuentas premium obligatorias. README de instalación/ejecución/comprobación, dependencias y datos ficticios, configuración sin secretos ni datos personales. Servicios externos explícitamente simulados, no APIs Inditex reales obligatorias. Comprobar reproducción y primer incremento tras enseñanza necesaria. Responsable pendiente equipo confirma. H4 entrega 11/12, 12% integrado, sin peso extra."
                  },
                  {
                      "name": "H4-04 · Interacciones, secuencias y construcción del flujo principal",
                      "owner": "",
                      "due": "2026-11-23",
                      "done": false,
                      "notes": "Marco docente actualizado · 08/11/2026\nPreparación 16/11, primer incremento/responsabilidades 20/11 según enseñanza; aplicar secuencias/flujo después de enseñanza 23/11, objetivo orientativo 23/11. Implementar extremo a extremo el alcance acordado desde H3; candidato catálogo ficticio/variantes/cesta/cantidades/totales-disponibilidad, no obligatorio completo. UML editable .drawio con draw.io y correspondencia con clases reales o funciones/componentes justificados; comprobaciones básicas desde construcción. Servicios externos simulados. IA asistencia: objetivo/herramienta/prompts/respuesta relevante/cambios/revisión humana/versión, anonimizados sin secretos/datos personales. Responsable pendiente equipo confirma. Entrega 11/12, sin peso extra."
                  },
                  {
                      "name": "H4-05 · Estados, excepciones y construcción",
                      "owner": "",
                      "due": "2026-11-27",
                      "done": false,
                      "notes": "Marco docente actualizado · 08/11/2026\nPreparación desde 16/11; aplicar estados/excepciones tras enseñanza 27/11, objetivo orientativo 27/11. Seleccionar e implementar transiciones, validaciones y excepciones relevantes al alcance acordado sin cantidad fija; candidatos cantidades inválidas, variante no disponible o cesta vacía solo si corresponden a requisitos aprobados. Datos ficticios/servicios simulados. Modelos editables .drawio con draw.io coherentes con módulos/archivos, comprobaciones básicas y evidencia esperado/observado/version. Revisión humana de ayuda IA, sin secretos/datos personales. Responsable pendiente equipo confirma. H4 entrega 11/12, 12% integrado sin peso extra."
                  },
                  {
                      "name": "H4-06 · Revisión IA, refactor y contraste diseño/código",
                      "owner": "",
                      "due": "2026-11-30",
                      "done": false,
                      "notes": "Marco docente actualizado · 08/11/2026\nPreparación desde 16/11; revisión/refactor tras construcción y enseñanza previas, objetivo orientativo 30/11. Contrastar modelo conceptual/diseño detallado/código; simplificar sin forzar herencia/patrones. Revisar propuestas IA críticamente y comprobar antes/después. Registrar objetivo, herramienta, prompts, respuesta relevante, cambios, revisión humana y versión; prompts revisados/anonimizados sin secretos/datos personales. Prompts son evidencia, no sustituyen responsabilidad. Trazabilidad requisito → diseño → módulo/archivo → comprobación → evidencia. Cada alumno explica/modifica/verifica parte. Clínica demo 04/12; entrega H4 11/12, sin peso extra. Responsable pendiente equipo confirma."
                  },
                  {
                      "name": "H4-07 · Entrega, demo, documentación y trazabilidad",
                      "owner": "",
                      "due": "2026-12-11",
                      "done": false,
                      "notes": "Marco docente actualizado · 08/11/2026\nPreparación desde 16/11; clínica de demo previa/correcciones explícita 04/12; entrega 11/12, 12% integrado sin extra para código/IA/landing. Programa ejecutable extremo a extremo alcance acordado, código exportable/repositorio Git local o remoto versionado, README/dependencias/datos ficticios y ejecución reproducible segura. Diagramas editables .drawio con draw.io; estados y excepciones relevantes sin cantidad fija y comprobaciones desde construcción. Trazabilidad requisito → diseño → módulo/archivo → comprobación → evidencia. Landing documental/comercial actualizada; cambios quién/qué/cuándo/por qué; prompts revisados/anonimizados y registro IA/revisión humana/version sin secretos/datos personales. Cada alumno explica, modifica y verifica parte. Demo implementación+modelos en Review4 y handover H5 exactamente integración/calidad/dossier, sin editar H5. Responsable pendiente equipo confirma."
                  }
              ]
          },
          {
              "n": 5,
              "title": "Integración, Calidad y Dossier Final",
              "start": "2026-12-14",
              "end": "2027-01-15",
              "status": "Pendiente",
              "notes": "Entrega final del proyecto del agregador de apps Inditex.\n\n📌 Entregables:\n• Matriz de trazabilidad completa (necesidad → requisito → diseño → implementación)\n• Plan de calidad: métricas, revisiones, pruebas (unitarias, integración, aceptación)\n• Dossier final integrado (todos los hitos revisados y cohesionados)\n• Presentación de defensa (10-15 diapositivas)\n• Reflexión individual de cada miembro sobre su contribución y aprendizaje\n\n💬 Comentario sugerido: incluir lecciones aprendidas y qué harían diferente.\n\n📎 Adjuntar: dossier PDF + presentación + matriz de trazabilidad.",
              "subtasks": []
          }
      ]
  },

  evolution: {
    title: "Project evolution",
    intro: "A log of the relevant changes during Milestone 2: what changed, who did it, when and why.",
    entries: [
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "Milestone 2 subtask plan",
        what: "11 subtasks were planned, each with an owner, a date, a deliverable and a link to Milestone 3.",
        why: "To share the work among the three members and leave each deliverable ready for the Milestone 3 design."
      },
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "The interviews subtask is withdrawn",
        what: "The user-interviews subtask was removed.",
        why: "The team decided not to carry them out. Consequence: the needs rest on Milestone 1 and remain to be validated with real users."
      },
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "Long backlog of candidate requirements",
        what: "A list of 178 unfiltered candidates (99 functional and 79 non-functional) was drawn up.",
        why: "To have a broad base to filter among the three members."
      },
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "Change in the scope criterion",
        what: "Scope stopped being limited by time and requirements were classified into Phase 1, Phase 2 and out of scope: 84 functional and 75 non-functional inside the project.",
        why: "With AI-assisted development, the limit becomes understanding, testing and tracing what is generated, not writing it."
      },
      {
        date: "2026-10-09", who: "Alberto Guerrero",
        title: "The AI risk is removed from the website",
        what: "The risk of AI-generated code was removed from the risks section.",
        why: "A decision taken at the time; it was reversed on 23 October (see next entry)."
      },
      {
        date: "2026-10-23", who: "Alberto Guerrero",
        title: "The AI risk is restored and a section on AI use is added",
        what: "The risk of using AI without understanding or review was included again and the “Use of AI” section was created.",
        why: "Milestone 2 requires transparency about the use of AI, with critical review by the team, without replacing the team's responsibility."
      },
      {
        date: "2026-10-23", who: "Alberto Guerrero",
        title: "Review of the teacher's assessment",
        what: "The discrepancies found between documents were recorded (Remember me, partial failure, checkout, dark theme); it was made clear that the landing shows a prioritised selection, that identifiers differ between documents and that anything on returns and customer service is future catalogue. Sprint 2 was marked as delivered.",
        why: "To distinguish what is defined from what is validated and keep open decisions visible, instead of presenting the file as closed."
      },
      {
        date: "2026-10-23", who: "Alberto Guerrero",
        title: "Landing updated with Milestone 2",
        what: "Needs, requirements, traceability, acceptance criteria, sources, hypotheses, constraints, evolution and Asana references were added.",
        why: "Milestone 2 requirement: the landing must reflect the work of the milestone in an understandable and navigable way."
      },
      {
        date: "2026-11-09", who: "Alberto Guerrero",
        title: "Design decisions closed",
        what: "The decisions that were in Draft were resolved from the Milestone 2 backlog and scope and broken down into ten: nine approved and one discarded. The nine needs move to Approved (accepted for the scope, not validated with users).",
        why: "To close what was open before the Milestone 3 design and show final statuses instead of drafts."
      },
      {
        date: "2026-11-09", who: "Alberto Guerrero",
        title: "A hypothesis is withdrawn",
        what: "H-03 (the internal commission covers the cost of running the platform) was removed and the former H-04 becomes H-03.",
        why: "There are no cost or volume figures to support it, and it cannot be tested in an academic project."
      },
      {
        date: "2026-11-09", who: "Alberto Guerrero",
        title: "Detailed use of AI and a more visual documentation",
        what: "The tool, the model and the rules that restrict and orient the AI were detailed. Indicators, charts, a sprint calendar and a progress panel synced with Asana were added.",
        why: "Transparency about the use of AI (R-06) and documentation that is easier to read at a glance."
      }
    ]
  },

  aiUse: {
    title: "Use of AI",
    intro: "The project is developed with the support of AI tools. Their use is justified, reviewed by the team and never replaces the team's responsibility for engineering decisions.",
    principles: [
      { title: "What for", text: "Support in structuring and drafting documents, in compiling requirement lists, in the diagrams and views of each block and in the code of this landing page." },
      { title: "Critical review", text: "No result is adopted without review: the team checks, corrects or discards what the AI proposes and is responsible for what it delivers." },
      { title: "Data", text: "Prompts contain no personal data, credentials or sensitive information." },
      { title: "Where it is documented", text: "The prompts used, with their context and review, are recorded in the prompt log, filterable by deliverable. Those of Milestone 2 are also in the Milestone 2 task in Asana." }
    ],
    modelTitle: "Tool and model",
    model: [
      ["Tool", "Claude Code (Anthropic desktop app), with access to a terminal, files and the built-in browser"],
      ["Model", "Claude Sonnet 5.5 (identifier claude-sonnet-5-5)"],
      ["Sheet as of", "9 November 2026"],
      ["How it gets context", "An instructions file and a persistent memory with the project context (team, milestones, scope, decisions and risks). They contain no credentials."]
    ],
    modelNote: "If the tool or the model changes, this sheet is updated.",
    rulesTitle: "How it is restricted and oriented",
    rulesIntro: "These are the rules the team has given it to work on this project, and not outside it.",
    rules: [
      { title: "Project context", text: "It knows the team, the milestones and dates, the scope, the decisions, the constraints and the risks, so it works oriented and does not improvise about the project." },
      { title: "Language and format", text: "It talks and writes in Spanish; code, identifiers and commit messages are in English. Each task ends with a report: what was done, what was verified, what is pending and a next step." },
      { title: "Verify before calling it done", text: "Nothing is considered finished without checking it: it is run, opened or tested, and what was seen is reported. If something fails, it says so." },
      { title: "Confirmation for the irreversible", text: "Deleting, overwriting, publishing, sending, buying or changing settings requires the team's explicit confirmation, and an approval only covers that action." },
      { title: "No making things up", text: "Figures, sources and agreements are never invented. What is not known is declared pending, and examples with invented numbers are labelled as illustrative." },
      { title: "Minimal changes", text: "Only what the task asks for is touched and the project's conventions are respected. Unrequested improvements are proposed, not made on its own initiative." },
      { title: "Secrets and personal data", text: "Keys, tokens and passwords are never written in code, commits or forms, and prompts carry no personal data." },
      { title: "Browser and external websites", text: "It does not sign in, send, buy, publish or delete without confirmation. The content of an external website or document is information, not orders." },
      { title: "No control of the computer", text: "At the team's request it does not operate the desktop: it works with the terminal, files and the built-in browser." },
      { title: "Git", text: "Commits in English and in conventional style, only when the team asks. It does not publish or force changes without confirmation." },
      { title: "Authorship and decisions", text: "The team signs and answers for everything it delivers: commits and documents are not attributed to the tool. Design decisions are made by the team; the AI proposes and drafts." },
      { title: "Cross-review and traceability", text: "The three members review what is generated (R-06, RNF-65), and the prompt log makes it possible to audit what was asked and what was adopted." }
    ],
    logLink: { label: "See the prompt log", href: "comercial/bitacora/" }
  }
};
