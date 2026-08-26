<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
    <!-- Шапка -->
    <div class="px-4 pt-6 flex-shrink-0">
      <div class="flex items-center justify-between">
        <BackButton />
        <ThemeToggle />
      </div>
    </div>

    <!-- Основной контейнер -->
    <div class="max-w-7xl w-full bg-gray-50 dark:bg-gray-950 mx-auto min-h-screen p-5 pb-24 transition-colors duration-200">
      <!-- Мои / Филиала -->
      <div class="flex items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 mb-[14px]">
        <div class="flex border border-[#8a5af0] dark:border-[#555555] rounded-lg overflow-hidden text-sm">
          <UButton
            color="gray"
            variant="ghost"
            class="px-2 md:px-3 py-1 text-[11px] md:text-xs font-semibold transition-colors rounded-none"
            :class="activeTab === 'my' ? 'bg-[#e8dff0] dark:bg-[#1e293b] text-[#4a3a5a] dark:text-white' : 'bg-gray-50 dark:bg-[#0a0a0a] text-[#6a5a7a] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a1a2e]'"
            @click="activeTab = 'my'"
          >
            Мои <span class="text-[9px] md:text-[10px] font-medium">· 8</span>
          </UButton>
          <div class="w-px bg-[#8a5af0] dark:bg-[#555555]"></div>
          <UButton
            color="gray"
            variant="ghost"
            class="px-2 md:px-3 py-1 text-[11px] md:text-xs font-semibold transition-colors rounded-none"
            :class="activeTab === 'branch' ? 'bg-[#e8dff0] dark:bg-[#1e293b] text-[#4a3a5a] dark:text-white' : 'bg-gray-50 dark:bg-[#0a0a0a] text-[#6a5a7a] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a1a2e]'"
            @click="activeTab = 'branch'"
          >
            <span class="whitespace-nowrap">Филиала <span class="text-[9px] md:text-[10px] font-medium">· 15</span></span>
          </UButton>
        </div>
        <UButton
          color="primary"
          class="h-[30px] md:h-[34px] px-2.5 md:px-3 text-[11px] md:text-xs font-semibold rounded-lg whitespace-nowrap flex items-center justify-center bg-[#00C16A] hover:bg-[#00a85a] dark:bg-[#00C16A] dark:hover:bg-[#00a85a] text-white border-none shadow-sm hover:shadow-md transition-all duration-200"
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
          class="w-full bg-[#f2f2f7] dark:bg-[#1a1a2e] rounded-xl border-transparent text-black dark:text-white placeholder-[#8e8e93] dark:placeholder-[#6a6a7a] text-sm focus:border-[#8a5af0] dark:focus:border-[#8a5af0] focus:ring-2 focus:ring-[#8a5af0]/20 dark:focus:ring-[#8a5af0]/20 transition-all duration-200"
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
            class="w-full justify-between bg-[#f2f2f7] dark:bg-[#1a1a2e] rounded-lg px-3 py-1.5 text-sm font-medium text-black dark:text-white hover:bg-[#e8e8ed] dark:hover:bg-[#2a2a3e] transition-colors duration-200"
            @click="statusDropdownOpen = !statusDropdownOpen"
          >
            <span>{{ selectedStatus.label === 'Любой' ? 'Статус' : 'Статус: ' + selectedStatus.label }}</span>
            <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-black dark:text-white transition-transform duration-200" :class="{ 'rotate-180': statusDropdownOpen }" />
          </UButton>
          <div
            v-if="statusDropdownOpen"
            class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1a1a2e] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-fadeIn"
          >
            <div
              v-for="item in statusItems"
              :key="item.value"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a3e] cursor-pointer transition-colors duration-150"
              @click="selectStatus(item)"
            >
              <div
                class="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                :class="selectedStatus.value === item.value ? 'border-[#8a5af0]' : 'border-gray-300 dark:border-gray-600'"
              >
                <div
                  v-if="selectedStatus.value === item.value"
                  class="w-2.5 h-2.5 rounded-full bg-[#8a5af0] animate-scaleIn"
                ></div>
              </div>
              <span class="text-sm text-black dark:text-white">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Приоритет -->
        <div class="flex-1 relative" :class="{ 'opacity-40 pointer-events-none': statusDropdownOpen }" style="z-index: 61;">
          <UButton
            color="gray"
            variant="ghost"
            class="w-full justify-between bg-[#f2f2f7] dark:bg-[#1a1a2e] rounded-lg px-3 py-1.5 text-sm font-medium text-black dark:text-white hover:bg-[#e8e8ed] dark:hover:bg-[#2a2a3e] transition-colors duration-200"
            @click="priorityDropdownOpen = !priorityDropdownOpen"
          >
            <span>{{ selectedPriority.label === 'Любой' ? 'Приоритет' : 'Приоритет: ' + selectedPriority.label }}</span>
            <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-black dark:text-white transition-transform duration-200" :class="{ 'rotate-180': priorityDropdownOpen }" />
          </UButton>
          <div
            v-if="priorityDropdownOpen"
            class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1a1a2e] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-fadeIn"
          >
            <div
              v-for="item in priorityItems"
              :key="item.value"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a3e] cursor-pointer transition-colors duration-150"
              @click="selectPriority(item)"
            >
              <div
                class="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                :class="selectedPriority.value === item.value ? 'border-[#8a5af0]' : 'border-gray-300 dark:border-gray-600'"
              >
                <div
                  v-if="selectedPriority.value === item.value"
                  class="w-2.5 h-2.5 rounded-full bg-[#8a5af0] animate-scaleIn"
                ></div>
              </div>
              <span class="text-sm text-black dark:text-white">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Затемняющий оверлей -->
        <div
          v-if="statusDropdownOpen || priorityDropdownOpen"
          class="fixed inset-0 z-40 bg-white/40 dark:bg-black/60 backdrop-blur-sm transition-all duration-300"
          @click="closeDropdowns"
        ></div>
      </div>

      <!-- Сегодня -->
      <div class="text-base font-bold text-black dark:text-white mb-3 transition-colors duration-200">Сегодня</div>

      <!-- Карточки задач через компонент -->
      <TaskCardOnPageTasks
        v-for="(task, idx) in todayTasks"
        :key="'today-' + idx"
        :task="task"
        @toggle-check="toggleCheck(task)"
      />

      <!-- Завтра -->
      <div class="text-base font-bold text-black dark:text-white mb-3 mt-6 transition-colors duration-200">Завтра</div>

      <!-- Карточки задач через компонент -->
      <TaskCardOnPageTasks
        v-for="(task, idx) in tomorrowTasks"
        :key="'tomorrow-' + idx"
        :task="task"
        @toggle-check="toggleCheck(task)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskCardOnPageTasks from '~/components/tasks/TaskCardOnPageTasks.vue'
import BackButton from '~/components/BackButton.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'

const router = useRouter()

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

// Обновленные данные с поддержкой темной темы через динамические классы
const todayTasks = reactive([
  { 
    type: 'Выдача заказа', 
    number: '1947', 
    name: 'Выдать заказ №12134', 
    status: 'Выполнено', 
    execLabel: 'Средний', 
    time: 'Сегодня, 15:00', 
    sub: 'создана сегодня, 10:12', 
    done: true,
    statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
  },
  { 
    type: 'Резервирование', 
    number: '19857', 
    name: 'Отложить iPhone 16 Pro Max', 
    status: 'В работе', 
    execLabel: 'Срочный', 
    time: 'Сегодня, 17:00', 
    sub: 'создана сегодня, 14:12', 
    done: false,
    statusColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
  }
])

const tomorrowTasks = reactive([
  { 
    type: 'Инвентаризация', 
    number: '77777', 
    name: 'Пересчитать товар арт. 12784568', 
    status: 'В работе', 
    execLabel: 'Низкий', 
    time: 'Завтра, 09:00', 
    sub: 'создана сегодня, 08:00', 
    done: false,
    statusColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
  },
  { 
    type: 'Инвентаризация', 
    number: '77777', 
    name: 'Пересчитать товар арт. 12784568', 
    status: 'Новая', 
    execLabel: 'Низкий', 
    time: 'Завтра, 09:00', 
    sub: 'создана сегодня, 08:00', 
    done: false,
    statusColor: 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-300'
  }
])

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
    task.statusColor = 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
  } else {
    task.status = 'В работе'
    task.statusColor = 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
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
  transition: background-color 0.3s ease;
}

.dark body {
  background: #0a0a0a;
}

.rotate-180 {
  transform: rotate(180deg);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.2s ease-out;
}
</style>