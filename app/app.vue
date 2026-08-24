<template>
  <UApp>
    <NuxtRouteAnnouncer/>
    <NuxtPage/>
    <BottomNav v-if="showBottomNav"/>
  </UApp>
</template>
<script setup>

const route = useRoute()

const showBottomNav = computed(() => {
  // По умолчанию показываем, если не указано иное
  return route.meta.hideNav !== true
})
</script>
