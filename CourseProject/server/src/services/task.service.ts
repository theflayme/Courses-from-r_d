
import { Task } from "../models/task.model";
import type { FilterTaskType, TaskFormData } from "../types/task.types";

import { AppError } from "../utils/appError";
import taskFilterList from "../utils/taskFilterList";

const taskService = {
  async getTasks(filters: FilterTaskType) {
    const hasFilters = filters.createdAt  || filters.status || filters.priority;

    if (hasFilters) {
      return taskFilterList(filters);
    }

    return Task.find();
  },

  async getTaskById(id: string) {
    const task = await Task.findById(id);

    if (!task) {
      throw new AppError("Завдання не знайдено", 404);
    }
    
    return task;
  },


  async createTask(data: TaskFormData) {
    return Task.create(data);
  },

  async updateTask(id: string, body: Partial<TaskFormData>) {
    const task = await Task.findById(id);

    if (!task) {
      throw new AppError("Завдання не знайдено", 404);
    }

    return await task.set(body);
  },

  async deleteTask(id: string) {
    const deleteTask = await Task.findById(id);

    if (!deleteTask) {
      throw new AppError("Завдання не знайдено", 404);
    }

    await deleteTask.deleteOne();
    return { message: "Завдання видалено", task: deleteTask };
  },
};

export default taskService;