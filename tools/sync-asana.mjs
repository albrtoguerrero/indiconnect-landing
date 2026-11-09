// Sincroniza el avance de Asana con data/asana.json (lo lee la sección Avances).
//
// Uso:   ASANA_TOKEN=<token personal> node tools/sync-asana.mjs
// Opcional: ASANA_PROJECT_GID (por defecto, el proyecto grupal de Scrum).
//
// Solo se publican recuentos por sprint: nunca nombres de tarea, personas ni enlaces.
// El token no se escribe en ningún fichero; se lee del entorno (en GitHub, de un secret).

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TOKEN = process.env.ASANA_TOKEN;
const PROJECT = process.env.ASANA_PROJECT_GID || "1218940853525794";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "asana.json");

if (!TOKEN) {
  console.error("Falta ASANA_TOKEN en el entorno. No se ha cambiado nada.");
  process.exit(1);
}

async function api(path) {
  const res = await fetch("https://app.asana.com/api/1.0" + path, {
    headers: { Authorization: "Bearer " + TOKEN, Accept: "application/json" }
  });
  if (!res.ok) { throw new Error("Asana respondió " + res.status + " en " + path.split("?")[0]); }
  return res.json();
}

async function allTasks() {
  const fields = "completed,memberships.section.name,memberships.project.gid";
  let url = "/projects/" + PROJECT + "/tasks?limit=100&opt_fields=" + fields;
  const tasks = [];
  while (url) {
    const page = await api(url);
    tasks.push(...page.data);
    url = page.next_page ? "/projects/" + PROJECT + "/tasks?limit=100&opt_fields=" + fields + "&offset=" + encodeURIComponent(page.next_page.offset) : null;
  }
  return tasks;
}

const project = (await api("/projects/" + PROJECT + "?opt_fields=name")).data;
const sections = (await api("/projects/" + PROJECT + "/sections?opt_fields=name")).data;
const tasks = await allTasks();

const buckets = new Map();
sections.forEach((s) => buckets.set(s.name, { name: s.name, total: 0, done: 0 }));
tasks.forEach((t) => {
  const m = (t.memberships || []).find((x) => x.project && x.project.gid === PROJECT);
  const name = m && m.section ? m.section.name : "Sin sección";
  if (!buckets.has(name)) { buckets.set(name, { name, total: 0, done: 0 }); }
  const b = buckets.get(name);
  b.total += 1;
  if (t.completed) { b.done += 1; }
});

const rows = [...buckets.values()].filter((b) => b.total > 0).map((b) => {
  const sprint = /Sprint\s*(\d)/i.exec(b.name);
  return { key: sprint ? "sprint-" + sprint[1] : (/landing/i.test(b.name) ? "landing" : "otros"), total: b.total, done: b.done };
});

const out = {
  source: "asana",
  project: project.name,
  syncedAt: new Date().toISOString(),
  total: rows.reduce((a, r) => a + r.total, 0),
  done: rows.reduce((a, r) => a + r.done, 0),
  sections: rows
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log("Sincronizado:", out.done + "/" + out.total, "tareas completadas.");
