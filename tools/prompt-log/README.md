# Bitácora de prompts: guía para el equipo

Cada autor registra sus prompts y las instrucciones que se emiten para resolver cada tarea. La web
([comercial/bitacora](../../comercial/bitacora/)) los muestra juntos y se pueden filtrar por autor y por entregable
(requisitos funcionales, riesgos, historias de usuario…).

Cada persona escribe **solo su archivo** `comercial/bitacora/data/<autor>.json`, así que no hay conflictos de git.

## Instalación (una vez, 3 minutos)

Requisitos: Python 3 y el repositorio clonado.

1. Crea `~/.indiconnect-log.json` (en tu carpeta de usuario, **fuera del repo**):

   ```json
   { "author": "lucia", "name": "Lucía Guerra" }
   ```

   `author` va en minúsculas, sin espacios (`lucia`, `mikel`). Si trabajas fuera de la carpeta del repo, añade
   `"paths": ["parte-de-tu-ruta"]`.

2. Añade estos dos hooks a `~/.claude/settings.json` (cambia la ruta por la de tu clon):

   ```json
   {
     "hooks": {
       "UserPromptSubmit": [{ "hooks": [{ "type": "command", "timeout": 10,
         "command": "python -I RUTA/AL/REPO/tools/prompt-log/prompt_log.py hook" }] }],
       "PostToolUse": [{ "hooks": [{ "type": "command", "timeout": 10,
         "command": "python -I RUTA/AL/REPO/tools/prompt-log/prompt_log.py action" }] }]
     }
   }
   ```

3. Comprueba: `python tools/prompt-log/prompt_log.py status`

## Uso diario

| Quiero… | Comando |
|---|---|
| Ver los entregables disponibles | `python tools/prompt-log/prompt_log.py topics` |
| Decir en qué entregable trabajo ahora | `python tools/prompt-log/prompt_log.py topic rf` |
| Dejar de etiquetar | `python tools/prompt-log/prompt_log.py topic --clear` |
| Etiquetar un solo prompt al escribirlo | empieza el prompt con `[rf]` o `[rf,hu]` |
| Listar lo que aún no está publicado | `python tools/prompt-log/prompt_log.py list pending` |
| Etiquetar y publicar uno a posteriori | `python tools/prompt-log/prompt_log.py tag 12 rf` |
| Ocultar uno de la web | `python tools/prompt-log/prompt_log.py hide 12` |
| Recuperar lo trabajado antes de instalar | `python tools/prompt-log/prompt_log.py import` |

## Qué se publica y qué no

- Solo se publican los prompts **de trabajo**: los que llevan entregable (con `topic …` activo, con `[etiqueta]` o con
  `tag`). Peticiones como «sí, hazlo», «pásame el enlace» o dudas sueltas quedan **ocultas**.
- Las instrucciones emitidas durante un prompt oculto se atribuyen a la última tarea publicada anterior.
- Todo se guarda en un almacén **privado** (`~/.indiconnect-log-<autor>.json`). El archivo del repo se regenera solo con
  lo publicado, y al guardar se eliminan correos y claves y se acorta la ruta de usuario a `~`.

## Publicar tu parte

```
git add comercial/bitacora/data/<autor>.json comercial/bitacora/data/index.json
git commit -m "docs: update <autor> prompt log"
git pull --rebase && git push
```

`index.json` lo regenera cada persona al guardar; si hay conflicto, basta con ejecutar `status` y volver a guardarlo.
