# Landing del proyecto (provisional: «IndiConnect»)

Landing documental y comercial de un proyecto universitario de Ingeniería del Software: un agregador de marcas de un grupo textil **ficticio**, con carrito unificado y subpedidos por marca.

> Proyecto académico ficticio, sin vinculación con Inditex ni con ninguna otra empresa o marca real.

Sitio estático: HTML + CSS + JavaScript, sin framework, sin dependencias, sin trackers, sin analítica y sin recursos de terceros.

## Estructura

```
index.html          Esqueleto semántico (cabecera, <main> con secciones vacías, pie)
css/styles.css      Tokens de color, tema claro/oscuro, diseño responsive
js/content.js       TODO el contenido (textos, estados, fechas, equipo, nombre de marca)
js/app.js           Lee content.js y construye el HTML; alterna el tema
assets/favicon.svg  Icono propio en SVG
.nojekyll           Evita que GitHub Pages procese el sitio con Jekyll
```

## Ejecutarla en local

Opción A: abrir `index.html` con doble clic. Funciona porque el contenido es un `.js` y no se usa `fetch`.

Opción B (servidor local, recomendable para probar como en producción), desde esta carpeta:

```bash
python -m http.server 8000
```

y abrir <http://localhost:8000>.

## Actualizar el contenido (al cierre de cada sprint)

Edita **solo** `js/content.js`:

| Qué cambiar | Dónde |
|---|---|
| Nombre del grupo/plataforma | `var BRAND_NAME` (primera línea de código del archivo) |
| Estado de un hito | `progress.sprints[n].status`: `"Pendiente"`, `"En curso"` o `"Entregado"` |
| Estado de una decisión | `decisions.items[n].status`: `"Borrador"`, `"En revisión"`, `"Aprobado"` o `"Descartado"` |
| Fecha de última actualización | `lastUpdated` (formato `AAAA-MM-DD`) |
| Nombres y roles del equipo | `team.members` |
| Nuevas decisiones, riesgos, etc. | Añade un objeto a la lista correspondiente |

Los colores de estado se asignan solos a partir del texto del estado. Si inventas un estado nuevo, hay que añadirle su clase `.badge--<estado>` en `css/styles.css`.

## Publicarla en GitHub Pages

1. Crea un repositorio en GitHub y sube el contenido de esta carpeta a la raíz (`index.html` debe quedar en la raíz).
2. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. Tras un minuto la página estará en `https://<usuario>.github.io/<repositorio>/`.

Todas las rutas son relativas (`css/...`, `js/...`), por lo que funciona en una subruta de Pages sin cambios.

## Decisiones técnicas (para defenderlas)

- **Sin framework.** Son pocas secciones y no hay estado de aplicación. Un framework añadiría una cadena de build y dependencias sin aportar nada. Con vanilla JS, GitHub Pages sirve los archivos tal cual.
- **`content.js` en lugar de `content.json`.** Un JSON se carga con `fetch`, y los navegadores bloquean `fetch` sobre `file://`. Con un `.js` que asigna `window.CONTENT`, la página funciona al abrirla con doble clic y en Pages.
- **El contenido se renderiza con JavaScript.** Así hay una única fuente de verdad y el diseño nunca se toca para actualizar avances. Coste asumido: sin JavaScript solo se ve un aviso (`<noscript>`). Es un compromiso aceptable para una landing académica; la alternativa (duplicar el texto en el HTML) rompería el requisito de separar contenido y marcado.
- **`textContent` en vez de `innerHTML`.** Todo texto se inserta como texto. Un `<` o un `&` en `content.js` no puede romper la página. Consecuencia: el contenido no admite HTML (negritas, enlaces) a propósito.
- **Diagrama SVG generado por JS y con CSS variables.** Sus etiquetas salen de `content.js` y sus colores de los mismos tokens que el resto del sitio, así que cambia con el tema. Es vertical y de 360 unidades de ancho para que el texto siga siendo legible en móvil (360 px). Lleva `<title>` y `<desc>` y, además, la lista numerada de pasos al lado como alternativa en texto.
- **Tema claro/oscuro.** Sin elección, sigue `prefers-color-scheme`. El botón fuerza un tema mediante `data-theme` en `<html>` y lo guarda en `localStorage` (con `try/catch`, porque puede estar bloqueado). Los tokens oscuros están duplicados (media query y `[data-theme="dark"]`): es la forma de permitir a la vez «seguir al sistema» y «forzar manualmente» solo con CSS.
- **El estado nunca se comunica solo con color.** Cada insignia lleva el texto del estado; el color es un refuerzo.
- **Accesibilidad.** Enlace «Saltar al contenido», `lang="es"`, un solo `h1`, secciones con `aria-labelledby`, foco visible, tabla con `caption` y `scope`, línea de tiempo como `<ol>` con `aria-current="step"` en el hito en curso, `prefers-reduced-motion` respetado. Los pares de color se han comprobado a contraste AA (≥ 4,5:1 en texto).
- **Fuentes del sistema** (`system-ui`): sin descargas, sin terceros, sin parpadeo de carga.
- **Navegación en una fila con scroll horizontal** en móvil, en lugar de menú hamburguesa: no requiere JavaScript adicional y los enlaces siguen siendo accesibles por teclado.
- **Los únicos números** que aparecen son los del ejemplo ilustrativo y la referencia externa de comisiones, y van etiquetados como tales. No hay métricas, clientes ni resultados.

## Marca y aviso legal

El nombre provisional es «IndiConnect» y vive en `BRAND_NAME`. Conviene valorar si «Indi» recuerda demasiado a una marca real (ver el aviso legal en el pie y en el hero, que son literales y no deben modificarse).
