export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskType = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string;
    deadline: string;
}
