<!-- pages/notifications.vue -->
<template>
  <div class="min-h-screen bg-white flex flex-col pb-20">
    <BackButton />

    <!-- вкладки Все / Непрочитанные -->
    <div class="px-4 mt-3 flex-shrink-0 flex justify-center">
      <div class="flex border border-[#555555] rounded-full h-6 overflow-hidden max-w-[360px] w-full">
        <button
          class="flex-1 py-0 text-[11px] font-medium transition-colors duration-300 flex items-center justify-center"
          :class="activeTab === 'all' ? 'bg-[#E8DEF8] text-[#70439e]' : 'bg-white text-gray-500'"
          @click="activeTab = 'all'"
        >
          <span v-if="activeTab === 'all'" class="mr-1 text-[11px]">✓</span>
          Все
        </button>
        <div class="w-px bg-[#555555]"></div>
        <button
          class="flex-1 py-0 text-[11px] font-medium transition-colors duration-300 flex items-center justify-center"
          :class="activeTab === 'unread' ? 'bg-[#E8DEF8] text-[#70439e]' : 'bg-white text-gray-500'"
          @click="activeTab = 'unread'"
        >
          <span v-if="activeTab === 'unread'" class="mr-1 text-[11px]">✓</span>
          Непрочитанные
        </button>
      </div>
    </div>

    <!-- список уведомлений -->
    <div class="px-4 mt-4 space-y-4 flex-1 overflow-y-auto pb-40" style="padding-top: 16px;">
      <NotificationCard
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import NotificationCard from '~/components/notifications/NotificationCard.vue'

const router = useRouter()

const activeTab = ref('all')

const notifications = ref([
  { id: 1, time: '10:42' },
  { id: 2, time: '11:15' },
  { id: 3, time: '12:30' },
  { id: 4, time: '13:05' },
  { id: 5, time: '14:20' },
  { id: 6, time: '15:45' },
  { id: 7, time: '16:10' },
  { id: 8, time: '17:00' }
])
</script>