import { z } from 'zod';

const taskStatus = ['todo', 'in_progress', 'done'] as const;
const taskPriority = ['low', 'medium', 'high'] as const;

export const taskSchema = z.object({
  title: z.string().min(5, 'Заголовок має бути більше 5 символів'),
  description: z.string().optional(),

  status: z.enum(taskStatus, { message: 'Статус є обовʼязковим' }),
  priority: z.enum(taskPriority, { message: 'Пріоритет є обовʼязковим' }),

deadline: z.coerce.date()
  .refine((data) => data >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: "Дата виконання не може бути меншою за сьогодні",
  }),
});

export type TaskFormData  = z.infer<typeof taskSchema>;

export type Task = TaskFormData & {
  id: string;
  createdAt: Date;
};



