<!-- components/tasks/TaskCard.vue -->
<template>
  <div class="bg-white dark:bg-gray-900 shadow overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
    <div class="px-4 py-3 flex justify-between items-center" style="background-color: rgba(103, 80, 164, 1);">
      <span class="text-white font-medium text-sm">{{ task.title }}</span>
      <div 
        class="w-6 h-6 border-2 border-white rounded flex items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition-colors select-none" 
        @click="$emit('toggle-done')"
      >
        <span v-if="task.done" class="text-[#8a5af0] text-xl font-extrabold leading-none select-none">✓</span>
      </div>
    </div>
    <div class="px-4 py-3 grid grid-cols-3 gap-2 text-sm bg-[#E8DEF8] dark:bg-[#1a1a2e]">
      <div>
        <p class="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wide">Статус</p>
        <div class="flex items-center gap-1 mt-0.5">
          <span class="w-2 h-2 rounded-full" :class="task.statusColor"></span>
          <span class="text-black dark:text-white text-xs">{{ task.status }}</span>
        </div>
      </div>
      <div>
        <p class="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wide">Приоритет</p>
        <p class="font-medium mt-0.5 text-black dark:text-white text-xs">{{ task.priority }}</p>
      </div>
      <div>
        <p class="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wide whitespace-nowrap">Выполнить до</p>
        <p class="font-medium mt-0.5 text-black dark:text-white text-xs whitespace-nowrap">{{ task.deadline }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-done'])
</script>