import type { Task } from "../models/Task.model";

export type TaskStatus = 'pending' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskType = {
    userId: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: Date;
}

export type TaskDataBaseType = Task & {
    id: number;
    createdAt: Date;
}