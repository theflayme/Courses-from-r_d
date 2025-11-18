import type { NextFunction, Request, Response } from "express";

import { Task } from "../models/task.model";
import { User } from "../models/user.model";
import type { FilterTaskType, TaskFormData } from "../types/task.types";
import { AppError } from "../utils/AppError";
import { filterTaskList } from "../utils/FilterTaskList";

// GET /tasks
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = (res.locals.validatedQuery || {}) as FilterTaskType;

    const hasFilters = typeof filters.createdAt || typeof filters.status || typeof filters.priority;

    if (hasFilters) {
      const tasks = await filterTaskList(filters);
      return res.status(200).json(tasks);
    }

    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET /tasks/:id
export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return next(new AppError("Завдання не знайдено", 404));
    }

    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// POST /tasks
export const createTask = async (req: Request<unknown, unknown, TaskFormData>, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return next(new AppError("Користувача з таким id не існує", 400));
    }

    const newTask = await Task.create(req.body);
    return res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return next(new AppError("Завдання не знайдено", 404));
    }

    await task.update(req.body);
    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return next(new AppError("Завдання не знайдено", 404));
    }

    await task.destroy();
    const tasks = await Task.findAll();

    return res.status(200).json({
      message: "Завдання видалено",
      task: tasks,
    });
  } catch (error) {
    next(error);
  }
};


