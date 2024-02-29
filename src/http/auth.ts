import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { Elysia, t } from 'elysia'
import { env } from '../env'

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: t.Object({
        sub: t.String(), // Usuário a quem se refere esse token
        restaurantId: t.Optional(t.String()),
      }),
    }),
  )
  .use(cookie())
