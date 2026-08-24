import type {Ref} from "vue";
import type {NotificationListItem} from "~/types/NotificationListItem.ts";
import {token, tokenCookie} from "~/composables/useAuth.ts";

export function useNotificationsRequest(recipientId?: Ref<number | undefined>, options: Record<string, unknown> = {}) {
    const config = useRuntimeConfig()

    return useFetch<NotificationListItem[]>('/notifications', {
        key: 'notifications',
        baseURL: config.public.apiBase as string,
        headers: {Authorization: `Bearer ${token()}`},
        query: {recipient_id: recipientId},
        onResponseError({response}) {
            if (response.status === 401) {
                tokenCookie().value = null
                navigateTo('/')
            }
        },
        ...options
    })
}
