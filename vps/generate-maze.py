#!/usr/bin/env python3
import os
import random
import string
from pathlib import Path

random.seed(42)

BASE = Path("/root/disco-laberinto")
TARGET_FILES = 1000
MAX_DEPTH = 7
TARGET_SIZE_MB = 120

TOP_DIRS = [
    "Projects", "Downloads", "Documents", "Workspace", "src",
    "Archive", "old_backups", "Tools", "Scripts", "Sandbox",
    "Repos", "ThirdParty", "Misc", ".config", ".cache",
    "Desktop", "Pictures", "Videos_old", "VMs", "Datasets",
]

PROJECT_NAMES = [
    "auth-service", "user-portal", "data-pipeline", "ml-trainer",
    "billing-api", "frontend-app", "mobile-sdk", "crawler-bot",
    "image-resizer", "log-aggregator", "queue-worker", "kafka-bridge",
    "prom-exporter", "redis-cache", "ws-gateway", "graph-engine",
    "video-encoder", "pdf-parser", "ocr-tool", "stats-collector",
    "telegram-bot", "discord-relay", "ci-runner", "infra-tools",
    "dev-utils", "snake-game", "raytracer", "compiler-toy",
    "kernel-mod", "shell-clone", "regex-engine", "json-parser",
    "csv-loader", "sql-builder", "orm-lite", "chart-renderer",
    "audio-mixer", "midi-tool", "fft-bench", "gpu-test",
    "wallet-cli", "p2p-chat", "torrent-cli", "vpn-tools",
    "scraper-py", "selenium-runs", "puppeteer-jobs", "playwright-ci",
]

SUBDIR_NAMES = [
    "src", "lib", "bin", "test", "tests", "spec", "docs", "examples",
    "build", "dist", "out", "target", "node_modules", "vendor",
    "internal", "pkg", "cmd", "api", "core", "utils", "helpers",
    "models", "views", "controllers", "services", "handlers",
    "components", "pages", "hooks", "store", "reducers", "actions",
    "config", "configs", "scripts", "tools", "migrations", "fixtures",
    "assets", "static", "public", "templates", "locales", "i18n",
    "proto", "schemas", "types", "interfaces", "constants", "enums",
    "middleware", "plugins", "extensions", "modules", "shared",
    "legacy", "deprecated", "_old", "_backup", "tmp", "cache",
    ".git", ".github", ".vscode", ".idea", "hooks",
    "v1", "v2", "v3", "main", "develop", "feature", "release",
]

DOC_NAMES = [
    "README", "CHANGELOG", "LICENSE", "CONTRIBUTING", "TODO",
    "NOTES", "ROADMAP", "ARCHITECTURE", "SETUP", "INSTALL",
    "USAGE", "FAQ", "MIGRATION", "SECURITY", "AUTHORS",
]

CODE_FILES = [
    ("index", ".js"), ("app", ".js"), ("server", ".js"), ("client", ".js"),
    ("main", ".py"), ("utils", ".py"), ("models", ".py"), ("api", ".py"),
    ("handler", ".go"), ("router", ".go"), ("middleware", ".go"),
    ("main", ".rs"), ("lib", ".rs"), ("error", ".rs"),
    ("Main", ".java"), ("Service", ".java"), ("Controller", ".java"),
    ("App", ".tsx"), ("Layout", ".tsx"), ("Header", ".tsx"), ("Footer", ".tsx"),
    ("types", ".ts"), ("api", ".ts"), ("client", ".ts"),
    ("module", ".c"), ("driver", ".c"), ("kernel", ".c"), ("util", ".h"),
    ("class", ".cpp"), ("game", ".cpp"), ("vector", ".hpp"),
    ("script", ".sh"), ("install", ".sh"), ("deploy", ".sh"),
    ("config", ".yaml"), ("docker-compose", ".yml"), ("ci", ".yml"),
    ("package", ".json"), ("tsconfig", ".json"), ("settings", ".json"),
    ("Makefile", ""), ("Dockerfile", ""), (".gitignore", ""), (".env.example", ""),
    ("schema", ".sql"), ("migration", ".sql"), ("seed", ".sql"),
    ("style", ".css"), ("theme", ".scss"), ("index", ".html"),
    ("data", ".csv"), ("export", ".csv"), ("dump", ".xml"),
    ("requirements", ".txt"), ("Cargo", ".toml"), ("go", ".mod"),
    ("LICENSE", ""), ("VERSION", ""), ("CHANGELOG", ".md"),
    ("notes", ".md"), ("ideas", ".md"), ("draft", ".md"),
    ("debug", ".log"), ("error", ".log"), ("access", ".log"),
    ("backup", ".bak"), ("temp", ".tmp"), ("trace", ".dump"),
    ("lib", ".so"), ("plugin", ".dll"), ("native", ".dylib"),
    ("binary", ".bin"), ("image", ".iso"), ("archive", ".tar.gz"),
    ("checkpoint", ".pkl"), ("model", ".h5"), ("weights", ".pt"),
]

JS_SNIPPETS = [
    "const express = require('express');\nconst app = express();\napp.get('/', (req, res) => res.send('ok'));\napp.listen(3000);\n",
    "function debounce(fn, ms) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), ms);\n  };\n}\n",
    "export async function fetchUser(id) {\n  const r = await fetch(`/api/users/${id}`);\n  if (!r.ok) throw new Error('failed');\n  return r.json();\n}\n",
    "module.exports = {\n  preset: 'ts-jest',\n  testEnvironment: 'node',\n  collectCoverageFrom: ['src/**/*.ts'],\n};\n",
]

PY_SNIPPETS = [
    "import os\nimport sys\n\ndef main():\n    print('hello')\n    return 0\n\nif __name__ == '__main__':\n    sys.exit(main())\n",
    "from dataclasses import dataclass\n\n@dataclass\nclass User:\n    id: int\n    name: str\n    email: str = ''\n",
    "import asyncio\n\nasync def worker(q):\n    while True:\n        item = await q.get()\n        if item is None:\n            break\n        await process(item)\n        q.task_done()\n",
    "import logging\nlogger = logging.getLogger(__name__)\nlogger.setLevel(logging.INFO)\nhandler = logging.StreamHandler()\nlogger.addHandler(handler)\n",
]

GO_SNIPPETS = [
    "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"hello\")\n}\n",
    "package handlers\n\nimport \"net/http\"\n\nfunc Health(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(200)\n\tw.Write([]byte(\"ok\"))\n}\n",
]

RUST_SNIPPETS = [
    "fn main() {\n    println!(\"hello\");\n}\n",
    "pub struct Config {\n    pub host: String,\n    pub port: u16,\n}\n\nimpl Default for Config {\n    fn default() -> Self {\n        Self { host: \"localhost\".into(), port: 8080 }\n    }\n}\n",
]

C_SNIPPETS = [
    "#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    printf(\"hello\\n\");\n    return 0;\n}\n",
    "#ifndef UTIL_H\n#define UTIL_H\n\nint add(int a, int b);\nvoid log_msg(const char *m);\n\n#endif\n",
]

JSON_SNIPPETS = [
    '{\n  "name": "{name}",\n  "version": "1.0.0",\n  "scripts": {\n    "build": "tsc",\n    "test": "jest"\n  }\n}\n',
    '{\n  "compilerOptions": {\n    "target": "es2020",\n    "module": "commonjs",\n    "strict": true\n  }\n}\n',
]

YAML_SNIPPETS = [
    "version: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - '3000:3000'\n    environment:\n      - NODE_ENV=production\n",
    "name: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm test\n",
]

LOG_LINES = [
    "[INFO] server started on :3000",
    "[DEBUG] cache miss key=user:42",
    "[WARN] slow query: 2.3s",
    "[ERROR] connection refused 127.0.0.1:5432",
    "[INFO] gc cycle completed in 18ms",
    "[TRACE] req=GET /api/users 200 12ms",
]

def rand_name(n=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=n))

def write_text(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)

def write_bin(path, size):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'wb') as f:
        f.write(os.urandom(size))

def gen_code_content(ext, name):
    if ext == '.js' or ext == '.ts' or ext == '.tsx':
        return random.choice(JS_SNIPPETS)
    if ext == '.py':
        return random.choice(PY_SNIPPETS)
    if ext == '.go':
        return random.choice(GO_SNIPPETS)
    if ext == '.rs':
        return random.choice(RUST_SNIPPETS)
    if ext in ('.c', '.cpp', '.h', '.hpp'):
        return random.choice(C_SNIPPETS)
    if ext == '.json':
        return random.choice(JSON_SNIPPETS).replace('{name}', name)
    if ext in ('.yml', '.yaml'):
        return random.choice(YAML_SNIPPETS)
    if ext == '.sh':
        return "#!/bin/bash\nset -e\necho 'running'\n"
    if ext == '.sql':
        return "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) NOT NULL UNIQUE,\n  created_at TIMESTAMP DEFAULT NOW()\n);\n"
    if ext == '.md':
        return f"# {name}\n\nWork in progress.\n\n## Notes\n\n- TODO: refactor\n- TODO: add tests\n"
    if ext == '.log':
        return '\n'.join(random.choices(LOG_LINES, k=random.randint(20, 200))) + '\n'
    if ext == '.csv':
        rows = ['id,name,value']
        for i in range(random.randint(10, 100)):
            rows.append(f"{i},{rand_name()},{random.random():.4f}")
        return '\n'.join(rows) + '\n'
    if ext == '.xml':
        return '<?xml version="1.0"?>\n<root>\n  <item id="1">data</item>\n</root>\n'
    if ext == '.html':
        return '<!DOCTYPE html>\n<html><head><title>page</title></head><body><h1>hi</h1></body></html>\n'
    if ext == '.css' or ext == '.scss':
        return 'body { margin: 0; font-family: sans-serif; }\n.container { max-width: 1200px; margin: 0 auto; }\n'
    if ext == '.txt':
        return '\n'.join([rand_name(12) + '==' + str(random.randint(0,99)) for _ in range(20)]) + '\n'
    if ext == '.toml':
        return '[package]\nname = "' + name + '"\nversion = "0.1.0"\nedition = "2021"\n'
    if ext == '.mod':
        return 'module example.com/' + name + '\n\ngo 1.21\n'
    if ext == '.bak' or ext == '.tmp' or ext == '.dump':
        return 'backup data\n' + rand_name(64) + '\n'
    return f"// {name}\n// generated\n"

def make_dir_tree(root, depth_left, breadth_min=2, breadth_max=5):
    """Recursively build directory tree, return list of leaf-ish dirs."""
    all_dirs = [root]
    if depth_left <= 0:
        return all_dirs
    n = random.randint(breadth_min, breadth_max)
    names = random.sample(SUBDIR_NAMES, min(n, len(SUBDIR_NAMES)))
    for nm in names:
        sub = root / nm
        sub.mkdir(parents=True, exist_ok=True)
        if random.random() < 0.6:
            all_dirs.extend(make_dir_tree(sub, depth_left - 1, max(1, breadth_min - 1), max(2, breadth_max - 1)))
        else:
            all_dirs.append(sub)
    return all_dirs

def main():
    BASE.mkdir(parents=True, exist_ok=True)
    all_dirs = []

    for top in TOP_DIRS:
        td = BASE / top
        td.mkdir(parents=True, exist_ok=True)
        all_dirs.append(td)

        if top in ('Projects', 'Workspace', 'Repos', 'src', 'Sandbox'):
            n_proj = random.randint(4, 9)
            projs = random.sample(PROJECT_NAMES, n_proj)
            for p in projs:
                pd = td / p
                pd.mkdir(parents=True, exist_ok=True)
                all_dirs.append(pd)
                all_dirs.extend(make_dir_tree(pd, MAX_DEPTH - 2))
        else:
            all_dirs.extend(make_dir_tree(td, MAX_DEPTH - 1))

    all_dirs = list(set(all_dirs))
    print(f"dirs created: {len(all_dirs)}")

    files_made = 0
    while files_made < TARGET_FILES:
        d = random.choice(all_dirs)
        rel_depth = len(d.relative_to(BASE).parts)
        if rel_depth > MAX_DEPTH:
            continue
        nm, ext = random.choice(CODE_FILES)
        if random.random() < 0.4 and ext:
            fname = f"{nm}_{rand_name(4)}{ext}"
        else:
            fname = f"{nm}{ext}" if not ext else f"{nm}{ext}"
            if (d / fname).exists():
                fname = f"{nm}_{rand_name(4)}{ext}"
        fpath = d / fname
        if fpath.exists():
            continue

        if ext in ('.so', '.dll', '.dylib', '.bin', '.iso', '.tar.gz', '.pkl', '.h5', '.pt'):
            size = random.randint(50_000, 500_000)
            write_bin(fpath, size)
        else:
            content = gen_code_content(ext, nm)
            reps = random.randint(1, 8)
            content = content * reps
            if random.random() < 0.2:
                content += '\n' + ''.join(random.choices(string.ascii_letters + string.digits + '\n ', k=random.randint(500, 5000)))
            write_text(fpath, content)
        files_made += 1

    print(f"decoy files written: {files_made}")

    leaf_candidates = [d for d in all_dirs if len(d.relative_to(BASE).parts) == MAX_DEPTH]
    if not leaf_candidates:
        leaf_candidates = [d for d in all_dirs if len(d.relative_to(BASE).parts) >= MAX_DEPTH - 1]

    target_dir = random.choice(leaf_candidates)
    hide_subdirs = ['.cache', '_internal', 'vendor', 'legacy', '_old', 'tmp', '.git']
    hide_name = random.choice(hide_subdirs)
    secret_dir = target_dir / hide_name
    secret_dir.mkdir(parents=True, exist_ok=True)

    placeholder = secret_dir / "PLACEHOLDER_RENAME_ME.txt"
    placeholder.write_text(
        "ESTE ES EL ARCHIVO CLAVE.\n\n"
        "Renombra este archivo y reemplaza este contenido con la pista/clave\n"
        "que de paso a la siguiente prueba del juego.\n\n"
        "Ubicacion final dentro del laberinto:\n"
        f"  {secret_dir.relative_to(BASE)}\n"
    )

    marker = BASE / ".SECRET_LOCATION.txt"
    marker.write_text(
        "MAPA SECRETO (NO INCLUIR EN ZIP FINAL):\n\n"
        f"Carpeta secreta: {secret_dir.relative_to(BASE)}\n"
        f"Archivo clave:   {placeholder.relative_to(BASE)}\n\n"
        "Renombra el archivo y edita el contenido antes de comprimir/subir.\n"
    )

    total_size = sum(f.stat().st_size for f in BASE.rglob('*') if f.is_file())
    print(f"total size: {total_size / 1024 / 1024:.1f} MB")
    print(f"secret path: {secret_dir.relative_to(BASE)}")

if __name__ == '__main__':
    main()
