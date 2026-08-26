import type {CartItem} from '~/types/CartItem'
import {token, tokenCookie} from '~/composables/useAuth'

export function useCatalogRequest(options?: {
    id?: MaybeRefOrGetter<number | undefined>
    price?: MaybeRefOrGetter<number | undefined>
    priceFrom?: MaybeRefOrGetter<number | undefined>
    priceTo?: MaybeRefOrGetter<number | undefined>
    quantity?: MaybeRefOrGetter<number | undefined>
    quantityFrom?: MaybeRefOrGetter<number | undefined>
    quantityTo?: MaybeRefOrGetter<number | undefined>
    productName?: MaybeRefOrGetter<string | undefined>
    page?: MaybeRefOrGetter<number | undefined>
    pageLimit?: MaybeRefOrGetter<number | undefined>
}) {
    const config = useRuntimeConfig()

    return useFetch<CartItem[]>('/catalog', {
        key: 'catalog',
        baseURL: config.public.apiBase as string,
        headers: {Authorization: `Bearer ${token()}`},
        query: {
            id: options?.id,
            price: options?.price,
            price_from: options?.priceFrom,
            price_to: options?.priceTo,
            quantity: options?.quantity,
            quantity_from: options?.quantityFrom,
            quantity_to: options?.quantityTo,
            product_name: options?.productName,
            page: options?.page,
            page_limit: options?.pageLimit,
        },
        default: () => [],
        onResponseError({response}) {
            if (response.status === 401) {
                tokenCookie().value = null
                navigateTo('/')
            }
        }
    })
}
