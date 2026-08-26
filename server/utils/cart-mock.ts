export const MOCK_CART = {
    id: 1,
    deferredStocks: [] as {
        quantityInCart: number
        quantity: number
        productId: number
        name: string
        price: number
        images: string[]
    }[],
    total: 0
}
