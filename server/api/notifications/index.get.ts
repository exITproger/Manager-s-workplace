import {MOCK_TOKEN} from '../../utils/auth-mock'
import {MOCK_NOTIFICATIONS} from '../../utils/notification-mock'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')

  if (auth !== `Bearer ${MOCK_TOKEN}`) {
    throw createError({
      statusCode: 401,
      data: { errors: ['Не авторизован'] }
    })
  }

  const query = getQuery(event)

  let result = [...MOCK_NOTIFICATIONS]

  const recipientId = Number(query.recipient_id)
  if (!Number.isNaN(recipientId) && query.recipient_id !== undefined) {
    result = result.filter((notification) => notification.recipient.id === recipientId)
  }

  const page = Math.max(Number(query.page) || 1, 1)
  const pageLimit = Number(query.page_limit) || result.length

  return result.slice((page - 1) * pageLimit, page * pageLimit)
})
