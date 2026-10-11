import { getCommunityAccountForAuthUser } from '@chatondearu/db'

import { useServerAuth } from '../../utils/auth'
import { useDb } from '../../utils/db'

/**
 * Authenticated community hub payload for `/account`.
 * Community session only — never mixes CV grant state.
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

  const snapshot = await getCommunityAccountForAuthUser(useDb(), user.id)

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image ?? null,
    },
    ...snapshot,
  }
})
