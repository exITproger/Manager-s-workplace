import type { ProductCharacteristic } from '~/types/ProductCharacteristic'

export interface Stock {
  quantity: number
  productId: number
  name: string
  price: number
  characteristics: ProductCharacteristic[]
  description: string
  images: string[]
}
