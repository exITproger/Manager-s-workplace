<script setup lang="ts">
const modelValue = ref('')
</script>

<template>
  <div class="p-8">
    <UFormField label="Название">
      <UInput v-model="modelValue" type="text" placeholder="Введите текст" />
    </UFormField>
  </div>
</template>