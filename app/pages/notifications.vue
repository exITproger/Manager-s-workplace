<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col pb-20">
    <div class="bg-gray-50 dark:bg-[#0a0a0a] px-4 py-3 flex justify-between items-center">
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

    <div class="px-4 mt-3 flex-shrink-0 flex justify-center">
      <div class="flex border border-[#555555] dark:border-gray-600 rounded-full h-6 overflow-hidden max-w-[360px] w-full">
        <button
          class="flex-1 py-0 text-[11px] font-medium transition-colors duration-300 flex items-center justify-center"
          :class="activeTab === 'my' ? 'bg-[#E8DEF8] dark:bg-[#1e293b] text-[#70439e] dark:text-white' : 'bg-gray-50 dark:bg-[#0a0a0a] text-gray-500 dark:text-gray-400'"
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
          :class="activeTab === 'branch' ? 'bg-[#E8DEF8] dark:bg-[#1e293b] text-[#70439e] dark:text-white' : 'bg-gray-50 dark:bg-[#0a0a0a] text-gray-500 dark:text-gray-400'"
          @click="activeTab = 'branch'"
        >
          <span class="inline-block w-3 text-center">
            <span v-if="activeTab === 'branch'" class="text-[#70439e] dark:text-white">✓</span>
          </span>
          Уведомления филиала
        </button>
      </div>
    </div>

    <div v-if="pending" class="flex-1 flex items-center justify-center">
      <span class="text-sm text-gray-500 dark:text-gray-400">Загрузка...</span>
    </div>
    <div v-else-if="notifications.length === 0" class="flex-1 flex items-center justify-center">
      <span class="text-sm text-gray-500 dark:text-gray-400">Нет уведомлений</span>
    </div>
    <div v-else class="px-4 mt-4 space-y-4 flex-1 overflow-y-auto pb-40" style="padding-top: 16px;">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="relative bg-[#FEF7FF] dark:bg-[#0F172B] rounded-2xl shadow-sm h-[95px] overflow-visible border border-gray-200 dark:border-gray-700"
      >
        <div class="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <div class="w-9 h-9 rounded-full bg-[#E8DEF8] dark:bg-[#1e293b] flex items-center justify-center">
            <span class="text-[#70439e] dark:text-white font-medium text-sm">{{ notification.recipient?.name?.charAt(0) || 'Ф' }}</span>
          </div>
        </div>
        <div class="absolute left-[60px] top-1/2 -translate-y-1/2 z-10" style="width: calc(100% - 115px);">
          <span class="font-semibold text-sm text-black dark:text-white block leading-tight">{{ notification.title }}</span>
          <span class="text-xs text-gray-400 dark:text-gray-500 block leading-tight mt-1">
            {{ notification.date ? new Date(notification.date).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) : '' }}
          </span>
        </div>
        <div
          v-if="!notification.isRead"
          class="absolute -top-1 -right-0.5 w-3.5 h-3.5 rounded-full"
          style="z-index: 50; background-color: #B3261E; box-shadow: 0 0 0 2px #ffffff;"
        >
        </div>
      </div>
    </div>

    <BottomNav/>
  </div>
</template>

<script setup lang="ts">
import type { NotificationListItem } from '~/types/NotificationListItem'

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const activeTab = ref<'my' | 'branch'>('my')
const notifications = ref<NotificationListItem[]>([])
const pending = ref(false)

const fetchNotifications = async () => {
  pending.value = true
  try {
    let url = '/api/notifications'
    if (activeTab.value === 'my') {
      url += '?recipient_id=1'
    } else {
      url += '?recipient_id=0'
    }
    const response = await $fetch<NotificationListItem[]>(url)
    notifications.value = response
  } catch (error) {
    console.error('Ошибка загрузки уведомлений:', error)
    notifications.value = []
  } finally {
    pending.value = false
  }
}

watch(activeTab, () => {
  fetchNotifications()
})

onMounted(() => {
  fetchNotifications()
})
</script>