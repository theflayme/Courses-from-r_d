import { Task } from '../models/task.model';
import type { FilterTaskType, TaskFormData } from '../types/task.types';

import { AppError } from '../utils/appError';
import { filterTaskList } from '../utils/filterTaskList';

export const taskService = {
  async getTasks(filters: FilterTaskType) {
    const hasFilters = filters.createdAt || filters.status || filters.priority;

    if (hasFilters) return filterTaskList(Task, filters);

    return Task.find();
  },

  async getTaskById(id: string) {
    const task = await Task.findById(id);
    console.log(task);

    if (!task) {
      throw new AppError('Завдання не знайдено', 400);
    }

    return task;
  },

  async createTask(data: TaskFormData) {
    return await Task.create(data);
  },

  async updateTask(id: string, body: Partial<TaskFormData>) {
    const task = await Task.findById(id);

    if (!task) {
      throw new AppError('Завдання не знайдено', 400);
    }

    Object.assign(task, body);
    return await task.save();
  },

  async deleteTask(id: string) {
    const deleteTask = await Task.findById(id);

    if (!deleteTask) {
      throw new AppError('Завдання не знайдено', 400);
    }

    await deleteTask.deleteOne();
    return { message: 'Завдання видалено', task: deleteTask };
  },
};
