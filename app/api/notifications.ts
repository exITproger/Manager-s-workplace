// app/api/notifications.ts
import type { NotificationListItem } from "~/types/NotificationListItem";
import { token, tokenCookie } from "~/composables/useAuth";

export function useNotificationsRequest(recipientId: number | undefined) {
    const config = useRuntimeConfig()
    const queryBody: any = {}

    if (recipientId !== undefined) {
        queryBody.recipient_id = recipientId
    }

    console.log('Токен для запроса:', token()) // Добавь для проверки

    return useFetch<NotificationListItem[]>('/notifications', {
        key: 'notifications',
        baseURL: config.public.apiBase as string,
        headers: { Authorization: `Bearer ${token()}` },
        query: queryBody,
        onResponseError({ response }) {
            console.log('Ошибка ответа:', response.status) // Добавь для проверки
            if (response.status === 401) {
                tokenCookie().value = null
                navigateTo('/')
            }
        }
    })
}