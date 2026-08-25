// server/utils/mockTasks.ts
export const MOCK_TASKS = [
  {
    id: 1,
    title: 'Разработать дизайн главной страницы',
    description: 'Создать макет главной страницы в Figma',
    status: 'in_progress',
    createdAt: '2026-08-20T10:00:00',
    assignee: { id: 1, name: 'Анна Иванова', icon: null }
  },
  {
    id: 2,
    title: 'Настроить CI/CD',
    description: 'Настроить автоматический деплой на сервер',
    status: 'new',
    createdAt: '2026-08-21T14:30:00',
    assignee: { id: 2, name: 'Петр Сидоров', icon: null }
  }
]