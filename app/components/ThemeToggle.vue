<script setup>
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <UButton
    variant="ghost"
    color="neutral"
    square
    class="p-0 min-w-0 h-auto flex items-center"
    :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
    :ui="{ leadingIcon: 'w-5 h-5' }"
    aria-label="Переключить тему"
    @click="toggleTheme"
  />
</template>