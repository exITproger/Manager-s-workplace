import type { Stock } from '~/types/Stock'
import { token, tokenCookie } from '~/composables/useAuth'

export function useProductRequest(id: number) {
  const config = useRuntimeConfig()

  return useFetch<Stock>(`/product/${id}`, {
    key: `product-${id}`,
    baseURL: config.public.apiBase as string,
    headers: { Authorization: `Bearer ${token()}` },
    onResponseError({ response }) {
      if (response.status === 401) {
        tokenCookie().value = null
        navigateTo('/')
      }
    }
  })
}
