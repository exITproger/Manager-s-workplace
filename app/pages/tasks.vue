<template>
  <div class="min-h-screen bg-white dark:bg-[#0a0a0a] pb-24">
    <div class="w-full p-5">
      <!-- Шапка -->
      <div class="flex items-center justify-between mb-[18px]">
        <UButton
          color="gray"
          variant="ghost"
          class="text-[#8a5af0] p-0 min-w-0 h-auto flex items-center gap-1 text-sm font-normal"
          @click="goBack"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
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

      <!-- Мои / Филиала -->
      <div class="flex items-center justify-between gap-2 mb-[14px]">
        <div class="flex border border-[#8a5af0] dark:border-[#555555] rounded-lg overflow-hidden text-sm">
          <UButton
            color="gray"
            variant="ghost"
            class="px-2 md:px-3 py-1 text-[11px] md:text-xs font-semibold transition-colors rounded-none"
            :class="activeTab === 'my' ? 'bg-[#e8dff0] dark:bg-[#1e293b] text-[#4a3a5a] dark:text-white' : 'bg-white dark:bg-[#0a0a0a] text-[#6a5a7a] dark:text-gray-400'"
            @click="activeTab = 'my'"
          >
            <span v-if="activeTab === 'my'" class="text-[#8a5af0] dark:text-white">✓</span>
            Мои <span class="text-[9px] md:text-[10px] font-medium">· 8</span>
          </UButton>
          <div class="w-px bg-[#8a5af0] dark:bg-[#555555]"></div>
          <UButton
            color="gray"
            variant="ghost"
            class="px-2 md:px-3 py-1 text-[11px] md:text-xs font-semibold transition-colors rounded-none"
            :class="activeTab === 'branch' ? 'bg-[#e8dff0] dark:bg-[#1e293b] text-[#4a3a5a] dark:text-white' : 'bg-white dark:bg-[#0a0a0a] text-[#6a5a7a] dark:text-gray-400'"
            @click="activeTab = 'branch'"
          >
            <span v-if="activeTab === 'branch'" class="text-[#8a5af0] dark:text-white">✓</span>
            <span class="whitespace-nowrap">Филиала <span class="text-[9px] md:text-[10px] font-medium">· 15</span></span>
          </UButton>
        </div>
        <UButton
          color="primary"
          class="h-[30px] md:h-[34px] px-2.5 md:px-3 text-[11px] md:text-xs font-semibold rounded-lg whitespace-nowrap flex items-center justify-center bg-[#00C16A] hover:bg-[#00a85a] text-white border-none dark:bg-[#00C16A]"
          @click="createTask"
        >
          + Создать
        </UButton>
      </div>

      <!-- Поиск -->
      <div class="mb-[14px] w-full">
        <UInput
          v-model="searchQuery"
          placeholder="Search..."
          class="w-full bg-[#f2f2f7] dark:bg-[#1a1a1a] rounded-xl border-transparent text-black dark:text-white placeholder-[#8e8e93] dark:placeholder-gray-500 text-sm focus:border-[#8a5af0] dark:focus:border-[#8a5af0]"
        >
          <template #leading>
            <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </template>
        </UInput>
      </div>

      <!-- Фильтры -->
      <div class="flex gap-2.5 mb-4 relative" style="z-index: 60;">
        <!-- Статус -->
        <div class="flex-1 relative" :class="{ 'opacity-40 pointer-events-none': priorityDropdownOpen }" style="z-index: 61;">
          <UButton
            color="gray"
            variant="ghost"
            class="w-full justify-between bg-[#f2f2f7] dark:bg-[#1a1a1a] rounded-lg px-3 py-1.5 text-sm font-medium text-black dark:text-white"
            @click="statusDropdownOpen = !statusDropdownOpen"
          >
            <span>{{ selectedStatus.label === 'Любой' ? 'Статус' : 'Статус: ' + selectedStatus.label }}</span>
            <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-black dark:text-white" :class="{ 'rotate-180': statusDropdownOpen }" />
          </UButton>
          <div
            v-if="statusDropdownOpen"
            class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            <div
              v-for="item in statusItems"
              :key="item.value"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] cursor-pointer text-black dark:text-white"
              @click="selectStatus(item)"
            >
              <div
                class="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                :class="selectedStatus.value === item.value ? 'border-[#8a5af0]' : 'border-gray-300 dark:border-gray-600'"
              >
                <div
                  v-if="selectedStatus.value === item.value"
                  class="w-2.5 h-2.5 rounded-full bg-[#8a5af0]"
                ></div>
              </div>
              <span class="text-sm">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Приоритет -->
        <div class="flex-1 relative" :class="{ 'opacity-40 pointer-events-none': statusDropdownOpen }" style="z-index: 61;">
          <UButton
            color="gray"
            variant="ghost"
            class="w-full justify-between bg-[#f2f2f7] dark:bg-[#1a1a1a] rounded-lg px-3 py-1.5 text-sm font-medium text-black dark:text-white"
            @click="priorityDropdownOpen = !priorityDropdownOpen"
          >
            <span>{{ selectedPriority.label === 'Любой' ? 'Приоритет' : 'Приоритет: ' + selectedPriority.label }}</span>
            <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-black dark:text-white" :class="{ 'rotate-180': priorityDropdownOpen }" />
          </UButton>
          <div
            v-if="priorityDropdownOpen"
            class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            <div
              v-for="item in priorityItems"
              :key="item.value"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] cursor-pointer text-black dark:text-white"
              @click="selectPriority(item)"
            >
              <div
                class="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                :class="selectedPriority.value === item.value ? 'border-[#8a5af0]' : 'border-gray-300 dark:border-gray-600'"
              >
                <div
                  v-if="selectedPriority.value === item.value"
                  class="w-2.5 h-2.5 rounded-full bg-[#8a5af0]"
                ></div>
              </div>
              <span class="text-sm">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Заглушка для фона -->
        <div
          v-if="statusDropdownOpen || priorityDropdownOpen"
          class="fixed inset-0 z-40"
        >
          <div class="w-full h-full bg-white/40 dark:bg-black/40"></div>
        </div>

        <!-- Кликабельный оверлей для закрытия -->
        <div
          v-if="statusDropdownOpen || priorityDropdownOpen"
          class="fixed inset-0 z-40"
          @click="closeDropdowns"
        ></div>
      </div>

      <!-- Сегодня -->
      <div class="text-base font-bold text-black dark:text-white mb-3">Сегодня</div>

      <!-- Карточки задач -->
      <div 
        v-for="(task, idx) in todayTasks" 
        :key="'today-' + idx"
        class="cursor-pointer"
        @click="openTask(task.id)"
      >
        <TaskCardOnPageTasks
          :task="task"
          @toggle-check="toggleCheck(task)"
        />
      </div>

      <!-- Завтра -->
      <div class="text-base font-bold text-black dark:text-white mb-3 mt-6">Завтра</div>

      <!-- Карточки задач -->
      <div 
        v-for="(task, idx) in tomorrowTasks" 
        :key="'tomorrow-' + idx"
        class="cursor-pointer"
        @click="openTask(task.id)"
      >
        <TaskCardOnPageTasks
          :task="task"
          @toggle-check="toggleCheck(task)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCardOnPageTasks from '~/components/tasks/TaskCardOnPageTasks.vue'

const router = useRouter()
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const activeTab = ref('my')
const searchQuery = ref('')
const selectedStatus = ref({ label: 'Любой', value: 'any' })
const selectedPriority = ref({ label: 'Любой', value: 'any' })
const statusDropdownOpen = ref(false)
const priorityDropdownOpen = ref(false)

const statusItems = [
  { label: 'Любой', value: 'any' },
  { label: 'Новая', value: 'new' },
  { label: 'В работе', value: 'in_progress' },
  { label: 'Выполнена', value: 'completed' }
]

const priorityItems = [
  { label: 'Любой', value: 'any' },
  { label: 'Низкий', value: 'low' },
  { label: 'Средний', value: 'medium' },
  { label: 'Высокий', value: 'high' },
  { label: 'Срочный', value: 'urgent' }
]

const todayTasks = reactive([
  { id: 1, type: 'Выдача заказа', number: '1947', name: 'Выдать заказ №12134', status: 'Выполнено', execLabel: 'Средний', time: 'Сегодня, 15:00', sub: 'создана сегодня, 10:12', done: true },
  { id: 2, type: 'Резервирование', number: '19857', name: 'Отложить iPhone 16 Pro Max', status: 'В работе', execLabel: 'Срочный', time: 'Сегодня, 17:00', sub: 'создана сегодня, 14:12', done: false }
])

const tomorrowTasks = reactive([
  { id: 3, type: 'Инвентаризация', number: '77777', name: 'Пересчитать товар арт. 12784568', status: 'В работе', execLabel: 'Низкий', time: 'Завтра, 09:00', sub: 'создана сегодня, 08:00', done: false },
  { id: 4, type: 'Инвентаризация', number: '77777', name: 'Пересчитать товар арт. 12784568', status: 'Новая', execLabel: 'Низкий', time: 'Завтра, 09:00', sub: 'создана сегодня, 08:00', done: false }
])

const openTask = (taskId) => {
  router.push(`/task/${taskId}`)
}

function selectStatus(item) {
  selectedStatus.value = item
  statusDropdownOpen.value = false
  closeDropdowns()
}

function selectPriority(item) {
  selectedPriority.value = item
  priorityDropdownOpen.value = false
  closeDropdowns()
}

function toggleCheck(task) {
  task.done = !task.done
  if (task.done) {
    task.status = 'Выполнено'
  } else {
    task.status = 'В работе'
  }
}

function closeDropdowns() {
  statusDropdownOpen.value = false
  priorityDropdownOpen.value = false
}

function goBack() {
  router.back()
}

function createTask() {
  router.push('/create-task')
}
</script>

<style>
body { 
  background: #ffffff; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>