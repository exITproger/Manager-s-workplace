<script setup lang="ts">
import NotificationCard from '~/components/notifications/NotificationCard.vue'
import {useMeRequest} from "~/api/me.ts";
import {useNotificationsRequest} from "~/api/notifications.ts";

const {data: user} = await useMeRequest()
const recipientId = ref<number | undefined>(user.value?.id)
const {data: notifications, pending} = await useNotificationsRequest(recipientId)
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 flex flex-col pb-20 transition-colors duration-200">
    <!-- Header -->
    <div class="px-4 pt-6 flex-shrink-0">
      <div class="flex items-center justify-between">
        <BackButton />
        <ThemeToggle />
      </div>
    </div>

    <!-- вкладки Собственные / Филиала -->
    <div class="px-4 mt-3 flex-shrink-0 flex justify-center">
      <div class="flex border border-[#555555] dark:border-[#555555] rounded-full h-6 overflow-hidden max-w-[360px] w-full">
        <button
          class="flex-1 py-0 text-[11px] font-medium transition-all duration-300 flex items-center justify-center"
          :class="recipientId === user?.id 
            ? 'bg-[#E8DEF8] dark:bg-[#1e293b] text-[#70439e] dark:text-white' 
            : 'bg-white dark:bg-[#0a0a0a] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a2e]'"
          @click="recipientId = user?.id"
        >
          Собственные
        </button>
        <div class="w-px bg-[#555555] dark:bg-[#555555]"></div>
        <button
          class="flex-1 py-0 text-[11px] font-medium transition-all duration-300 flex items-center justify-center"
          :class="recipientId === undefined 
            ? 'bg-[#E8DEF8] dark:bg-[#1e293b] text-[#70439e] dark:text-white' 
            : 'bg-white dark:bg-[#0a0a0a] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a2e]'"
          @click="recipientId = undefined"
        >
          Филиал
        </button>
      </div>
    </div>

    <!-- список уведомлений -->
    <div v-if="pending" class="flex-1 flex items-center justify-center">
      <span class="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">Загрузка...</span>
    </div>
    <div v-else class="px-4 mt-4 space-y-4 flex-1 overflow-y-auto pb-40" style="padding-top: 16px;">
      <NotificationCard
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>

    <BottomNav/>
  </div>
</template>