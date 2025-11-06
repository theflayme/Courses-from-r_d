import type { TaskType } from "../types/task.types";

export const taskService: TaskType[] = [
    {
        id: 0,
        title: 'Task 1',
        description: 'Description 1',
        status: 'todo',
        priority: 'low',
        createdAt: new Date(),
        deadline: new Date(),
    },
    {
        id: 1,
        title: 'Task 2',
        description: 'Description 2',
        status: 'in_progress',
        priority: 'medium',
        createdAt: new Date(),
        deadline: new Date(),
    },
    {
        id: 2,
        title: 'Task 3',
        description: 'Description 3',
        status: 'done',
        priority: 'high',
        createdAt: new Date(),
        deadline: new Date(),
    },
    {
        id: 3,
        title: 'Task 4',
        description: 'Description 4',
        status: 'todo',
        priority: 'low',
        createdAt: new Date(),
        deadline: new Date(),
    },
    {
        id: 4,
        title: 'Task 5',
        description: 'Description 5',
        status: 'in_progress',
        priority: 'medium',
        createdAt: new Date(),
        deadline: new Date(),
    }
]   