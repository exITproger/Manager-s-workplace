// server/api/notifications.get.ts
import type {NotificationListItem} from "~/types/NotificationListItem.ts";

// Мок-данные
const mockNotifications: NotificationListItem[] = [
  // Собственные уведомления (для пользователя с id = 1)
  {
    id: 1,
    title: 'Новая задача: Проверить остаток товара',
    recipient: { name: 'Смирнова Е.С.', icon: null },
    recipientId: 1,
    date: new Date(),
    isRead: false
  },
  {
    id: 2,
    title: 'Заказ №12134 готов к выдаче',
    recipient: { name: 'Иванов И.И.', icon: null },
    recipientId: 1,
    date: new Date(Date.now() - 3600000),
    isRead: true
  },
  {
    id: 3,
    title: 'Изменение статуса заказа №77777',
    recipient: { name: 'Петров П.П.', icon: null },
    recipientId: 1,
    date: new Date(Date.now() - 7200000),
    isRead: false
  },
  // Уведомления филиала (для других пользователей, например id = 2)
  {
    id: 10,
    title: 'Новый заказ в филиале №17',
    recipient: { name: 'Магазин №17', icon: null },
    recipientId: 2,
    date: new Date(Date.now() - 1800000),
    isRead: false
  },
  {
    id: 11,
    title: 'Поставка товара задерживается',
    recipient: { name: 'Магазин №17', icon: null },
    recipientId: 2,
    date: new Date(Date.now() - 5400000),
    isRead: true
  },
  {
    id: 12,
    title: 'Инвентаризация назначена на завтра',
    recipient: { name: 'Магазин №17', icon: null },
    recipientId: 2,
    date: new Date(Date.now() - 10800000),
    isRead: false
  }
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const recipientId = query.recipient_id ? Number(query.recipient_id) : undefined

  // Если передан recipient_id — возвращаем только уведомления для этого пользователя
  if (recipientId) {
    return mockNotifications.filter(n => n.recipientId === recipientId)
  }

  // Если не передан — возвращаем все (для филиала)
  return mockNotifications
})