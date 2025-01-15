import { env } from './env'
import { Knex, knex as setupKnex } from 'knex'

const connection =
  env.DATABASE_CLIENT === 'sqlite'
    ? {
        filename: env.DATABASE_URL,
      }
    : env.DATABASE_URL

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: connection,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './migrations',
  },
}

export const knex = setupKnex(config)
