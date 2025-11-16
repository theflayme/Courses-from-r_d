import { randomUUID } from "crypto";

import type { TaskFormData, TaskType, FilterTaskType } from "../types/task.schema";
import HttpError from "../utils/httpError";

// In-memory сховище завдань
const tasks: TaskType[] = [
  {
    id: "1",
    title: "Прибрати кімнату",
    description: "Помити підлогу, витерти пил",
    status: "in_progress",
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


export function filterTask(task: TaskType, filters: FilterTaskType) {
  const { status, priority, createdAt } = filters;

  if (createdAt) {
    const filterDate = new Date(createdAt);
    const taskDate = task.createdAt;

    if (taskDate !== filterDate){
      return false;
    }
  }

  if (status && task.status !== status) {
    return false;
  }

  if (priority && task.priority !== priority) {
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
      ...input,
    };

    const task: TaskType = {
      id: randomUUID(),
      ...inputTask,
      createdAt
    };

    tasks.push(task);
    return task;
  },

  update(id: string, patch: Partial<TaskFormData>): TaskType {
    const elementId = tasks.findIndex((t) => t.id === id);

    if (elementId === -1) {
      throw new HttpError(404, `Задача з id ${id} не знайдена`);
    }

    const updatedTask = {...tasks[elementId], ...patch} as TaskType;

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
