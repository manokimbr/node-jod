import { createServer } from 'node:http'

const server = createServer(async (req, res) => {
  if (req.url === '/api/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      message: 'pong from Node Jod 🧬',
      version: process.version
    }))
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
  }
})

server.listen(3001, () => {
  console.log('🔥 node-jod running at http://localhost:3001')
})
