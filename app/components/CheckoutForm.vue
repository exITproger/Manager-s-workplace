<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '#imports'

const toast = useToast()

const props = defineProps<{
  totalItems: number
  totalPrice: number
}>()

const emit = defineEmits<{
  close: []
  orderSubmitted: [orderData: { orderNumber: number, fullName: string, phoneNumber: string }]
}>()

const isOpen = ref(true)

// Состояния полей формы
const fullName = ref('')
const phoneNumber = ref('')
const paymentMethod = ref<'now' | 'delivery'>('now')

// Обработчик отправки формы
const submitOrder = () => {
  if (!fullName.value.trim() || !phoneNumber.value.trim()) {
    toast.add({
      title: 'Ошибка',
      description: 'Пожалуйста, заполните все обязательные поля!',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle'
    })
    return
  }

  // Генерируем номер заказа
  const orderNumber = Math.floor(100 + Math.random() * 900)

  // Закрываем форму и передаем данные в родителя
  isOpen.value = false
  emit('orderSubmitted', {
    orderNumber,
    fullName: fullName.value,
    phoneNumber: phoneNumber.value
  })
}

// Функция закрытия
const closeModal = () => {
  isOpen.value = false
  emit('close')
}
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all"
    @click.self="closeModal"
  >
    <div class="relative w-full max-w-[660px] bg-[#F3EBF9] rounded-[28px] p-4 md:p-8 shadow-xl font-sans text-[#1D1B20] animate-in fade-in zoom-in-95 duration-200">
      
      <button 
        type="button" 
        @click="closeModal"
        class="absolute top-5 right-5 text-[#49454F] hover:text-black transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="text-center text-[28px] md:text-[32px] font-medium mb-6">
        Оформление заказа
      </h2>

      <!-- Блок ввода данных -->
      <div class="space-y-4 mb-6">
        <p class="text-base text-[#49454F] font-medium px-1">
          Укажите данные клиента
        </p>

        <!-- Поле ФИО -->
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-[#49454F] px-1">
            ФИО клиента<span class="text-[#B3261E] ml-0.5">*</span>
          </label>
          <input
            v-model="fullName"
            type="text"
            placeholder="Ковалев Ростислав Антонович"
            class="w-full h-14 px-4 bg-white border border-[#79747E]/30 rounded-xl text-base text-[#1D1B20] placeholder-[#79747E]/60 focus:outline-none focus:border-[#6750A4] focus:ring-1 focus:ring-[#6750A4] transition-all"
          />
        </div>

        <!-- Поле Телефон -->
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-[#49454F] px-1">
            Телефон<span class="text-[#B3261E] ml-0.5">*</span>
          </label>
          <input
            v-model="phoneNumber"
            type="tel"
            placeholder="+7 (999) 888 66 11"
            class="w-full h-14 px-4 bg-white border border-[#79747E]/30 rounded-xl text-base text-[#1D1B20] placeholder-[#79747E]/60 focus:outline-none focus:border-[#6750A4] focus:ring-1 focus:ring-[#6750A4] transition-all"
          />
        </div>
      </div>

      <!-- Способ оплаты -->
      <div class="space-y-3 mb-6">
        <p class="text-base text-[#49454F] font-medium px-1">
          Как клиент оплатит заказ?
        </p>
        
        <div class="flex bg-white rounded-xl p-1 border border-[#79747E]/10">
          <button
            type="button"
            @click="paymentMethod = 'now'"
            :class="[
              'flex-1 flex items-center justify-center h-12 rounded-lg text-base font-medium transition-all',
              paymentMethod === 'now' 
                ? 'bg-[#E8DEF8] text-[#1D1B20]' 
                : 'bg-transparent text-[#49454F]'
            ]"
          >
            Оплатить сейчас
          </button>

          <button
            type="button"
            @click="paymentMethod = 'delivery'"
            :class="[
              'flex-1 flex items-center justify-center h-12 rounded-lg text-base font-medium transition-all',
              paymentMethod === 'delivery' 
                ? 'bg-[#E8DEF8] text-[#1D1B20]' 
                : 'bg-transparent text-[#49454F]'
            ]"
          >
            При получении
          </button>
        </div>
      </div>

      <hr class="border-[#79747E]/20 my-6" />

      <div class="space-y-2 mb-6 px-1">
        <div class="flex justify-between items-baseline">
          <span class="text-[22px] font-medium">Итого</span>
          <span class="text-[22px] font-bold">{{ totalPrice.toLocaleString() }} ₽</span>
        </div>
        <div class="flex justify-between text-sm text-[#49454F]">
          <span>{{ totalItems }} товара на сумму</span>
          <span>{{ totalPrice.toLocaleString() }} ₽</span>
        </div>
      </div>

      <!-- Кнопка действия -->
      <button
        @click="submitOrder"
        type="button"
        class="w-full h-14 bg-[#745CAE] hover:bg-[#634b9c] text-white rounded-xl flex items-center justify-between px-5 font-medium text-base shadow-sm transition-colors active:scale-[0.99] transform"
      >
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span>Оформить заказ</span>
        </div>
        <span class="text-lg font-bold">{{ totalPrice.toLocaleString() }} ₽</span>
      </button>
    </div>
  </div>
</template>