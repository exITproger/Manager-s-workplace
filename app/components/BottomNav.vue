<template>
  <div class="fixed bottom-0 left-0 right-0 bg-gray-50 dark:bg-gray-950 flex justify-around py-2 border-t border-gray-200 dark:border-gray-800 z-50">
    <!-- ГЛАВНАЯ (dashboard) -->
    <UButton
      color="gray"
      variant="ghost"
      class="flex flex-col items-center gap-0 h-auto py-1 px-0 min-w-0"
      :class="isActive('home') ? 'text-black dark:text-white' : 'text-gray-400'"
      @click="goToHome"
    >
      <UIcon name="i-heroicons-home" class="w-6 h-6" />
      <span class="text-[10px]">Главная</span>
    </UButton>

    <!-- ЗАДАЧИ -->
    <UButton
      color="gray"
      variant="ghost"
      class="flex flex-col items-center gap-0 h-auto py-1 px-0 min-w-0 relative"
      :class="isActive('tasks') ? 'text-black dark:text-white' : 'text-gray-400'"
      @click="goToTasks"
    >
      <UIcon name="i-heroicons-clipboard-document-list" class="w-6 h-6" />
      <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#B3261E] text-white text-[10px] rounded-full">5</span>
      <span class="text-[10px]">Задачи</span>
    </UButton>

    <!-- КАТАЛОГ -->
    <UButton
      color="gray"
      variant="ghost"
      class="flex flex-col items-center gap-0 h-auto py-1 px-0 min-w-0"
      :class="isActive('catalog') ? 'text-black dark:text-white' : 'text-gray-400'"
      @click="goToCatalog"
    >
      <UIcon name="i-heroicons-squares-2x2" class="w-6 h-6" />
      <span class="text-[10px]">Каталог</span>
    </UButton>

    <!-- КОРЗИНА -->
    <UButton
      color="gray"
      variant="ghost"
      class="flex flex-col items-center gap-0 h-auto py-1 px-0 min-w-0 relative"
      :class="isActive('cart') ? 'text-black dark:text-white' : 'text-gray-400'"
      @click="goToCart"
    >
      <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6" />
      <span class="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#B3261E] text-white text-[10px] rounded-full">2</span>
      <span class="text-[10px]">Корзина</span>
    </UButton>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()

const activeTab = computed(() => {
  const path = route.path
  
  if (path === '/' || path === '/dashboard' || path.startsWith('/dashboard')) return 'home'
  if (path.startsWith('/tasks')) return 'tasks'
  if (path.startsWith('/catalog')) return 'catalog'
  if (path.startsWith('/cart')) return 'cart'
  return null
})

const isActive = (tab) => activeTab.value === tab

const goToHome = () => router.push('/dashboard')
const goToTasks = () => router.push('/tasks')
const goToCatalog = () => router.push('/catalog')
const goToCart = () => router.push('/cart')
</script>