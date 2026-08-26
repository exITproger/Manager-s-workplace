import type {NotificationUserPreview} from "~/types/NotificationUserPreview.ts";

export interface NotificationListItem {
    id: number,
    title: string,
    isImportant: boolean,
    isRead: boolean,
    recipient: NotificationUserPreview,
    date: Date
}
