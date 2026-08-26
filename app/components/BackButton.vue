<template>
  <UButton
    color="gray"
    variant="ghost"
    class="text-[#70439e] p-0 min-w-0 h-auto flex items-center gap-1 text-sm font-normal"
    @click="goBack"
  >
    <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
    <span>Назад</span>
  </UButton>
</template>

<script setup>
const router = useRouter()
const goBack = () => router.back()
</script>