import { createServer } from 'node:http'
import { router } from './server/routes/router.js'
import { loadEnv } from './server/utils/env.js'

// ✅ Aguarda o carregamento assíncrono do .env
await loadEnv()

const PORT = process.env.PORT || 3001

const server = createServer(async (req, res) => {
  // 🛡️ CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // 🔄 Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // 🧠 Roteamento normal
  router(req, res)
})

server.listen(PORT, () => {
  console.log(`🔥 node-jod running on port ${PORT} (${process.env.NODE_ENV})`)
})
