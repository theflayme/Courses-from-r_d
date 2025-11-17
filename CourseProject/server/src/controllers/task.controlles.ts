import { Request, Response, NextFunction } from 'express';
import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from '../services/task.service';
import { Task } from '../models/task.model';

// GET /task
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.query;

    const tasks = await getTasksService({
      id: req.query.id?.toString(),
      status: req.query.status?.toString(),
      priority: req.query.priority?.toString(),
      createdAt: req.query.createdAt?.toString(),
    });

    if (id && tasks.length === 0) {
      return res.status(404).json({ message: 'Задача не знайдена' });
    }

    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// GET /tasks/:id
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Задача не знайдена' });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// POST /tasks
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newTask = await createTaskService(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: `Помилка виявлення користувача з ID: ${id}` });
  }

  try {
    const updatedTask = await updateTaskService(id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ message: `Задача з ID:${id}, відсутня` });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// DELETE /tasks/:id
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID задачі не вказано' });
  }

  try {
    const deletedTask = await deleteTaskService(id);
    if (!deletedTask) {
      return res.status(404).json({ message: `Задача з ID:${id}, відсутня` });
    }
    res.status(200).json({ task: deletedTask, message: 'Задача видалена' });
  } catch (err) {
    next(err);
  }
};
