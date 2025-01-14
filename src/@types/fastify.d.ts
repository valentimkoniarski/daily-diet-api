// eslint-disable-next-line
import { FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string
      username: string
      createdAt: string
      session_id?: string
    }
  }
}
