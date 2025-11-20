import { Op } from "sequelize";
import Task from "../models/task.model";
import type { FilterTaskType } from "../types/task.types";

export const filterTaskList = async (
  model: typeof Task,
  filters: FilterTaskType,
) => {
  const where: Record<string, unknown> = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  if (filters.createdAt) {
    const startOfDate = new Date(filters.createdAt);
    const endOfDay = new Date(startOfDate);

    endOfDay.setDate(startOfDate.getDate() + 1);

    where.createdAt = {
      // [Op.gt],Більше ніж,>
      // [Op.lt],Менше ніж,<
      // [Op.gte],Більше або дорівнює,>=
      // [Op.lte],Менше або дорівнює,<=
      // [Op.in],Серед значень,IN

      [Op.gte]: startOfDate,
      [Op.lt]: endOfDay,
    };
  }

  return model.findAll({ where });
};
