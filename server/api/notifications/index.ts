import type { NotificationListItem } from "~/types/NotificationListItem";

const mockNotifications: NotificationListItem[] = [
  // ===== ЛИЧНЫЕ (для пользователя с id = 1) =====
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
    recipient: { name: 'Смирнова Е.С.', icon: null },
    recipientId: 1,
    date: new Date(Date.now() - 3600000),
    isRead: true
  },
  {
    id: 3,
    title: 'Изменение статуса заказа №77777',
    recipient: { name: 'Смирнова Е.С.', icon: null },
    recipientId: 1,
    date: new Date(Date.now() - 7200000),
    isRead: false
  },
  // ===== ФИЛИАЛЬНЫЕ (для всех, recipientId = 0) =====
  {
    id: 10,
    title: 'Новый заказ в филиале №17',
    recipient: { name: 'Филиал №17', icon: null },
    recipientId: 0,
    date: new Date(Date.now() - 1800000),
    isRead: false
  },
  {
    id: 11,
    title: 'Поставка товара задерживается на 2 дня',
    recipient: { name: 'Филиал №17', icon: null },
    recipientId: 0,
    date: new Date(Date.now() - 5400000),
    isRead: true
  },
  {
    id: 12,
    title: 'Инвентаризация назначена на завтра в 09:00',
    recipient: { name: 'Филиал №17', icon: null },
    recipientId: 0,
    date: new Date(Date.now() - 10800000),
    isRead: false
  }
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const recipientId = query.recipient_id ? Number(query.recipient_id) : undefined

  // Если передан recipient_id — возвращаем личные + филиальные
  if (recipientId) {
    return mockNotifications.filter(n => n.recipientId === recipientId || n.recipientId === 0)
  }

  // Если не передан — возвращаем все
  return mockNotifications
})