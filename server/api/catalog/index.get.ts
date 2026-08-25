import { MOCK_TOKEN } from '../../utils/auth-mock'
import { MOCK_CATALOG } from '../../utils/catalog-mock'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')

  if (auth !== `Bearer ${MOCK_TOKEN}`) {
    throw createError({
      statusCode: 401,
      data: { errors: ['Не авторизован'] }
    })
  }

  const query = getQuery(event)

  let result = [...MOCK_CATALOG]

  const productName = query.product_name
  if (typeof productName === 'string' && productName.trim()) {
    const lower = productName.trim().toLowerCase()
    result = result.filter((item) => item.name.toLowerCase().includes(lower))
  }

  const productId = Number(query.id)
  if (!Number.isNaN(productId) && query.id !== undefined) {
    result = result.filter((item) => item.productId === productId)
  }

  const price = Number(query.price)
  if (!Number.isNaN(price) && query.price !== undefined) {
    result = result.filter((item) => item.price === price)
  }

  const priceFrom = Number(query.price_from)
  if (!Number.isNaN(priceFrom) && query.price_from !== undefined) {
    result = result.filter((item) => item.price >= priceFrom)
  }

  const priceTo = Number(query.price_to)
  if (!Number.isNaN(priceTo) && query.price_to !== undefined) {
    result = result.filter((item) => item.price <= priceTo)
  }

  const quantity = Number(query.quantity)
  if (!Number.isNaN(quantity) && query.quantity !== undefined) {
    result = result.filter((item) => item.quantity === quantity)
  }

  const quantityFrom = Number(query.quantity_from)
  if (!Number.isNaN(quantityFrom) && query.quantity_from !== undefined) {
    result = result.filter((item) => item.quantity >= quantityFrom)
  }

  const quantityTo = Number(query.quantity_to)
  if (!Number.isNaN(quantityTo) && query.quantity_to !== undefined) {
    result = result.filter((item) => item.quantity <= quantityTo)
  }

  const page = Math.max(Number(query.page) || 1, 1)
  const pageLimit = Number(query.page_limit) || result.length

  return result.slice((page - 1) * pageLimit, page * pageLimit)
})
