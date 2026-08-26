import { MOCK_TOKEN } from '../../utils/auth-mock'
import { MOCK_PRODUCTS } from '../../utils/catalog-mock'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')

  if (auth !== `Bearer ${MOCK_TOKEN}`) {
    throw createError({
      statusCode: 401,
      data: { errors: ['Не авторизован'] }
    })
  }

  const id = Number(event.context.params?.id)

  if (Number.isNaN(id) || !MOCK_PRODUCTS[id]) {
    throw createError({
      statusCode: 404,
      data: { errors: ['Товар не найден'] }
    })
  }

  return MOCK_PRODUCTS[id]
})
