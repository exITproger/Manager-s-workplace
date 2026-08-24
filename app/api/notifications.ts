import type {NotificationListItem} from "~/types/NotificationListItem.ts";
import {token, tokenCookie} from "~/composables/useAuth.ts";

export function useNotificationsRequest(recipientId: number | undefined) {
    const config = useRuntimeConfig()
    const queryBody: any = {}

    if (recipientId) {
        queryBody.recipient_id = recipientId
    }

    return useFetch<NotificationListItem[]>('/notifications', {
        key: 'notifications',
        baseURL: config.public.apiBase as string,
        headers: {Authorization: `Bearer ${token()}`},
        query: queryBody,
        onResponseError({response}) {
            if (response.status === 401) {
                tokenCookie().value = null
                navigateTo('/')
            }
        }
    })
}
