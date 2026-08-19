<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center relative px-4 py-8 font-sans">

     <!-- Иконка луны SVG -->
    <button 
      class="absolute top-10 right-5 cursor-pointer text-2xl hover:opacity-80 transition-opacity outline-none"
      @click="toggleTheme"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
    <div class="flex flex-col items-center w-full max-w-[450px] text-center">
      <!-- Заголовок бренда -->
      <h1 class="text-4xl font-medium tracking-widest text-black mb-1">ТОЧКА</h1>
      <p class="text-black mb-8 text-lg">Рабочее место менеджера</p>

      <!-- Подвал -->
      <p class="text-black text-xs mt-10 opacity-60">Только для сотрудников компании</p>
    </div>
  </div>
</template>

<script setup>
// Пока пусто, будет добавлено позже
</script>