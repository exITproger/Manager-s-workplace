// app/api/tasks/index.ts
import { MOCK_TOKEN } from '#server/utils/auth-mock'


const MOCK_TASKS = [
  {
    id: 1,
    title: 'Разработать дизайн главной страницы',
    description: 'Создать макет главной страницы в Figma',
    status: 'in_progress',
    priority: 'high',
    deadline: '2026-09-15',
    createdAt: '2026-08-20T10:00:00',
    assignee: {
      id: 1,
      name: 'Анна Иванова',
      icon: null
    }
  },
  {
    id: 2,
    title: 'Настроить CI/CD',
    description: 'Настроить автоматический деплой на сервер',
    status: 'pending',
    priority: 'medium',
    deadline: '2026-09-01',
    createdAt: '2026-08-21T14:30:00',
    assignee: {
      id: 2,
      name: 'Петр Сидоров',
      icon: null
    }
  }
]

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')

  // Проверка авторизации
  if (auth !== `Bearer ${MOCK_TOKEN}`) {
    throw createError({
      statusCode: 401,
      data: { errors: ['Не авторизован'] }
    })
  }

  // Получаем параметры фильтрации
  const query = getQuery(event)
  let tasks = [...MOCK_TASKS]

  // Фильтр по статусу
  if (query.status) {
    tasks = tasks.filter(task => task.status === query.status)
  }

  return tasks
})