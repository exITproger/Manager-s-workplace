<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header -->
    <div class="px-4 pt-6 flex-shrink-0">
      <div class="flex items-center justify-between">
        <UButton
          color="neutral"
          variant="ghost"
          class="text-[#70439e] dark:text-[#b388e8] p-0 min-w-0 h-auto flex items-center gap-1 text-sm font-normal"
          @click="goBack"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
          <span>Назад</span>
        </UButton>
        <UButton
          variant="ghost"
          color="neutral"
          square
          class="p-0 min-w-0 h-auto"
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
          :ui="{ leadingIcon: 'size-5' }"
          aria-label="Переключить тему"
          @click="toggleTheme"
        />
      </div>
    </div>

    <!-- Search -->
    <div class="px-4 pt-4">
      <UInput
        v-model="searchQuery"
        placeholder="Название или артикул товара..."
        class="custom-search w-full"
        :ui="{
          base: 'bg-[#ECE6F0] dark:bg-gray-800 rounded-full border-2 border-transparent text-black dark:text-white placeholder-gray-400 text-sm transition-colors duration-200 hover:border-gray-300 dark:hover:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-0 focus:outline-none'
        }"
      >
        <template #leading>
          <UIcon name="i-heroicons-bars-3" class="w-5 h-5 text-gray-400" />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 text-gray-400" />
        </template>
      </UInput>
    </div>

    <!-- Product grid -->
    <div class="px-4 pb-24 mt-4">
      <div class="grid grid-cols-2 gap-4">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @select="openProduct"
          @add-to-cart="addToCartHandler"
        />
      </div>

      <!-- Empty state -->
      <div v-if="filteredProducts.length === 0" class="py-16 text-center">
        <UIcon name="i-heroicons-magnifying-glass" class="w-10 h-10 mx-auto text-gray-400" />
        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Товары не найдены</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products'
import type { Product } from '~/data/products'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const colorMode = useColorMode()
const cart = useCartStore() // Инициализируем стор

const searchQuery = ref('')

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return products
  }

  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.id.toLowerCase().includes(query)
    )
  })
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const addToCartHandler = (product: Product) => {
  cart.addToCart(product) // Метод из стора
}

const openProduct = (product: Product) => {
  router.push(`/products/${product.id}`)
}

const goBack = () => router.back()
</script>

<style>
input {
  outline: none !important;
  outline-style: none !important;
  box-shadow: none !important;
}
</style>