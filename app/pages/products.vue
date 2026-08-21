<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header -->
    <div class="px-4 pt-14 flex-shrink-0">
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
          <UIcon
            name="i-heroicons-bars-3"
            class="w-5 h-5 text-gray-400"
          />
        </template>

        <template #trailing>
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="w-5 h-5 text-gray-400"
          />
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
          @add-to-cart="addToCart"
        />
      </div>

      <!-- Empty state -->
      <div
        v-if="filteredProducts.length === 0"
        class="py-16 text-center"
      >
        <UIcon
          name="i-heroicons-magnifying-glass"
          class="w-10 h-10 mx-auto text-gray-400"
        />

        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Товары не найдены
        </p>
      </div>
    </div>

    <!--
    Bottom navigation
    <div
      class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 flex justify-around py-2 z-50"
    >
      Home
      <UButton
        color="neutral"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0"
        @click="goToHome"
      >
        <UIcon
          name="i-heroicons-home"
          class="w-6 h-6"
        />
        <span class="text-[10px]">Главная</span>
      </UButton>

      Tasks 
      <UButton
        color="neutral"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0 relative"
        @click="goToTasks"
      >
        <UIcon
          name="i-heroicons-clipboard-document-list"
          class="w-6 h-6"
        />
        <span
          class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#B3261E] text-white text-[10px] rounded-full"
        >
          5
        </span>
        <span class="text-[10px]">Задачи</span>
      </UButton>

      Catalog
      <UButton
        color="neutral"
        variant="ghost"
        class="flex flex-col items-center text-black dark:text-white gap-0 h-auto py-1 px-0 min-w-0"
        @click="goToCatalog"
      >
        <UIcon
          name="i-heroicons-squares-2x2"
          class="w-6 h-6"
        />
        <span class="text-[10px]">Каталог</span>
      </UButton>

      Cart
      <UButton
        color="neutral"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0 relative"
        @click="goToCart"
      >
        <UIcon
          name="i-heroicons-shopping-cart"
          class="w-6 h-6"
        />
        <span
          class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#B3261E] text-white text-[10px] rounded-full"
        >
          2
        </span>
        <span class="text-[10px]">Корзина</span>
      </UButton>
    </div>
    -->

  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const colorMode = useColorMode()

const searchQuery = ref('')

const products = ref([
  {
    id: '100001',
    name: 'Coca-Cola 0.5L',
    price: '89',
    quantity: '24',
    image: '/phone.jpg'
  },
  {
    id: '100002',
    name: 'Pepsi 0.5L',
    price: '79',
    quantity: '18',
    image: '/phone.jpg'
  },
  {
    id: '100003',
    name: 'Lay’s Classic',
    price: '129',
    quantity: '32',
    image: '/phone.jpg'
  },
  {
    id: '100004',
    name: 'Snickers',
    price: '99',
    quantity: '41',
    image: '/phone.jpg'
  },
  {
    id: '100005',
    name: 'Kinder Chocolate',
    price: '119',
    quantity: '27',
    image: '/phone.jpg'
  },
  {
    id: '100006',
    name: 'Red Bull 0.25L',
    price: '149',
    quantity: '15',
    image: '/phone.jpg'
  }
])

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return products.value
  }

  return products.value.filter((product) => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.id.toLowerCase().includes(query)
    )
  })
})

const toggleTheme = () => {
  colorMode.preference =
    colorMode.value === 'dark' ? 'light' : 'dark'
}

const addToCart = (product: (typeof products.value)[number]) => {
  console.log('Add to cart:', product)
}

const goBack = () => router.back()

const goToHome = () => router.push('/')
const goToTasks = () => router.push('/tasks')
const goToCatalog = () => router.push('/products')
const goToCart = () => router.push('/cart')
const goToNotifications = () => router.push('/notifications')
const goToProfile = () => router.push('/profile')
</script>

<style>
input {
  outline: none !important;
  outline-style: none !important;
  box-shadow: none !important;
}
</style>