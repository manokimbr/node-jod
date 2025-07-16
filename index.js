import { createServer } from 'node:http'

const PORT = process.env.PORT || 3001

const server = createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Node Jod is alive 🧬')
  } else if (req.url === '/api/ping') {
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

server.listen(PORT, () => {
  console.log(`🔥 node-jod running on port ${PORT}`)
})
