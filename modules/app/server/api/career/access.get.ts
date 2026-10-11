import { resolveCareerGrant } from '../../utils/careerAccess'

export default defineEventHandler(async (event) => {
  const status = await resolveCareerGrant(event)
  return {
    granted: status.granted,
    via: status.via,
  }
})
