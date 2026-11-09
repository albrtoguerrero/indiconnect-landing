/* Generado a partir de hito2-backlog-requisitos.md y hito2-backlog-candidatos.md.
 * No editar a mano: 84 RF y 75 RNF dentro del alcance (36 y 41 en la Fase 1) y 19 fuera. */
window.REQ_ALL = {
 "groups": [
  {
   "id": "A1",
   "kind": "rf",
   "es": "Catálogo y navegación",
   "en": "Catalogue and navigation",
   "items": [
    [
     "RF-01",
     "El sistema muestra un catálogo unificado con productos de todas las marcas del grupo",
     1
    ],
    [
     "RF-02",
     "Cada producto indica a qué marca pertenece",
     1
    ],
    [
     "RF-03",
     "Se puede filtrar el catálogo por marca",
     1
    ],
    [
     "RF-04",
     "Se puede filtrar por categoría (prendas, calzado, accesorios…)",
     2
    ],
    [
     "RF-05",
     "Se puede filtrar por talla",
     2
    ],
    [
     "RF-06",
     "Se puede filtrar por color",
     2
    ],
    [
     "RF-07",
     "Se puede filtrar por rango de precio",
     2
    ],
    [
     "RF-08",
     "Se puede buscar por texto",
     2
    ],
    [
     "RF-09",
     "Se puede ordenar por precio, novedad o nombre",
     2
    ],
    [
     "RF-10",
     "Existe una ficha de producto con descripción, imágenes sintéticas, precio y tallas",
     1
    ],
    [
     "RF-11",
     "La ficha muestra la disponibilidad por talla",
     2
    ],
    [
     "RF-12",
     "La ficha muestra el plazo de entrega estimado de la marca",
     2
    ],
    [
     "RF-13",
     "El catálogo se pagina o carga por bloques",
     2
    ],
    [
     "RF-14",
     "Se pueden marcar productos como favoritos",
     2
    ],
    [
     "RF-15",
     "Se muestran productos relacionados de otras marcas del grupo (demanda cruzada)",
     2
    ],
    [
     "RF-16",
     "Existe una página de inicio con marcas y destacados",
     2
    ],
    [
     "RF-17",
     "Existe una página por marca con su identidad sintética y su catálogo",
     2
    ],
    [
     "RF-18",
     "Se muestran las condiciones de cada marca (envío, devolución) en la ficha",
     2
    ]
   ]
  },
  {
   "id": "A2",
   "kind": "rf",
   "es": "Carrito unificado",
   "en": "Unified cart",
   "items": [
    [
     "RF-19",
     "El cliente puede añadir productos de varias marcas a un único carrito",
     1
    ],
    [
     "RF-20",
     "El carrito agrupa visualmente los artículos por marca",
     1
    ],
    [
     "RF-21",
     "El cliente puede modificar la cantidad de un artículo",
     1
    ],
    [
     "RF-22",
     "El cliente puede eliminar un artículo",
     1
    ],
    [
     "RF-23",
     "El carrito muestra subtotal por marca y total general",
     1
    ],
    [
     "RF-24",
     "El carrito conserva su contenido entre visitas",
     2
    ],
    [
     "RF-25",
     "El carrito conserva su contenido tras iniciar sesión",
     2
    ],
    [
     "RF-26",
     "El carrito avisa si un artículo deja de estar disponible",
     2
    ],
    [
     "RF-27",
     "El carrito avisa de cambios de precio",
     2
    ],
    [
     "RF-28",
     "El carrito muestra los plazos de entrega de cada marca",
     1
    ],
    [
     "RF-29",
     "El carrito muestra los costes de envío por marca y el total",
     1
    ],
    [
     "RF-30",
     "El carrito muestra de forma conjunta las condiciones de todas las marcas",
     1
    ],
    [
     "RF-31",
     "El cliente puede vaciar el carrito",
     1
    ],
    [
     "RF-32",
     "El carrito muestra el número de artículos en la cabecera",
     1
    ],
    [
     "RF-33",
     "Se puede mover un artículo del carrito a favoritos",
     2
    ]
   ]
  },
  {
   "id": "A3",
   "kind": "rf",
   "es": "Checkout y pago simulado",
   "en": "Checkout and simulated payment",
   "items": [
    [
     "RF-36",
     "El cliente inicia un único checkout para todo el carrito",
     1
    ],
    [
     "RF-37",
     "El cliente introduce datos de contacto sintéticos",
     1
    ],
    [
     "RF-38",
     "El cliente introduce una dirección de entrega sintética",
     1
    ],
    [
     "RF-39",
     "El cliente elige el método de envío por marca",
     2
    ],
    [
     "RF-40",
     "El cliente revisa un resumen del pedido antes de pagar",
     1
    ],
    [
     "RF-41",
     "El pago es simulado, con resultado de éxito o fallo",
     1
    ],
    [
     "RF-42",
     "El cliente puede forzar un fallo de pago simulado para pruebas",
     1
    ],
    [
     "RF-43",
     "El cliente acepta las condiciones de compra",
     2
    ],
    [
     "RF-44",
     "Se muestra el vendedor legal (el grupo) en el resumen",
     1
    ],
    [
     "RF-45",
     "Se muestra el desglose por marca en el resumen",
     1
    ],
    [
     "RF-46",
     "Se informa claramente de errores de validación en el formulario",
     1
    ],
    [
     "RF-47",
     "El checkout puede hacerse como invitado",
     2
    ],
    [
     "RF-48",
     "Se guardan direcciones para futuras compras",
     2
    ]
   ]
  },
  {
   "id": "A4",
   "kind": "rf",
   "es": "Pedido y subpedidos",
   "en": "Order and sub-orders",
   "items": [
    [
     "RF-51",
     "Al pagar se crea un único pedido del cliente",
     1
    ],
    [
     "RF-52",
     "El pedido se divide automáticamente en un subpedido por marca",
     1
    ],
    [
     "RF-53",
     "Cada subpedido contiene solo artículos de su marca",
     1
    ],
    [
     "RF-54",
     "Cada subpedido tiene su importe, su estado y su identificador",
     1
    ],
    [
     "RF-55",
     "El pedido y los subpedidos conservan la relación entre sí",
     1
    ],
    [
     "RF-56",
     "El importe del pedido es la suma de los subpedidos",
     1
    ],
    [
     "RF-57",
     "La confirmación es atómica: si falla un subpedido, no se confirma ninguno",
     1
    ],
    [
     "RF-58",
     "Si el pago falla, no se crea ningún pedido",
     1
    ],
    [
     "RF-59",
     "El pedido tiene un estado global derivado de los subpedidos",
     2
    ],
    [
     "RF-60",
     "Los subpedidos tienen estados propios (p. ej. pendiente, preparado, enviado)",
     2
    ],
    [
     "RF-61",
     "Se reserva el stock al confirmar el pedido",
     2
    ],
    [
     "RF-62",
     "Se libera el stock reservado si el pedido falla",
     2
    ],
    [
     "RF-63",
     "Se calcula la comisión de la plataforma por subpedido confirmado",
     2
    ],
    [
     "RF-64",
     "Se genera un número de pedido legible para el cliente",
     1
    ],
    [
     "RF-65",
     "El cliente recibe una confirmación en pantalla con el desglose por marca",
     1
    ],
    [
     "RF-67",
     "El cliente puede cancelar un pedido antes de su preparación",
     2
    ],
    [
     "RF-68",
     "El cliente puede cancelar un subpedido concreto",
     2
    ]
   ]
  },
  {
   "id": "A5",
   "kind": "rf",
   "es": "Seguimiento y cuenta del cliente",
   "en": "Tracking and customer account",
   "items": [
    [
     "RF-71",
     "El cliente puede consultar sus pedidos",
     2
    ],
    [
     "RF-72",
     "El cliente puede ver el detalle de cada subpedido y su estado",
     2
    ],
    [
     "RF-73",
     "El cliente puede registrarse con datos sintéticos",
     2
    ],
    [
     "RF-74",
     "El cliente puede iniciar y cerrar sesión",
     2
    ],
    [
     "RF-75",
     "El cliente puede editar su perfil",
     2
    ],
    [
     "RF-76",
     "El cliente puede recuperar su contraseña (simulado)",
     2
    ]
   ]
  },
  {
   "id": "A6",
   "kind": "rf",
   "es": "Marcas y operación del grupo",
   "en": "Brands and group operations",
   "items": [
    [
     "RF-80",
     "Una marca puede consultar sus subpedidos",
     2
    ],
    [
     "RF-81",
     "Una marca puede cambiar el estado de un subpedido",
     2
    ],
    [
     "RF-82",
     "Una marca puede gestionar su catálogo sintético",
     2
    ],
    [
     "RF-83",
     "Una marca puede gestionar su stock",
     2
    ],
    [
     "RF-84",
     "El operador del grupo puede alta/baja de marcas",
     2
    ],
    [
     "RF-85",
     "El operador del grupo puede configurar la comisión por marca",
     2
    ],
    [
     "RF-86",
     "El operador consulta los pedidos y subpedidos",
     2
    ],
    [
     "RF-87",
     "El operador consulta la comisión acumulada por marca",
     2
    ],
    [
     "RF-88",
     "El operador visualiza un resumen de ventas por marca",
     2
    ],
    [
     "RF-89",
     "El operador consulta pedidos con fallos de confirmación",
     2
    ],
    [
     "RF-90",
     "Existen roles diferenciados (cliente, marca, operador)",
     2
    ],
    [
     "RF-91",
     "Se registra un historial de cambios de estado",
     2
    ]
   ]
  },
  {
   "id": "A7",
   "kind": "rf",
   "es": "Datos y soporte",
   "en": "Data and support",
   "items": [
    [
     "RF-92",
     "Existe un conjunto de datos sintéticos de marcas, productos y stock",
     1
    ],
    [
     "RF-93",
     "Se puede reiniciar la base de datos a su estado inicial",
     1
    ],
    [
     "RF-95",
     "Se exponen endpoints internos para carrito, pedido y subpedidos",
     1
    ]
   ]
  },
  {
   "id": "B1",
   "kind": "rnf",
   "es": "Rendimiento",
   "en": "Performance",
   "items": [
    [
     "RNF-01",
     "El catálogo carga en un tiempo máximo (UPD) con datos de demo",
     1
    ],
    [
     "RNF-02",
     "El añadido al carrito responde en un tiempo máximo (UPD)",
     1
    ],
    [
     "RNF-03",
     "El checkout completo responde en un tiempo máximo (UPD)",
     1
    ],
    [
     "RNF-04",
     "La creación de pedido con subpedidos termina en un tiempo máximo (UPD)",
     1
    ],
    [
     "RNF-06",
     "Las consultas del catálogo usan índices adecuados",
     2
    ],
    [
     "RNF-07",
     "El tamaño de las páginas se mantiene bajo un límite (UPD)",
     2
    ],
    [
     "RNF-08",
     "Las imágenes sintéticas están optimizadas",
     2
    ]
   ]
  },
  {
   "id": "B2",
   "kind": "rnf",
   "es": "Fiabilidad y consistencia de datos",
   "en": "Reliability and data consistency",
   "items": [
    [
     "RNF-09",
     "La creación de pedido y subpedidos es transaccional (todo o nada)",
     1
    ],
    [
     "RNF-10",
     "No se admiten pedidos duplicados por doble envío del formulario",
     1
    ],
    [
     "RNF-11",
     "El total del pedido coincide siempre con la suma de sus subpedidos",
     1
    ],
    [
     "RNF-12",
     "Ante un error, el sistema deja los datos en un estado consistente",
     1
    ],
    [
     "RNF-13",
     "El sistema no pierde el carrito por un fallo temporal",
     2
    ],
    [
     "RNF-14",
     "Las operaciones críticas son idempotentes",
     2
    ],
    [
     "RNF-16",
     "Los errores se muestran al usuario con mensajes comprensibles",
     1
    ],
    [
     "RNF-17",
     "El sistema se recupera tras un reinicio sin perder pedidos confirmados",
     2
    ]
   ]
  },
  {
   "id": "B3",
   "kind": "rnf",
   "es": "Seguridad",
   "en": "Security",
   "items": [
    [
     "RNF-18",
     "Las contraseñas se almacenan con hash seguro",
     2
    ],
    [
     "RNF-19",
     "Las comunicaciones usan HTTPS en despliegue",
     2
    ],
    [
     "RNF-20",
     "Se validan y sanean todas las entradas del usuario",
     1
    ],
    [
     "RNF-21",
     "Se previene la inyección SQL (consultas parametrizadas)",
     1
    ],
    [
     "RNF-22",
     "Se previene XSS en la salida de datos",
     1
    ],
    [
     "RNF-23",
     "Se protege contra CSRF en las operaciones que modifican datos",
     2
    ],
    [
     "RNF-24",
     "Control de acceso por rol a funciones de marca y operador",
     2
    ],
    [
     "RNF-25",
     "Las sesiones caducan y se invalidan al cerrar sesión",
     2
    ],
    [
     "RNF-26",
     "Límite de intentos de acceso",
     2
    ],
    [
     "RNF-27",
     "Los secretos no están en el repositorio (variables de entorno)",
     1
    ],
    [
     "RNF-28",
     "Las dependencias se revisan por vulnerabilidades conocidas",
     2
    ],
    [
     "RNF-29",
     "El sistema no almacena datos reales de tarjeta",
     1
    ],
    [
     "RNF-30",
     "Los registros no contienen datos sensibles",
     2
    ]
   ]
  },
  {
   "id": "B4",
   "kind": "rnf",
   "es": "Privacidad y legal",
   "en": "Privacy and legal",
   "items": [
    [
     "RNF-31",
     "Solo se usan datos personales sintéticos",
     1
    ],
    [
     "RNF-32",
     "El aviso de proyecto académico ficticio es visible en la aplicación",
     1
    ],
    [
     "RNF-33",
     "No se usan marcas, logos ni imágenes de empresas reales",
     1
    ],
    [
     "RNF-34",
     "Se informa de qué datos se tratan (aviso de privacidad de demo)",
     2
    ],
    [
     "RNF-35",
     "Se cumplen principios de RGPD de minimización y supresión",
     2
    ],
    [
     "RNF-36",
     "No se incluyen trackers ni analítica de terceros",
     1
    ]
   ]
  },
  {
   "id": "B5",
   "kind": "rnf",
   "es": "Usabilidad y accesibilidad",
   "en": "Usability and accessibility",
   "items": [
    [
     "RNF-37",
     "El diseño es responsive (móvil y escritorio)",
     1
    ],
    [
     "RNF-38",
     "Se cumplen criterios WCAG 2.1 nivel AA (UPD alcance)",
     2
    ],
    [
     "RNF-39",
     "Toda la interfaz es utilizable solo con teclado",
     2
    ],
    [
     "RNF-40",
     "Contraste suficiente de texto y controles",
     1
    ],
    [
     "RNF-41",
     "Las imágenes tienen texto alternativo",
     1
    ],
    [
     "RNF-42",
     "Los formularios tienen etiquetas y mensajes de error asociados",
     1
    ],
    [
     "RNF-43",
     "Se respetan las preferencias de movimiento reducido",
     2
    ],
    [
     "RNF-44",
     "Modo claro y oscuro",
     2
    ],
    [
     "RNF-45",
     "El flujo de compra se completa en un número máximo de pasos (UPD)",
     1
    ],
    [
     "RNF-46",
     "La interfaz está en español",
     1
    ],
    [
     "RNF-47",
     "La interfaz es consistente entre marcas",
     1
    ],
    [
     "RNF-48",
     "Se muestra el estado del sistema (cargando, éxito, error)",
     1
    ]
   ]
  },
  {
   "id": "B6",
   "kind": "rnf",
   "es": "Compatibilidad y portabilidad",
   "en": "Compatibility and portability",
   "items": [
    [
     "RNF-49",
     "Funciona en las últimas versiones de los navegadores principales",
     1
    ],
    [
     "RNF-50",
     "Funciona en pantallas desde 360 px de ancho",
     1
    ],
    [
     "RNF-51",
     "Se ejecuta en Windows, macOS y Linux",
     2
    ],
    [
     "RNF-52",
     "Se despliega con una configuración reproducible (p. ej. contenedor)",
     2
    ],
    [
     "RNF-53",
     "Puede ejecutarse en local con pocos pasos documentados",
     1
    ]
   ]
  },
  {
   "id": "B7",
   "kind": "rnf",
   "es": "Mantenibilidad y calidad",
   "en": "Maintainability and quality",
   "items": [
    [
     "RNF-54",
     "Arquitectura de monolito modular con módulos acoplados débilmente",
     1
    ],
    [
     "RNF-55",
     "Módulos separados para catálogo, carrito, pedidos y subpedidos",
     1
    ],
    [
     "RNF-56",
     "Convenciones de código y linter comunes",
     2
    ],
    [
     "RNF-57",
     "Cobertura de pruebas mínima en el núcleo (UPD)",
     2
    ],
    [
     "RNF-58",
     "Pruebas automáticas del flujo carrito → pedido → subpedidos",
     1
    ],
    [
     "RNF-59",
     "Pruebas del escenario de fallo atómico",
     1
    ],
    [
     "RNF-60",
     "El código y el modelo están documentados",
     1
    ],
    [
     "RNF-61",
     "Control de versiones con historial trazable",
     1
    ],
    [
     "RNF-62",
     "La base de datos se gestiona con migraciones",
     2
    ],
    [
     "RNF-63",
     "La configuración se separa del código",
     1
    ],
    [
     "RNF-64",
     "Trazabilidad entre necesidad, requisito, diseño y prueba",
     1
    ],
    [
     "RNF-65",
     "Todo el código del equipo ha sido revisado y comprendido por sus miembros",
     1
    ]
   ]
  },
  {
   "id": "B8",
   "kind": "rnf",
   "es": "Operación y observabilidad",
   "en": "Operations and observability",
   "items": [
    [
     "RNF-66",
     "El sistema registra eventos relevantes (pedido creado, fallo)",
     2
    ],
    [
     "RNF-67",
     "Los fallos de confirmación son diagnosticables a partir de los registros",
     2
    ],
    [
     "RNF-68",
     "Hay un endpoint de comprobación de salud",
     2
    ],
    [
     "RNF-69",
     "Los registros tienen niveles y marca de tiempo",
     2
    ]
   ]
  },
  {
   "id": "B9",
   "kind": "rnf",
   "es": "Escalabilidad y evolución",
   "en": "Scalability and evolution",
   "items": [
    [
     "RNF-71",
     "Es posible añadir una marca nueva sin cambiar el código del núcleo",
     2
    ],
    [
     "RNF-72",
     "El modelo de datos admite más marcas (UPD) sin rediseño",
     2
    ],
    [
     "RNF-74",
     "La comisión es configurable sin modificar el código",
     2
    ]
   ]
  },
  {
   "id": "B10",
   "kind": "rnf",
   "es": "Datos",
   "en": "Data",
   "items": [
    [
     "RNF-75",
     "Los datos de demo son reproducibles (semilla)",
     1
    ],
    [
     "RNF-76",
     "Los importes usan tipos exactos (sin errores de redondeo)",
     1
    ],
    [
     "RNF-77",
     "Las fechas y zonas horarias se tratan de forma uniforme",
     2
    ],
    [
     "RNF-78",
     "Los datos tienen integridad referencial en la base de datos",
     1
    ],
    [
     "RNF-79",
     "Las operaciones críticas quedan auditadas",
     2
    ]
   ]
  }
 ],
 "out": {
  "rf": [
   [
    "RF-34",
    "Se puede aplicar un código promocional",
    "x"
   ],
   [
    "RF-35",
    "Se aplican promociones complejas (2x1, descuentos por volumen)",
    "x"
   ],
   [
    "RF-49",
    "Se admiten datos reales de tarjeta",
    "x"
   ],
   [
    "RF-50",
    "Se integra una pasarela de pago real",
    "x"
   ],
   [
    "RF-66",
    "Se envía un correo de confirmación simulado",
    "p"
   ],
   [
    "RF-69",
    "Se gestionan devoluciones",
    "x"
   ],
   [
    "RF-70",
    "Se gestionan envíos reales con transportista",
    "x"
   ],
   [
    "RF-77",
    "El cliente puede eliminar su cuenta",
    "p"
   ],
   [
    "RF-78",
    "El cliente puede contactar con atención al cliente",
    "x"
   ],
   [
    "RF-79",
    "El cliente puede consultar su historial de comisiones o puntos",
    "x"
   ],
   [
    "RF-94",
    "Se importa un catálogo desde fichero",
    "p"
   ],
   [
    "RF-96",
    "Se exporta un pedido en formato legible (PDF o similar)",
    "p"
   ],
   [
    "RF-97",
    "Se integra con tiendas reales de las marcas",
    "x"
   ],
   [
    "RF-98",
    "Se importan datos de tiendas reales (scraping)",
    "x"
   ],
   [
    "RF-99",
    "Se almacenan datos personales reales de clientes",
    "x"
   ]
  ],
  "rnf": [
   [
    "RNF-05",
    "El sistema soporta un número de usuarios simultáneos (UPD) en la demo",
    "p"
   ],
   [
    "RNF-15",
    "Se hacen copias de seguridad de la base de datos",
    "p"
   ],
   [
    "RNF-70",
    "Existe una guía de resolución de problemas",
    "p"
   ],
   [
    "RNF-73",
    "Los módulos pueden extraerse a servicios en el futuro",
    "p"
   ]
  ]
 }
};
