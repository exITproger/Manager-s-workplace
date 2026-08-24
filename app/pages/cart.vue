<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
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

    <!-- Cart Items -->
    <div class="flex-1 px-4 py-4 pb-32 space-y-3">
      
      <!-- Пустая корзина -->
      <div v-if="cart.items.length === 0" class="py-16 text-center">
        <UIcon name="i-heroicons-shopping-cart" class="w-10 h-10 mx-auto text-gray-400" />
        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Корзина пуста</p>
        <UButton class="mt-6 bg-[#70439e] text-white" @click="goCatalog">
          За покупками
        </UButton>
      </div>

      <!-- Карточка товара в корзине -->
      <div 
        v-for="item in cart.items" 
        :key="item.id" 
        class="bg-[#ECE6F0] dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex gap-4"
      >
        <!-- Image -->
        <div class="h-20 w-20 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
          <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
        </div>

        <!-- Info -->
        <div class="flex-1 space-y-1.5">
          <div class="flex items-center gap-1.5">
            <UIcon name="i-lucide-banknote" class="w-5 h-5 text-black dark:text-gray-400 shrink-0" />
            <span class="text-sm font-semibold text-black dark:text-white">{{ item.price }} ₽</span>
          </div>
          <div class="text-xs font-medium text-black dark:text-white">{{ item.name }}</div>
          <div class="flex items-center gap-1.5">
            <UIcon name="i-lucide-inbox" class="w-5 h-5 text-black dark:text-gray-400 shrink-0" />
            <span class="text-sm text-black dark:text-white">{{ item.quantity }} шт</span>
          </div>
          <div class="text-xs text-black dark:text-white">{{ item.id }}</div>

          <!-- Controls (Плюс/Минус/Корзина) -->
          <div class="flex justify-between items-center mt-2">
            <div class="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg p-1">
              
              <UButton 
                v-if="item.count === 1"
                color="error" 
                variant="ghost" 
                class="p-0 min-w-0 h-auto w-6 h-6 text-red-500" 
                @click="cart.removeFromCart(item.id)"
              >
                <UIcon name="i-heroicons-trash" class="w-4 h-4" />
              </UButton>

              <UButton 
                v-else
                color="neutral" 
                variant="ghost" 
                class="p-0 min-w-0 h-auto w-6 h-6" 
                @click="cart.decrement(item.id)"
              >
                <UIcon name="i-heroicons-minus" class="w-4 h-4" />
              </UButton>

              <span class="text-sm font-medium w-4 text-center">{{ item.count }}</span>
              
              <UButton 
                color="neutral" 
                variant="ghost" 
                class="p-0 min-w-0 h-auto w-6 h-6"
                :class="{ 'text-red-500': item.count >= Number(item.quantity) }"
                @click="handleIncrement(item)"
              >
                <UIcon name="i-heroicons-plus" class="w-4 h-4" />
              </UButton>
            </div>
            <span class="text-sm font-semibold text-[#70439e] dark:text-[#b388e8]">{{ (Number(item.price) * item.count).toLocaleString() }} ₽</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer (К оформлению) -->
    <div v-if="cart.items.length > 0" class="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-40">
      <UButton
        color="neutral"
        variant="solid"
        class="bg-[#70439e] text-white hover:bg-[#5a3380] w-full h-12 rounded-lg flex items-center justify-between px-4 border-2 border-black dark:border-white"
        @click="showCheckout = true"
      >
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5" />
          <span>К оформлению : {{ cart.totalCount }}</span>
        </div>
        
        <span class="font-bold">
          {{ cart.totalPrice.toLocaleString() }} ₽
        </span>
      </UButton>
    </div>

    <!-- Компонент оформления заказа -->
    <CheckoutForm 
      v-if="showCheckout" 
      :total-items="cart.totalCount"
      :total-price="cart.totalPrice"
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

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useToast } from '#imports'
import CheckoutForm from '@/components/CheckoutForm.vue'
import OrderSuccessModal from '@/components/OrderSuccessModal.vue'

const router = useRouter()
const colorMode = useColorMode()
const cart = useCartStore()
const toast = useToast()

// Состояние для отображения формы оформления заказа
const showCheckout = ref(false)

// Данные для окна успеха (СОХРАНЯЕМ ДО ОЧИСТКИ КОРЗИНЫ!)
const showOrderSuccess = ref(false)
const lastOrderNumber = ref(0)
const lastCustomerName = ref('')
const lastCustomerPhone = ref('')
const lastOrderTotalItems = ref(0)  // <--- Добавили переменную для количества
const lastOrderTotalPrice = ref(0)

// Возврат назад в истории браузера
const goBack = () => router.back()

// Переход в каталог
const goCatalog = () => router.push('/catalog')

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const handleIncrement = (item: any) => {
  const result = cart.increment(item.id)

  if (!result.success) {
    toast.add({
      title: 'Предупреждение',
      description: 'Недостаточное количество товара на складе!',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle'
    })
    return
  }

  if (item.count == Number(item.quantity)) {
    toast.add({
      title: 'Предупреждение',
      description: 'Выбран последний товар!',
      color: 'warning',
      icon: 'i-heroicons-exclamation-triangle'
    })
  }
}

// Обработчик успешного оформления заказа
const handleOrderSubmitted = (orderData: any) => {
  // Закрываем форму
  showCheckout.value = false
  
  // Сохраняем данные, полученные из формы
  lastOrderNumber.value = orderData.orderNumber
  lastCustomerName.value = orderData.fullName
  lastCustomerPhone.value = orderData.phoneNumber
  
  // ВАЖНО: Сохраняем количество и сумму ДО очистки корзины!
  lastOrderTotalItems.value = cart.totalCount
  lastOrderTotalPrice.value = cart.totalPrice

  // Очищаем корзину
  cart.clearCart()

  // Открываем модальное окно успеха вместо тоста
  showOrderSuccess.value = true
}

// Возврат к товарам из окна успеха
const handleGoBackToProducts = () => {
  showOrderSuccess.value = false
  router.push('/catalog') // или router.back()
}
</script>

<style>
input {
  outline: none !important;
  outline-style: none !important;
  box-shadow: none !important;
}
</style>