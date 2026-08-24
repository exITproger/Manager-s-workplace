// composables/useTasksRequest.ts
import type { TaskListItem } from "~/types/TaskListItem";

export function useTasksRequest(status?: string) {
    const config = useRuntimeConfig()
    const token = useCookie<string | null>('token') // 👈 Просто берём токен из куки
    const queryBody: any = {}

    if (status && status !== 'any') {
        queryBody.status = status
    }

    return useFetch<TaskListItem[]>('/tasks', {
        key: 'tasks',
        baseURL: config.public.apiBase as string,
        headers: { Authorization: `Bearer ${token.value}` },
        query: queryBody,
        onResponseError({ response }) {
            if (response.status === 401) {
                token.value = null
                navigateTo('/')
            }
        }
    })
}