<script setup lang="ts">
import type {FetchError} from 'ofetch'
import type {LoginErrorResponse} from "~/types/LoginErrorResponse.ts";
import type {LoginPageModel} from "~/types/LoginPageModel.ts";

definePageMeta({
  hideNav: true
})
const router = useRouter()
const colorMode = useColorMode()
const {login} = useAuth()

const model = reactive<LoginPageModel>({
  login: '',
  password: '',
  loading: false,
  errors: []
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const handleLogin = () => {
  if (!model.login || !model.password) {
    model.errors = ['Заполните логин и пароль.']
    return
  }

  model.loading = true
  model.errors = []

  login(model)
      .then(() => router.push('/dashboard'))
      .catch((error) => {
        const fetchError = error as FetchError<LoginErrorResponse>
        if (fetchError.statusCode === undefined) {
          model.errors = ['Нет подключения к серверу']
        } else {
          const serverErrors = fetchError.data?.errors
          model.errors = serverErrors?.length
              ? serverErrors
              : ['Не удалось войти. Попробуйте позже.']
        }
      })
      .finally(() => {
        model.loading = false
      })
}
</script>

<template>
  <div
      class="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center relative px-4 py-8 font-sans">

    <UButton
        variant="ghost"
        color="neutral"
        square
        class="absolute top-10 right-5"
        :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
        :ui="{ leadingIcon: 'size-7' }"
        aria-label="Переключить тему"
        @click="toggleTheme"
    />

    <div class="flex flex-col items-center w-full max-w-[450px] text-center">
      <!-- Заголовок бренда -->
      <h1 class="text-4xl font-medium tracking-widest text-black dark:text-white mb-1">
        ТОЧКА
      </h1>

      <p class="text-black dark:text-gray-300 mb-8 text-lg">
        Рабочее место менеджера
      </p>

      <p class="text-black dark:text-gray-200 text-lg font-medium mb-6">
        Войдите в рабочий аккаунт
      </p>

      <!-- ФИОЛЕТОВЫЙ БЛОК -->
      <div
          class="bg-[#6b5b9c] dark:bg-black w-full rounded-[6rem] p-9 pt-12 pb-14 flex flex-col items-center shadow-lg">

        <form class="w-full flex flex-col gap-5" @submit.prevent="handleLogin">

          <!-- Логин -->
          <div class="text-left w-full">
            <label class="block text-white text-[15px] mb-1.5 ml-0.5">Логин</label>

            <div class="relative w-full">
              <UInput
                  v-model="model.login"
                  placeholder="Логин"
                  variant="outline"
                  class="custom-input w-full"
                  :ui="{
                  base: 'bg-[#e5ddee] text-[#2e2e2e] placeholder-[#6b5b9c] border-none rounded-lg h-[54px] w-full text-[17px] pl-4',
                  trailing: 'text-[#555] pr-3'
                }"
              />
            </div>

            <!--<p class="text-[#d9d2e3] text-[13px] mt-1 ml-0.5">Supporting text</p>-->
          </div>

          <!-- Пароль -->
          <div class="text-left w-full">
            <label class="block text-white text-[15px] mb-1.5 ml-0.5">Пароль</label>

            <div class="relative w-full">
              <UInput
                  v-model="model.password"
                  type="password"
                  placeholder="Пароль"
                  variant="outline"
                  class="custom-input w-full"
                  :ui="{
                  base: 'bg-[#e5ddee] text-[#2e2e2e] placeholder-[#6b5b9c] border-none rounded-lg h-[54px] w-full text-[17px] pl-4',
                  trailing: 'text-[#555] pr-3'
                }"
              />
            </div>

            <!--<p class="text-[#d9d2e3] text-[13px] mt-1 ml-0.5">Supporting text</p>-->
          </div>

          <!-- Запомнить меня -->
          <!--<label class="flex items-center gap-3 mt-1 w-full cursor-pointer group">
            <input
                type="checkbox"
                v-model="form.remember"
                class="hidden peer"
            />

            <div
                class="w-[22px] h-[22px] bg-[#e5ddee] rounded-[4px] flex items-center justify-center transition-colors shadow-sm peer-checked:bg-[#e5ddee]">
              <svg
                  v-show="form.remember"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-[14px] h-[14px]"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="text-white text-[16px] select-none">Запомнить меня</span>
          </label>-->

          <!-- Ошибка авторизации -->
          <ul v-if="model.errors.length"
              class="text-[14px] font-medium text-red-200 bg-red-900/40 rounded-lg px-3 py-2 list-disc list-inside space-y-1">
            <li v-for="message in model.errors" :key="message">{{ message }}</li>
          </ul>

          <!-- Кнопка входа -->
          <UButton
              type="submit"
              block
              :loading="model.loading"
              :disabled="model.loading"
              class="mt-2 h-[54px] w-full bg-[#eadeff] text-[#222] hover:bg-[#dccbf5] rounded-xl text-[17px] font-medium shadow-sm transition-all disabled:opacity-60"
          >
            Войти
          </UButton>

          <!-- Забыли пароль -->
          <!--<div class="text-left w-full mt-1">
            <a href="#" class="text-white text-[15px] font-medium hover:underline block">Забыли пароль?</a>
          </div>-->

        </form>
      </div>

      <!-- Подвал -->
      <p class="text-black dark:text-gray-400 text-xs mt-10 opacity-60">
        Только для сотрудников компании
      </p>

    </div>
  </div>
</template>

<style scoped>
/* Отключаем стандартные тени для инпутов UInput */
:deep(.custom-input input) {
  --tw-ring-color: transparent !important;
  outline: none !important;
  box-shadow: none !important;
}

:deep(.custom-input) {
  --tw-ring-color: transparent !important;
}
</style>
