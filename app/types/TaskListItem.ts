import type {TaskUserPreview} from "~/types/TaskUserPreview.ts";
import type {TaskStatusType} from "~/types/TaskStatusType.ts";
import type {TaskType} from "~/types/TaskType.ts";

export interface TaskListItem {
    id: number,
    responsible: TaskUserPreview,
    type: TaskType,
    createDate: Date,
    executeDate: Date,
    status: TaskStatusType,
    title: string,
    creator: TaskUserPreview
}