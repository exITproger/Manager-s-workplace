<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="bg-white px-4 py-3 flex justify-between items-center border-b flex-shrink-0">
      <span class="text-lg font-medium text-black">ТОЧКА</span>
      <div class="w-[52px]"></div>
    </div>
    <div class="px-4 pt-4 flex-shrink-0">
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
      <div class="relative bg-white rounded-full p-1 flex border border-gray-200 h-11">
        <div 
          class="absolute top-1 bottom-1 w-1/2 bg-[#70439e] rounded-full transition-all duration-300"
          :class="activeTab === 'all' ? 'left-1' : 'left-1/2'"
        ></div>
        <button
          class="relative flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 z-10 flex items-center justify-center gap-1"
          :class="activeTab === 'all' ? 'text-white' : 'text-[#70439e]'"
          @click="activeTab = 'all'"
        >
          <span v-if="activeTab === 'all'" class="text-white">✓</span>
          Все
        </button>
        <button
          class="relative flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 z-10 flex items-center justify-center"
          :class="activeTab === 'unread' ? 'text-white' : 'text-[#70439e]'"
          @click="activeTab = 'unread'"
        >
          <span v-if="activeTab === 'unread'" class="text-white">✓</span>
          <span class="ml-0.5">Непрочитанные</span>
        </button>
      </div>
    </div>
    <div class="px-4 mt-4 space-y-3 flex-1 overflow-y-auto pb-40" style="padding-top: 8px;">
      <div 
        v-for="notification in notifications" 
        :key="notification.id" 
        class="relative bg-white rounded-2xl shadow-sm h-[145px] overflow-visible"
      >
        <div class="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <div class="w-12 h-12 rounded-full bg-[#E8DEF8] flex items-center justify-center">
            <span class="text-[#70439e] font-medium text-base">А</span>
          </div>
        </div>
        <div class="absolute left-20 top-1/2 -translate-y-1/2 z-10" style="width: calc(100% - 150px);">
          <span class="font-semibold text-base text-black block">Задача</span>
          <span class="text-sm text-gray-500 block break-words">Вам назначена задача</span>
          <span class="text-[15px] text-black block break-words whitespace-normal">Проверить остаток товара</span>
          <span class="text-sm text-gray-400 block">{{ notification.time }}</span>
        </div>
        <div class="absolute right-0 top-0 h-full" style="width: 85px; background-color: #70439e; pointer-events: none; border-top-right-radius: 16px; border-bottom-right-radius: 16px;">
          <div class="absolute inset-0 overflow-hidden">
            <svg 
              class="absolute -left-[50px] top-0 h-full"
              viewBox="0 0 200 145" 
              preserveAspectRatio="none"
              style="width: 200%;"
            >
              <path 
                d="M 0,0 
                   L 100,0 
                   C 85,25 70,50 85,70 
                   C 95,85 80,100 70,115 
                   C 65,122 75,128 85,145 
                   L 0,145 Z" 
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full" style="z-index: 5; box-shadow: 0 0 0 3px #f8f9fa;"></div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2" style="z-index: 20;">
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
        class="flex flex-col items-center text-black gap-0 h-auto py-1 px-0 min-w-0"
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