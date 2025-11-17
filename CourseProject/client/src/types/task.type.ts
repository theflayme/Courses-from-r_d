import z from 'zod';

export const taskStatuses = z.enum(['todo', 'in_progress', 'review', 'done']);
export const taskPriorities = z.enum(['low', 'medium', 'high']);

export const taskSchema = z.object({
  title: z.string().min(5, 'Задача повинна містити мінімум 5 символів'),
  description: z.string().optional(),

  status: taskStatuses,
  priority: taskPriorities,

  deadline: z.date().refine(
    (date) => {
      const now = new Date();
      return date > now;
    },
    { message: 'Термін виконання повинен бути в майбутньому' },
  ),
});

export type TaskType = z.infer<typeof taskSchema>;

export type TaskResponseType = TaskType & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
