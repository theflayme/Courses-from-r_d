import type { NextFunction, Response } from "express";

export const errorHandler = (err: Error, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Помилка сервера';
    res.status(statusCode).json({ message: message });
};

