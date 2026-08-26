import { MOCK_TOKEN } from '../../../utils/auth-mock'
import { MOCK_CART } from '../../../utils/cart-mock'
import { MOCK_CATALOG } from '../../../utils/catalog-mock'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')

  if (auth !== `Bearer ${MOCK_TOKEN}`) {
    throw createError({
      statusCode: 401,
      data: { errors: ['Не авторизован'] }
    })
  }

  const productId = Number(event.context.params?.productId)
  const quantity = Number(event.context.params?.quantity)

  if (Number.isNaN(productId) || Number.isNaN(quantity)) {
    throw createError({
      statusCode: 400,
      data: { errors: ['Неверные параметры'] }
    })
  }

  const catalogProduct = MOCK_CATALOG.find((p) => p.productId === productId)

  if (!catalogProduct) {
    throw createError({
      statusCode: 404,
      data: { errors: ['Товар не найден'] }
    })
  }

  const existingIndex = MOCK_CART.deferredStocks.findIndex(
    (item) => item.productId === productId
  )

  if (quantity <= 0) {
    if (existingIndex !== -1) {
      MOCK_CART.deferredStocks.splice(existingIndex, 1)
    }
  } else if (existingIndex !== -1) {
    const item = MOCK_CART.deferredStocks[existingIndex]!
    item.quantityInCart = quantity
  } else {
    MOCK_CART.deferredStocks.push({
      quantityInCart: quantity,
      quantity: catalogProduct.quantity,
      productId: catalogProduct.productId,
      name: catalogProduct.name,
      price: catalogProduct.price,
      images: catalogProduct.images
    })
  }

  MOCK_CART.total = MOCK_CART.deferredStocks.reduce(
    (sum, item) => sum + item.price * item.quantityInCart,
    0
  )

  return {
    productId,
    selectedQuantity: quantity
  }
})
