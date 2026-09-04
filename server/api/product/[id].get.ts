import { MOCK_TOKEN } from '../../utils/auth-mock'
import { MOCK_PRODUCTS } from '../../utils/catalog-mock'
import { MOCK_CART } from '../../utils/cart-mock'

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

  const product = { ...MOCK_PRODUCTS[id] }
  const cartItem = MOCK_CART.deferredStocks.find(item => item.productId === id)
  product.quantityInCart = cartItem ? cartItem.quantityInCart : 0

  return product
})
