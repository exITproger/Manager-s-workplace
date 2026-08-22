<!-- app.vue -->
<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    
    <!-- Хост для уведомлений. timeout задаем здесь глобально (3 секунды) -->
    <UNotifications :ui="{ timeout: 3000 }" />
    
    <BottomNav v-if="showBottomNav" />
  </UApp>
</template>

<script setup>
const route = useRoute()

const showBottomNav = computed(() => {
  // По умолчанию показываем, если не указано иное
  return route.meta.hideNav !== true
})
</script>