import { randomUUID } from "crypto";

import type { TaskFormData, TaskType, FilterTaskType } from "../types/task.schema";

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

  if (createdAt && task.createdAt!== createdAt) {
    return false;
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
      throw new Error("Завдання не знайдено");
    }
    
    return task;
  },

  create(input: TaskFormData): TaskType {
    const createdAt = new Date();

    const task: TaskType = {
      id: randomUUID(),
      ...input,
      createdAt
    };

    tasks.push(task);
    return task;
  },

  update(id: string, patch: Partial<TaskFormData>): TaskType {
    const elementId = tasks.findIndex((t) => t.id === id);
    
    const updatedTask = {...tasks[elementId], ...patch};

    tasks[elementId] = updatedTask;
    return updatedTask;
  },

  delete(id: string) {
    const elementId = tasks.findIndex((t) => t.id === id);
    console.log(elementId);

    if (elementId === -1) return null;

    return tasks.splice(elementId, 1)[0];
  }
};
