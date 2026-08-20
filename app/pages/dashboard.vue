<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="bg-gray-50 dark:bg-gray-950 px-4 py-3 flex justify-between items-center">
      <span class="text-lg font-medium text-black dark:text-white">ТОЧКА</span>
      <div class="flex items-center gap-4">
        <UButton
          variant="ghost"
          color="neutral"
          square
          class="p-0 min-w-0 h-auto"
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
          :ui="{ leadingIcon: 'size-6' }"
          aria-label="Переключить тему"
          @click="toggleTheme"
        />
        <div class="relative flex items-center">
          <UButton
            color="gray"
            variant="ghost"
            class="text-gray-700 dark:text-gray-300 p-0 min-w-0 h-auto translate-y-px"
            @click="goToNotifications"
          >
            <UIcon name="i-heroicons-bell" class="w-6 h-6" />
          </UButton>
          <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#B3261E] text-white text-[10px] rounded-full">3</span>
        </div>
        <UButton
          color="gray"
          variant="ghost"
          class="text-gray-700 dark:text-gray-300 p-0 min-w-0 h-auto"
          @click="goToProfile"
        >
          <UIcon name="i-heroicons-user" class="w-6 h-6" />
        </UButton>
      </div>
    </div>
    <div class="px-4 pt-4">
      <p class="text-sm text-gray-600 dark:text-gray-300">Добрый день, <span class="font-bold text-black dark:text-white">User!</span></p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Магазин Name. Центральный</p>
    </div>
    <div class="px-4 mt-3">
      <UInput
        v-model="searchQuery"
        placeholder="Название или артикул товара..."
        class="custom-search w-full"
        :ui="{
          base: 'bg-[#ECE6F0] dark:bg-gray-800 rounded-full border-2 border-transparent text-black dark:text-white placeholder-gray-400 text-sm transition-colors duration-200 hover:border-gray-300 dark:hover:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:ring-0 focus:outline-none'
        }"
      >
        <template #leading>
          <UIcon name="i-heroicons-bars-3" class="w-5 h-5 text-gray-400" />
        </template>
        <template #trailing>
          <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 text-gray-400" />
        </template>
      </UInput>
    </div>
    <div class="px-4 mt-4 flex justify-between items-center">
      <span class="text-sm font-medium text-black dark:text-white">Ближайшие задачи</span>
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        class="text-sm text-gray-400 p-0 min-w-0 h-auto flex items-center gap-1"
        @click="goToAllTasks"
      >
        <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        <span>Всё</span>
      </UButton>
    </div>
    <div class="px-4 mt-3 space-y-3 pb-24">
      <div v-for="task in tasks" :key="task.id" class="bg-white dark:bg-gray-900 shadow overflow-hidden rounded-none">
        <div class="px-4 py-3 flex justify-between items-center" style="background-color: rgba(103, 80, 164, 1);">
          <span class="text-white font-medium text-sm" :class="{ 'line-through': task.done }">{{ task.title }}</span>
          <div 
            class="w-5 h-5 border-2 border-white rounded flex items-center justify-center cursor-pointer" 
            @click="task.done = !task.done"
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
    </div>
    <div class="fixed bottom-0 left-0 right-0 bg-gray-50 dark:bg-gray-950 flex justify-around py-2">
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-black dark:text-white gap-0 h-auto py-1 px-0 min-w-0"
        @click="goToHome"
      >
        <UIcon name="i-heroicons-home" class="w-6 h-6" />
        <span class="text-[10px]">Главная</span>
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0 relative"
        @click="goToTasks"
      >
        <UIcon name="i-heroicons-clipboard-document-list" class="w-6 h-6" />
        <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#B3261E] text-white text-[10px] rounded-full">5</span>
        <span class="text-[10px]">Задачи</span>
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0"
        @click="goToCatalog"
      >
        <UIcon name="i-heroicons-squares-2x2" class="w-6 h-6" />
        <span class="text-[10px]">Каталог</span>
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0 relative"
        @click="goToCart"
      >
        <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6" />
        <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#B3261E] text-white text-[10px] rounded-full">2</span>
        <span class="text-[10px]">Корзина</span>
      </UButton>
    </div>
  </div>
</template>
<script setup>
const router = useRouter()
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
const searchQuery = ref('')
const tasks = ref([
  {
    id: 1,
    title: 'Принять поставку товара',
    done: false,
    status: 'Выполнено',
    statusColor: 'bg-green-500',
    priority: 'Высокий',
    deadline: 'Сегодня, 15:00'
  },
  {
    id: 2,
    title: 'Проверить остатки товара',
    done: false,
    status: 'В работе',
    statusColor: 'bg-yellow-500',
    priority: 'Высокий',
    deadline: 'Сегодня, 17:00'
  },
  {
    id: 3,
    title: 'Проверить выкладку',
    done: false,
    status: 'В работе',
    statusColor: 'bg-yellow-500',
    priority: 'Высокий',
    deadline: 'Завтра, 10:00'
  },
  {
    id: 4,
    title: 'Принять поставку товара',
    done: false,
    status: 'В работе',
    statusColor: 'bg-yellow-500',
    priority: 'Обычный',
    deadline: 'Завтра, 19:00'
  }
])
const goToHome = () => router.push('/dashboard')
const goToTasks = () => router.push('/tasks')
const goToCatalog = () => router.push('/products')
const goToCart = () => router.push('/cart')
const goToNotifications = () => router.push('/notifications')
const goToProfile = () => router.push('/profile')
const goToAllTasks = () => router.push('/tasks')
</script>
<style>
input {
  outline: none !important;
  outline-style: none !important;
  box-shadow: none !important;
}
</style>