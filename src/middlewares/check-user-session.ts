import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import { knex } from '../database'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    reply.status(401).send({
      error: 'Session ID not found',
    })
    return
  }

  const user = await knex('users').where({ session_id: sessionId }).first()

  if (!user) {
    reply.status(401).send({
      error: 'User not found',
    })
    return
  }

  request.user = user
}
