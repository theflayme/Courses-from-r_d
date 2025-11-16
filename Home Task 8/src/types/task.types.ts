export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskDataType = {
    userId: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: Date;
}

export type TaskType = TaskDataType & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}