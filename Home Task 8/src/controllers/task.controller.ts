import type { Request, Response } from "express";

import { Task } from "../models/Task.model";
import { User } from "../models/User.model";

import { type TaskDataType, type TaskType } from "../types/Task.types";

import { filterTaskList } from "../utils/FilterTaskList";
import { handleTaskNotFound, handleTaskValidationError, handleServerError } from "../middlewares/ErrorHandler";

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
        const newTask: TaskDataType = req.body;

        if (!newTask.userId) {
            return handleTaskValidationError(`ID користувача не може бути пустим`, res);
        }
        
        if (!newTask.title) {
            return handleTaskValidationError(`Задача не може бути створена без назви`, res);
        }


        const user = await User.findByPk(newTask.userId);
        if (!user) {
            return handleTaskValidationError(`Користувач з ID ${newTask.userId} не існує`, res);
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

        if (updatedTask.id && updatedTask.id !== (id)) {
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
        
        if(!id){
            handleTaskValidationError(`ID задачі не може бути пустим`, res);
            return;
        }

        if(!task){
            handleTaskNotFound(id, res);
            return;
        }

        await task.destroy();
        const tasks = await Task.findAll();
        res.status(200).json({message: `Задача з ID:${id} видалена`, task: tasks});
    } catch (error) {
        handleServerError(res);
    }
}
