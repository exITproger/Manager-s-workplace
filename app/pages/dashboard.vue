<!-- pages/index.vue -->
<script setup lang="ts">
import TaskCard from '~/components/tasks/TaskCard.vue'
import {useMeRequest} from "~/api/me.ts";

const router = useRouter()
const colorMode = useColorMode()
const {data: user} = await useMeRequest()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const searchQuery = ref('')

const tasks = ref([
  {
    id: 1,
    title: 'Принять поставку товара',
    done: false,
    status: 'В работе',
    statusColor: 'bg-yellow-500',
    priority: 'Средний',
    deadline: 'Сегодня, 15:00'
  },
  {
    id: 2,
    title: 'Проверить остатки товара',
    done: false,
    status: 'В работе',
    statusColor: 'bg-yellow-500',
    priority: 'Срочный',
    deadline: 'Сегодня, 17:00'
  },
  {
    id: 3,
    title: 'Проверить выкладку',
    done: false,
    status: 'В работе',
    statusColor: 'bg-yellow-500',
    priority: 'Срочный',
    deadline: 'Завтра, 10:00'
  },
  {
    id: 4,
    title: 'Принять поставку товара',
    done: false,
    status: 'В работе',
    statusColor: 'bg-yellow-500',
    priority: 'Средний',
    deadline: 'Завтра, 19:00'
  }
])

const toggleTask = (task) => {
  task.done = !task.done
  if (task.done) {
    task.status = 'Выполнено'
    task.statusColor = 'bg-green-500'
  } else {
    task.status = 'В работе'
    task.statusColor = 'bg-yellow-500'
  }
}

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
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
    <!-- шапка -->
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
            <UIcon name="i-heroicons-bell" class="w-6 h-6"/>
          </UButton>
          <span
              class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#B3261E] text-white text-[10px] rounded-full">3</span>
        </div>
        <UButton
            color="gray"
            variant="ghost"
            class="text-gray-700 dark:text-gray-300 p-0 min-w-0 h-auto"
            @click="goToProfile"
        >
          <UIcon name="i-heroicons-user" class="w-6 h-6"/>
        </UButton>
      </div>
    </div>

    <div class="px-4 pt-4">
      <p class="text-sm text-gray-600 dark:text-gray-300">Добрый день, <span
          class="font-bold text-black dark:text-white">{{ user.name + " " + user.surname }}</span></p>
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
          <UIcon name="i-heroicons-bars-3" class="w-5 h-5 text-gray-400"/>
        </template>
        <template #trailing>
          <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 text-gray-400"/>
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
          @click="goToAllTasks">
        <UIcon name="i-heroicons-arrow-right" class="w-4 h-4"/>
        <span>Всё</span>
      </UButton>
    </div>

    <div class="px-4 mt-3 space-y-4 pb-24">
      <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle-done="toggleTask(task)"/>
    </div>

    <BottomNav/>
  </div>
</template>