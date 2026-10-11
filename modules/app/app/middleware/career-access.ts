/**
 * Guards unlisted career CV routes. Community session alone is never enough;
 * grant is cookie token and/or auth allowlist (see server/utils/careerAccess).
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const localePath = useLocalePath()
  const accessPath = localePath('/rx-quiet/catnip-buffer/career/access')
  const requestFetch = useRequestFetch()

  const queryToken = typeof to.query.cv_token === 'string' ? to.query.cv_token.trim() : ''
  if (queryToken) {
    try {
      await requestFetch('/api/career/access', {
        method: 'POST',
        body: { token: queryToken },
      })
    }
    catch {
      // Invalid token — fall through to grant check / access page.
    }
  }

  const status = await requestFetch<{ granted: boolean }>('/api/career/access')
  const isAccessPage = to.path === accessPath
    || to.path.endsWith('/career/access')

  if (status.granted) {
    if (isAccessPage) {
      const redirect = typeof to.query.redirect === 'string' ? to.query.redirect : ''
      const careerHome = localePath('/rx-quiet/catnip-buffer/career')
      return navigateTo(redirect || careerHome, { replace: true })
    }
    return
  }

  if (isAccessPage)
    return

  return navigateTo({
    path: accessPath,
    query: {
      redirect: to.fullPath,
      ...(queryToken ? { cv_token: queryToken } : {}),
    },
  })
})
