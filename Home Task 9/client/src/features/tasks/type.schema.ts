import { z } from 'zod';

// Task Type 
const taskStatus = ['todo', 'in_progress', 'done'] as const;
const taskPriority = ['low', 'medium', 'high'] as const;

export const taskSchema = z.object({
  userId: z.coerce.number({ message: "Користувач є обовʼязковим" }),
  title: z.string().min(5, 'Заголовок має бути більше 5 символів'),
  description: z.string().optional(),
  status: z.enum(taskStatus, { message: 'Статус є обовʼязковим' }),
  priority: z.enum(taskPriority, { message: 'Пріоритет є обовʼязковим' }),
  deadline: z.coerce.date().min(new Date(), 'Дата виконання має бути в майбутньому'),
});

export type TaskFormData = z.input<typeof taskSchema>;

export type Task = z.infer<typeof taskSchema> & {
  id: string;
  createdAt: Date;
};

// User type

export type User = {
  id: number;
  name: string;
};

