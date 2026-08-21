<template>
  <div
    class="relative bg-[#ECE6F0] dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
  >
    <!-- Product image -->
    <div class="h-[200px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Product information -->
    <div class="px-1.5 py-0.5 space-y-1.5">
      <!-- Price -->
      <div class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-banknote"
          class="w-6 h-6 text-black dark:text-gray-400 shrink-0"
        />

        <span class="text-sm font-semibold text-black dark:text-white">
          {{ product.price }} ₽
        </span>
      </div>

      <!-- Product name -->
      <div class="text-xs font-medium text-black dark:text-white">
        {{ product.name }}
      </div>

      <!-- Quantity -->
      <div class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-inbox"
          class="w-6 h-6 text-black dark:text-gray-400 shrink-0"
        />

        <span class="text-sm text-black dark:text-white">
          {{ product.quantity }} шт
        </span>
      </div>

      <!-- Product ID -->
      <div class="text-xs text-black dark:text-white">
        {{ product.id }}
      </div>
    </div>

    <!-- Add to cart -->
    <UButton
      color="neutral"
      variant="solid"
      class="absolute right-2 top-[70%] -translate-y-1/2 w-12 h-9 rounded-lg bg-white text-gray-700 border border-gray-300 flex items-center justify-center shadow-md hover:bg-gray-100"
      aria-label="Добавить в корзину"
      @click="emit('add-to-cart', product)"
    >
      <UIcon
        name="i-lucide-shopping-basket"
        class="w-5 h-5"
      />
    </UButton>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: string
  name: string
  price: string
  quantity: string
  image: string
}

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  'add-to-cart': [product: Product]
}>()
</script>