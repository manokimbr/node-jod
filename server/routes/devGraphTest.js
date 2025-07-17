import { getNeo4jSession } from '../utils/neo4j.js'

export async function devGraphTest(req, res) {
  if (req.url === '/api/dev/graph-ping' && req.method === 'GET') {
    try {
      const session = getNeo4jSession()
      const result = await session.run("RETURN 'Node-JOD is connected 🧠' AS message")
      const message = result.records[0].get('message')
      await session.close()

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message }))
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: err.message }))
    }
  }
}
