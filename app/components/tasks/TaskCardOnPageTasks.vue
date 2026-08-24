<template>
  <div class="bg-[#E8DEF8] p-4 rounded-lg mb-3 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-[#8a7a9a]" />
        <span class="text-sm font-medium text-[#4a3a5a]">{{ task.type }}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-[#4a3a5a]">#{{ task.number }}</span>
        <div
          class="w-5 h-5 border-2 border-[#888888] rounded bg-white cursor-pointer flex items-center justify-center select-none"
          @click="$emit('toggle-check')"
        >
          <span v-if="task.done" class="text-[#8a5af0] text-lg font-bold select-none">✓</span>
        </div>
      </div>
    </div>

    <div class="w-full h-px bg-[#8a5af0] my-2"></div>

    <div class="text-sm font-semibold text-black mb-2">{{ task.name }}</div>

    <div class="flex items-center gap-8 text-sm text-black">
      <div>
        <div class="text-[#888888] font-medium">Статус</div>
        <div class="text-black font-normal">{{ task.status }}</div>
      </div>
      <div>
        <div class="text-[#888888] font-medium">Приоритет</div>
        <div class="text-black font-normal flex items-center gap-1">
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
      <div class="flex items-center gap-1 text-sm">
        <UIcon name="i-heroicons-clock" class="w-4 h-4" />
        {{ task.time }}
      </div>
      <div class="text-xs text-[#888888]">{{ task.sub }}</div>
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