<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header -->
    <div class="px-4 pt-6">
      <div class="flex items-center justify-between">
        <UButton
            color="neutral"
            variant="ghost"
            class="text-[#70439e] dark:text-[#b388e8] p-0 min-w-0 h-auto flex items-center gap-1 text-sm font-normal"
            @click="goBack">
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4"/>
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

    <!-- Loading -->
    <div v-if="pending" class="px-4 py-16 text-center">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 mx-auto text-gray-400 animate-spin"/>
      <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Загрузка...</p>
    </div>

    <!-- Product -->
    <div v-else-if="product" class="px-4 pb-24 mt-6">
      <!-- Image -->
      <div class="w-full aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
            v-if="product.images.length > 0"
            :src="product.images[0]"
            :alt="product.name"
            class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <UIcon name="i-lucide-image" class="w-16 h-16 text-gray-300 dark:text-gray-600"/>
        </div>
      </div>

      <!-- Product information -->
      <div class="mt-6 space-y-6">
        <div class="flex items-center justify-between gap-3">
          <!-- Price -->
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-banknote" class="w-7 h-7 text-black dark:text-gray-400 shrink-0"/>
            <span class="text-xl font-medium text-black dark:text-white">{{ product.price }} ₽</span>
          </div>

          <!-- Quantity picker (in cart) -->
          <div
              v-if="req.quantity.value > 0"
              class="w-24 h-9 shrink-0 rounded-lg bg-[#7A66AF] shadow-md overflow-hidden flex items-center text-white"
          >
            <UButton
                color="neutral"
                variant="ghost"
                class="w-8 h-9 min-w-0 p-0 rounded-none text-white hover:bg-[#70439e] flex items-center justify-center"
                aria-label="Уменьшить количество"
                @click="decreaseQuantity">
              <UIcon v-if="req.quantity.value > 1" name="i-heroicons-minus" class="w-4 h-4"/>
              <UIcon v-else name="i-heroicons-trash" class="w-4 h-4"/>
            </UButton>

            <div class="w-px h-5 bg-white/40 shrink-0"/>

            <div class="w-8 h-9 flex items-center justify-center text-sm font-medium">
              {{ req.quantity.value }}
            </div>

            <div class="w-px h-5 bg-white/40 shrink-0"/>

            <UButton
                color="neutral"
                variant="ghost"
                class="w-8 h-9 min-w-0 p-0 rounded-none text-white hover:bg-[#70439e] flex items-center justify-center"
                aria-label="Увеличить количество"
                @click="increaseQuantity"
            >
              <UIcon name="i-heroicons-plus" class="w-4 h-4"/>
            </UButton>
          </div>

          <!-- Add to cart button -->
          <UButton
              v-else
              class="w-24 h-9 shrink-0 rounded-lg bg-[#7A66AF] hover:bg-[#70439e] text-white flex items-center justify-center text-sm font-medium shadow-md"
              @click="addToCart"
          >
            В корзину
          </UButton>
        </div>

        <!-- Name -->
        <div class="-mt-3">
          <h1 class="text-xl font-normal text-black dark:text-white">{{ product.name }}</h1>
        </div>

        <!-- Stock Quantity -->
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-inbox" class="w-7 h-7 text-black dark:text-gray-400 shrink-0"/>
          <div>
            <div class="text-xl font-normal text-black dark:text-white">{{ product.quantity }} шт</div>
          </div>
        </div>

        <UButton
            variant="ghost"
            color="neutral"
            class="w-full justify-start p-0 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            @click="showCharacteristics = true"
        >
          <UIcon name="i-heroicons-information-circle" class="w-5 h-5 shrink-0"/>
          <span>Показать характеристики товара</span>
        </UButton>
      </div>
    </div>

    <!-- Product not found -->
    <div v-else class="px-4 py-16 text-center">
      <UIcon name="i-heroicons-exclamation-circle" class="w-10 h-10 mx-auto text-gray-400"/>
      <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Товар не найден</p>
      <UButton class="mt-6 bg-[#70439e] text-white" @click="goBack">
        Вернуться назад
      </UButton>
    </div>

    <UDrawer
        v-model:open="showCharacteristics"
        direction="bottom"
        :ui="{ content: 'bg-gray-50 dark:bg-gray-950' }"
    >
      <template #content>
        <div class="max-h-[90vh] overflow-y-auto px-4 pb-8">
          <div class="flex justify-center pt-2 pb-4">
            <UButton
                color="neutral"
                variant="ghost"
                square
                class="p-0 w-10 h-8 text-gray-500 dark:text-gray-400"
                aria-label="Закрыть характеристики"
                @click="showCharacteristics = false"
            >
              <UIcon name="i-heroicons-chevron-down" class="w-6 h-6"/>
            </UButton>
          </div>

          <h1 class="text-xl font-semibold text-black dark:text-white">О товаре</h1>

          <div class="mt-6 grid grid-cols-[minmax(110px,35%)_1fr] gap-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">Артикул</span>
            <span class="text-sm font-semibold text-[#6750A4] dark:text-white">{{ product?.productId }}</span>
          </div>

          <div class="mt-4 grid grid-cols-[minmax(110px,35%)_1fr] gap-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">Описание</span>
            <span class="text-sm text-black dark:text-white">{{ product?.description }}</span>
          </div>

          <template v-for="characteristic in product?.characteristics" :key="characteristic.name">
            <h2 class="mt-8 text-base font-semibold text-black dark:text-white">{{ characteristic.name }}</h2>

            <div class="mt-4 space-y-4">
              <div
                  v-for="prop in characteristic.properties"
                  :key="prop.title"
                  class="grid grid-cols-[minmax(110px,35%)_1fr] gap-4"
              >
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ prop.title }}</span>
                <span class="text-sm text-black dark:text-white">{{ prop.value }}</span>
              </div>
            </div>
          </template>
        </div>
      </template>
    </UDrawer>
  </div>
</template>

<script setup lang="ts">
import {useProductRequest} from "~/api/product.ts";
import {useCartAddRequest} from "~/api/cart.ts";

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()

const id = Number(route.params.id)
const {data: product, pending} = await useProductRequest(id)

const req = useCartAddRequest(id, product.value?.quantityInCart ?? 0)

const increaseQuantity = () => {
  if (!product.value) return
  if (req.quantity.value < product.value.quantity) {
    req.quantity.value++
  }
}

const decreaseQuantity = () => {
  if (req.quantity.value <= 1) {
    req.quantity.value = 0
  } else {
    req.quantity.value--
  }
}

const addToCart = () => {
  req.quantity.value = 1
}

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const showCharacteristics = ref(false)

const goBack = () => {
  router.back()
}
</script>

<style>
input {
  outline: none !important;
  outline-style: none !important;
  box-shadow: none !important;
}
</style>
