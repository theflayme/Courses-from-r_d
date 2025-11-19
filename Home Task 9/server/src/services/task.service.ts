import { Task } from "../models/task.model";
import { User } from "../models/user.model";
import type { FilterTaskType, TaskFormData } from "../types/task.types";

import { AppError } from "../utils/appError";
import { filterTaskList } from "../utils/filterTaskList";

export const taskService = {
  async getTasks(filters: FilterTaskType) {
    const hasFilters = filters.createdAt || filters.status || filters.priority;

    if (hasFilters) {
      return filterTaskList(filters);
    }

    return Task.findAll();
  },

  async getTaskById(id: string) {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new AppError("Завдання не знайдено", 404);
    }
    return task;
  },

  async createTask(data: TaskFormData) {
    if (!data.userId) {
      throw new AppError("Помилка: відсутній userId", 400);
    }
    const user = await User.findByPk(data.userId);

    if (!user) {
      throw new AppError("Користувача з таким userId не існує", 404);
    }
    return Task.create(data); 
  },

  async updateTask(id: string, body: Partial<TaskFormData>) {
    const task = await Task.findByPk(id);

    if (!task) {
      throw new AppError("Завдання не знайдено", 404);
    }

    return await task.update(body);
  },

  async deleteTask(id: string) {
    const deleteTask = await Task.findByPk(id);

    if (!deleteTask) {
      throw new AppError("Завдання не знайдено", 404);
    }

    await deleteTask.destroy();
    return { message: "Завдання видалено", task: deleteTask };
  },
};
