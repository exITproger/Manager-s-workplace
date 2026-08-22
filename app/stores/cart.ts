// app/stores/cart.ts
import { defineStore } from 'pinia'

interface CartItem {
  id: string
  name: string
  price: string
  quantity: string
  image: string
  count: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((sum, item) => sum + (Number(item.price) * item.count), 0),
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.count, 0)
  },
  actions: {
    add(product: Omit<CartItem, 'count'>) {
      const existing = this.items.find(i => i.id === product.id)
      if (existing) {
        // Не даем добавить больше, чем есть на складе
        if (existing.count < Number(existing.quantity)) {
          existing.count++
        } else {
          return { success: false, reason: 'out_of_stock' }
        }
      } else {
        this.items.push({ ...product, count: 1 })
      }
      return { success: true }
    },
    increment(id: string) {
      const item = this.items.find(i => i.id === id)
      if (!item) return { success: false, reason: 'not_found' }

      if (item.count < Number(item.quantity)) {
        item.count++
        return { success: true, item }
      } else {
        return { success: false, reason: 'out_of_stock' }
      }
    },
    decrement(id: string) {
      const item = this.items.find(i => i.id === id)
      if (!item) return

      if (item.count > 1) {
        item.count--
      } else {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      }
    }
  }
})