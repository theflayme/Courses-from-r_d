import { z } from 'zod';

export const taskStatus = ['todo', 'in_progress', 'review', 'done'] as const;
export const taskPriority = ['low', 'medium', 'high'] as const;

export const taskSchema = z.object({
  title: z.string().min(5, 'Заголовок має бути більше 5 символів'),
  description: z.string().optional(),
  status: z.enum(taskStatus, {
    message: `Статус повинен містити в собі одне з наступних значень: ${taskStatus.join(', ')}`,
  }),
  priority: z.enum(taskPriority, {
    message: `Пріоритет повинен містити в собі одне з наступних значень: ${taskPriority.join(', ')}`,
  }),

  deadline: z.coerce
    .date({ message: "Дедлайн повинен бути обов'язковим" })
    .refine((data) => data >= new Date(), {
      message: 'Дата виконання не може бути меншою за сьогодні',
    }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export type TaskType = TaskFormData & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const filterTaskType = z.object({
  id: z.string().optional(),
  createdAt: z
    .string({ message: 'Дата створення повинна бути рядком' })
    .optional(),
  status: z
    .enum(taskStatus, {
      message: `Статус повинен містити в собі одне з наступних значень: ${taskStatus.join(', ')}`,
    })
    .optional(),
  priority: z
    .enum(taskPriority, {
      message: `Пріоритет повинен містити в собі одне з наступних значень: ${taskPriority.join(', ')}`,
    })
    .optional(),
});

export type FilterTaskType = z.infer<typeof filterTaskType>;

export type ErrorMessageType = {
  status: number;
  message: string;
};
