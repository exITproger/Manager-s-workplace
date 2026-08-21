<template>
  <div class="min-h-screen bg-white flex flex-col pb-20">
    <BackButton></BackButton>

    <!-- вкладки Все / Непрочитанные -->
    <div class="px-4 mt-3 flex-shrink-0">
      <div class="flex border border-[#555555] rounded-full h-11 overflow-hidden">
        <button
          class="flex-1 py-2 text-sm font-medium transition-colors duration-300 flex items-center justify-center"
          :class="activeTab === 'all' ? 'bg-[#E8DEF8] text-[#70439e]' : 'bg-white text-gray-500'"
          @click="activeTab = 'all'"
        >
          <span v-if="activeTab === 'all'" class="mr-1">✓</span>
          Все
        </button>
        <div class="w-px bg-[#555555]"></div>
        <button
          class="flex-1 py-2 text-sm font-medium transition-colors duration-300 flex items-center justify-center"
          :class="activeTab === 'unread' ? 'bg-[#E8DEF8] text-[#70439e]' : 'bg-white text-gray-500'"
          @click="activeTab = 'unread'"
        >
          <span v-if="activeTab === 'unread'" class="mr-1">✓</span>
          Непрочитанные
        </button>
      </div>
    </div>

    <!-- список уведомлений через компонент -->
    <div class="px-4 mt-6 space-y-6 flex-1 overflow-y-auto pb-40" style="padding-top: 8px;">
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
  { id: 2, time: '10:42' },
  { id: 3, time: '10:42' },
  { id: 4, time: '10:42' }
])

</script>