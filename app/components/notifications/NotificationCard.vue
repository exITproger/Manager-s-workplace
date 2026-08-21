<template>
  <div class="relative bg-[#FEF7FF] rounded-2xl shadow-sm h-[135px] overflow-visible border border-gray-200">
    <div class="absolute left-3 top-1/2 -translate-y-1/2 z-10">
      <div class="w-12 h-12 rounded-full bg-[#E8DEF8] flex items-center justify-center">
        <span class="text-[#70439e] font-medium text-base">А</span>
      </div>
    </div>
    <div class="absolute left-20 top-1/2 -translate-y-1/2 z-10" style="width: calc(100% - 130px);">
      <span class="font-semibold text-base text-black block">Задача</span>
      <span class="text-sm text-gray-500 block break-words">Вам назначена задача</span>
      <span class="text-[15px] text-black block break-words whitespace-normal">Проверить остаток товара</span>
      <span class="text-sm text-gray-400 block">{{ notification.time }}</span>
    </div>
    <div class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full" style="z-index: 5; background-color: #B3261E; box-shadow: 0 0 0 3px #ffffff;"></div>
  </div>
</template>

<script setup>
defineProps({
  notification: {
    type: Object,
    required: true
  }
})
</script>