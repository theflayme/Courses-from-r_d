import { z } from 'zod';

const taskStatus = ['todo', 'in_progress', 'done'] as const;
const taskPriority = ['low', 'medium', 'high'] as const;

export const taskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(5, 'Заголовок має бути більше 5 символів'),
  description: z.string().optional(),

  status: z.enum(taskStatus, { message: 'Статус є обовʼязковим' }),
  priority: z.enum(taskPriority, { message: 'Пріоритет є обовʼязковим' }),

  createdAt: z.date().default(new Date()),

  deadline: z.coerce.date({ message: 'Дата виконання є обовʼязковою' }).refine((data) => data >= new Date(), {
    message: 'Дата виконання не може бути менше дати сьогодні',
  }),
});

export type Task = z.infer<typeof taskSchema>;

export type CreateTask = Omit<Task, 'id | createdAt'>;


