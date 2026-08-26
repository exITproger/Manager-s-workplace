// api/tasks.ts
import type { Task } from "~/types/Task" 
import { token, tokenCookie } from "~/composables/useAuth"

export function useTasksRequest(status?: string) {
    const config = useRuntimeConfig()
    const queryBody: any = {}

    if (status && status !== 'any') {
        queryBody.status = status
    }

    return useFetch<Task[]>('/tasks', {
        key: 'tasks',
        baseURL: config.public.apiBase as string,
        headers: { Authorization: `Bearer ${token()}` }, 
        query: queryBody,
        onResponseError({ response }) {
            if (response.status === 401) {
                tokenCookie().value = null
                navigateTo('/')
            }
        }
    })
}

export function useTaskAction(taskId: number, action: string) {
    const config = useRuntimeConfig()

    return useFetch(`/task/${taskId}/${action}/`, {
        method: 'PATCH',
        key: `task-${taskId}-${action}`,
        baseURL: config.public.apiBase as string,
        headers: { Authorization: `Bearer ${token()}` },
        onResponseError({ response }) {
            if (response.status === 401) {
                tokenCookie().value = null
                navigateTo('/')
            }
        }
    })
}