<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
    <!-- Верхняя панель -->
    <div class="px-4 pt-14 flex-shrink-0">
      <div class="flex items-center justify-between">
        <UButton
            color="gray"
            variant="ghost"
            class="text-[#70439e] dark:text-[#b388e8] p-0 min-w-0 h-auto flex items-center gap-1 text-sm font-normal"
            @click="goBack"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4"/>
          <span>Назад</span>
        </UButton>
        <UButton
            variant="ghost"
            color="neutral"
            square
            class="p-0 min-w-0 h-auto"
            :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
            :ui="{ leadingIcon: 'size-5' }"
            aria-label="Переключить тему"
            @click="toggleTheme"
        />
      </div>
    </div>

    <!-- Заголовок -->
    <div class="px-4 mt-4 flex-shrink-0">
      <h1 class="text-2xl font-bold text-[#1E1E1E] dark:text-white">Личный кабинет</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Управление аккаунтом и настройки</p>
    </div>

    <!-- Контент -->
    <div class="px-4 mt-6 space-y-4 flex-1 overflow-y-auto pb-40">
      <!-- Карточка пользователя -->
      <div class="bg-[#FEF7FF] dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-[#E8DEF8] dark:bg-[#2d1b4e] flex items-center justify-center">
            <span class="text-[#70439e] dark:text-[#b388e8] font-medium text-2xl">{{ getUserInitials() }}</span>
          </div>
          <div>
            <p class="text-lg font-bold text-[#1E1E1E] dark:text-white">{{ getFullName() }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">ID: {{ user?.id }}</p>
          </div>
        </div>
        <!--<div class="px-4 py-3 flex justify-between">
          <span class="text-gray-500 dark:text-gray-400 text-sm">Роль</span>
          <span class="text-[#1E1E1E] dark:text-white text-sm font-medium">{{ user.role || 'Менеджер' }}</span>
        </div>-->
      </div>

      <!-- Данные учетной записи -->
      <div
          class="bg-[#FEF7FF] dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <span class="text-sm font-medium text-[#1E1E1E] dark:text-white">Данные учетной записи</span>
        </div>
        <div class="divide-y divide-gray-200 dark:divide-gray-800">
          <div class="px-4 py-3 flex justify-between">
            <span class="text-gray-500 dark:text-gray-400 text-sm">Логин</span>
            <span class="text-[#1E1E1E] dark:text-white text-sm font-medium">{{ user?.username }}</span>
          </div>
          <div class="px-4 py-3 flex justify-between">
            <span class="text-gray-500 dark:text-gray-400 text-sm">Привязанный филиал</span>
            <span class="text-[#1E1E1E] dark:text-white text-sm font-medium">{{ user?.officeId ?? 'Не указан' }}</span>
          </div>
        </div>
      </div>

      <!-- Кнопка выхода -->
      <div class="pt-2">
        <UButton
            color="gray"
            variant="ghost"
            class="w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 h-12 rounded-xl border border-red-200 dark:border-red-800"
            @click="handleLogout"
        >
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 mr-2"/>
          Выйти из системы
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useAuth} from "~/composables/useAuth.ts";

const router = useRouter()
const colorMode = useColorMode()
const {user, logout} = useAuth()

const getFullName = () => {
  if (!user.value) return ''
  return [user.value.surname, user.value.name, user.value.middleName]
      .filter(Boolean)
      .join(' ')
}

const getUserInitials = () => {
  if (!user.value) return ''
  return `${user.value.name?.[0] ?? ''}${user.value.surname?.[0] ?? ''}`.toUpperCase()
}

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const goBack = () => router.back()

const handleLogout = () => {
  if (confirm('Вы уверены, что хотите выйти?')) {
    logout()
  }
}
</script>

<style scoped>
input {
  outline: none !important;
  outline-style: none !important;
  box-shadow: none !important;
}
</style>