import { FastifyInstance } from 'fastify/types/instance'
import { knex } from '../database'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    '/',
    {
      schema: {
        tags: ['users'],
      },
    },
    async (request, reply) => {
      const createUserSchema = z.object({
        username: z.string(),
      })
      const { username } = createUserSchema.parse(request.body)
      let sessionId = request.cookies.sessionId

      if (!sessionId) {
        sessionId = crypto.randomUUID()
        reply.setCookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      }

      await knex('users').insert({
        username,
        session_id: sessionId,
      })
      reply.status(201)
    },
  )
}
