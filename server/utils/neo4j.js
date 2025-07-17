import neo4j from 'neo4j-driver'

let driver

export function getNeo4jDriver() {
  if (!driver) {
    const uri = process.env.NEO4J_URI
    const user = process.env.NEO4J_USERNAME
    const password = process.env.NEO4J_PASSWORD

    driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  }

  return driver
}

export function getNeo4jSession() {
  const database = process.env.NEO4J_DATABASE
  return getNeo4jDriver().session({ database })
}
