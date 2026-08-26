<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useCartRequest, useCartAddRequest} from '~/api/cart'
import type {CartItem} from '~/types/CartItem'
import CheckoutForm from '~/components/CheckoutForm.vue'
import OrderSuccessModal from '~/components/OrderSuccessModal.vue'

const router = useRouter()
const colorMode = useColorMode()
const toast = useToast()

const {data: cartData} = await useCartRequest()

const items = ref<CartItem[]>([])
const itemRequestMap = new Map<number, ReturnType<typeof useCartAddRequest>>()

if (cartData.value) {
  items.value = [...cartData.value.deferredStocks]

  items.value.forEach(item => {
    const req = useCartAddRequest(item.productId, item.quantityInCart)
    itemRequestMap.set(item.productId, req)

    watch(req.data, (newData) => {
      if (newData) {
        const target = items.value.find(i => i.productId === newData.productId)
        if (newData.selectedQuantity <= 0) {
          items.value = items.value.filter(i => i.productId !== newData.productId)
        } else if (target) {
          target.quantityInCart = newData.selectedQuantity
        }
      }
    })
  })
}

const totalCount = () => items.value.reduce((sum, item) => sum + item.quantityInCart, 0)
const totalPrice = () => items.value.reduce((sum, item) => sum + item.price * item.quantityInCart, 0)

const showCheckout = ref(false)

const showOrderSuccess = ref(false)
const lastOrderNumber = ref(0)
const lastCustomerName = ref('')
const lastCustomerPhone = ref('')
const lastOrderTotalItems = ref(0)
const lastOrderTotalPrice = ref(0)

const goBack = () => router.back()

const goCatalog = () => router.push('/catalog')

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const handleIncrement = (item: CartItem) => {
  const req = itemRequestMap.get(item.productId)
  if (!req) return

  // Проверяем, если текущее количество + 1 больше доступного
  if (item.quantityInCart + 1 > item.quantity) {
    toast.add({
      title: 'Ошибка',
      description: 'Недостаточное количество товара на складе!',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle'
    })
    return
  }

  req.quantity.value = item.quantityInCart + 1

  // Если выбрали последний товар (Оранжевый тост)
  if (item.quantityInCart + 1 === item.quantity) {
    toast.add({
      title: 'Внимание',
      description: `Выбран последний товар "${item.name}"!`,
      color: 'warning',
      icon: 'i-heroicons-exclamation-triangle'
    })
  }
}

const handleDecrement = (item: CartItem) => {
  const req = itemRequestMap.get(item.productId)
  if (req) {
    req.quantity.value = item.quantityInCart - 1
  }
}

const handleRemove = (item: CartItem) => {
  const req = itemRequestMap.get(item.productId)
  if (req) {
    req.quantity.value = 0
    toast.add({
      title: 'Удалено',
      description: `Товар "${item.name}" удален из корзины`,
      color: 'error',
      icon: 'i-heroicons-x-circle'
    })
  }
}

const handleOrderSubmitted = (orderData: any) => {
  showCheckout.value = false

  lastOrderNumber.value = orderData.orderNumber
  lastCustomerName.value = orderData.fullName
  lastCustomerPhone.value = orderData.phoneNumber

  lastOrderTotalItems.value = totalCount()
  lastOrderTotalPrice.value = totalPrice()

  items.value = []
  showOrderSuccess.value = true
  
  toast.add({
    title: 'Успешно',
    description: 'Заказ успешно оформлен!',
    color: 'success',
    icon: 'i-heroicons-check-circle'
  })
}

const handleGoBackToProducts = () => {
  showOrderSuccess.value = false
  router.push('/catalog')
}
</script>
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
    <!-- Header -->
    <div class="px-4 pt-6 flex-shrink-0">
      <div class="flex items-center justify-between">
        <BackButton />
        <ThemeToggle />
      </div>
    </div>

    <!-- Cart Items -->
    <div class="flex-1 px-4 py-4 pb-32 space-y-3">

      <!-- Пустая корзина -->
      <div v-if="items.length === 0" class="py-16 text-center">
        <UIcon name="i-heroicons-shopping-cart" class="w-10 h-10 mx-auto text-gray-400"/>
        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Корзина пуста</p>
        <UButton class="mt-6 bg-[#70439e] text-white" @click="goCatalog">
          За покупками
        </UButton>
      </div>

      <!-- Карточка товара в корзине -->
      <div
          v-for="item in items"
          :key="item.productId"
          class="bg-[#F2F2F7] dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex gap-4"
      >
        <!-- Image -->
        <div class="h-20 w-20 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0 flex items-center">
          <img v-if="item.images?.length > 0" :src="item.images[0]" :alt="item.name"
               class="w-full h-auto object-contain"/>
          <UIcon v-else name="i-lucide-image" class="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto"/>
        </div>

        <!-- Info -->
        <div class="flex-1 space-y-1.5">
          <!-- Цена за 1 штуку -->
          <div class="flex items-center gap-1.5">
            <UIcon name="i-lucide-banknote" class="w-5 h-5 text-black dark:text-gray-400 shrink-0"/>
            <span class="text-sm font-semibold text-black dark:text-white">{{ item.price }} ₽</span>
          </div>

          <!-- Название с синей галочкой -->
          <div class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-blue-600 shrink-0"/>
            <span class="text-sm font-medium text-black dark:text-white">{{ item.name }}</span>
          </div>

          <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.productId }}</div>

          <div class="flex items-center gap-1.5">
            <UIcon name="i-lucide-inbox" class="w-5 h-5 text-black dark:text-gray-400 shrink-0"/>
            <span class="text-sm text-black dark:text-white">{{ item.quantity }} шт</span>
            <!-- Индикатор остатка -->
            <span 
              v-if="item.quantityInCart === item.quantity" 
              class="text-xs text-orange-500 dark:text-orange-400 font-medium ml-1"
            >
              (последний)
            </span>
          </div>

          <!-- Controls (Плюс/Минус/Корзина) и итоговая цена -->
          <div class="flex justify-between items-center mt-2">
            <!-- Блок с + и - цвет #E8DEF8 (фиолетовый оттенок) -->
            <div class="flex items-center gap-2 bg-[#E8DEF8] dark:bg-gray-700 rounded-lg p-1">

              <UButton
                  v-if="item.quantityInCart === 1"
                  color="neutral"
                  variant="ghost"
                  class="p-0 min-w-0 h-auto w-6 h-6"
                  @click="handleRemove(item)"
              >
                <UIcon name="i-heroicons-trash" class="w-4 h-4"/>
              </UButton>

              <UButton
                  v-else
                  color="neutral"
                  variant="ghost"
                  class="p-0 min-w-0 h-auto w-6 h-6 "
                  @click="handleDecrement(item)"
              >
                <UIcon name="i-heroicons-minus" class="w-4 h-4 "/>
              </UButton>

              <span class="text-sm font-medium w-4 text-center text-black dark:text-white">{{
                  item.quantityInCart
                }}</span>

              <UButton
                  color="neutral"
                  variant="ghost"
                  class="p-0 min-w-0 h-auto w-6 h-6"
                  @click="handleIncrement(item)"
              >
                <UIcon name="i-heroicons-plus" class="w-4 h-4"/>
              </UButton>
            </div>

            <!-- Итоговая цена чёрным цветом -->
            <div class="bg-[#E8DEF8] dark:bg-gray-700 rounded-lg px-3 py-1">
              <span class="text-sm font-semibold text-black dark:text-white">
                {{ (Number(item.price) * item.quantityInCart).toLocaleString() }} ₽
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer (К оформлению) -->
    <div v-if="items.length > 0" class="fixed bottom-16 left-0 right-0 p-4 z-40">
      <UButton
          color="neutral"
          variant="solid"
          class="bg-[#70439e] text-white w-full h-12 rounded-lg flex items-center justify-between px-4"
          style="border: 3px solid black; box-shadow: inset 0 0 0 2px white;"
          @click="showCheckout = true"
      >
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5"/>
          <span>К оформлению : {{ totalCount() }}</span>
        </div>

        <span class="font-bold">
          {{ totalPrice().toLocaleString() }} ₽
        </span>
      </UButton>
    </div>

    <!-- Компонент оформления заказа -->
    <CheckoutForm
        v-if="showCheckout"
        :total-items="totalCount()"
        :total-price="totalPrice()"
        @close="showCheckout = false"
        @order-submitted="handleOrderSubmitted"
    />

    <!-- Компонент успешного заказа -->
    <OrderSuccessModal
        v-if="showOrderSuccess"
        :order-number="lastOrderNumber"
        :full-name="lastCustomerName"
        :phone-number="lastCustomerPhone"
        :total-items="lastOrderTotalItems"
        :total-price="lastOrderTotalPrice"
        @close="showOrderSuccess = false"
        @go-back="handleGoBackToProducts"
    />
  </div>
</template>
<style>
input {
  outline: none !important;
  outline-style: none !important;
  box-shadow: none !important;
}
</style>