// server/utils/notification-mock.ts

export interface NotificationUserPreview {
  id: number
  name: string
  middleName?: string
  icon?: string | null
}

export interface NotificationListItem {
  id: number
  title: string
  isImportant: boolean
  isRead: boolean
  recipient: NotificationUserPreview
  date: string
}

export const MOCK_NOTIFICATIONS: NotificationListItem[] = [
  // ===== ЛИЧНЫЕ (для пользователя с id = 1) =====
  {
    id: 1,
    title: 'Вам назначена задача «Проверить остаток товара»',
    isImportant: false,
    isRead: false,
    recipient: { id: 1, name: 'Илья', middleName: 'Иванович' },
    date: '2026-08-24T07:42:00.000Z'
  },
  {
    id: 2,
    title: 'Новый заказ №12134 ожидает оформления',
    isImportant: false,
    isRead: false,
    recipient: { id: 1, name: 'Илья', middleName: 'Иванович' },
    date: '2026-08-24T08:15:00.000Z'
  },
  {
    id: 3,
    title: 'Задача №1947 переведена в статус «В работе»',
    isImportant: true,
    isRead: false,
    recipient: { id: 1, name: 'Илья', middleName: 'Иванович' },
    date: '2026-08-23T09:30:00.000Z'
  },
  {
    id: 4,
    title: 'Товар «iPhone 16 Pro Max» зарезервирован до конца дня',
    isImportant: false,
    isRead: true,
    recipient: { id: 1, name: 'Илья', middleName: 'Иванович' },
    date: '2026-08-22T11:05:00.000Z'
  },
  {
    id: 5,
    title: 'Изменился остаток на складе филиала №101',
    isImportant: false,
    isRead: true,
    recipient: { id: 1, name: 'Илья', middleName: 'Иванович' },
    date: '2026-08-21T12:30:00.000Z'
  },
  {
    id: 6,
    title: 'Поступление новой партии товара завтра в 09:00',
    isImportant: true,
    isRead: true,
    recipient: { id: 1, name: 'Илья', middleName: 'Иванович' },
    date: '2026-08-20T14:20:00.000Z'
  },

  // ===== ФИЛИАЛЬНЫЕ (для всех, recipient.id = 0) =====
  {
    id: 10,
    title: 'Новый заказ в филиале №17',
    isImportant: false,
    isRead: false,
    recipient: { id: 0, name: 'Филиал №17' },
    date: '2026-08-24T10:00:00.000Z'
  },
  {
    id: 11,
    title: 'Поставка товара задерживается на 2 дня',
    isImportant: true,
    isRead: false,
    recipient: { id: 0, name: 'Филиал №17' },
    date: '2026-08-23T16:30:00.000Z'
  },
  {
    id: 12,
    title: 'Инвентаризация назначена на завтра в 09:00',
    isImportant: false,
    isRead: false,
    recipient: { id: 0, name: 'Филиал №17' },
    date: '2026-08-22T14:15:00.000Z'
  }
]