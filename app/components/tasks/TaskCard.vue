<template>
  <div class="bg-white dark:bg-gray-900 shadow overflow-hidden rounded-none">
    <div class="px-4 py-3 flex justify-between items-center" style="background-color: rgba(103, 80, 164, 1);">
      <span class="text-white font-medium text-sm" :class="{ 'line-through': task.done }">{{ task.title }}</span>
      <div 
        class="w-5 h-5 border-2 border-white rounded flex items-center justify-center cursor-pointer" 
        @click="$emit('toggle-done')"
      >
        <span v-if="task.done" class="text-white text-xs">✓</span>
      </div>
    </div>
    <div class="px-4 py-3 grid grid-cols-3 gap-2 text-sm bg-[#E8DEF8] dark:bg-gray-800">
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