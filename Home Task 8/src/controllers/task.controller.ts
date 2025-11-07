import { type TaskType } from "../types/Task.types";
import type { Request, Response } from "express";
import { filterTaskList, errorHandler } from "../pages/task.pages";
import { Task } from "../models/Task.model";
import { User } from "../models/User.model";
import { handleTaskNotFound, handleTaskValidationError, handleUserNotFound, handleServerError } from "../pages/task.pages.errorHandler";

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { createdAt, status, priority, userId } = req.query;
        
        if (userId) {
            const tasks = await Task.findAll({
                where: {
                    userId: parseInt(userId as string)
                }
            });
            res.json(tasks);
            return;
        }
        
        const filtered = await filterTaskList(createdAt as string, status as string, priority as string);
        res.json(filtered);
    } catch (error) {
        handleServerError(res);
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            handleTaskNotFound(id as string, res);
            return;
        }

        res.json(task);
    } catch (error) {
        handleServerError(res);
    }
}


export const createTask = async (req: Request, res: Response) => {
    try {
        const newTask: TaskType = req.body;

        if(!newTask || !newTask.title){
            handleTaskValidationError(`Задача не може бути створена без назви`, res);
            return;
        }

        if (!newTask.userId) {
            handleTaskValidationError(`ID користувача не може бути пустим`, res);
            return;
        }

        const user = await User.findByPk(newTask.userId);
        if (!user) {
            handleUserNotFound(newTask.userId, res);
            return;
        }

        const createdTask = await Task.create(newTask);
        res.status(201).json(createdTask);
    } catch (error) {
        handleServerError(res);
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedTask: TaskType = req.body;
        const task = await Task.findByPk(id);

        if(!task){
            handleTaskNotFound(id as string, res);
            return;
        }

        if (updatedTask.id && updatedTask.id !== parseInt(id as string)) {
            handleTaskValidationError(`ID задачі не можна змінювати`, res);
            return;
        }

        await task.update(updatedTask);
        const updatedTaskData = await Task.findByPk(id);
        res.status(200).json(updatedTaskData);
    } catch (error) {
        handleServerError(res);
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if(!task){
            handleTaskNotFound(id as string, res);
            return;
        }

        await task.destroy();
        res.status(200).json({task: task, message: 'Задача видалена' });
    } catch (error) {
        handleServerError(res);
    }
}
