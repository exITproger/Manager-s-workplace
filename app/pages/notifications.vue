<script setup lang="ts">
import NotificationCard from '~/components/notifications/NotificationCard.vue'
import {useMeRequest} from "~/api/me.ts";
import {useNotificationsRequest} from "~/api/notifications.ts";

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const {data: user} = await useMeRequest()
const {data: notifications, pending} = await useNotificationsRequest(user.value?.id ?? undefined)

const activeTab = ref<'my' | 'branch'>('my')

// Тестовые данные для "Собственные"
const myNotifications = [
  {
    id: 1,
    title: 'Новая задача: Проверить остаток товара',
    recipient: { name: 'Смирнова Е.С.', icon: null },
    recipientId: user.value?.id,
    date: new Date(),
    isRead: false
  },
  {
    id: 2,
    title: 'Заказ №12134 готов к выдаче',
    recipient: { name: 'Иванов И.И.', icon: null },
    recipientId: user.value?.id,
    date: new Date(Date.now() - 3600000),
    isRead: true
  },
  {
    id: 3,
    title: 'Изменение статуса заказа №77777',
    recipient: { name: 'Петров П.П.', icon: null },
    recipientId: user.value?.id,
    date: new Date(Date.now() - 7200000),
    isRead: false
  }
]

// Тестовые данные для "Уведомления филиала"
const branchNotifications = [
  {
    id: 10,
    title: 'Новый заказ в филиале №17',
    recipient: { name: 'Магазин №17', icon: null },
    recipientId: 'branch_17',
    date: new Date(Date.now() - 1800000),
    isRead: false
  },
  {
    id: 11,
    title: 'Поставка товара задерживается',
    recipient: { name: 'Магазин №17', icon: null },
    recipientId: 'branch_17',
    date: new Date(Date.now() - 5400000),
    isRead: true
  },
  {
    id: 12,
    title: 'Инвентаризация назначена на завтра',
    recipient: { name: 'Магазин №17', icon: null },
    recipientId: 'branch_17',
    date: new Date(Date.now() - 10800000),
    isRead: false
  }
]

const filteredNotifications = computed(() => {
  // Если API вернул данные, используем их + добавляем тестовые для демонстрации
  if (notifications.value && notifications.value.length > 0) {
    if (activeTab.value === 'my') {
      const myFromApi = notifications.value.filter(n => n.recipientId === user.value?.id)
      // Если в API есть свои, показываем их, иначе тестовые
      return myFromApi.length > 0 ? myFromApi : myNotifications
    } else {
      const branchFromApi = notifications.value.filter(n => n.recipientId !== user.value?.id)
      return branchFromApi.length > 0 ? branchFromApi : branchNotifications
    }
  }
  
  // Если API пустой или ещё не загрузился — показываем тестовые
  if (activeTab.value === 'my') {
    return myNotifications
  } else {
    return branchNotifications
  }
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col pb-20">
    <!-- Шапка с кнопкой темы -->
    <div class="bg-white dark:bg-[#0a0a0a] px-4 py-3 flex justify-between items-center">
      <BackButton/>
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
    </div>

    <!-- вкладки Собственные / Уведомления филиала -->
    <div class="px-4 mt-3 flex-shrink-0 flex justify-center">
      <div class="flex border border-[#555555] dark:border-gray-600 rounded-full h-6 overflow-hidden max-w-[360px] w-full">
        <button
          class="flex-1 py-0 text-[11px] font-medium transition-colors duration-300 flex items-center justify-center"
          :class="activeTab === 'my' ? 'bg-[#E8DEF8] dark:bg-[#1e293b] text-[#70439e] dark:text-white' : 'bg-white dark:bg-[#0a0a0a] text-gray-500 dark:text-gray-400'"
          @click="activeTab = 'my'"
        >
          <span class="inline-block w-3 text-center">
            <span v-if="activeTab === 'my'" class="text-[#70439e] dark:text-white">✓</span>
          </span>
          Собственные
        </button>
        <div class="w-px bg-[#555555] dark:bg-gray-600"></div>
        <button
          class="flex-1 py-0 text-[11px] font-medium transition-colors duration-300 flex items-center justify-center"
          :class="activeTab === 'branch' ? 'bg-[#E8DEF8] dark:bg-[#1e293b] text-[#70439e] dark:text-white' : 'bg-white dark:bg-[#0a0a0a] text-gray-500 dark:text-gray-400'"
          @click="activeTab = 'branch'"
        >
          <span class="inline-block w-3 text-center">
            <span v-if="activeTab === 'branch'" class="text-[#70439e] dark:text-white">✓</span>
          </span>
          Уведомления филиала
        </button>
      </div>
    </div>

    <!-- список уведомлений -->
    <div v-if="pending" class="flex-1 flex items-center justify-center">
      <span class="text-sm text-gray-500 dark:text-gray-400">Загрузка...</span>
    </div>
    <div v-else class="px-4 mt-4 space-y-4 flex-1 overflow-y-auto pb-40" style="padding-top: 16px;">
      <NotificationCard
        v-for="notification in filteredNotifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>

    <BottomNav/>
  </div>
</template>