# 🧬 node-jod

[![Node.js](https://img.shields.io/badge/node-22.x-green?logo=node.js)](https://nodejs.org/)
[![Deploy on Render](https://img.shields.io/badge/render-live-blue?logo=render)](https://node-jod.onrender.com/api/ping)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)
[![Status](https://img.shields.io/badge/status-experimental-orange)](#)

> Exploring the edge of Node.js with **v22 (Jod)** — a native, dependency-free API playground.

---

## ✨ Features

- ✅ Native `fetch`, `FormData`, `Blob`, `structuredClone`, and other Web APIs
- ✅ Modern ESM (`"type": "module"`) setup
- ✅ Zero dependencies
- ✅ Pure Node.js HTTP, no frameworks
- ✅ Runs on [Render](https://render.com/register) for **free** with Node.js v22

---

## 🚀 Getting Started

```bash
# Requires Node.js v22+
git clone https://github.com/manokimbr/node-jod.git
cd node-jod
npm install
npm start
````

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

Deployed with ❤️ on [Render](https://render.com/register) — a modern cloud platform that supports **Node.js v22** out of the box.

> Say goodbye to Node v18 limitations.
> Say hello to native edge APIs.

✅ Zero config deploy
✅ Connects to your GitHub
✅ Auto-redeploy on push

---

## 🛠️ Stack (Current)

| Layer   | Tech            |
| ------- | --------------- |
| Runtime | Node.js v22 Jod |
| Modules | ESM (`.js`)     |
| API     | Native HTTP     |
| Tools   | None (yet)      |

> Roadmap: Neo4j · Web3 · LLMs · 3D Bots · AI Matchmaking · 🔮

---

## 🧠 Self-awareness mode:

Scans its own codebase with 
```bash
npm run brain
``` 
and builds a project memory map.

This command creates:

- `jod/memory/structure.json` → list of files, exported functions, and detected routes
- `jod/memory/project.json` → folder layout and package metadata

This is the first step toward turning JOD into a living system — capable of analyzing itself, planning features, and collaborating with AI to evolve.




---



## 👤 Author

Made with curiosity & caffeine by [@manokimbr](https://github.com/manokimbr)

[![GitHub followers](https://img.shields.io/github/followers/manokimbr?label=Follow\&style=social)](https://github.com/manokimbr)
[![Twitter](https://img.shields.io/badge/X-@manokimbr-black?logo=x)](https://twitter.com/manokimbr)

---

## 📄 License

This project is open-source under the [MIT License](./.LICENSE)


