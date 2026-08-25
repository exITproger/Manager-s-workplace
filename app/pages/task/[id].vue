<!-- pages/task/[id].vue -->
<template>
  <div class="min-h-screen bg-white dark:bg-[#0a0a0a] pb-48">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-5">
      <!-- Шапка -->
      <div class="flex items-center justify-between mb-6">
        <UButton
          color="gray"
          variant="ghost"
          class="text-[#6750A4] dark:text-[#b388e8] p-0 min-w-0 h-auto flex items-center gap-1 text-sm font-normal"
          style="font-family: 'Static', sans-serif; font-size: 14px; line-height: 20px;"
          @click="goBack"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
          Назад
        </UButton>
        <UButton
          variant="ghost"
          color="neutral"
          square
          class="p-0 min-w-0 h-auto"
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
          :ui="{ leadingIcon: 'size-6' }"
          aria-label="Переключить тему"
          @click="toggleTheme"
        />
      </div>

      <!-- Статус, приоритет, срок выполнения с пустой колонкой слева -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div></div> <!-- Пустая колонка для отступа -->
        <div>
          <div class="text-gray-400 dark:text-gray-500 font-medium" style="font-size: 12px;">Статус</div>
          <div class="text-black dark:text-white" style="font-size: 14px;">{{ task.status }}</div>
        </div>
        <div>
          <div class="text-gray-400 dark:text-gray-500 font-medium" style="font-size: 12px;">Приоритет</div>
          <div class="text-black dark:text-white" style="font-size: 14px;">{{ task.priority }}</div>
        </div>
        <div>
          <div class="text-gray-400 dark:text-gray-500 font-medium" style="font-size: 12px;">Срок выполнения</div>
          <div class="text-black dark:text-white" style="font-size: 14px;">{{ task.deadline }}</div>
        </div>
      </div>

      <!-- Тип задачи и номер -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-clipboard-type" class="w-5 h-5 text-[#8a5af0]" />
          <h1 class="text-black dark:text-white" style="font-family: 'Afacad Flux', sans-serif; font-weight: bold; font-size: 14px;">
            {{ task.type }}
          </h1>
        </div>
        <span class="text-gray-400 dark:text-gray-500 font-normal" style="font-family: 'Jaldi', sans-serif; font-size: 12px;">#{{ task.number }}</span>
      </div>

      <!-- Название задачи -->
      <div class="flex items-center gap-2 mb-6">
        <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 text-[#8a5af0]" />
        <span class="text-xl text-black dark:text-white font-normal">{{ task.name }}</span>
      </div>

      <!-- Создана -->
      <div class="mb-6">
        <div class="text-gray-400 dark:text-gray-500" style="font-family: 'Jaldi', sans-serif; font-size: 12px;">Создана</div>
        <div class="text-black dark:text-white" style="font-family: 'Jaldi', sans-serif; font-size: 12px;">{{ task.createdAt }}</div>
      </div>

      <!-- Описание -->
      <div class="mb-6">
        <h2 class="text-black dark:text-white mb-1" style="font-family: 'Jaldi', sans-serif; font-size: 16px; font-weight: 400;">Описание</h2>
        <p class="text-gray-600 dark:text-gray-400" style="font-family: 'Jaldi', sans-serif; font-size: 12px; font-weight: 400;">{{ task.description }}</p>
      </div>

      <!-- Связанный товар -->
      <div class="mb-6">
        <h2 class="text-black dark:text-white mb-3" style="font-family: 'Jaldi', sans-serif; font-size: 16px; font-weight: 400;">Связанный товар</h2>
        <RelatedProductCard :product="task.product" />
      </div>

      <!-- Нижний блок с вкладками -->
      <div class="mt-6 rounded-xl border border-[#E2E8F0] dark:border-gray-700 bg-white dark:bg-[#1a1a1a] shadow-sm overflow-hidden">
        <div class="border-b border-[#E2E8F0] dark:border-gray-700">
          <button
            class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            @click="toggleTab('details')"
          >
            <span class="text-sm font-medium text-[#314158] dark:text-gray-300">Детали</span>
            <UIcon 
              :name="isTabOpen('details') ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
              class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform"
            />
          </button>
          <div v-show="isTabOpen('details')" class="px-4 pb-4 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400" style="font-family: 'Calibri', sans-serif; font-size: 14px;">Создатель</span>
              <span class="text-black dark:text-white" style="font-family: 'Calibri', sans-serif; font-size: 14px;">Смирнова А. В.</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400" style="font-family: 'Calibri', sans-serif; font-size: 14px;">Исполнитель</span>
              <span class="text-black dark:text-white" style="font-family: 'Calibri', sans-serif; font-size: 14px;">Иванов Е. С.</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400" style="font-family: 'Calibri', sans-serif; font-size: 14px;">Филиал</span>
              <span class="text-black dark:text-white" style="font-family: 'Calibri', sans-serif; font-size: 14px;">Магазин №1</span>
            </div>
          </div>
        </div>

        <div class="border-b border-[#E2E8F0] dark:border-gray-700">
          <button
            class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            @click="toggleTab('attachments')"
          >
            <span class="text-sm font-medium text-[#314158] dark:text-gray-300">Вложения · 2</span>
            <UIcon 
              :name="isTabOpen('attachments') ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
              class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform"
            />
          </button>
          <div v-show="isTabOpen('attachments')" class="px-4 pb-4 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-paperclip" class="w-4 h-4 text-gray-500" />
                <span class="text-black dark:text-white" style="font-family: 'Calibri', sans-serif; font-size: 14px;">Инструкция.pdf</span>
              </div>
              <UIcon name="i-lucide-download" class="w-4 h-4 text-gray-500 cursor-pointer hover:text-[#8a5af0]" />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-paperclip" class="w-4 h-4 text-gray-500" />
                <span class="text-black dark:text-white" style="font-family: 'Calibri', sans-serif; font-size: 14px;">Расположение.jpg</span>
              </div>
              <UIcon name="i-lucide-download" class="w-4 h-4 text-gray-500 cursor-pointer hover:text-[#8a5af0]" />
            </div>
          </div>
        </div>

        <div class="border-b border-[#E2E8F0] dark:border-gray-700 last:border-b-0">
          <button
            class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            @click="toggleTab('comments')"
          >
            <span class="text-sm font-medium text-[#314158] dark:text-gray-300">Комментарии · 4</span>
            <UIcon 
              :name="isTabOpen('comments') ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
              class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform"
            />
          </button>
          <div v-show="isTabOpen('comments')" class="px-4 pb-4 space-y-3">
            <div v-for="(comment, index) in comments" :key="index" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[#E8DEF8] dark:bg-[#1e293b] flex items-center justify-center flex-shrink-0">
                <span class="text-[#70439e] dark:text-white text-xs font-medium">{{ comment.avatar }}</span>
              </div>
              <div class="bg-[#F1F5F980] dark:bg-[#1e293b] rounded-xl px-4 py-2 max-w-[80%]">
                <p class="text-gray-600 dark:text-gray-300" style="font-family: 'Calibri', sans-serif; font-size: 12px;">{{ comment.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Дополнительный футер с кнопками -->
    <div class="fixed left-0 right-0 bg-white dark:bg-[#1a1a1a] px-4 py-4 flex gap-3 z-40 border-t border-gray-200 dark:border-gray-700" style="bottom: 58px;">
      <UButton 
        color="gray" 
        variant="ghost" 
        class="flex-1 bg-[#7A66AF] text-white hover:bg-[#70439e] flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-medium"
      >
        <UIcon name="i-lucide-book-marked" class="w-4 h-4" />
        Изменить статус
      </UButton>
      <UButton 
        color="primary" 
        class="flex-1 bg-[#00C16A] hover:bg-[#00a85a] text-white flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-medium border-none"
      >
        <UIcon name="i-lucide-square-check-big" class="w-4 h-4" />
        Выполнено
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { products } from '~/data/products'
import RelatedProductCard from '~/components/RelatedProductCard.vue'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()

const openTabs = ref(['details'])

const isTabOpen = (tab) => {
  return openTabs.value.includes(tab)
}

const toggleTab = (tab) => {
  const index = openTabs.value.indexOf(tab)
  if (index === -1) {
    openTabs.value.push(tab)
  } else {
    openTabs.value.splice(index, 1)
  }
}

const comments = [
  { avatar: 'А', text: 'Hello, how are you?' },
  { avatar: 'Б', text: 'I am doing well, thank you for asking!' },
  { avatar: 'А', text: 'How can I assist you today?' },
  { avatar: 'Б', text: 'What is the current weather in Tokyo?' },
  { avatar: 'С', text: 'Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F).' }
]

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const goBack = () => {
  router.back()
}

const product = products.find(p => p.id === '100001') || products[0]

const task = {
  id: route.params.id || '19857',
  type: 'Резервирование',
  number: '19857',
  name: 'Отложить iPhone 16 Pro Max',
  status: 'В работе',
  priority: 'Низкий',
  deadline: 'Завтра, 09:00',
  createdAt: '20 августа, 10:42',
  description: 'Найдите товар по указанному адресу хранения и перенесите его в зону выдачи заказов',
  product: product
}
</script>