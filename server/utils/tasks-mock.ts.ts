// server/utils/tasks-mock.ts
export const MOCK_TASKS = [
  {
    id: 1,
    title: 'Разработать дизайн главной страницы',
    description: 'Создать макет главной страницы в Figma',
    status: { value: 'in_progress' }, 
    createdAt: '2026-08-20T10:00:00',
    responsible: { id: 1, name: 'Анна', middleName: 'Иванова', icon: null } // ✅ по API
  },
  {
    id: 2,
    title: 'Настроить CI/CD',
    description: 'Настроить автоматический деплой на сервер',
    status: { value: 'new' }, 
    createdAt: '2026-08-21T14:30:00',
    responsible: { id: 2, name: 'Петр', middleName: 'Сидоров', icon: null } // ✅ по API
  }
]