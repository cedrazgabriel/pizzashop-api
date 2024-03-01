import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { Elysia, t, type Static } from 'elysia'
import { env } from '../env'

const jwtPayload = t.Object({
  sub: t.String(), // Usuário a quem se refere esse token
  restaurantId: t.Optional(t.String()),
})
export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .use(cookie())
  .derive(({ jwt, setCookie, removeCookie, cookie }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign(payload)

        setCookie('auth', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 dias,
          path: '/',
        })
      },

      signOut: () => {
        removeCookie('auth')
      },

      getCurrentUser: async () => {
        // Pega o cookie chamado auth
        const authCookie = cookie.auth

        // Verifica a assinatura do cookie com o jwt e retorna false se foi modificado/erro.
        const payload = await jwt.verify(authCookie)

        // Se não conseguiu verificar a assinatura
        if (!payload) {
          throw new Error('Unauthorized')
        }

        // Devolve os dados do token descriptografados
        return {
          userId: payload.sub,
          restaurantId: payload.restaurantId,
        }
      },
    }
  })
