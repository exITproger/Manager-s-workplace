<template>
  <div 
    class="w-[176px] h-[236px] bg-[#ECE6F0] dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden rounded-lg"
  >
    <!-- Фото товара -->
    <div class="w-full h-[132px] bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-contain"
      />
    </div>

    <!-- Информация о товаре -->
    <div class="px-2 py-1.5 space-y-0.5">
      <!-- Цена -->
      <div class="flex items-center gap-1">
        <UIcon name="i-lucide-banknote" class="w-4 h-4 text-black dark:text-gray-400 shrink-0" />
        <span class="font-bold text-black dark:text-white" style="font-family: 'Jaldi', sans-serif; font-size: 14px;">
          {{ product.price }} ₽
        </span>
      </div>

      <!-- Название -->
      <div class="text-black dark:text-white" style="font-family: 'Jaldi', sans-serif; font-size: 13px; font-weight: 400;">
        {{ product.name }}
      </div>

      <!-- Количество -->
      <div class="flex items-center gap-1">
        <UIcon name="i-lucide-box" class="w-4 h-4 text-black dark:text-gray-400 shrink-0" />
        <span class="text-black dark:text-white" style="font-family: 'Jaldi', sans-serif; font-size: 14px; font-weight: 400;">
          {{ product.quantity }} шт.
        </span>
      </div>

      <!-- Артикул -->
      <div class="text-black dark:text-white" style="font-family: 'Jaldi', sans-serif; font-size: 13px; font-weight: 400;">
        {{ product.id }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>