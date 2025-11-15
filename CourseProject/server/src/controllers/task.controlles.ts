import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/middleware/errorHandler";
import { 
    getTasksService, 
    createTaskService, 
    updateTaskService, 
    deleteTaskService 
} from "../services/task.service";

// GET /task
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, status, priority, createdAt } = req.query;

        const tasks = await getTasksService({
            id: id ? String(id) : undefined,
            status: status ? String(status) : undefined,
            priority: priority ? String(priority) : undefined,
            createdAt: createdAt ? String(createdAt) : undefined
        });

        if (id && tasks.length === 0) {
            return res.status(404).json({ message: "Задача не знайдена" });
        }

        res.status(200).json(tasks);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};

// POST /tasks
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newTask = await createTaskService(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: `Помилка виявлення користувача з ID: ${id}` });
    }

    try {
        const updatedTask = await updateTaskService(id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ message: `Задача з ID:${id}, відсутня` });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID задачі не вказано" });
    }

    try {
        const deletedTask = await deleteTaskService(id);
        if (!deletedTask) {
            return res.status(404).json({ message: `Задача з ID:${id}, відсутня` });
        }
        res.status(200).json({ task: deletedTask, message: "Задача видалена" });
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};
