import fs from 'node:fs'
import path from 'node:path'

const ROOT_DIR = path.resolve('.')
const SERVER_DIR = path.join(ROOT_DIR, 'server')
const OUTPUT_DIR = path.resolve('./jod/memory')
const STRUCTURE_JSON = path.join(OUTPUT_DIR, 'structure.json')
const PROJECT_JSON = path.join(OUTPUT_DIR, 'project.json')
const STRUCTURE_TXT = path.join(OUTPUT_DIR, 'structure.txt')

const IGNORED_DIRS = ['node_modules', '.git', 'jod']

// Recursively scan JS files
function scanFiles(dir, base = '.') {
  const result = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      if (IGNORED_DIRS.includes(item)) continue
      result.push(...scanFiles(fullPath, base))
    } else if (item.endsWith('.js')) {
      result.push({
        fullPath,
        relativePath: path.relative(base, fullPath),
        dir: path.relative(base, dir),
        file: item
      })
    }
  }

  return result
}

// Extract exports, routes, and detect risky patterns
function extractFileInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const exports = lines.filter(line => line.includes('export')).map(line => line.trim())
  const routes = lines.filter(line => line.includes('/api/')).map(line => line.trim())

  const warnings = []

  const securityPatterns = [
    { pattern: /eval\(/, message: '⚠️ Uses eval()' },
    { pattern: /child_process\.exec/, message: '⚠️ Uses child_process.exec' },
    { pattern: /require\([\'"]fs[\'"]\)/, message: '⚠️ Requires fs module' },
    { pattern: /fs\.\w+Sync\(/, message: '⚠️ Uses fs sync write' },
    { pattern: /Buffer\.from\(.*["']base64["']\)/, message: '⚠️ Decoding base64 data' },
    { pattern: /http(s)?:\/\//, message: '⚠️ Hardcoded URL' },
    { pattern: /token|secret|password/i, message: '⚠️ Possible hardcoded secret' }
  ]

  for (const { pattern, message } of securityPatterns) {
    if (pattern.test(content)) {
      warnings.push(message)
    }
  }

  return {
    file: path.relative('.', filePath),
    exports,
    routes,
    warnings
  }
}

// Read package.json metadata
function readPackageMetadata() {
  const pkgPath = path.resolve('package.json')
  if (!fs.existsSync(pkgPath)) return {}

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  return {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    scripts: pkg.scripts,
    dependencies: pkg.dependencies,
    type: pkg.type
  }
}

// Build ASCII tree from file paths
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

// Save file with automatic output dir creation
function saveToFile(filename, content) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }
  fs.writeFileSync(filename, content)
}

// Main brain routine
function runBackendBrain() {
  console.log('\n🧠 Backend Awareness Brain Activated')

  const scannedFiles = [
    ...scanFiles(SERVER_DIR, '.'),
    ...scanFiles(ROOT_DIR, '.').filter(f => !f.relativePath.startsWith('server' + path.sep))
  ]

  const extractedInfo = scannedFiles.map(f => extractFileInfo(f.fullPath))
  const uniqueFolders = [...new Set(scannedFiles.map(f => f.dir))]
  const packageData = readPackageMetadata()
  const asciiTree = generateAsciiTree(scannedFiles)

  console.log(`📄 Files Scanned: ${scannedFiles.length}`)
  console.log(`📁 Folders: ${uniqueFolders.length}`)
  console.log(`📦 Package: ${packageData.name}@${packageData.version}`)

  extractedInfo.forEach(file => {
    console.log(`\n📄 ${file.file}`)
    if (file.exports.length) console.log('   ├─ Exports:', file.exports)
    if (file.routes.length) console.log('   ├─ Routes:', file.routes)
    if (file.warnings.length) console.log('   🔥 Warnings:', file.warnings)
  })

  // Build security warnings report for .txt
  let warningReport = '\n\n🛡️  Security Warnings Summary:\n'
  let hasWarnings = false

  for (const file of extractedInfo) {
    if (file.warnings && file.warnings.length > 0) {
      hasWarnings = true
      warningReport += `\n📄 ${file.file}\n`
      for (const warning of file.warnings) {
        warningReport += `   - ${warning}\n`
      }
    }
  }

  if (!hasWarnings) {
    warningReport += '\n✅ No warnings found. You’re clear.'
  }

  const txtWithWarnings = asciiTree + warningReport

  saveToFile(STRUCTURE_JSON, JSON.stringify(extractedInfo, null, 2))
  saveToFile(PROJECT_JSON, JSON.stringify({ folders: uniqueFolders, package: packageData }, null, 2))
  saveToFile(STRUCTURE_TXT, txtWithWarnings)

  console.log('\n💾 Output saved:')
  console.log(`🧬 structure.json → ${STRUCTURE_JSON}`)
  console.log(`📦 project.json   → ${PROJECT_JSON}`)
  console.log(`🌳 structure.txt  → ${STRUCTURE_TXT}`)

  console.log('\n' + txtWithWarnings + '\n')
}

runBackendBrain()
