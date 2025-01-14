import Fastify from 'fastify'
import { usersRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'
import cookie from '@fastify/cookie'

export const app = Fastify()

app.register(cookie)

app.register(fastifyCors, {
  origin: '*',
})

const swaggerOptions = {
  swagger: {
    info: {
      title: 'Daily Diet API',
      description: '',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'Default', description: 'Default' }],
  },
}

const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
}

app.register(fastifySwagger, swaggerOptions)
app.register(fastifySwaggerUi, swaggerUiOptions)

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(mealsRoutes, {
  prefix: '/meals',
})
