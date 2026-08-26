<template>
  <div class="relative bg-[#FEF7FF] dark:bg-[#0F172B] rounded-2xl shadow-sm h-[95px] overflow-visible border border-gray-200 dark:border-gray-700">
    <div class="absolute left-3 top-1/2 -translate-y-1/2 z-10">
      <div class="w-9 h-9 rounded-full bg-[#E8DEF8] dark:bg-[#1e293b] flex items-center justify-center">
        <span class="text-[#70439e] dark:text-white font-medium text-sm">
          {{ getInitials(notification.recipient) }}
        </span>
      </div>
    </div>
    <div class="absolute left-[60px] top-1/2 -translate-y-1/2 z-10" style="width: calc(100% - 115px);">
      <span class="font-semibold text-sm text-black dark:text-white block leading-tight">{{ notification.title }}</span>
      <span class="text-xs text-gray-400 dark:text-gray-500 block leading-tight mt-1">
        {{ formatDate(notification.date) }}
      </span>
    </div>
    <div
      v-if="!notification.isRead"
      class="absolute -top-1 -right-0.5 w-3.5 h-3.5 rounded-full"
      style="z-index: 50; background-color: #B3261E; box-shadow: 0 0 0 2px #ffffff;"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NotificationListItem } from '~/types/NotificationListItem'

defineProps<{
  notification: NotificationListItem
}>()

const getInitials = (recipient: { name: string; middleName?: string }) => {
  if (recipient.middleName) {
    return `${recipient.name.charAt(0)}.${recipient.middleName.charAt(0)}.`
  }
  return recipient.name.charAt(0)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}
</script>