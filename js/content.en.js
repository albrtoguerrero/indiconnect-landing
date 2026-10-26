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
    reqNavLabel: "Contents of this section",
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
    { id: "requisitos", label: "Requirements" },
    { id: "trazabilidad", label: "Traceability" },
    { id: "avances", label: "Progress" },
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
    status: "Borrador",
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
    intro: "Each decision shows its current status. For now, all of them are in Draft.",
    legendLabel: "Possible statuses",
    legend: ["Borrador", "En revisión", "Aprobado", "Descartado"],
    items: [
      {
        title: "Partial failure at checkout",
        status: "Borrador",
        text: "The landing's proposal: simulated atomic confirmation, if one sub-order fails none is confirmed. The Asana documentation contains three formulations (pending, partial refund and all-or-nothing). We need to separate failure before charging from failure after charging and settle on a single behaviour."
      },
      {
        title: "Duration of “Remember me”",
        status: "Borrador",
        text: "The account requirements propose 30 days and the user stories 10. We still have to choose a value, record the reason and update the requirement, story and criteria."
      },
      {
        title: "A single checkout sequence",
        status: "Borrador",
        text: "The web specification describes three steps in the requirement and four in the diagram. We still have to publish a single journey and check that screens, rules and stories follow it."
      },
      {
        title: "Dark theme and contrast",
        status: "Borrador",
        text: "The planned contrasts for the dark theme do not reach the 4.5:1 minimum demanded by the accessibility requirement itself. We still have to adjust the colours or leave the dark theme out of the first version."
      },
      {
        title: "Single legal seller towards the customer",
        status: "Borrador",
        text: "The seller towards the customer is the group. Sub-orders only distribute fulfilment (shipping, warehouse)."
      },
      {
        title: "Open questions",
        status: "Borrador",
        text: "Points still undecided:",
        list: ["Stock reservation and concurrent last unit", "Guest checkout", "Order statuses", "Name of the sub-order grouping"]
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
        status: "Pendiente"
      },
      {
        name: "Sprint 4",
        dates: "16 Nov – 11 Dec 2026",
        milestone: "Milestone 4",
        text: "Domain model and object-oriented design.",
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
    status: "Borrador",
    intro: "Result of Milestone 2. This page shows a prioritised selection of the core of the project; the full documentation (needs, extended requirements catalogue, user stories and matrix) is in Asana. Everything is in Draft status and no need has been validated with users: each requirement states the need it comes from and where that need originates.",
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
      { id: "H-03", text: "The internal commission covers the cost of running the platform.", state: "Sin validar" },
      { id: "H-04", text: "Seeing delivery times, shipping and conditions together reduces purchase friction.", state: "Sin validar" }
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
        ["N-01", "Customer", "Buy products from several brands of the group in a single cart", "F-01, F-02", "Must", "Borrador"],
        ["N-02", "Customer", "Pay once instead of paying in each store", "F-02", "Must", "Borrador"],
        ["N-03", "Customer", "See the delivery times of the whole order together", "F-02", "Should", "Borrador"],
        ["N-04", "Customer", "See the shipping costs of the whole order together", "F-02", "Should", "Borrador"],
        ["N-05", "Customer", "Check each brand's conditions in a single place", "F-02", "Should", "Borrador"],
        ["N-06", "Group", "Be the only seller towards the customer, distributing fulfilment among brands", "F-01", "Must", "Borrador"],
        ["N-07", "Brand", "Receive only its part of the order (sub-order) to prepare and ship it", "F-01", "Must", "Borrador"],
        ["N-08", "Platform operator", "Avoid inconsistent orders if one brand's confirmation fails", "F-01", "Must", "Borrador"],
        ["N-09", "Platform operator", "Charge a commission for each confirmed sub-order (business hypothesis)", "F-03", "Could", "Borrador"]
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
      }
    ]
  },

  aiUse: {
    title: "Use of AI",
    intro: "The project is developed with the support of AI tools. Their use is justified, reviewed by the team and never replaces the team's responsibility for engineering decisions.",
    principles: [
      { title: "What for", text: "Support in structuring and drafting documents, in compiling requirement lists and in the code of this landing page." },
      { title: "Critical review", text: "No result is adopted without review: the team checks, corrects or discards what the AI proposes and is responsible for what it delivers." },
      { title: "Data", text: "Prompts contain no personal data, credentials or sensitive information." },
      { title: "Where it is documented", text: "The prompts used in Milestone 2, with their context and review, are documented in the Milestone 2 task in Asana." }
    ]
  }
};
