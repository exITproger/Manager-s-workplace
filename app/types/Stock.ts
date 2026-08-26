import type { ProductCharacteristic } from '~/types/ProductCharacteristic'

export interface Stock {
  quantity: number,
  quantityInCart: number,
  productId: number
  name: string
  price: number
  characteristics: ProductCharacteristic[]
  description: string
  images: string[]
}
