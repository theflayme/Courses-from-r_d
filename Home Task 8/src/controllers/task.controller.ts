import type { Request, Response } from "express";

import { Task } from "../models/task.model";
import { User } from "../models/user.model";

import { type TaskFormData, type TaskType } from "../types/task.types";

import { filterTaskList } from "../utils/FilterTaskList";

export const getTasks = async (req: Request, res: Response) => {
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
}

export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    
    if (!task) {
        res.status(404).json({ error: `Задача з ID:${id} не знайдена` });
        return;
    }
    
    res.json(task);
}


export const createTask = async (req: Request, res: Response) => {
        const newTask: TaskFormData = req.body;
        const user = await User.findByPk(newTask.userId);

        if (!user) {
            res.status(400).json({ error: `Користувача з ID:${newTask.userId} не існує` });
            return;
        }

        const createdTask = await Task.create(newTask);
        res.status(201).json(createdTask);
}

export const updateTask = async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedTask: TaskType = req.body;
        const task = await Task.findByPk(id);

        if (!task) {
            res.status(404).json({ error: `Задача з ID:${id} не знайдена` });
            return;
        }

        await task.update(updatedTask);
        const updatedTaskData = await Task.findByPk(id);
        res.status(200).json(updatedTaskData);
}

export const deleteTask = async (req: Request, res: Response) => {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if(!task){
            res.status(404).json({ error: `Задача з ID:${id} не знайдена` });
            return;
        }

        await task.destroy();
        const tasks = await Task.findAll();
        res.status(200).json({message: `Задача з ID:${id} видалена`, task: tasks});
}
