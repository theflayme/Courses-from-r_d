import type { Request, Response, NextFunction } from "express";
import { taskService } from "../services/task.service";
import { taskSchema } from "../types/task.schema";

// GET /tasks
export const getTasks = (req: Request, res: Response) => {
  const filters = req.query;
  const tasks = taskService.list(filters);
  return res.json(tasks);
};

// GET /tasks/:id
export const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = taskService.getById(id);
    return res.json(task);
  } catch {
    return res.status(404).json({ message: "Завдання не знайдено" });
  }
};

// POST /tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const newTask = await taskService.create(req.body);
    return res.status(201).json(newTask);
  } catch {
    return res.status(500).json({ message: "Помилка при створенні завдання" });
  }
};

// PUT /tasks/:id
export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = taskSchema.partial().safeParse(req.body);
    if (!result.success) return next(result.error);

    const updatedTask = taskService.update(id, result.data);
    return res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks/:id
export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = taskService.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Завдання не знайдено" });
    }

    return res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};
