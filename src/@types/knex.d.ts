// eslint-disable-next-line
import { Knex } from "knex"

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      username: string
      createdAt: string
      session_id: string
    },
  }
}