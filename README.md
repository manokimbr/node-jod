# 🧬 node-jod

[![Node.js](https://img.shields.io/badge/node-22.x-green?logo=node.js)](https://nodejs.org/)
[![Deploy on Render](https://img.shields.io/badge/render-live-blue?logo=render)](https://node-jod.onrender.com/api/ping)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)
[![Status](https://img.shields.io/badge/status-experimental-orange)](#)
[![Self-aware](https://img.shields.io/badge/self--awareness-brain🧠-lightblue)](./jod/Brain.md)
[![ADD Manifesto](https://img.shields.io/badge/ADD-manifesto-purple?logo=neo4j)](./jod/ADD/ADD.md)
[![Neo4j Guide](https://img.shields.io/badge/graph-connected-9cf?logo=neo4j)](./jod/ADD/Neo4j.md)

> Exploring the edge of Node.js with **v22 (Jod)** — a minimal, awareness-driven, vulnerability-resistant API playground.

---

## ✨ Features

* ✅ Native `fetch`, `FormData`, `Blob`, `structuredClone`, and other Web APIs
* ✅ Modern ESM (`"type": "module"`) setup
* ✅ Zero core dependencies (with optional graph integrations)
* ✅ Pure Node.js HTTP, no frameworks
* ✅ Awareness-Driven Development (ADD)™ ready
* ✅ Runs on [Render](https://render.com/register) for **free** with Node.js v22

---

## 🚀 Getting Started

```bash
# Requires Node.js v22+
git clone https://github.com/manokimbr/node-jod.git
cd node-jod
npm install
npm start
```

> Make sure to set your `NODE_ENV` and `PORT` in `.env` or `.env.dev`.

---

## 📦 Project Structure

```bash
.
├── index.js              # Entry point
├── .env / .env.dev       # Environment configs
├── server/
│   ├── routes/           # Route definitions
│   ├── handlers/         # Request handlers
│   └── utils/            # Utility functions (e.g., env loader)
├── jod/
│   ├── memory/           # Codebase awareness outputs
│   ├── ADD/              # Awareness-Driven Development docs
```

---

## 🔌 API Example

### `GET /api/ping`

📍 [https://node-jod.onrender.com/api/ping](https://node-jod.onrender.com/api/ping)

```json
{
  "message": "pong from Node Jod 🧬",
  "version": "v22.16.0",
  "env": "production",
  "port": "3001"
}
```

---

## ☁️ Deployment (Free)

Deployed on [Render](https://render.com/register) — a modern cloud platform that supports **Node.js v22** out of the box.

> Say goodbye to Node v18 limitations.
> Say hello to native edge APIs.

✅ Zero config deploy
✅ Connects to your GitHub
✅ Auto-redeploy on push

---

## 🛠️ Stack (Current)

| Layer   | Tech             |
| ------- | ---------------- |
| Runtime | Node.js v22 Jod  |
| Modules | ESM (`.js`)      |
| API     | Native HTTP      |
| Graph   | Neo4j (optional) |

> Roadmap: Web3 · LLMs · 3D Bots · AI Matchmaking · 🔮

---

## 🧠 Self-awareness Mode

JOD can scan its own codebase with:

```bash
npm run brain
```

This builds a lightweight memory of the backend:

* `jod/memory/structure.json` → list of files, exported functions, and detected routes
* `jod/memory/project.json` → folder layout and package metadata
* `jod/memory/structure.txt` → ASCII folder tree with warnings (⚠️)

> The foundation of a living backend that understands itself and can evolve.

---

## 📚 Awareness-Driven Development (ADD) 🐺 🤖

ADD is a programming paradigm that turns codebases into **self-aware agents**.
Learn more about it in [`jod/ADD/ADD.md`](./jod/ADD/ADD.md)

---

## 🔗 Neo4j Integration

JOD optionally connects to [Neo4j](https://neo4j.com/) to store and visualize awareness data.
Ideal for inspecting architecture or enabling LLM-powered analysis.

Guide available here → [`jod/ADD/Neo4j.md`](./jod/ADD/Neo4j.md)

---

## 🐺 Author

Made by [@manokimbr](https://github.com/manokimbr)

---

## 📄 License

This project is open-source under the [MIT License](./LICENSE)
