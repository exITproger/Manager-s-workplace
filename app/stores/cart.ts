import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as any[],
  }),

  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.count, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + (Number(item.price) * item.count), 0),
  },

  actions: {
    addToCart(product: any, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        // Если товар уже есть, увеличиваем, но не больше остатка
        if (existingItem.count < Number(existingItem.quantity)) {
          existingItem.count += quantity
        }
      } else {
        this.items.push({ ...product, count: quantity })
      }
    },

    removeFromCart(productId: string) {
      this.items = this.items.filter(item => item.id !== productId)
    },

    decrement(productId: string) {
      const item = this.items.find(i => i.id === productId)
      if (item) {
        item.count -= 1
        if (item.count <= 0) this.removeFromCart(productId)
      }
    },

    // Возвращаем объект, чтобы понять, прошло ли увеличение
    increment(productId: string) {
      const item = this.items.find(i => i.id === productId)
      
      if (!item) return { success: false }
      
      if (item.count < Number(item.quantity)) {
        item.count += 1
        return { success: true }
      } else {
        return { success: false }
      }
    },

    clearCart() {
      this.items = []
    }
  },
})