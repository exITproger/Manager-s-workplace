<!-- components/notifications/NotificationCard.vue -->
<template>
  <div class="relative bg-[#FEF7FF] rounded-2xl shadow-sm h-[95px] overflow-visible border border-gray-200">
    <div class="absolute left-3 top-1/2 -translate-y-1/2 z-10">
      <div class="w-9 h-9 rounded-full bg-[#E8DEF8] flex items-center justify-center">
        <span class="text-[#70439e] font-medium text-sm">А</span>
      </div>
    </div>
    <div class="absolute left-[60px] top-1/2 -translate-y-1/2 z-10" style="width: calc(100% - 115px);">
      <span class="font-semibold text-sm text-black block leading-tight">Задача</span>
      <span class="text-xs text-gray-600 block leading-relaxed" style="margin-top: 6px;">Вам назначена задача</span>
      <span class="text-xs text-gray-600 block break-words whitespace-normal" style="margin-top: 0px;">Проверить остаток товара</span>
      <span class="text-xs text-gray-400 block leading-tight mt-1">{{ notification.time }}</span>
    </div>
    <div class="absolute -top-1 -right-0.5 w-3.5 h-3.5 rounded-full" style="z-index: 50; background-color: #B3261E; box-shadow: 0 0 0 2px #ffffff;"></div>
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