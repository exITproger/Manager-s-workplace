<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <BottomNav v-if="showBottomNav" />
  </UApp>
</template>

<script setup>
import Notifications from './pages/notifications.vue';

const route = useRoute()

const showBottomNav = computed(() => {
  // По умолчанию показываем, если не указано иное
  return route.meta.hideNav !== true
})
</script>