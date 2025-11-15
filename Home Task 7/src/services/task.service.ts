import type { TaskFormData, TaskType, FilterTaskType } from "../types/task.schema";
import { randomUUID } from "crypto";

// In-memory сховище завдань
const tasks: TaskType[] = [
  {
    id: "1",
    title: "Прибрати кімнату",
    description: "Помити підлогу, витерти пил",
    status: "todo",
    priority: "medium",
    createdAt: new Date(),
    deadline: new Date()
  },
  {
    id: "2",
    title: "Купити продукти",
    description: "Молоко, хліб, яйця",
    status: "todo",
    priority: "medium",
    createdAt: new Date(),
    deadline: new Date()
  }
];

export class HttpError extends Error {
  constructor(
    public status: number,
    public message: string
  ) {
    super(message);
  }
}

export function filterTask(task: TaskType, filters: FilterTaskType) {
  if (filters.createdAt && 
      new Date(task.createdAt).toISOString() !== new Date(filters.createdAt).toISOString()) {
    return false;
  }

  if (filters.status && task.status !== filters.status) {
    return false;
  }

  if (filters.priority && task.priority !== filters.priority) {
    return false;
  }

  return true;
}

export const taskService = {
  list(filter: FilterTaskType = {}): TaskType[] {
    return tasks.filter((t) => filterTask(t, filter));
  },

  getById(id: string): TaskType {
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      throw new HttpError(404, `Задача з id ${id} не знайдена`);
    }

    return task;
  },

  create(input: TaskFormData): TaskType {
    const createdAt = new Date();

    const inputTask: TaskFormData = {
      title: input.title,
      description: input.description,
      status: input.status,
      priority: input.priority,
      deadline: input.deadline
    };

    const task: TaskType = {
      ...inputTask,
      id: randomUUID(),
      createdAt
    };

    tasks.push(task);
    return task;
  },

  update(id: string, patch: Partial<Omit<TaskType, "id" | "createdAt">>): TaskType {
    const elementId = tasks.findIndex((t) => t.id === id);

    if (elementId === -1) {
      throw new HttpError(404, `Задача з id ${id} не знайдена`);
    }

    const updatedTask = {
      ...tasks[elementId], 
      ...patch
    } as TaskType;

    tasks[elementId] = updatedTask;
    return updatedTask;
  },

  delete(id: string): void {
    const elementId = tasks.findIndex((t) => t.id === id);

    if (elementId === -1) {
      throw new HttpError(404, `Задача з id ${id} не знайдена`);
    }

    tasks.splice(elementId, 1);
  }
};
