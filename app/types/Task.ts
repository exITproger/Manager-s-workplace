// types/Task.ts
import type { TaskStatusType } from './TaskStatusType' 
import type { TaskUserPreview } from './TaskUserPreview'

export interface Task {
    id: number
    title: string
    description: string
    status: TaskStatusType 
    responsible: TaskUserPreview 
    createdAt: string
}