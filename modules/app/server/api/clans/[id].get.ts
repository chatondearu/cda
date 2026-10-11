import { getClanSurfaceForAuthUser } from '@chatondearu/db'

import { useServerAuth } from '../../utils/auth'
import { useDb } from '../../utils/db'

/**
 * Authenticated single-clan detail for `/clans/:id`.
 */
export default defineEventHandler(async (event) => {
  const auth = useServerAuth()
  const session = await auth.api.getSession({ headers: event.headers })
  const user = session?.user
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const clanId = getRouterParam(event, 'id')
  if (!clanId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing clan id',
    })
  }

  const detail = await getClanSurfaceForAuthUser(useDb(), user.id, clanId)
  if (!detail) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Clan not found',
    })
  }

  return detail
})
