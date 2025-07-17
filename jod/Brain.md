# 🧠 backendAwarenessBrain.js

This script is part of the self-awareness system of the `node-jod` project.  
Its purpose is to give the **backend** the ability to understand its own **file structure**, **exports**, and **API routes**.

---

## 🧩 What It Does

When you run:

```bash
npm run brain
````

The script analyzes the backend (`./server`) and root files. It:

1. **Scans** all `.js` files under `server/` and root
2. **Extracts**:

   * Named `export` statements (`export function ...`)
   * Hardcoded API route patterns (`/api/...`)
3. **Reads**:

   * `package.json` metadata
4. **Generates**:

   * `structure.json`: file exports + routes
   * `structure.txt`: human-readable file tree
   * `project.json`: folder list + project metadata

---

## 📁 `structure.json`

A list of all files with their exports and routes:

```json
[
  {
    "file": "server/handlers/pingHandler.js",
    "exports": ["export function handlePing(req, res) {"],
    "routes": []
  },
  {
    "file": "server/routes/router.js",
    "exports": ["export function router(req, res) {"],
    "routes": ["else if (url === '/api/ping') {"]
  },
  {
    "file": "server/utils/env.js",
    "exports": ["export function loadEnv() {"],
    "routes": []
  },
  {
    "file": "index.js",
    "exports": [],
    "routes": []
  }
]
```

> Useful for LLMs, static analyzers, or codegen tools.

---

## 🌳 `structure.txt`

A clean visual tree for CLI-friendly inspection:

```
📁 ./
├── index.js
└── server
    ├── handlers
    │   └── pingHandler.js
    ├── routes
    │   └── router.js
    └── utils
        └── env.js
```

---

## 📦 `project.json`

Summarizes folder layout and package metadata:

```json
{
  "folders": ["handlers", "routes", "utils"],
  "package": {
    "name": "jod",
    "version": "1.0.0",
    "description": "Exploring native Node.js 22 APIs",
    "author": "Kim Souza",
    "scripts": {
      "start": "node index.js",
      "dev": "NODE_ENV=development node index.js",
      "test": "echo \"Error: no test specified\" && exit 1",
      "brain": "node jod/backendAwarenessBrain.js"
    },
    "type": "module"
  }
}
```

---

## 🧠 Why It Matters

`backendAwarenessBrain.js` helps your backend:

* Document itself for humans or machines
* Track evolving structure over time
* Enable future self-repair and planning via AI

> APIs that describe themselves.
> A backend that sees — and eventually rewrites — its own mind.

---

🧬 *node-jod team*

```
