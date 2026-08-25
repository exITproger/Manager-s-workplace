import type {NotificationListItem} from "~/types/NotificationListItem.ts";

const mockNotifications: NotificationListItem[] = [
  {
    id: 1,
    title: 'Личное: Проверить остаток товара',
    recipient: { name: 'Смирнова Е.С.', icon: null },
    recipientId: 1,
    date: new Date(),
    isRead: false
  },
  {
    id: 2,
    title: 'Личное: Заказ №12134 готов',
    recipient: { name: 'Смирнова Е.С.', icon: null },
    recipientId: 1,
    date: new Date(Date.now() - 3600000),
    isRead: true
  },
  {
    id: 3,
    title: 'Личное: Изменение статуса заказа',
    recipient: { name: 'Смирнова Е.С.', icon: null },
    recipientId: 1,
    date: new Date(Date.now() - 7200000),
    isRead: false
  },
  {
    id: 10,
    title: 'Филиал: Новый заказ в филиале №17',
    recipient: { name: 'Филиал №17', icon: null },
    recipientId: 0,
    date: new Date(Date.now() - 1800000),
    isRead: false
  },
  {
    id: 11,
    title: 'Филиал: Поставка задерживается',
    recipient: { name: 'Филиал №17', icon: null },
    recipientId: 0,
    date: new Date(Date.now() - 5400000),
    isRead: true
  },
  {
    id: 12,
    title: 'Филиал: Инвентаризация завтра',
    recipient: { name: 'Филиал №17', icon: null },
    recipientId: 0,
    date: new Date(Date.now() - 10800000),
    isRead: false
  }
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const recipientId = query.recipient_id ? Number(query.recipient_id) : undefined

  if (recipientId) {
    return mockNotifications.filter(n => n.recipientId === recipientId || n.recipientId === 0)
  }

  return mockNotifications
})