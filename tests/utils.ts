import knex from 'knex'
import config from '../config'

async function cleanDb(): Promise <void> {
  const db = knex({
    client: 'pg',
    connection: {
      host: config.postgres.host,
      user: config.postgres.user,
      password: config.postgres.password,
      database: config.postgres.database,
    },
  })
  await db.table(config.postgres.tables.customer_support_agents).truncate()
  await db.table(config.postgres.tables.customer_support_issues).truncate()
  await db.destroy()
}

// eslint-disable-next-line import/prefer-default-export
export { cleanDb }
