// server/utils/tasks/index.ts
import { MOCK_TOKEN } from '#server/utils/auth-mock'
import { MOCK_TASKS } from '~~/server/utils/tasks-mock.ts'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')

  if (auth !== `Bearer ${MOCK_TOKEN}`) {
    throw createError({
      statusCode: 401,
      data: { errors: ['Не авторизован'] }
    })
  }

  const query = getQuery(event)
  let tasks = [...MOCK_TASKS]

  if (query.status) {
    tasks = tasks.filter(task => task.status === query.status)
  }

  return tasks
})