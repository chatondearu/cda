export default defineNuxtRouteMiddleware((to) => {
  const requestUrl = useRequestURL()
  const config = useRuntimeConfig()
  const requestHost = requestUrl.host.split(':')[0]?.trim().toLowerCase() ?? ''
  const meHost = String(config.public.meHost ?? 'me.rlienard.fr').trim().toLowerCase()
  const isMeSubdomain = requestHost === meHost

  if (!isMeSubdomain) {
    return
  }

  if (to.path !== '/') {
    return navigateTo('/', { redirectCode: 301 })
  }
})
