export function handlePing(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      message: 'pong from Node Jod 🧬',
      version: process.version,
      env: process.env.NODE_ENV,
      port: process.env.PORT
    }))
  }
  