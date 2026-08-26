// types/NotificationListItem.ts

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

export interface Notification extends NotificationListItem {
  description: string
  links?: Link[]
}

export interface Link {
  text: string
  url: string
}