<template>
  <div class="bg-white dark:bg-gray-900 shadow overflow-hidden rounded-xl">
    <div 
      class="px-4 py-3 flex justify-between items-center cursor-pointer"
      style="background-color: rgba(103, 80, 164, 1);"
      @click="openTask"
    >
      <span class="text-white font-medium text-sm">{{ task.title }}</span>
      <div 
        class="w-6 h-6 border-2 border-white rounded flex items-center justify-center bg-white hover:bg-gray-50 transition-colors select-none relative" 
        @click.stop="openModal"
      >
        <span v-if="task.done" class="text-[#8a5af0] text-xl font-extrabold leading-none select-none">✓</span>
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

    <!-- Модалка -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click.self="closeModal"
    >
      <!-- Затемнение с блюром -->
      <div 
        class="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        @click="closeModal"
      ></div>
      
      <!-- Модальное окно -->
      <div 
        class="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-[340px] w-full mx-4 text-center"
        @click.stop
      >
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
          <UButton color="gray" variant="ghost" @click.stop="closeModal">
            Отмена
          </UButton>
          <UButton color="primary" @click.stop="confirmToggle">
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

const emit = defineEmits(['toggle-done', 'open-task'])

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const confirmToggle = () => {
  showModal.value = false
  // Используем nextTick чтобы дождаться обновления DOM
  nextTick(() => {
    emit('toggle-done')
  })
}

const openTask = () => {
  emit('open-task')
}
</script>