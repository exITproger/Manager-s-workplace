import type { CartItem } from '~/types/CartItem'
import { token, tokenCookie } from '~/composables/useAuth'

export function useCatalogRequest(
  id?: number,
  price?: number,
  priceFrom?: number,
  priceTo?: number,
  quantity?: number,
  quantityFrom?: number,
  quantityTo?: number,
  productName?: string,
  page?: number,
  pageLimit?: number
) {
  const config = useRuntimeConfig()
  const queryBody: Record<string, string | number> = {}

  if (id !== undefined) queryBody.id = id
  if (price !== undefined) queryBody.price = price
  if (priceFrom !== undefined) queryBody.price_from = priceFrom
  if (priceTo !== undefined) queryBody.price_to = priceTo
  if (quantity !== undefined) queryBody.quantity = quantity
  if (quantityFrom !== undefined) queryBody.quantity_from = quantityFrom
  if (quantityTo !== undefined) queryBody.quantity_to = quantityTo
  if (productName) queryBody.product_name = productName
  if (page !== undefined) queryBody.page = page
  if (pageLimit !== undefined) queryBody.page_limit = pageLimit

  return useFetch<CartItem[]>('/catalog', {
    key: 'catalog',
    baseURL: config.public.apiBase as string,
    headers: { Authorization: `Bearer ${token()}` },
    query: queryBody,
    default: () => [],
    onResponseError({ response }) {
      if (response.status === 401) {
        tokenCookie().value = null
        navigateTo('/')
      }
    }
  })
}
