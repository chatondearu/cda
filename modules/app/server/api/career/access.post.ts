import {
  isCareerTokenValid,
  issueCareerGrantCookie,
  resolveCareerGrant,
} from '../../utils/careerAccess'

interface CareerAccessBody {
  token?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CareerAccessBody>(event).catch(() => ({} as CareerAccessBody))
  const token = String(body.token ?? '').trim()
  const config = useRuntimeConfig(event)

  if (!token || !isCareerTokenValid(token, config)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Invalid career access token',
    })
  }

  issueCareerGrantCookie(event)
  const status = await resolveCareerGrant(event)
  return {
    granted: status.granted,
    via: status.via,
  }
})
