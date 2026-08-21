<template>
    <div class="px-4 pt-6 flex-shrink-0">
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
</template>

<script setup>
const router = useRouter()


const goBack = () => router.back()
</script>