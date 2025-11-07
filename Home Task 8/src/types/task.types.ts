import type { Task } from "../models/Task.model";

export enum  TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}
export enum  TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export type TaskType = {
    id: number;
    userId: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: Date;
    deadline: Date;
}

export type UpdateTaskType = Partial<Omit<TaskType, 'id' | 'createdAt' | 'updatedAt'>>;