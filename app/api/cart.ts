import type {CartResponse} from '~/types/CartResponse'
import type {CartAddResponse} from '~/types/CartAddResponse'
import {token, tokenCookie} from '~/composables/useAuth'

export function useCartRequest() {
    const config = useRuntimeConfig()

    return useFetch<CartResponse>('/cart', {
        key: 'cart',
        baseURL: config.public.apiBase as string,
        headers: {Authorization: `Bearer ${token()}`},
        onResponseError({response}) {
            if (response.status === 401) {
                tokenCookie().value = null
                navigateTo('/')
            }
        }
    })
}

export function useCartAddRequest(productIdStartWatch: number, quantityStartWatch: number) {
    const config = useRuntimeConfig()
    const productId = ref(productIdStartWatch)
    const quantity = ref(quantityStartWatch)

    const {data} = useFetch<CartAddResponse>(
        () => `/cart/${productId.value}/${quantity.value}`,
        {
            method: 'POST',
            baseURL: config.public.apiBase as string,
            headers: {Authorization: `Bearer ${token()}`},
            onResponseError({response}) {
                if (response.status === 401) {
                    tokenCookie().value = null
                    navigateTo('/')
                }
            }
        }
    )

    return {productId, quantity: quantity, data}
}
