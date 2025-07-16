import * as fs from 'node:fs'
import * as path from 'node:path'

export function loadEnv() {
  const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'
  const filePath = path.resolve(process.cwd(), envFile)

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8')
    content.split('\n').forEach(line => {
      if (!line.trim() || line.startsWith('#')) return
      const [key, value] = line.split('=')
      if (key && value) {
        process.env[key.trim()] = value.trim()
      }
    })
  } else {
    console.warn(`⚠️ Arquivo ${envFile} não encontrado`)
  }
}
