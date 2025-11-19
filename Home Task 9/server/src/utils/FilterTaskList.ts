import { Op } from "sequelize";
import { Task } from "../models/task.model";
import type { FilterTaskType } from "../types/task.types";

export const filterTaskList = async (filters: FilterTaskType) => {
  const where: Record<string, unknown> = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  if (filters.createdAt) {
    const date = new Date(filters.createdAt);

    where.createdAt = {
      [Op.gte]: date,
    };
  }

  return Task.findAll({ where });
};
