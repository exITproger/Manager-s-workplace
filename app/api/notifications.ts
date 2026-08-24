import type {NotificationListItem} from "~/types/NotificationListItem.ts";
import {token} from "~/composables/useAuth.ts";

let client: ReturnType<typeof $fetch.create> | null = null

const useApi = () => {
    if (!client) {
        const config = useRuntimeConfig()
        client = $fetch.create({baseURL: config.public.apiBase as string})
    }
    return client
}

export function fetchNotificationsRequest(recipientId?: number): Promise<NotificationListItem[]> {
    const secret = token()
    return useApi()<NotificationListItem[]>('/notifications', {
        headers: {Authorization: `Bearer ${secret}`},
        query: {recipient_id: recipientId}
    })
}
