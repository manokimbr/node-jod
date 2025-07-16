import { createServer } from 'node:http'
import { router } from './server/routes/router.js'
import { loadEnv } from './server/utils/env.js'

loadEnv()

const PORT = process.env.PORT || 3001

const server = createServer(async (req, res) => {
  router(req, res)
})

server.listen(PORT, () => {
  console.log(`🔥 node-jod running on port ${PORT} (${process.env.NODE_ENV})`)
})
