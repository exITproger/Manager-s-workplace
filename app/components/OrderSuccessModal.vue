<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  orderNumber: number | string
  fullName: string
  phoneNumber: string
  totalItems: number
  totalPrice: number
}>()

const emit = defineEmits<{
  close: []
  goBack: []
}>()

const isOpen = ref(true)

const closeModal = () => {
  isOpen.value = false
  emit('close')
}

const handleGoBack = () => {
  isOpen.value = false
  emit('goBack')
}
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all"
    @click.self="closeModal"
  >
    <div class="relative w-full max-w-[660px] bg-[#F3EBF9] rounded-[28px] p-6 md:p-8 shadow-xl font-sans text-[#1D1B20] animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Кнопка закрытия -->
      <button 
        type="button" 
        @click="closeModal"
        class="absolute top-5 right-5 text-[#49454F] hover:text-black transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Заголовок -->
      <h2 class="text-center text-[28px] md:text-[32px] font-medium mb-8">
        Заказ №{{ props.orderNumber }} оформлен!
      </h2>

      <!-- Данные клиента -->
      <div class="space-y-3 mb-8 px-1">
        <a href="#" class="block text-lg text-[#3B5BD9] hover:underline w-fit">
          {{ props.fullName }}
        </a>
        <a :href="`tel:${props.phoneNumber}`" class="block text-lg font-medium text-[#1D1B20] hover:underline w-fit">
          {{ props.phoneNumber }}
        </a>
      </div>

      <!-- Информация о заказе -->
      <div class="space-y-3 mb-6 px-1">
        <div class="flex justify-between items-baseline text-[18px]">
          <span class="text-[#49454F]">Товаров</span>
          <span class="font-medium">{{ props.totalItems }} шт</span>
        </div>
        <div class="flex justify-between items-baseline text-[18px]">
          <span class="text-[#49454F]">Оплата</span>
          <span class="font-medium">Оплачено</span>
        </div>
      </div>

      <!-- Разделитель -->
      <hr class="border-[#6750A4]/30 my-6" />

      <!-- Итог -->
      <div class="flex justify-between items-baseline mb-8 px-1">
        <span class="text-[28px] font-medium">Итого</span>
        <span class="text-[28px] font-bold">€{{ props.totalPrice.toLocaleString() }}</span>
      </div>

      <!-- Кнопка -->
      <button
        @click="handleGoBack"
        type="button"
        class="w-full h-16 bg-[#7C6BAF] hover:bg-[#6B5A9E] text-white rounded-xl flex items-center gap-4 px-6 font-medium text-lg shadow-sm transition-colors active:scale-[0.99] transform"
      >
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span>Вернуться к товарам</span>
      </button>
    </div>
  </div>
</template>