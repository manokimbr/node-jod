import { handlePing } from '../handlers/pingHandler.js'

export function router(req, res) {
  const url = req.url

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Node Jod is alive 🧬')
  }

  else if (url === '/api/ping') {
    handlePing(req, res)
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
  }
}
