import { it, expect, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

beforeEach(() => {
  execSync('npm run knex migrate:rollback --all')
  execSync('npm run knex migrate:latest')
})

describe('Testes das rotas de meals', () => {
  it('O usuário deve conseguir cadastrar uma refeição', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        username: 'Valentim Koniarski Junior',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')?.[0] || ''

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookie)
      .send({
        name: 'Almoço',
        description: 'Arroz, feijão, batata frita e bife',
        isOnDiet: true,
      })
      .expect(201)
  })

  it('O usuário deve conseguir listar suas refeições', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        username: 'Valentim Koniarski Junior',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')?.[0] || ''

    const mealResponse = await request(app.server)
      .post('/meals')
      .set('Cookie', cookie)
      .send({
        name: 'Almoço',
        description: 'Arroz, feijão, batata frita e bife',
        isOnDiet: true,
      })
      .expect(201)

    await request(app.server)
      .get('/meals')
      .set('Cookie', cookie)
      .expect(200)
      .expect([
        {
          id: mealResponse.body.id,
          name: mealResponse.body.name,
          description: mealResponse.body.description,
          isOnDiet: mealResponse.body.isOnDiet,
          createdAt: mealResponse.body.created_at,
        },
      ])
  })

  it('O usuário deve conseguir atualizar uma refeição', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        username: 'Valentim Koniarski Junior',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')?.[0] || ''

    const mealResponse = await request(app.server)
      .post('/meals')
      .set('Cookie', cookie)
      .send({
        name: 'Almoço',
        description: 'Arroz, feijão, batata frita e bife',
        isOnDiet: true,
      })
      .expect(201)

    await request(app.server)
      .put(`/meals/${mealResponse.body.id}`)
      .set('Cookie', cookie)
      .send({
        name: 'Jantar',
        description: 'Sopa de legumes',
        isOnDiet: false,
      })
      .expect(204)
  })

  it('O usuário deve conseguir apagar uma refeição', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        username: 'Valentim Koniarski Junior',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')?.[0] || ''

    const mealResponse = await request(app.server)
      .post('/meals')
      .set('Cookie', cookie)
      .send({
        name: 'Almoço',
        description: 'Arroz, feijão, batata frita e bife',
        isOnDiet: true,
      })
      .expect(201)

    await request(app.server)
      .delete(`/meals/${mealResponse.body.id}`)
      .set('Cookie', cookie)
      .expect(204)
  })

  it('O usuário deve conseguir visualizar uma refeição específica', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        username: 'Valentim Koniarski Junior',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')?.[0] || ''

    const mealResponse = await request(app.server)
      .post('/meals')
      .set('Cookie', cookie)
      .send({
        name: 'Almoço',
        description: 'Arroz, feijão, batata frita e bife',
        isOnDiet: true,
      })
      .expect(201)

    await request(app.server)
      .get(`/meals/${mealResponse.body.id}`)
      .set('Cookie', cookie)
      .expect(200)
      .expect({
        id: mealResponse.body.id,
        name: mealResponse.body.name,
        description: mealResponse.body.description,
        isOnDiet: mealResponse.body.isOnDiet,
        createdAt: mealResponse.body.created_at,
      })
  })

  it('O usuário deve conseguir obter métricas de refeições', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        username: 'Valentim Koniarski Junior',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')?.[0] || ''

    await request(app.server).post('/meals').set('Cookie', cookie).send({
      name: 'Almoço',
      description: 'Arroz, feijão, batata frita e bife',
      isOnDiet: true,
    })

    await request(app.server).post('/meals').set('Cookie', cookie).send({
      name: 'Jantar',
      description: 'Salada e frango grelhado',
      isOnDiet: false,
    })

    const metricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', cookie)
      .expect(200)

    expect(metricsResponse.body).toEqual({
      totalMeals: 2,
      totalMealsOnDiet: 1,
      totalMealsWithoutDiet: 1,
      bestDietSequence: 1,
    })
  })
})
