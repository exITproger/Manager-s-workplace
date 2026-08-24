<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
    <!-- шапка -->
    <div class="bg-gray-50 dark:bg-gray-950 px-4 py-3 flex items-center">
      <UButton
        color="gray"
        variant="ghost"
        class="text-[#70439e] p-0 min-w-0 h-auto mr-2"
        @click="goBack"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
      </UButton>
      <span class="text-lg font-medium text-black dark:text-white">Создание задачи</span>
    </div>

    <!-- форма -->
    <div class="px-4 mt-4 space-y-4">
      <!-- Название задачи -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Название задачи</label>
        <UInput v-model="form.title" placeholder="Отложить товар" />
      </div>

      <!-- Тип задачи -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Тип задачи</label>
        <USelect
          v-model="form.type"
          :options="taskTypes"
          placeholder="Выберите тип"
        />
      </div>

      <!-- Описание -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Описание</label>
        <UTextarea
          v-model="form.description"
          placeholder="Опишите, что необходимо выполнить..."
          :rows="3"
        />
      </div>

      <!-- Исполнитель -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Исполнитель</label>
        <USelect
          v-model="form.executor"
          :options="executors"
          placeholder="Выберите исполнителя"
        />
      </div>

      <!-- Филиал -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Филиал</label>
        <USelect
          v-model="form.branch"
          :options="branches"
          placeholder="Выберите филиал"
        />
      </div>

      <!-- Выполнить до -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Выполнить до</label>
        <div class="flex items-center gap-3">
          <UPopover>
            <UButton color="gray" variant="outline">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-1" />
              {{ form.date || 'Выберите дату' }}
            </UButton>
            <template #panel>
              <UCalendar v-model="form.date" />
            </template>
          </UPopover>
          <USelect
            v-model="form.hour"
            :options="hours"
            placeholder="Час"
            class="w-20"
          />
          <USelect
            v-model="form.minute"
            :options="minutes"
            placeholder="Мин"
            class="w-20"
          />
        </div>
      </div>

      <!-- Связанный товар -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Связанный товар</label>
        <UButton
          color="gray"
          variant="outline"
          class="w-full justify-center"
          @click="addProduct"
        >
          <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
          Добавить связанный товар
        </UButton>
        <div v-if="form.products.length > 0" class="mt-2 space-y-2">
          <div
            v-for="(product, index) in form.products"
            :key="index"
            class="flex items-center justify-between bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <span class="text-sm">{{ product }}</span>
            <UButton
              color="red"
              variant="ghost"
              size="xs"
              @click="form.products.splice(index, 1)"
            >
              <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Кнопки -->
      <div class="flex gap-3 pt-4">
        <UButton
          color="gray"
          variant="outline"
          class="flex-1 justify-center"
          @click="handleCancel"
        >
          Отменить
        </UButton>
        <UButton
          color="primary"
          class="flex-1 justify-center"
          @click="handleCreate"
        >
          Создать
        </UButton>
      </div>
    </div>

    <!-- нижняя панель -->
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from '~/components/BottomNav.vue'

const router = useRouter()
const toast = useToast()

// Данные формы
const form = reactive({
  title: '',
  type: null,
  description: '',
  executor: null,
  branch: null,
  date: null,
  hour: null,
  minute: null,
  products: []
})

// Опции для выборов
const taskTypes = [
  { label: 'Резервирование', value: 'reservation' },
  { label: 'Перемещение', value: 'move' },
  { label: 'Клиент пришел', value: 'client_order' },
  { label: 'Инвентаризация', value: 'inventory' }
]

const executors = [
  { label: 'Смирнова Е.С.', value: 'smirnova' },
  { label: 'Иванов И.И.', value: 'ivanov' },
  { label: 'Петров П.П.', value: 'petrov' }
]

const branches = [
  { label: 'Магазин №17, Центральный', value: 'branch_17' },
  { label: 'Магазин №5, Северный', value: 'branch_5' }
]

const hours = Array.from({ length: 24 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: String(i).padStart(2, '0')
}))

const minutes = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: String(i).padStart(2, '0')
}))

// Добавление товара
const addProduct = () => {
  // В реальном проекте здесь открывался бы выбор товара
  const productName = prompt('Введите название товара:')
  if (productName) {
    form.products.push(productName)
  }
}

// Создание задачи
const handleCreate = () => {
  // Проверка обязательных полей
  if (!form.title || !form.type || !form.executor || !form.branch) {
    toast.add({
      title: 'Ошибка',
      description: 'Заполните все обязательные поля',
      color: 'red',
      icon: 'i-heroicons-x-circle'
    })
    return
  }

  // Тост об успешном создании
  toast.add({
    title: 'Задача создана',
    description: 'Перейти к созданной задаче?',
    color: 'green',
    icon: 'i-heroicons-check-circle',
    actions: [
      {
        label: 'Перейти',
        click: () => router.push('/tasks')
      }
    ]
  })

  // Здесь был бы запрос к API для сохранения задачи
  console.log('Создана задача:', form)
}

// Отмена
const handleCancel = () => {
  toast.add({
    title: 'Отменить создание задачи?',
    description: 'Вы уверены, что хотите отменить создание?',
    color: 'red',
    icon: 'i-heroicons-x-circle',
    actions: [
      {
        label: 'Отменить',
        click: () => {}
      },
      {
        label: 'Продолжить',
        click: () => {
          // Очищаем форму и возвращаемся
          Object.assign(form, {
            title: '',
            type: null,
            description: '',
            executor: null,
            branch: null,
            date: null,
            hour: null,
            minute: null,
            products: []
          })
          router.push('/dashboard')
        }
      }
    ]
  })
}

const goBack = () => router.back()
</script>