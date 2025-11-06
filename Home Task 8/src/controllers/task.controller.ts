import { type TaskType } from "../types/task.types";
import type { Request, Response } from "express";
import { taskService } from "../services/task.service";
import { filterTaskList } from "../pages/task.pages";

import { validateTask } from "../services/task.service.validation";

export const getTasks = (req: Request, res: Response) => {
    const { createdAt, status, priority } = req.query;
    const filtered = filterTaskList(createdAt as string, status as string, priority as string);
    res.json(filtered);
}

export const getTaskById = (req: Request, res: Response) => {
    const { id } = req.params;
    const task = filterTaskList().find(t => t.id === parseInt(id as string));

    if (!task) {
        const error = new Error(`Задача з id ${id} не знайдена`);
        res.status(404).json({ message: error.message });
        return;
    }

    res.json(task);
}

export const createTask = (req: Request, res: Response) => {
    const newTask: TaskType = req.body;

    if(!newTask){
        const error = new Error(`Задача не може бути створена`);
        res.status(400).json({ message: error.message });
        return;
    }

    const validationError = validateTask(newTask);
    if (validationError) {
        const error = new Error(`Задача не може бути створена з помилкою: ${validationError}`);
        res.status(400).json({ message: error.message });
        return;
    }

    taskService.push(newTask);
    res.status(201).json(newTask);
}

export const updateTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTask: TaskType = req.body;
    const elementId = taskService.findIndex(t => t.id === parseInt(id as string));

    if(!updatedTask || elementId === -1){
        const error = new Error(`Задача з id ${id} не знайдена`);
        res.status(400).json({ message: error.message });
        return;
    }

    if (updatedTask.id && updatedTask.id !== parseInt(id as string)) {
        const error = new Error(`ID задачі не можна змінювати`);
        res.status(400).json({ message: error.message });
        return;
    }

    const validationError = validateTask(updatedTask);
    if (validationError) {
        const error = new Error(`Задача не може бути оновлена з помилкою: ${validationError}`);
        res.status(400).json({ message: error.message });
        return;
    }

    taskService[elementId] = { ...taskService[elementId], ...updatedTask };
    res.status(200).json(updatedTask);  
}

export const deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const elementId = taskService.findIndex(t => t.id === parseInt(id as string));
    if(elementId === -1){
        const error = new Error(`Задача з id ${id} не знайдена`);
        res.status(404).json({ message: error.message });
        return;
    }

    taskService.splice(elementId, 0);
    res.status(200).json({ task: taskService[elementId], message: 'Задача видалена' });
}
