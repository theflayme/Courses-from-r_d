import type { Request, Response, NextFunction } from "express";
import type { TaskFormData, FilterTaskType } from "../types/task.types";

import { taskService } from "../services/task.service";

// GET /tasks
export const getTasks = async (req: Request<FilterTaskType>, res: Response, next: NextFunction) => {
  try {
    const filters = res.locals.validatedQuery;
    const tasks = await taskService.getTasks(filters);
    
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET /tasks/:id
export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// POST /tasks
export const createTask = async (
  req: Request<{}, TaskFormData>, res: Response, next: NextFunction) => {
  try {
    const newTask = await taskService.createTask(req.body);

    return res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await taskService.deleteTask(req.params.id);
    
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
