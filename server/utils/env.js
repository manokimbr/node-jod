// server/utils/env.js

import { promises as fs } from 'node:fs'
import * as path from 'node:path'

export async function loadEnv() {
  const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'
  const filePath = path.resolve(process.cwd(), envFile)

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    content.split('\n').forEach(line => {
      if (!line.trim() || line.startsWith('#')) return
      const [key, value] = line.split('=')
      if (key && value) {
        process.env[key.trim()] = value.trim()
      }
    })
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`⚠️ Arquivo ${envFile} não encontrado`)
    } else {
      console.error('❌ Erro ao carregar variáveis de ambiente:', err)
    }
  }
}
