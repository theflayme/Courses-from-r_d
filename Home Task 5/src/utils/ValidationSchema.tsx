import { z } from 'zod';

const taskStatus = ['todo', 'in_progress', 'done'] as const;
const taskPriority = ['low', 'medium', 'high'] as const;

const taskChema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(taskStatus),
    priority: z.enum(taskPriority),
    createdAt: z.string(),
    deadline: z.date().optional()
});

export type Task = z.infer<typeof taskChema>;