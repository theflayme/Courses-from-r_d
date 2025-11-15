import type { Request, Response, NextFunction } from "express";

import { taskSchema, type TaskType } from "../types/task.schema";
import { taskService } from "../services/task.service";

export const getTasks = (req: Request, res: Response) => {
  const filters = req.query;
  const tasks: TaskType[] = taskService.list(filters);
  res.json(tasks);
}

export const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  const task: TaskType = taskService.getById(String(id));
  res.json(task);
}

export const createTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = taskSchema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    const newTask = taskService.create(result.data);
    res.status(201).json(newTask);

  } catch (error) {
    next(error);
  }
};

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = taskSchema.partial().safeParse(req.body);

    if (!id)  {
      return next(new Error("ID завдання не вказано"));
    }

    if (!result.success) {
      return next(result.error);
    }

    const updatedTask = taskService.update(id, result.data);
    res.json(updatedTask);  
  } catch (error) {
    next(error);
  }
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new Error("ID завдання не вказано"));
    }
    
    taskService.delete(id);

    const tasks = taskService.list();

    return res.status(200).json({ message: "Видалено задачу з ID " + id, tasks });
  } catch (error) {
    next(error);
  }
};