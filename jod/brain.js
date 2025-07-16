import fs from 'node:fs'
import path from 'node:path'

const rootDir = path.resolve('./server')
const outputDir = path.resolve('./jod/memory')
const structureOutput = path.join(outputDir, 'structure.json')
const projectOutput = path.join(outputDir, 'project.json')

// 🧠 Escaneia todos os arquivos .js em server/
function scanDir(dir, base = 'server') {
  const result = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      result.push(...scanDir(fullPath, base))
    } else if (item.endsWith('.js')) {
      result.push({
        path: fullPath.replace(process.cwd() + '/', ''),
        dir: path.relative(base, dir),
        file: item
      })
    }
  }

  return result
}

// 🔍 Extrai info de export e rotas de um arquivo
function extractInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  const exports = lines.filter(l => l.includes('export')).map(l => l.trim())
  const routes = lines.filter(l => l.includes('/api/')).map(l => l.trim())

  return {
    file: filePath.replace(process.cwd() + '/', ''),
    exports,
    routes
  }
}

// 📦 Lê e extrai dados do package.json
function readPackageJson() {
  const pkgPath = path.resolve('package.json')
  if (!fs.existsSync(pkgPath)) return {}

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
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

// 💾 Salva JSON bonito
function saveToMemory(filename, data) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  fs.writeFileSync(filename, JSON.stringify(data, null, 2))
}

// 🚀 Execução principal
function run() {
  const files = scanDir(rootDir)
  const structure = files.map(f => extractInfo(f.path))
  const folders = Array.from(new Set(files.map(f => f.dir)))
  const pkgData = readPackageJson()

  // 📄 Log resumo
  console.log('\n🧠 Projeto analisado:')
  folders.forEach(f => console.log('📁', f))
  structure.forEach(f => {
    console.log(`📄 ${f.file}`)
    if (f.exports.length) console.log('   ├─ Exports:', f.exports)
    if (f.routes.length) console.log('   ├─ Routes:', f.routes)
  })

  // 💾 Salva os dois arquivos
  saveToMemory(structureOutput, structure)
  saveToMemory(projectOutput, {
    folders,
    package: pkgData
  })

  console.log('\n✅ Análise salva com sucesso!')
  console.log(`🧬 Estrutura: ${structureOutput}`)
  console.log(`📦 Projeto:   ${projectOutput}`)
}

run()
