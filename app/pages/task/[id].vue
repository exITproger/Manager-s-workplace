<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pb-48">
    <!-- Шапка -->
    <div class="px-4 pt-6 flex-shrink-0">
      <div class="flex items-center justify-between">
        <BackButton />
        <ThemeToggle />
      </div>
    </div>

    <div class="h-4"></div>

    <!-- Статус, приоритет, срок выполнения - без пустой колонки слева -->
    <div class="grid grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 mb-6">
      <div>
        <div class="text-gray-400 dark:text-gray-500 font-medium" style="font-size: 12px;">Статус</div>
        <div class="flex items-center gap-2 text-black dark:text-white" style="font-size: 14px;">
          <span 
            class="w-2 h-2 rounded-full inline-block"
            :class="{
              'bg-yellow-500': task.status === 'Новая',
              'bg-blue-500': task.status === 'В работе',
              'bg-green-500': task.status === 'Выполнено'
            }"
          ></span>
          {{ task.status }}
        </div>
      </div>
      <div>
        <div class="text-gray-400 dark:text-gray-500 font-medium" style="font-size: 12px;">Приоритет</div>
        <div class="flex items-center gap-2 text-black dark:text-white" style="font-size: 14px;">
          <span 
            class="w-2 h-2 rounded-full inline-block"
            :class="{
              'bg-green-500': task.priority === 'Низкий',
              'bg-orange-500': task.priority === 'Обычный',
              'bg-blue-500': task.priority === 'Высокий',
              'bg-red-500': task.priority === 'Срочный'
            }"
          ></span>
          {{ task.priority }}
        </div>
      </div>
      <div>
        <div class="text-gray-400 dark:text-gray-500 font-medium" style="font-size: 12px;">Срок выполнения</div>
        <div class="flex items-center gap-2 text-black dark:text-white" style="font-size: 14px;">
          <UIcon name="i-heroicons-clock" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
          {{ task.deadline }}
        </div>
      </div>
    </div>

    <!-- Тип задачи и номер -->
    <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8 mb-4">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-clipboard-type" class="w-5 h-5 text-black" />
        <h1 class="text-black dark:text-white" style="font-family: 'Afacad Flux', sans-serif; font-weight: bold; font-size: 14px;">
          {{ task.type }}
        </h1>
      </div>
      <span class="text-gray-400 dark:text-gray-500 font-normal" style="font-family: 'Jaldi', sans-serif; font-size: 12px;">#{{ task.number }}</span>
    </div>

    <!-- Название задачи -->
    <div class="flex items-center gap-2 px-4 sm:px-6 lg:px-8 mb-6">
      <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 text-black" />
      <span class="text-xl text-black dark:text-white font-normal">{{ task.name }}</span>
    </div>

    <!-- Создана -->
    <div class="px-4 sm:px-6 lg:px-8 mb-6">
      <div class="text-gray-400 dark:text-gray-500" style="font-family: 'Jaldi', sans-serif; font-size: 12px;">Создана</div>
      <div class="text-black dark:text-white" style="font-family: 'Jaldi', sans-serif; font-size: 12px;">{{ task.createdAt }}</div>
    </div>

    <!-- Описание -->
    <div class="px-4 sm:px-6 lg:px-8 mb-6">
      <h2 class="text-black dark:text-white mb-1" style="font-family: 'Jaldi', sans-serif; font-size: 16px; font-weight: 400;">Описание</h2>
      <p class="text-gray-600 dark:text-gray-400" style="font-family: 'Jaldi', sans-serif; font-size: 12px; font-weight: 400;">{{ task.description }}</p>
    </div>

    <!-- Связанный товар -->
    <div class="px-4 sm:px-6 lg:px-8 mb-6">
      <h2 class="text-black dark:text-white mb-3" style="font-family: 'Jaldi', sans-serif; font-size: 16px; font-weight: 400;">Связанный товар</h2>
      <RelatedProductCard :product="task.product" />
    </div>

    <!-- Нижний блок с вкладками -->
    <div class="px-4 sm:px-6 lg:px-8 mt-6 rounded-xl border border-[#E2E8F0] dark:border-gray-700 bg-white dark:bg-[#1a1a1a] shadow-sm overflow-hidden">
      <!-- Детали -->
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

      <!-- Комментарии -->
      <div class="border-b border-[#E2E8F0] dark:border-gray-700 last:border-b-0">
        <button
          class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          @click="toggleTab('comments')"
        >
          <span class="text-sm font-medium text-[#314158] dark:text-gray-300">Комментарии · {{ comments.length }}</span>
          <UIcon 
            :name="isTabOpen('comments') ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
            class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform"
          />
        </button>
        <div v-show="isTabOpen('comments')" class="px-4 pb-4 space-y-3">
          <!-- Список комментариев -->
          <div v-for="(comment, index) in comments" :key="index" class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-[#E8DEF8] dark:bg-[#1e293b] flex items-center justify-center flex-shrink-0">
              <span class="text-[#70439e] dark:text-white text-xs font-medium">{{ comment.avatar }}</span>
            </div>
            <div class="bg-[#F1F5F980] dark:bg-[#1e293b] rounded-xl px-4 py-2 max-w-[80%]">
              <p class="text-gray-600 dark:text-gray-300" style="font-family: 'Calibri', sans-serif; font-size: 12px;">{{ comment.text }}</p>
              <span class="text-gray-400 dark:text-gray-500 text-xs">{{ comment.time }}</span>
            </div>
          </div>

          <!-- Поле для добавления комментария -->
          <div class="flex items-start gap-3 mt-4 pt-4 border-t border-[#E2E8F0] dark:border-gray-700">
            <div class="w-8 h-8 rounded-full bg-[#E8DEF8] dark:bg-[#1e293b] flex items-center justify-center flex-shrink-0">
              <span class="text-[#70439e] dark:text-white text-xs font-medium">Я</span>
            </div>
            <div class="flex-1 flex gap-2">
              <input
                v-model="newComment"
                type="text"
                placeholder="Написать комментарий..."
                class="flex-1 bg-[#F1F5F980] dark:bg-[#1e293b] rounded-xl px-4 py-2 text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8a5af0]"
                @keyup.enter="addComment"
              />
              <button
                @click="addComment"
                class="px-4 py-2 bg-[#8a5af0] hover:bg-[#70439e] text-white rounded-xl text-sm font-medium transition-colors flex-shrink-0"
              >
                Отправить
              </button>
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
        @click="showStatusModal = true"
      >
        <UIcon name="i-lucide-book-marked" class="w-4 h-4" />
        Изменить статус
      </UButton>
      <UButton 
        color="primary" 
        class="flex-1 bg-[#00C16A] hover:bg-[#00a85a] text-white flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-medium border-none"
        @click="changeStatus('Выполнено')"
      >
        <UIcon name="i-lucide-square-check-big" class="w-4 h-4" />
        Выполнено
      </UButton>
    </div>

    <!-- Модальное окно для выбора статуса -->
    <div v-if="showStatusModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="showStatusModal = false">
      <div class="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 w-[320px] shadow-xl border border-[#E2E8F0] dark:border-gray-700">
        <h3 class="text-lg font-semibold text-black dark:text-white mb-4 text-center">Изменить статус</h3>
        
        <div class="space-y-2">
          <button
            v-for="status in statusOptions"
            :key="status"
            @click="changeStatus(status)"
            class="w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left flex items-center gap-3"
            :class="[
              task.status === status 
                ? 'bg-[#8a5af0] text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
          >
            <span 
              class="w-2 h-2 rounded-full flex-shrink-0"
              :class="{
                'bg-yellow-500': status === 'Новая',
                'bg-blue-500': status === 'В работе',
                'bg-green-500': status === 'Выполнено'
              }"
            ></span>
            {{ status }}
            <span v-if="task.status === status" class="ml-auto">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
            </span>
          </button>
        </div>

        <button
          @click="showStatusModal = false"
          class="w-full mt-4 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import RelatedProductCard from '~/components/RelatedProductCard.vue'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()

const openTabs = ref(['details'])
const newComment = ref('')
const showStatusModal = ref(false)

const statusOptions = ['Новая', 'В работе', 'Выполнено']

// Начальные комментарии
const comments = ref([
  { avatar: 'А', text: 'Hello, how are you?', time: '10:42' },
  { avatar: 'Б', text: 'I am doing well, thank you for asking!', time: '10:45' },
  { avatar: 'А', text: 'How can I assist you today?', time: '10:47' },
  { avatar: 'Б', text: 'What is the current weather in Tokyo?', time: '10:50' },
  { avatar: 'С', text: 'Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F).', time: '10:55' }
])

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

const addComment = () => {
  if (newComment.value.trim()) {
    const now = new Date()
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')
    
    comments.value.push({
      avatar: 'Я',
      text: newComment.value.trim(),
      time: time
    })
    newComment.value = ''
    
    if (!isTabOpen('comments')) {
      openTabs.value.push('comments')
    }
  }
}

const changeStatus = (status) => {
  task.status = status
  showStatusModal.value = false
}

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const goBack = () => {
  router.back()
}

const product = {
  id: '100001',
  name: 'iPhone 16 Pro Max',
  price: '129 990',
  quantity: '5',
  image: '/phone.jpg' 
}

const task = reactive({
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
})
</script>