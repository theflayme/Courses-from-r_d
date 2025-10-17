import { z } from 'zod';
import { DEFAULT_PRIORITY, DEFAULT_STATUS } from '../constants';

const Status = ['todo', 'in_progress', 'done'] as const;
const Priority = ['low', 'medium', 'high'] as const;

export const Task = z.object({
    id:             z.number(),
    title:          z.string(),
    description:    z.string(),

    /* Поле "createdAt" зроблено опціональним та може бути пропущено при виконанні перевірки */
    createdAt:      z.union([z.date(), z.string()]).optional(),

    /* При відсутності поля "Status" або "Priority" йому призначується дефолтне значення */
    status:         z.enum(Status).default(DEFAULT_STATUS),
    priority:       z.enum(Priority).default(DEFAULT_PRIORITY),

    deadline:       z.union([z.string(), z.date()])
})

export type TaskType = z.infer<typeof Task>;

