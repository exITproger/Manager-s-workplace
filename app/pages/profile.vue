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
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
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
            <span class="text-[#70439e] dark:text-[#b388e8] font-medium text-2xl">{{ userInitials }}</span>
          </div>
          <div>
            <p class="text-lg font-bold text-[#1E1E1E] dark:text-white">{{ user.name }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">ID: {{ user.id }}</p>
          </div>
        </div>
      </div>

      <!-- Данные учетной записи -->
      <div class="bg-[#FEF7FF] dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <span class="text-sm font-medium text-[#1E1E1E] dark:text-white">Данные учетной записи</span>
        </div>
        <div class="divide-y divide-gray-200 dark:divide-gray-800">
          <div class="px-4 py-3 flex justify-between">
            <span class="text-gray-500 dark:text-gray-400 text-sm">Логин</span>
            <span class="text-[#1E1E1E] dark:text-white text-sm font-medium">{{ user.login }}</span>
          </div>
          <div class="px-4 py-3 flex justify-between">
            <span class="text-gray-500 dark:text-gray-400 text-sm">Привязанный филиал</span>
            <span class="text-[#1E1E1E] dark:text-white text-sm font-medium">{{ user.branch_id || 'Не указан' }}</span>
          </div>
          <div class="px-4 py-3 flex justify-between">
            <span class="text-gray-500 dark:text-gray-400 text-sm">Роль</span>
            <span class="text-[#1E1E1E] dark:text-white text-sm font-medium">{{ user.role || 'Менеджер' }}</span>
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
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 mr-2" />
          Выйти из системы
        </UButton>
      </div>
    </div>

    <!-- Нижняя навигация -->
    <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 flex justify-around py-2" style="z-index: 20;">
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0"
        @click="goToHome"
      >
        <UIcon name="i-heroicons-home" class="w-6 h-6 text-[#1E1E1E] dark:text-gray-400" />
        <span class="text-[10px] text-[#1E1E1E] dark:text-gray-400">Главная</span>
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0 relative"
        @click="goToTasks"
      >
        <UIcon name="i-heroicons-clipboard-document-list" class="w-6 h-6 text-[#1E1E1E] dark:text-gray-400" />
        <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full" style="background-color: rgba(179, 38, 30, 1); color: white; font-size: 10px;">5</span>
        <span class="text-[10px] text-[#1E1E1E] dark:text-gray-400">Задачи</span>
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0"
        @click="goToCatalog"
      >
        <UIcon name="i-heroicons-squares-2x2" class="w-6 h-6 text-[#1E1E1E] dark:text-gray-400" />
        <span class="text-[10px] text-[#1E1E1E] dark:text-gray-400">Каталог</span>
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0 relative"
        @click="goToCart"
      >
        <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6 text-[#1E1E1E] dark:text-gray-400" />
        <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full" style="background-color: rgba(179, 38, 30, 1); color: white; font-size: 10px;">2</span>
        <span class="text-[10px] text-[#1E1E1E] dark:text-gray-400">Корзина</span>
      </UButton>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const colorMode = useColorMode()

const user = ref({
  id: 121,
  login: 'manager_007',
  name: 'Илья Иванов',
  branch_id: 'Филиал Южный',
  role: 'Менеджер'
})

const userInitials = computed(() => {
  return user.value.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const goBack = () => router.back()
const goToHome = () => router.push('/dashboard')
const goToTasks = () => router.push('/tasks')
const goToCatalog = () => router.push('/products')
const goToCart = () => router.push('/cart')

const handleLogout = () => {
  if (confirm('Вы уверены, что хотите выйти?')) {
    router.push('/')
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