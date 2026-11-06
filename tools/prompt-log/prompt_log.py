#!/usr/bin/env python3
"""Bitácora de prompts de IndiConnect.

Registra, con fecha y hora, (a) los prompts de cada autor y (b) las
instrucciones que el asistente emite para resolver cada tarea (órdenes,
ediciones, consultas), y las enlaza con el entregable al que sirven
(requisitos funcionales, riesgos, historias de usuario...).

Cada autor escribe SOLO su propio archivo comercial/bitacora/data/<autor>.json,
así que no hay conflictos de git entre compañeros.

Uso:
  prompt_log.py hook            (lo llama el hook UserPromptSubmit; payload por stdin)
  prompt_log.py action          (lo llama el hook PostToolUse; payload por stdin)
  prompt_log.py import          rellena el registro desde las sesiones guardadas en este equipo
  prompt_log.py topic rf hu     fija el/los entregables de los próximos prompts
  prompt_log.py topic --clear   quita el entregable activo
  prompt_log.py topics          lista los entregables disponibles
  prompt_log.py list [pending]  lista los prompts del almacén privado (nº, publicado o no, entregable)
  prompt_log.py tag 12 rf       etiqueta Y publica el prompt nº 12 (o por id)
  prompt_log.py publish 12 13   publica prompts ya etiquetados · hide 12  los oculta de la web
  prompt_log.py status          muestra autor, entregable activo y totales

Configuración personal (no se sube al repo): ~/.indiconnect-log.json
  {"author": "lucia", "name": "Lucía Guerra", "paths": [], "sessions": []}
"""
import glob
import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))                  # raíz del repo
DATA_DIR = os.path.join(ROOT, "comercial", "bitacora", "data")
TOPICS_FILE = os.path.join(ROOT, "comercial", "bitacora", "topics.json")
HOME = os.path.expanduser("~")
CONFIG_FILE = os.path.join(HOME, ".indiconnect-log.json")
STATE_FILE = os.path.join(HOME, ".indiconnect-log-topic.json")
PROJECTS = os.path.join(HOME, ".claude", "projects")

PREVIEW = 700      # caracteres guardados de un prompt
ACT_SHORT = 220    # caracteres guardados de una acción corriente
ACT_LONG = 700     # caracteres guardados del prompt a un subagente

SKIP_PREFIXES = (
    "The app was quit", "<system-reminder", "<ci-monitor-event", "<command-name>", "<local-command",
    "Caveat:", "[Request interrupted", "This session is being continued", "<artifact-", "<task-notification",
)


# ---------- configuración ----------
def config():
    try:
        with open(CONFIG_FILE, encoding="utf-8") as f:
            c = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        c = {}
    author = (c.get("author") or os.environ.get("INDICONNECT_AUTHOR") or "").strip().lower()
    if not re.fullmatch(r"[a-z0-9_-]{2,30}", author):
        raise SystemExit("Falta el autor. Crea ~/.indiconnect-log.json con {\"author\": \"tu-nombre\"} (ver README).")
    return {
        "author": author,
        "name": c.get("name") or author.capitalize(),
        "paths": [p.lower() for p in c.get("paths", [])] + [ROOT.lower()],
        "sessions": set(c.get("sessions", [])),
    }


def topic_ids():
    try:
        with open(TOPICS_FILE, encoding="utf-8") as f:
            return [t["id"] for t in json.load(f)["topics"]]
    except (FileNotFoundError, json.JSONDecodeError, KeyError):
        return []


def active_topics():
    try:
        with open(STATE_FILE, encoding="utf-8") as f:
            return [t for t in json.load(f).get("topics", []) if t in topic_ids()]
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def inline_topics(text):
    """Un prompt que empieza por [rf] o [rf,hu] fija su entregable sin tocar el estado."""
    m = re.match(r"\s*\[([a-z0-9,\- ]+)\]", text, re.I)
    if not m:
        return []
    known = set(topic_ids())
    return [t for t in (x.strip().lower() for x in m.group(1).split(",")) if t in known]


# ---------- limpieza ----------
def redact(text):
    text = re.sub(r"</?pasted_content[^>]*>", "", text)
    text = re.sub(r"[\w.+-]+@[\w-]+\.[\w.-]+", "[correo]", text)
    text = re.sub(r"\b(sk-[A-Za-z0-9_-]{12,}|gh[pousr]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b", "[secreto]", text)
    text = re.sub(r"(?i)(password|contraseña|token|api[_ -]?key|authorization)\s*[:=]\s*\S+", r"\1: [oculto]", text)
    for variant in {HOME, HOME.replace("\\", "/"), "/" + HOME[0].lower() + HOME[2:].replace("\\", "/")}:
        text = text.replace(variant + "\\", "~\\").replace(variant + "/", "~/")
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def cut(text, n):
    text = re.sub(r"[ \t]+", " ", text).strip()
    return text[:n] + ("…" if len(text) > n else "")


def is_project(cfg, cwd, session):
    c = (cwd or "").lower()
    return session in cfg["sessions"] or any(p and p in c for p in cfg["paths"])


# ---------- almacenamiento ----------
def author_file(cfg):
    return os.path.join(DATA_DIR, cfg["author"] + ".json")


def full_file(cfg):
    """Almacén completo y PRIVADO (fuera del repo): todos los prompts, publicados o no."""
    return os.path.join(HOME, ".indiconnect-log-%s.json" % cfg["author"])


def load(cfg):
    try:
        with open(full_file(cfg), encoding="utf-8") as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data = {}
        try:  # primera vez: parte de lo ya publicado
            with open(author_file(cfg), encoding="utf-8") as f:
                data = json.load(f)
            for e in data.get("entries", []):
                e["public"] = True
        except (FileNotFoundError, json.JSONDecodeError):
            data = {}
    data.setdefault("entries", [])
    data.setdefault("actions", [])
    data["author"], data["name"] = cfg["author"], cfg["name"]
    return data


def _dt(ts):
    return datetime.fromisoformat(ts.replace("Z", "+00:00"))


def save(cfg, data):
    items = []
    for e in sorted(data["entries"], key=lambda e: e["ts"]):
        # el mismo texto reenviado en otra sesión a los pocos minutos es un duplicado
        dup = next((x for x in items if x["text"] == e["text"] and abs((_dt(e["ts"]) - _dt(x["ts"])).total_seconds()) < 300), None)
        if dup is None:
            items.append(e)
        else:
            for k in ("topics", "public"):
                if not dup.get(k) and e.get(k):
                    dup[k] = e[k]
    for f, e in enumerate(items, 1):
        e["f"] = f                                   # nº en el almacén completo (el que usan los comandos)
        e.pop("n", None); e.pop("actions", None); e.pop("gap", None)
    acts = sorted(({k: v for k, v in a.items() if k != "p"} for a in data["actions"]), key=lambda a: a["ts"])
    data["entries"], data["actions"] = items, acts
    data["generated"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    with open(full_file(cfg), "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
        fh.write("\n")

    # Lo público: solo los prompts marcados. Las instrucciones de un prompt no publicado
    # (p. ej. un "sí, hazlo") se atribuyen a la última tarea publicada anterior.
    pub = [dict(e) for e in items if e.get("public")]
    starts = [e["ts"] for e in pub]
    counts = [0] * len(pub)
    out_acts, j = [], -1
    for a in acts:
        while j + 1 < len(starts) and starts[j + 1] <= a["ts"]:
            j += 1
        if j >= 0:
            out_acts.append(dict(a, p=j + 1))
            counts[j] += 1
    for i, e in enumerate(pub, 1):
        e["n"] = i
        e["actions"] = counts[i - 1]
        e["gap"] = 0 if i == 1 else max(0, int((_dt(e["ts"]) - _dt(pub[i - 2]["ts"])).total_seconds()))
        for k in ("f", "public"):
            e.pop(k, None)
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(author_file(cfg), "w", encoding="utf-8", newline="\n") as fh:
        json.dump({"author": cfg["author"], "name": cfg["name"], "generated": data["generated"],
                   "entries": pub, "actions": out_acts}, fh, ensure_ascii=False, separators=(",", ":"))
        fh.write("\n")
    write_index()


def write_index():
    authors = []
    for p in sorted(glob.glob(os.path.join(DATA_DIR, "*.json"))):
        if os.path.basename(p) == "index.json":
            continue
        try:
            with open(p, encoding="utf-8") as f:
                d = json.load(f)
            authors.append({"id": d["author"], "name": d.get("name", d["author"]), "file": os.path.basename(p),
                            "prompts": len(d["entries"]), "actions": len(d["actions"])})
        except (json.JSONDecodeError, KeyError):
            continue
    with open(os.path.join(DATA_DIR, "index.json"), "w", encoding="utf-8", newline="\n") as f:
        json.dump({"authors": authors}, f, ensure_ascii=False, indent=1)
        f.write("\n")


def now():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


# ---------- entradas ----------
def make_entry(cfg, text, ts, session, mode, source, topics):
    clean = redact(text)
    return {
        "id": hashlib.sha1((session + "|" + clean).encode("utf-8")).hexdigest()[:10],
        "ts": ts,
        "session": session[:8],
        "mode": mode or "",
        "source": source or "",
        "topics": inline_topics(clean) or topics,
        "public": bool(inline_topics(clean) or topics),   # con entregable activo o [etiqueta] = trabajo publicable
        "chars": len(clean),
        "words": len(clean.split()),
        "truncated": len(clean) > PREVIEW,
        "text": clean[:PREVIEW] + ("…" if len(clean) > PREVIEW else ""),
    }


def summarize(name, inp):
    inp = inp or {}
    s = lambda k: str(inp.get(k, "") or "")
    if name in ("Bash", "PowerShell"):
        return name, cut(redact(s("description") or s("command")), ACT_SHORT), cut(redact(s("command")), ACT_SHORT)
    if name in ("Read", "Edit", "Write", "NotebookEdit"):
        return name, cut(redact(s("file_path")), ACT_SHORT), ""
    if name in ("Grep", "Glob"):
        return name, cut(redact(s("pattern")), ACT_SHORT), ""
    if name in ("Agent", "Task"):
        return "Agent", cut(redact(s("description")), ACT_SHORT), cut(redact(s("prompt")), ACT_LONG)
    if name == "Artifact":
        return name, cut(redact(s("action") or "publish") + " " + redact(s("file_path") or s("url")), ACT_SHORT), ""
    if name == "Skill":
        return name, cut(redact(s("skill")), ACT_SHORT), ""
    if name == "AskUserQuestion":
        return name, "question to the user", ""
    detail = s("action_summary") or s("action") or s("url") or s("query") or s("text")
    return name.split("__")[-1], cut(redact(detail), ACT_SHORT), ""


def make_action(tool_id, name, inp, ts, session):
    tool, text, extra = summarize(name, inp)
    return {
        "id": hashlib.sha1((session + "|" + (tool_id or ts + name)).encode("utf-8")).hexdigest()[:10],
        "ts": ts, "tool": tool, "text": text, "extra": extra,
    }


def add(data, item, key):
    if any(x["id"] == item["id"] for x in data[key]):
        return False
    data[key].append(item)
    return True


# ---------- modos ----------
def run_hook(cfg):
    p = json.load(sys.stdin)
    text, session = p.get("prompt", ""), p.get("session_id", "")
    if not text.strip() or text.startswith(SKIP_PREFIXES) or not is_project(cfg, p.get("cwd", ""), session):
        return
    data = load(cfg)
    if add(data, make_entry(cfg, text, now(), session, p.get("permission_mode"), "hook", active_topics()), "entries"):
        save(cfg, data)


def run_action(cfg):
    p = json.load(sys.stdin)
    if p.get("agent_id") or not is_project(cfg, p.get("cwd", ""), p.get("session_id", "")):
        return
    data = load(cfg)
    if add(data, make_action(p.get("tool_use_id"), p.get("tool_name", ""), p.get("tool_input"), now(), p.get("session_id", "")), "actions"):
        save(cfg, data)


def run_import(cfg):
    data = load(cfg)
    n_p = n_a = 0
    for path in glob.glob(os.path.join(PROJECTS, "*", "*.jsonl")):
        with open(path, encoding="utf-8") as f:
            for line in f:
                try:
                    d = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if d.get("isMeta") or d.get("isSidechain"):
                    continue
                session = d.get("sessionId", "")
                if not is_project(cfg, d.get("cwd", ""), session):
                    continue
                c = d.get("message", {}).get("content")
                if d.get("type") == "assistant" and isinstance(c, list):
                    for p in c:
                        if isinstance(p, dict) and p.get("type") == "tool_use":
                            n_a += add(data, make_action(p.get("id"), p.get("name", ""), p.get("input"), d["timestamp"], session), "actions")
                    continue
                if d.get("type") != "user":
                    continue
                if isinstance(c, list):
                    c = "\n".join(p.get("text", "") for p in c if isinstance(p, dict) and p.get("type") == "text")
                if not isinstance(c, str) or not c.strip() or c.lstrip().startswith(SKIP_PREFIXES):
                    continue
                n_p += add(data, make_entry(cfg, c, d["timestamp"], session, d.get("permissionMode"), d.get("entrypoint"), []), "entries")
    save(cfg, data)
    print(f"prompts +{n_p} (total {len(data['entries'])}), acciones +{n_a} (total {len(data['actions'])})")


def run_topic(args):
    ids = topic_ids()
    if args == ["--clear"] or not args:
        topics = []
    else:
        bad = [a for a in args if a not in ids]
        if bad:
            raise SystemExit("Entregable desconocido: %s. Disponibles: %s" % (", ".join(bad), ", ".join(ids)))
        topics = args
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump({"topics": topics}, f)
    print("Entregable activo:", ", ".join(topics) or "(ninguno)")


def find(data, which):
    hit = [e for e in data["entries"] if str(e.get("f")) == which or e["id"] == which]
    if not hit:
        raise SystemExit("No existe ese prompt: " + which)
    return hit[0]


def run_tag(cfg, args):
    if len(args) < 2:
        raise SystemExit("Uso: tag <nº|id> <entregable> [entregable...]  (publica el prompt)")
    ids, topics = topic_ids(), args[1:]
    bad = [t for t in topics if t not in ids]
    if bad:
        raise SystemExit("Entregable desconocido: " + ", ".join(bad))
    data = load(cfg)
    e = find(data, args[0])
    e["topics"], e["public"] = topics, True
    save(cfg, data)
    print("Prompt %s -> %s (publicado)" % (e["f"], ", ".join(topics)))


def run_visibility(cfg, args, public):
    if not args:
        raise SystemExit("Uso: %s <nº|id> [nº|id...]" % ("publish" if public else "hide"))
    data = load(cfg)
    for w in args:
        find(data, w)["public"] = public
    save(cfg, data)
    print("%d prompt(s) %s" % (len(args), "publicados" if public else "ocultos"))


def run_list(cfg, args):
    """Lista el almacén completo. 'list pending' muestra solo los que aún no se han publicado."""
    data = load(cfg)
    for e in data["entries"]:
        if args[:1] == ["pending"] and e.get("public"):
            continue
        print("%3d %s %s [%s] %s" % (e["f"], "PUB" if e.get("public") else "---", e["ts"][5:16],
                                       ",".join(e.get("topics") or []), e["text"][:90].replace("\n", " ")))


def run_status(cfg):
    data = load(cfg)
    pub = sum(1 for e in data["entries"] if e.get("public"))
    print("Autor: %s (%s)\nEntregable activo: %s\nPrompts: %d (%d publicados, %d pendientes) · instrucciones: %d\n"
          "Archivo público: %s"
          % (cfg["author"], cfg["name"], ", ".join(active_topics()) or "(ninguno)", len(data["entries"]), pub,
             len(data["entries"]) - pub, len(data["actions"]), author_file(cfg)))


if __name__ == "__main__":
    mode, rest = (sys.argv[1] if len(sys.argv) > 1 else "hook"), sys.argv[2:]
    interactive = mode in ("import", "topic", "topics", "tag", "publish", "hide", "list", "status")
    try:
        if mode == "topics":
            for t in json.load(open(TOPICS_FILE, encoding="utf-8"))["topics"]:
                print("%-14s %s" % (t["id"], t["es"]))
        elif mode == "topic":
            run_topic(rest)
        else:
            cfg = config()
            {"import": lambda: run_import(cfg), "action": lambda: run_action(cfg), "tag": lambda: run_tag(cfg, rest),
             "publish": lambda: run_visibility(cfg, rest, True), "hide": lambda: run_visibility(cfg, rest, False),
             "list": lambda: run_list(cfg, rest), "status": lambda: run_status(cfg)}.get(mode, lambda: run_hook(cfg))()
    except SystemExit:
        raise
    except Exception as exc:  # un fallo del registro nunca debe bloquear el trabajo
        print("prompt_log: %s" % exc, file=sys.stderr)
        sys.exit(1 if interactive else 0)
