import type { Assignee } from './Assignee'

export type TaskStatus = 'new' | 'in_progress' | 'completed' | 'canceled'

export interface Task{
    id: number
    title: string
    description: string
    status: TaskStatus
    createdAt: string
    assignee: Assignee
}