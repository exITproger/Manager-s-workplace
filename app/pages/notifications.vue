<template>
  <div class="min-h-screen bg-white flex flex-col">
    <div class="px-4 pt-14 flex-shrink-0">
      <UButton
        color="gray"
        variant="ghost"
        class="text-[#70439e] p-0 min-w-0 h-auto flex items-center gap-1 text-sm font-normal"
        @click="goBack"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
        <span>Назад</span>
      </UButton>
    </div>
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
    <div class="px-4 mt-6 space-y-6 flex-1 overflow-y-auto pb-40" style="padding-top: 8px;">
      <div 
        v-for="notification in notifications" 
        :key="notification.id" 
        class="relative bg-[#FEF7FF] rounded-2xl shadow-sm h-[135px] overflow-visible border border-gray-200"
      >
        <div class="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <div class="w-12 h-12 rounded-full bg-[#E8DEF8] flex items-center justify-center">
            <span class="text-[#70439e] font-medium text-base">А</span>
          </div>
        </div>
        <div class="absolute left-20 top-1/2 -translate-y-1/2 z-10" style="width: calc(100% - 130px);">
          <span class="font-semibold text-base text-black block">Задача</span>
          <span class="text-sm text-gray-500 block break-words">Вам назначена задача</span>
          <span class="text-[15px] text-black block break-words whitespace-normal">Проверить остаток товара</span>
          <span class="text-sm text-gray-400 block">{{ notification.time }}</span>
        </div>
        <div class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full" style="z-index: 5; background-color: rgba(179, 38, 30, 1); box-shadow: 0 0 0 3px #ffffff;"></div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 bg-white flex justify-around py-2" style="z-index: 20;">
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0"
        @click="goToHome"
      >
        <UIcon name="i-heroicons-home" class="w-6 h-6 text-[#1E1E1E]" />
        <span class="text-[10px] text-[#1E1E1E]">Главная</span>
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0 relative"
        @click="goToTasks"
      >
        <UIcon name="i-heroicons-clipboard-document-list" class="w-6 h-6 text-[#1E1E1E]" />
        <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full" style="background-color: rgba(179, 38, 30, 1); color: white; font-size: 10px;">5</span>
        <span class="text-[10px] text-[#1E1E1E]">Задачи</span>
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0"
        @click="goToCatalog"
      >
        <UIcon name="i-heroicons-squares-2x2" class="w-6 h-6 text-[#1E1E1E]" />
        <span class="text-[10px] text-[#1E1E1E]">Каталог</span>
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        class="flex flex-col items-center text-gray-400 gap-0 h-auto py-1 px-0 min-w-0 relative"
        @click="goToCart"
      >
        <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6 text-[#1E1E1E]" />
        <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full" style="background-color: rgba(179, 38, 30, 1); color: white; font-size: 10px;">2</span>
        <span class="text-[10px] text-[#1E1E1E]">Корзина</span>
      </UButton>
    </div>
  </div>
</template>
<script setup>
const router = useRouter()
const activeTab = ref('all')
const notifications = ref([
  { id: 1, time: '10:42' },
  { id: 2, time: '10:42' },
  { id: 3, time: '10:42' },
  { id: 4, time: '10:42' }
])
const goToHome = () => router.push('/')
const goToTasks = () => router.push('/tasks')
const goToCatalog = () => router.push('/products')
const goToCart = () => router.push('/cart')
const goBack = () => router.back()
</script>