<script setup lang="ts">
import NotificationCard from '~/components/notifications/NotificationCard.vue'
import {useMeRequest} from "~/api/me.ts";
import {useNotificationsRequest} from "~/api/notifications.ts";

const {data: user} = await useMeRequest()
const recipientId = ref<number | undefined>(user.value?.id)
const {data: notifications, pending} = await useNotificationsRequest(recipientId)
</script>
<template>
  <div class="min-h-screen bg-white flex flex-col pb-20">
    <BackButton/>

    <!-- вкладки Все / Непрочитанные -->
    <!-- Закомментировано: API /notifications/ не поддерживает фильтрацию по прочитанности
         (в спеке только recipient_id, page, page_limit) -->
    <div class="px-4 mt-3 flex-shrink-0 flex justify-center">
      <div class="flex border border-[#555555] rounded-full h-6 overflow-hidden max-w-[360px] w-full">
        <button
          class="flex-1 py-0 text-[11px] font-medium transition-colors duration-300 flex items-center justify-center"
          :class="recipientId === user?.id ? 'bg-[#E8DEF8] text-[#70439e]' : 'bg-white text-gray-500'"
          @click="recipientId = user?.id"
        >
          <span v-if="recipientId === user?.id" class="mr-1 text-[11px]">✓</span>
          Собственные
        </button>
        <div class="w-px bg-[#555555]"></div>
        <button
          class="flex-1 py-0 text-[11px] font-medium transition-colors duration-300 flex items-center justify-center"
          :class="recipientId === undefined ? 'bg-[#E8DEF8] text-[#70439e]' : 'bg-white text-gray-500'"
          @click="recipientId = undefined"
        >
          <span v-if="recipientId === undefined" class="mr-1 text-[11px]">✓</span>
          Филиал
        </button>
      </div>
    </div>

    <!-- список уведомлений -->
    <div v-if="pending" class="flex-1 flex items-center justify-center">
      <span class="text-sm text-gray-500">Загрузка...</span>
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
