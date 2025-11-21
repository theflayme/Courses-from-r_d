import { Task } from '../models/task.model';
import type { FilterTaskType } from '../types/task.types';

export const filterTaskList = async (
  model: typeof Task,
  filters: FilterTaskType,
) => {
  const query: Record<string, unknown> = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  if (filters.createdAt) {
    const startOfDate = new Date(filters.createdAt);

    const endOfDay = new Date(startOfDate);
    endOfDay.setDate(endOfDay.getDate() + 1);

    query.createdAt = {
      $gte: startOfDate,
      $lt: endOfDay,
    };
  }

  return model.find(query).exec();
};
