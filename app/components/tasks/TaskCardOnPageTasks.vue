<template>
  <div class="bg-[#E8DEF8] dark:bg-[#1a1a2e] p-4 rounded-lg mb-3 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-800">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-[#8a7a9a] dark:text-gray-400" />
        <span class="text-sm font-medium text-[#4a3a5a] dark:text-gray-300">{{ task.type }}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-[#4a3a5a] dark:text-gray-300">#{{ task.number }}</span>
        <div
          class="w-5 h-5 border-2 border-[#888888] dark:border-gray-600 rounded bg-white dark:bg-gray-800 cursor-pointer flex items-center justify-center select-none"
          @click="$emit('toggle-check')"
          @click.stop="openTask"
        >
          <span v-if="task.done" class="text-[#8a5af0] text-lg font-bold select-none">✓</span>
        </div>
      </div>
    </div>

    <div class="w-full h-px bg-[#8a5af0] dark:bg-[#555555] my-2"></div>

    <div class="text-sm font-semibold text-black dark:text-white mb-2">{{ task.name }}</div>

    <div class="flex items-center gap-8 text-sm text-black dark:text-white">
      <div>
        <div class="text-[#888888] dark:text-gray-400 font-medium">Статус</div>
        <div class="text-black dark:text-white font-normal">{{ task.status }}</div>
      </div>
      <div>
        <div class="text-[#888888] dark:text-gray-400 font-medium">Приоритет</div>
        <div class="text-black dark:text-white font-normal flex items-center gap-1">
          <span
            class="w-2 h-2 rounded-full inline-block"
            :class="task.execLabel === 'Срочный' ? 'bg-[#ff3b30]' : 
                     task.execLabel === 'Высокий' ? 'bg-[#ff9500]' :
                     task.execLabel === 'Средний' ? 'bg-[#ffcc00]' : 'bg-[#0a84ff]'"
          ></span>
          {{ task.execLabel }}
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mt-2">
      <div class="flex items-center gap-1 text-sm text-black dark:text-white">
        <UIcon name="i-heroicons-clock" class="w-4 h-4" />
        {{ task.time }}
      </div>
      <div class="text-xs text-[#888888] dark:text-gray-500">{{ task.sub }}</div>
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

defineEmits(['toggle-check'])
</script>