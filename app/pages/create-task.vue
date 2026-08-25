<template>
  <div class="max-w-7xl w-full mx-auto min-h-screen p-5 pb-24 bg-white dark:bg-gray-950 text-gray-950 dark:text-white transition-colors duration-200">
    <!-- Header -->
    <div class="flex items-center justify-between mb-7">
      <UButton
        color="neutral"
        variant="ghost"
        class="text-[#8a5af0] dark:text-[#b388e8] p-0 min-w-0 h-auto flex items-center gap-1 text-sm font-normal"
        @click="goBack"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
        Назад
      </UButton>

      <div class="flex items-center gap-2">
        <UButton
          color="error"
          variant="solid"
          class="h-[34px] px-3 text-sm font-semibold rounded-lg bg-[#ef4444] hover:bg-[#dc2626] text-white border-none"
          @click="requestCancel"
        >
          Отмена
        </UButton>

        <UButton
          color="primary"
          variant="solid"
          class="h-[34px] px-4 text-sm font-semibold rounded-lg bg-[#8a5af0] hover:bg-[#7445df] text-white border-none"
          @click="createTask"
        >
          Создать
        </UButton>

        <UButton
          color="neutral"
          variant="ghost"
          square
          class="p-0 min-w-0 h-auto ml-2"
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
          :ui="{ leadingIcon: 'size-5' }"
          aria-label="Переключить тему"
          @click="toggleTheme"
        />
      </div>
    </div>

    <!-- Main information -->
    <section class="mb-8 mt-4">
      <h1 class="text-base font-bold text-black dark:text-white mb-4">
        Основная информация
      </h1>

      <div class="space-y-4">
        <label class="block">
          <span class="block text-sm font-medium text-[#4a3a5a] dark:text-gray-300 mb-1.5">
            Название задачи
          </span>

          <UInput
            v-model="form.name"
            placeholder="Отложить товар"
            variant="outline"
            class="w-full rounded-xl text-sm"
          />
        </label>

        <label class="block">
          <span class="block text-sm font-medium text-[#4a3a5a] dark:text-gray-300 mb-1.5">
            Тип задачи
          </span>

          <UInput
            v-model="form.type"
            placeholder="Резервирование"
            variant="outline"
            class="w-full rounded-xl text-sm"
          />
        </label>

        <label class="block">
          <span class="block text-sm font-medium text-[#4a3a5a] dark:text-gray-300 mb-1.5">
            Описание
          </span>

          <UTextarea
            v-model="form.description"
            :rows="3"
            placeholder="Опишите, что необходимо выполнить..."
            autoresize
            variant="outline"
            class="w-full rounded-xl text-sm"
          />
        </label>
      </div>
    </section>

    <!-- Assignment -->
    <section class="mb-8">
      <h2 class="text-base font-bold text-black dark:text-white mb-4">
        Назначение
      </h2>

      <div class="space-y-4">
        <label class="block">
          <span class="block text-sm font-medium text-[#4a3a5a] dark:text-gray-300 mb-1.5">
            Исполнитель
          </span>

          <USelect
            v-model="form.executor"
            :items="executorOptions"
            value-key="value"
            placeholder="Выберите исполнителя..."
            variant="outline"
            class="w-full rounded-xl"
          />
        </label>

        <label class="block">
          <span class="block text-sm font-medium text-[#4a3a5a] dark:text-gray-300 mb-1.5">
            Филиал
          </span>

          <USelect
            v-model="form.branch"
            :items="branchOptions"
            value-key="value"
            placeholder="Выберите филиал..."
            variant="outline"
            class="w-full rounded-xl"
          />
        </label>

        <!-- Complete before -->
        <div>
          <span class="block text-sm font-medium text-[#4a3a5a] dark:text-gray-300 mb-1.5">
            Выполнить до
          </span>

          <div class="grid grid-cols-[1fr_auto] gap-2 mb-3">
            <UInput
              :model-value="formattedDate"
              aria-label="Complete before date"
              placeholder="ДД/ММ/ГГГГ"
              readonly
              variant="outline"
              class="w-full rounded-xl text-sm"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-calendar-days"
                  class="w-4 h-4 text-gray-400"
                />
              </template>
            </UInput>

            <UInputTime
              v-model="form.time"
              :hour-cycle="24"
              aria-label="Complete before time"
              class="w-[100px] rounded-xl text-sm"
            />
          </div>

          <!-- Always-open calendar -->
          <div
            class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 overflow-hidden transition-colors duration-200"
          >
            <UCalendar
            v-model="calendarDate"
            class="w-full"
            :fixed-weeks="true"
            :ui="{
            headCell: 'text-[#6750A4]',
            cellTrigger: [
                'data-[selected]:bg-[#6750A4]',
                'data-[selected]:text-white',
                'data-today:not-data-selected:text-[#6750A4]'
            ]
            }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Assigned product -->
    <section>
      <h2 class="text-base font-bold text-black dark:text-white mb-2">
        Связанный товар
      </h2>

      <p class="text-sm text-[#8e8e93] dark:text-gray-400 mb-4">
        Привяжите товар, если задача относится к конкретной позиции
      </p>

      <UButton
        color="primary"
        variant="solid"
        class="h-6 w-auto px-4 justify-center rounded-md bg-[#7A66AF] hover:bg-[#7A66AF] text-white font-semibold"
        @click="assignProduct"
      >
        <span class="text-lg leading-none mr-1">+</span>
        Добавить связной товар
      </UButton>
    </section>
  </div>
</template>

<script setup>
import {
  today,
  getLocalTimeZone,
} from '@internationalized/date'

const router = useRouter()
const colorMode = useColorMode()
const toast = useToast()

const calendarDate = shallowRef(
  today(getLocalTimeZone())
)

const form = useState('create-task-draft', () => ({
  name: '',
  type: '',
  description: '',
  executor: undefined,
  branch: undefined,
  time: undefined,
  date: ''
}))

const executorOptions = [
  { label: 'Alex Johnson', value: 'alex-johnson' },
  { label: 'Maria Smith', value: 'maria-smith' },
  { label: 'David Lee', value: 'david-lee' }
]

const branchOptions = [
  { label: 'Main branch', value: 'main' },
  { label: 'North branch', value: 'north' },
  { label: 'South branch', value: 'south' }
]

const formattedDate = computed(() => {
  if (!calendarDate.value) {
    return ''
  }

  const { year, month, day } = calendarDate.value

  return [
    String(day).padStart(2, '0'),
    String(month).padStart(2, '0'),
    String(year)
  ].join('/')
})

watch(
  calendarDate,
  (value) => {
    if (!value) {
      form.date = ''
      return
    }

    const { year, month, day } = value

    form.date = [
      String(year),
      String(month).padStart(2, '0'),
      String(day).padStart(2, '0')
    ].join('-')
  },
  { immediate: true }
)

const toggleTheme = () => {
  colorMode.preference =
    colorMode.value === 'dark' ? 'light' : 'dark'
}

function goBack() {
  router.back()
}

function assignProduct() {
  console.log('Assign product')
}

function createTask() {
  console.log('Create task', { ...form })

  toast.add({
    title: 'Task created',
    description: 'The task was created successfully.',
    color: 'success',
    icon: 'i-heroicons-check-circle',
    duration: 0,
    actions: [
      {
        label: 'View task',
        color: 'primary',
        variant: 'solid',
        onClick: () => {
          router.push('/tasks')
        }
      },

      {
        label: 'Cancel',
        color: 'neutral',
        variant: 'outline'
      }
    ]
  })

  clearDraft()
}

function requestCancel() {
  toast.add({
    title: 'Cancel task?',
    description: 'Your entered information will be lost.',
    color: 'warning',
    icon: 'i-heroicons-question-mark-circle',
    duration: 0,
    actions: [
      {
        label: 'Discard',
        color: 'warning',
        variant: 'solid',
        onClick: () => {
          clearDraft()
          router.back()
        }
      },

      {
        label: 'Keep editing',
        color: 'neutral',
        variant: 'outline'
      }

    ]
  })
}

function clearDraft() {
  form.value.name = ''
  form.value.type = ''
  form.value.description = ''
  form.value.executor = undefined
  form.value.branch = undefined
  form.value.time = undefined
  form.value.date = ''
}
</script>

<style>
body {
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.dark body {
  background: #030712;
}
</style>