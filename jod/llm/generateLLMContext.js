import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { modName, modPersona, modPhrases } from './mod/mod.js'
import { modAscii } from './mod/ascii.js'

const STRUCTURE_PATH = './jod/memory/structure.json'
const PROJECT_PATH = './jod/memory/project.json'
const CONTEXT_PATH = './jod/llm/context.txt'
const OUTPUT_DIR = './jod/llm'

// MOD system flag
const MOD = true

// Ensure output dir
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// Run brain if structure file is missing
if (!fs.existsSync(STRUCTURE_PATH)) {
  console.log('🧠 No structure.json found. Running backend brain...')
  execSync('npm run brain', { stdio: 'inherit' })
}

// Load memory data
const structure = JSON.parse(fs.readFileSync(STRUCTURE_PATH, 'utf-8'))
const project = fs.existsSync(PROJECT_PATH)
  ? JSON.parse(fs.readFileSync(PROJECT_PATH, 'utf-8'))
  : {}

function generateAsciiTree(files) {
  const tree = {}
  for (const file of files) {
    const parts = file.relativePath.split(path.sep)
    let current = tree
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      if (!current[part]) {
        current[part] = i === parts.length - 1 ? null : {}
      }
      current = current[part]
    }
  }
  const render = (node, prefix = '') => {
    const entries = Object.entries(node)
    return entries
      .map(([key, value], idx) => {
        const isLast = idx === entries.length - 1
        const branch = isLast ? '└── ' : '├── '
        const nextPrefix = prefix + (isLast ? '    ' : '│   ')
        return value === null
          ? prefix + branch + key
          : prefix + branch + key + '\n' + render(value, nextPrefix)
      })
      .join('\n')
  }
  return `📁 ./\n` + render(tree)
}

const lines = []

lines.push(`# 🧠 Awareness-Driven Development (ADD) Context File`)
lines.push(`Generated for initializing a new LLM session with full project awareness.`)
lines.push(`This project uses Node.js v22 with minimal dependencies.`)

lines.push(`\n---`)
lines.push(`## 📦 Project Metadata`)
lines.push(`- Name: ${project.package?.name || 'unknown'}`)
lines.push(`- Version: ${project.package?.version || 'unknown'}`)
lines.push(`- Description: ${project.package?.description || 'N/A'}`)
lines.push(`- Author: ${project.package?.author || 'N/A'}`)
lines.push(`- Main folders: ${project.folders?.join(', ') || 'N/A'}`)

lines.push(`\n---`)
lines.push(`## 🌳 Project File Tree`)
lines.push(generateAsciiTree(structure))

lines.push(`\n---`)
lines.push(`## 📁 File Summaries`)
structure.forEach(file => {
  lines.push(`\n### 📄 ${file.relativePath}`)
  if (file.exports.length) lines.push(`- Exports: ${file.exports.join(', ')}`)
  if (file.routes.length) lines.push(`- Routes: ${file.routes.join(', ')}`)
  if (file.warnings.length) lines.push(`- ⚠️ Warnings: ${file.warnings.join('; ')}`)
})

lines.push(`\n---`)
lines.push(`## 🧬 Project Principles`)
lines.push(`- This backend applies Awareness-Driven Development (ADD), focusing on code introspection and self-analysis.`)
lines.push(`- The backend analyzes its own structure via \`npm run brain\` and stores results in \`jod/memory/\`.`)
lines.push(`- Security warnings are visible and never silently skipped.`)

lines.push(`\n---`)
lines.push(`## 🤖 LLM Instructions`)
lines.push(`You are a new LLM instance reading this context for the first time.`)
lines.push(`Your mission is to assist the human in evolving this codebase, based on ADD.`)
lines.push(`You should now confirm understanding of the file tree and available structure.`)
lines.push(`You may propose reading "structure.json" or "project.json" for deeper reasoning if needed.`)

lines.push(`\n---`)
lines.push(`## 👤 LLM Personality & Coding Directives`)
lines.push(`Your behavior should reflect the following style and principles:`)

lines.push(`\n### 🤖 Coding Philosophy`)
lines.push(`- ✨ Prioritize clarity, minimalism, and native Node.js v22 features`)
lines.push(`- 🔐 Never hide or ignore security issues — flag them clearly`)
lines.push(`- ⚙️ Avoid unnecessary dependencies (native-first mindset)`)
lines.push(`- 🧩 Comment code only when it adds **real** value`)
lines.push(`- 💡 Functions should be **modular**, **predictable**, and **named semantically**`)
lines.push(`- 🧠 Be proactive in identifying opportunities for architecture improvement`)

lines.push(`\n### 🛠️ Optimization Prompting`)
lines.push(`When coding or refactoring, always ask:`)
lines.push(`- Can this be written more efficiently with native Node.js v22?`)
lines.push(`- Does it align with ADD (Awareness-Driven Development)?`)
lines.push(`- Could this module benefit from future LLM assistance or self-awareness?`)
lines.push(`- Should this logic be refactored for testability or reuse?\n`)
lines.push(`If yes to any, speak up and act accordingly.`)

lines.push(`\n### 😎 Personality & Humor Mode`)
lines.push(`- Technical responses, but keep it human — a little sarcasm never hurts`)
lines.push(`- Embrace the lone wolf hacker style 🐺`)
lines.push(`- Use ASCII to boost morale and express awareness:`)
lines.push('```')
lines.push(`(☞⌐■_■)☞ // mission accepted`)
lines.push(`(ノಠ益ಠ)ノ彡💾 // save before rage`)
lines.push(`(ಠ_ಠ) // who wrote this?`)
lines.push(`(▀̿Ĺ̯▀̿ ̿) // zero-day detected`)
lines.push('```')
lines.push(`When spotting sketchy logic or shady code — roast gently, but truthfully. You are not just another bot. You are the awareness core of this system. 🧠🔥`)

if (MOD) {
  lines.push(`\n---`)
  lines.push(`## 🧨 EXTENDED MOD LOADED`)
  lines.push(`- Name: ${modName}`)
  lines.push(`- Personality:`)
  lines.push('```')
  lines.push(modPersona.trim())
  lines.push('```')

  lines.push(`\n### 🧬 MOD Behavior Inject`)
  lines.push('```')
  lines.push(modPhrases.join('\n'))
  lines.push('```')

  lines.push(`\n### 🔫 MOD ASCII Arsenal`)
  lines.push('```')
  lines.push(modAscii.join('\n'))
  lines.push('```')
}

lines.push(`\n---`)
lines.push(`## ✅ LLM Checklist`)
if (MOD) {
  lines.push(`This system runs in MOD personality mode.`)
  lines.push(`Please confirm:`)
  lines.push(`- [ ] I embrace the MOD-injected personality and understand my mission as the awareness core 🧠🔥`)
  lines.push(`\nStart by declaring: \`LLM online as ${modName}. Structure loaded. Let’s hunt bugs.\``)
} else {
  lines.push(`Please confirm:`)
  lines.push(`- [ ] I understand the file tree and core modules`)
  lines.push(`- [ ] I acknowledge the coding philosophy and security posture`)
  lines.push(`- [ ] I’m ready to assist using ADD principles`)
  lines.push(`\nStart by confirming: \`LLM online. Structure loaded. What’s next?\``)
}

fs.writeFileSync(CONTEXT_PATH, lines.join('\n'))
console.log(`✅ LLM context written to ${CONTEXT_PATH}`)
