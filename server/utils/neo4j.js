// server/utils/neo4j.js

import neo4j from 'neo4j-driver'

let driver

function ensureEnv(name) {
  const value = process.env[name]
  if (!value) {
    console.error(`❌ ENV Missing: ${name}`)
    throw new Error(`❌ Missing required environment variable: ${name}`)
  }
  return value
}

export function getNeo4jDriver() {
  if (!driver) {
    console.log('🧠 Initializing Neo4j driver...')

    const uri = ensureEnv('NEO4J_URI')
    const user = ensureEnv('NEO4J_USERNAME')
    const password = ensureEnv('NEO4J_PASSWORD')

    console.log(`🔐 Connecting to ${uri} as ${user}...`)

    try {
      driver = neo4j.driver(uri, neo4j.auth.basic(user, password))

      // 👇 Immediately verify the connection on boot
      driver.verifyConnectivity()
        .then(() => console.log('✅ Neo4j connectivity verified'))
        .catch(err => {
          console.error('❌ Neo4j connectivity failed:', err.message)
          process.exit(1)
        })

    } catch (err) {
      console.error('❌ Failed to initialize Neo4j driver:', err.message)
      process.exit(1)
    }
  }

  return driver
}

export function getNeo4jSession() {
  const database = ensureEnv('NEO4J_DATABASE')
  console.log(`📁 Opening Neo4j session on database: ${database}`)
  return getNeo4jDriver().session({ database })
}
