export default defineNuxtRouteMiddleware((to) => {
  const requestUrl = useRequestURL()
  const config = useRuntimeConfig()
  const requestHost = requestUrl.host.split(':')[0]?.trim().toLowerCase() ?? ''
  const meHost = String(config.public.meHost ?? '').trim().toLowerCase()
  const isMeSubdomain = meHost.length > 0 && requestHost === meHost

  if (!isMeSubdomain) {
    return
  }

  if (to.path !== '/') {
    return navigateTo('/', { redirectCode: 301 })
  }
})
