import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

const connection = env.DATABASE_CLIENT === 'sqlite3' ? {
  filename: env.DATABASE_URL,
} : env.DATABASE_URL

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: connection,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './migrations',
  },
}

export const knex = setupKnex(config);