export interface NotificationListItem {
  id: number
  title: string
  recipient: {
    name: string
    icon: string | null
  }
  recipientId: number
  date: Date | string
  isRead: boolean
}