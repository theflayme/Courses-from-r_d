import { z } from "zod";

const taskStatus = ['todo', 'in_progress', 'done'] as const;
export type TaskStatus = typeof taskStatus[number];

const taskPriority = ['low', 'medium', 'high'] as const;
export type TaskPriority = typeof taskPriority[number];

export const taskSchema = z.object({
  title: z.string().min(5, 'Заголовок має бути більше 5 символів'),
  description: z.string().optional(),
  status: z.enum(taskStatus, { message: 'Статус є обовʼязковим' }),
  priority: z.enum(taskPriority, { message: 'Пріоритет є обовʼязковим' }),

  deadline: z.coerce.date().refine(
    (data) => data >= new Date, 
    { message: "Дата виконання не може бути меншою за сьогодні" }
  ),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export type TaskType = TaskFormData & {
  id: string;
  createdAt: Date;
};

export type FilterTaskType = {
  createdAt?: string;
  status?: string;
  priority?: string;
};

export type ErrorMessageType = {
  status: number;
  message: string;
};
