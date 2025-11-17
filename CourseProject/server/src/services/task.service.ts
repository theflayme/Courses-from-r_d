import { Task } from '../models/task.model';
import {
  filterTaskType,
  TaskFormData,
  taskPriority,
  taskStatus,
} from '../types/task.types';

export const getTasksService = async (
  query: Record<string, string | undefined>,
) => {
  const result = filterTaskType.safeParse(query);

  if (!result.success) {
    throw result.error;
  }

  const { id, status, priority, createdAt } = result.data;

  if (id) {
    const task = await Task.findById(id);
    return task ? [task] : [];
  }

  const filter: {
    status?: (typeof taskStatus)[number];
    priority?: (typeof taskPriority)[number];
    createdAt?: Date;
  } = {};

  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  if (createdAt) {
    const date = new Date(createdAt);
    if (!isNaN(date.getTime())) {
      filter.createdAt = date;
    }
  }

  return await Task.find(filter);
};

// POST /
export const createTaskService = async (data: TaskFormData) => {
  const newTask = new Task(data);
  return newTask.save();
};

// PUT /:id
export const updateTaskService = async (id: string, data: TaskFormData) => {
  return Task.findByIdAndUpdate(id, data, { new: true });
};

// DELETE /:id
export const deleteTaskService = async (id: string) => {
  return Task.findByIdAndDelete(id);
};
