import {MOCK_TOKEN, VALID_CREDENTIALS} from '../../utils/auth-mock'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')

  if (!auth?.startsWith('Basic ')) {
    throw createError({
      statusCode: 401,
      data: { errors: ['Отсутствует заголовок авторизации'] }
    })
  }

  const bytes = Uint8Array.from(atob(auth.slice(6)), char => char.charCodeAt(0))
  const decoded = new TextDecoder().decode(bytes)
  const separatorIndex = decoded.indexOf(':')
  const login = decoded.slice(0, separatorIndex)
  const password = decoded.slice(separatorIndex + 1)

  if (login === VALID_CREDENTIALS.login && password === VALID_CREDENTIALS.password) {
    return { token: MOCK_TOKEN }
  }

  if (login === VALID_CREDENTIALS.login) {
    throw createError({
      statusCode: 401,
      data: { errors: ['Неверный пароль'] }
    })
  }

  throw createError({
    statusCode: 401,
    data: {
      errors: [
        'Пользователь с таким логином не найден',
        'Проверьте правильность ввода'
      ]
    }
  })
})
