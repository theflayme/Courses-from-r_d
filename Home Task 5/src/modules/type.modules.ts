import { z } from 'zod';

export const taskStatus = ['todo', 'in_progress', 'done'] as const;
export const taskPriority = ['low', 'medium', 'high'] as const;

export const taskSchema = z.object({
  title: z.string().min(5, 'Заголовок має бути більше 5 символів'),
  description: z.string().optional(),

  status: z.enum(taskStatus, { message: 'Статус є обовʼязковим' }),
  priority: z.enum(taskPriority, { message: 'Пріоритет є обовʼязковим' }),
  
  deadline: z.coerce.date({ message: 'Дата виконання є обовʼязковою' })
    .refine((data) => data >= new Date(), {
      message: 'Дата виконання не може бути менше дати сьогодні',
    }),
});

export type TaskFormData  = z.infer<typeof taskSchema>;

export type Task = TaskFormData & {
  id: string;
  createdAt: Date;
};
