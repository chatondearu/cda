/**
 * Route middleware guarding authenticated-only pages.
 *
 * Usage in a page:
 *   definePageMeta({ middleware: 'auth' })
 *
 * Anonymous users are redirected to the localized login route, preserving the
 * original target via the `redirect` query so login can send them back.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { getSession } = useAuth()
  const { data } = await getSession()

  if (data)
    return

  const localePath = useLocalePath()
  return navigateTo({
    path: localePath('/login'),
    query: { redirect: to.fullPath },
  })
})
