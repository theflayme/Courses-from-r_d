import { Task } from "../models/task.model";
import type { FilterTaskType } from "../types/task.types";

export const filterTaskList = async (filters: FilterTaskType) => {
  const where: Record<string, unknown> = {};

  if (filters.createdAt) {
    where.createdAt = filters.createdAt;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  return Task.findAll({ where });
};
