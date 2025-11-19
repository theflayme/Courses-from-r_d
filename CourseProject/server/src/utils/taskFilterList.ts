import { Task } from "../models/task.model";
import type { FilterTaskType } from "../types/task.types";

const taskFilterList = async (filters: FilterTaskType) => {
  const where: Record<string, unknown> = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  if (filters.createdAt) {
    const date = new Date(filters.createdAt);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    where.createdAt = {
      $gte: date,
      $lt: nextDay,
    };
  }

  return Task.find(where);
};
    
export default taskFilterList;