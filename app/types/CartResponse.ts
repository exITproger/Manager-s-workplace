import type {CartItem} from '~/types/CartItem'

export interface CartResponse {
    id: number
    deferredStocks: CartItem[]
    total: number
}
