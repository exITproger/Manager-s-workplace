<!-- components/tasks/TaskCardOnPageTasks.vue -->
<template>
  <div class="bg-[#E8DEF8] dark:bg-[#0F172B] p-4 rounded-lg mb-3 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-[#8a7a9a] dark:text-gray-400" />
        <span class="text-sm font-medium text-[#4a3a5a] dark:text-white">{{ task.type }}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-[#4a3a5a] dark:text-white">#{{ task.number }}</span>
        <div
          class="w-5 h-5 border-2 border-[#888888] dark:border-gray-500 rounded bg-white dark:bg-[#0F172B] cursor-pointer flex items-center justify-center select-none relative"
          @click.stop="openModal"
        >
          <span v-if="task.done" class="text-[#8a5af0] dark:text-[#8a5af0] text-lg font-bold select-none">✓</span>
        </div>
      </div>
    </div>

    <div class="w-full h-px bg-[#8a5af0] dark:bg-[#8a5af0] my-2"></div>

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
        <UIcon name="i-heroicons-clock" class="w-4 h-4 text-black dark:text-white" />
        {{ task.time }}
      </div>
      <div class="text-xs text-[#888888] dark:text-gray-400">{{ task.sub }}</div>
    </div>

    <!-- Модалка -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center">
      <!-- Затемнение с блюром для всей страницы -->
      <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeModal"></div>
      
      <!-- Модальное окно -->
      <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 max-w-[340px] w-full mx-4 text-center z-[101]">
        <UIcon 
          :name="task.done ? 'i-heroicons-arrow-path' : 'i-heroicons-check-circle'" 
          class="w-12 h-12 text-[#8a5af0] mx-auto mb-3" 
        />
        <h3 class="text-lg font-semibold text-black dark:text-white mb-2">
          {{ task.done ? 'Открыть задачу?' : 'Закрыть задачу?' }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {{ task.done ? 'Задача будет снова в работе' : 'Задача будет отмечена как выполненная' }}
        </p>
        <div class="flex gap-3 justify-center">
          <UButton color="gray" variant="ghost" @click="closeModal">
            Отмена
          </UButton>
          <UButton color="primary" @click="confirmToggle">
            {{ task.done ? 'Открыть' : 'Закрыть' }}
          </UButton>
        </div>
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

const emit = defineEmits(['toggle-check'])

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const confirmToggle = () => {
  showModal.value = false
  emit('toggle-check')
}
</script>