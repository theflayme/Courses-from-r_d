import type { NextFunction, Response, Request } from "express";

export const errorHandler = (err: Error, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Помилка сервера';
    res.status(statusCode).json({ message: message });
};

export const handleTaskNotFound = (id: string, res: Response) => {
    const error = new Error(`Задача з id ${id} не знайдена`);
    res.status(404).json({ message: error.message });
};

export const handleTaskValidationError = (message: string, res: Response) => {
    const error = new Error(message);
    res.status(400).json({ message: error.message });
};

export const handleUserNotFound = (userId: number, res: Response) => {
    const error = new Error(`Користувач з ID ${userId} не існує`);
    res.status(400).json({ message: error.message });
};

export const handleServerError = (res: Response) => {
    res.status(500).json({ message: 'Помилка сервера' });
};
