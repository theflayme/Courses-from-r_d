export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskType = {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: Date;
    deadline: Date;
}

export type TaskFilter = {
    status?: TaskStatus;
    priority?: TaskPriority;
    deadline?: Date;
}