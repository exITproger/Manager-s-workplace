import {MOCK_TOKEN, MOCK_USER} from '../../utils/auth-mock'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')

  if (auth !== `Bearer ${MOCK_TOKEN}`) {
    throw createError({
      statusCode: 401,
      data: { errors: ['Не авторизован'] }
    })
  }

  return MOCK_USER
})
