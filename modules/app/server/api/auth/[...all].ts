import { useServerAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  return await useServerAuth().handler(toWebRequest(event))
})
