import { FastifyInstance } from 'fastify/types/instance'
import { knex } from '../database'
import { z } from 'zod'
import { checkSessionIdExists } from '../middlewares/check-user-session'

export async function mealsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', checkSessionIdExists)

  app.addSchema({
    $id: 'meal',
    type: 'object',
    properties: {
      id: { type: 'string' },
      user_id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      isOnDiet: { type: 'boolean' },
      createdAt: { type: 'string' },
    },
  })

  app.get('/', async (request) => {
    return await knex('meals')
      .where({ user_id: request.user?.id })
      .select(
        'id',
        'name',
        'description',
        'is_on_diet as isOnDiet',
        'created_at as createdAt',
      )
  })

  app.post('/', async (request, reply) => {
    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean().default(false),
    })
    const meal = createMealSchema.parse(request.body)

    const [createdMeal] = await knex('meals')
      .insert({
        user_id: request.user?.id,
        name: meal.name,
        description: meal.description,
        is_on_diet: meal.isOnDiet,
      })
      .returning([
        'id',
        'name',
        'description',
        'is_on_diet as isOnDiet',
        'created_at',
      ])

    reply.status(201).send(createdMeal)
  })

  app.put('/:id', async (request, reply) => {
    const getParamsSchema = z.object({
      id: z.string(),
    })

    const updateMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean().default(false),
    })

    const { id } = getParamsSchema.parse(request.params)
    const meal = updateMealSchema.parse(request.body)

    await knex('meals').where({ id, user_id: request.user?.id }).update({
      name: meal.name,
      description: meal.description,
      is_on_diet: meal.isOnDiet,
    })
    reply.status(204)
  })

  app.delete('/:id', async (request, reply) => {
    const getParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = getParamsSchema.parse(request.params)

    await knex('meals').where({ id, user_id: request.user?.id }).delete()
    reply.status(204)
  })

  app.get('/:id', async (request, reply) => {
    const getParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = getParamsSchema.parse(request.params)

    const [meal] = await knex('meals')
      .where({ id, user_id: request.user?.id })
      .select(
        'id',
        'name',
        'description',
        'is_on_diet as isOnDiet',
        'created_at as createdAt',
      )

    if (!meal) {
      reply.status(404).send({ message: 'Meal not found' })
    }

    return meal
  })

  app.get('/metrics', async (request, reply) => {
    const userId = request.user?.id

    const [{ totalMeals }] = await knex('meals')
      .where({ user_id: userId })
      .count('id as totalMeals')

    const [{ totalMealsOnDiet }] = await knex('meals')
      .where({ user_id: userId, is_on_diet: true })
      .count('id as totalMealsOnDiet')

    const meals = await knex('meals')
      .where({ user_id: userId })
      .orderBy('created_at', 'asc')

    let bestSequence = 0
    let currentSequence = 0

    for (const meal of meals) {
      if (meal.is_on_diet) {
        currentSequence += 1
        if (currentSequence > bestSequence) {
          bestSequence = currentSequence
        }
      } else {
        currentSequence = 0
      }
    }

    return reply.send({
      totalMeals,
      totalMealsOnDiet,
      totalMealsWithoutDiet: Number(totalMeals) - Number(totalMealsOnDiet),
      bestDietSequence: bestSequence,
    })
  })
}
