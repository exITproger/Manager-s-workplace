export interface Task{
    id: number
    title: string
    description: string
    status: 'pending' | 'in_progress' | 'done'
    priority: 'low' | 'medium' | 'high'
    deadline: string
    createdAt: string
    assignee: {
        id: number
        name: string
        icon: string | null
    }
}