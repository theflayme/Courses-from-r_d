import { z } from "zod";

const taskStatus = ["todo", "in_progress", "done"] as const;
export type TaskStatus = (typeof taskStatus)[number];

const taskPriority = ["low", "medium", "high"] as const;
export type TaskPriority = (typeof taskPriority)[number];

export const taskSchema = z.object({
  userId: z.number({ message: "ID користувача повинен бути числом" }),
  title: z.string().min(5, "Заголовок має бути більше 5 символів"),
  description: z.string().optional(),
  status: z.enum(taskStatus, {
    message: `Статус повинен містити в собі одне з наступних значень: ${taskStatus.join(", ")}`,
  }),
  priority: z.enum(taskPriority, {
    message: `Пріоритет повинен містити в собі одне з наступних значень: ${taskPriority.join(", ")}`,
  }),

  deadline: z.coerce
    .date({ message: "Дедлайн повинен бути обов'язковим" })
    .refine((data) => data >= new Date(), {
      message: "Дата виконання не може бути меншою за сьогодні",
    }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export type TaskType = TaskFormData & {
  id: string;
  createdAt: Date;
};

export const filterTaskType = z.object({
  createdAt: z.coerce
    .date({
      message:
        "Дата створення повинна бути вказана датою. Приклад: '2025-11-18'",
    })
    .optional(),
  status: z
    .enum(taskStatus, {
      message: `Статус повинен містити в собі одне з наступних значень: ${taskStatus.join(", ")}`,
    })
    .optional(),
  priority: z
    .enum(taskPriority, {
      message: `Пріоритет повинен містити в собі одне з наступних значень: ${taskPriority.join(", ")}`,
    })
    .optional(),
});

export type FilterTaskType = z.infer<typeof filterTaskType>;

export type ErrorMessageType = {
  status: number;
  message: string;
};
