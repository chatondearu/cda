import { readCareerContact, resolveCareerGrant } from '../../utils/careerAccess'

export default defineEventHandler(async (event) => {
  const status = await resolveCareerGrant(event)
  if (!status.granted) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Career access required',
    })
  }

  return readCareerContact(useRuntimeConfig(event))
})
