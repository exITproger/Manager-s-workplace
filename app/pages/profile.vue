<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Верхняя панель -->
    <div class="bg-white dark:bg-gray-900 px-4 py-3 flex justify-between items-center border-b dark:border-gray-800">
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
        <!-- Кнопка "Назад"-->
        <UButton
          color="gray"
          variant="ghost"
          class="text-gray-700 dark:text-gray-300 p-0 min-w-0 h-auto"
          @click="goBack"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-6 h-6" />
        </UButton>
      </div>
    </div>

    <!-- Заголовок страницы -->
    <div class="px-4 pt-6 pb-2">
      <h1 class="text-xl font-bold text-black dark:text-white">Личный кабинет</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Управление аккаунтом и настройки</p>
    </div>

    <!-- Блок с данными пользователя -->
    <div class="px-4 mt-4 space-y-4">
      
      <!-- Карточка: Имя и ID) -->
      <div class="bg-white dark:bg-gray-900 shadow overflow-hidden rounded-xl p-6 flex flex-col gap-1">
        <p class="text-lg font-bold text-black dark:text-white">{{ user.name }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">ID: {{ user.id }}</p>
      </div>

      <!-- Карточка: Роли и привязки -->
      <div class="bg-white dark:bg-gray-900 shadow overflow-hidden rounded-xl">
        <div class="px-4 py-3 border-b dark:border-gray-800">
          <span class="text-sm font-medium text-black dark:text-white">Данные учетной записи</span>
        </div>
        <div class="divide-y dark:divide-gray-800">
          <div class="px-4 py-3 flex justify-between">
            <span class="text-gray-500 dark:text-gray-400 text-sm">Логин</span>
            <span class="text-black dark:text-white text-sm font-medium">{{ user.login }}</span>
          </div>
          <div class="px-4 py-3 flex justify-between">
            <span class="text-gray-500 dark:text-gray-400 text-sm">Привязанный филиал</span>
            <span class="text-black dark:text-white text-sm font-medium">{{ user.branch_id || 'Не указан' }}</span>
          </div>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="space-y-3 mt-4">
        <UButton
          color="gray"
          variant="ghost"
          class="w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          @click="handleLogout"
        >
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 mr-2" />
          Выйти из системы
        </UButton>
      </div>
    </div>

    <!-- Нижняя навигация -->
    <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 flex justify-around py-2 z-10">
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0"
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
        <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-[10px] rounded-full">5</span>
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
        <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-[10px] rounded-full">2</span>
        <span class="text-[10px]">Корзина</span>
      </UButton>
      <!-- Активная кнопка профиля -->
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-black dark:text-white gap-0 h-auto py-1 px-0 min-w-0"
      >
        <UIcon name="i-heroicons-user" class="w-6 h-6" />
        <span class="text-[10px] font-bold">Профиль</span>
      </UButton>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const colorMode = useColorMode()

// Ваши данные
const user = ref({
  id: 121, 
  login: 'manager_007',
  name: 'Илья Иванов',
  branch_id: 'Филиал Южный'
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Навигация
const goBack = () => router.back()
const goToHome = () => router.push('/dashboard')
const goToTasks = () => router.push('/tasks')
const goToCatalog = () => router.push('/products')
const goToCart = () => router.push('/cart')

const handleLogout = () => {
  if (confirm('Вы уверены, что хотите выйти?')) {
    router.push('/') // Исправлено на '/', чтобы не было ошибки 404 в консоли
  }
}
</script>

<style>
input {
  outline: none !important;
  outline-style: none !important;
  box-shadow: none !important;
}
</style>