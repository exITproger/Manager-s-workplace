import type { Assignee } from './Assignee'

export interface Task{
    id: number
    title: string
    description: string
    status: 'pending' | 'in_progress' | 'done'
    createdAt: string
    assignee: Assignee
}