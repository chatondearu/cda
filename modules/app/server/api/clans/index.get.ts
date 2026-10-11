import { listClansSurfaceForAuthUser } from '@chatondearu/db'

import { useServerAuth } from '../../utils/auth'
import { useDb } from '../../utils/db'

/**
 * Authenticated clan roster for `/clans`.
 * Community session only — read-only, no purchase/join.
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

  return listClansSurfaceForAuthUser(useDb(), user.id)
})
