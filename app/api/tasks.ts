// composables/useTasksRequest.ts
import type { TaskListItem } from "~/types/TaskListItem";
import { token } from '~/composables/useAuth'

export function useTasksRequest(status?: string) {
    const config = useRuntimeConfig()
    const { token } = useAuth()
    const queryBody: any = {}

    if (status) {
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