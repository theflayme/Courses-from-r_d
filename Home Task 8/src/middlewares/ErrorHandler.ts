import type { NextFunction, Response, Request } from "express";
import HttpError from "./HttpError";

export const errorHandler = ( err: Error, req: Request, res: Response, next: NextFunction ) => {
  console.error(err);
  
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  
  return res.status(500).json({ error: "Внутрішня помилка сервера" });
};
/*
    Додаткові функції обробки помилок для конкретних випадків
    400 - Помилка валідації
    404 - Не знайдено
    500 - Помилка сервера
*/

export const handleTaskNotFound = (id: string, res: Response) => {
  res.status(404).json({ message: `Задача з id ${id} не знайдена` });
};

export const handleTaskValidationError = (message: string, res: Response) => {
  res.status(400).json({ message });
};

export const handleUserNotFound = (userId: number, res: Response) => {
  res.status(404).json({ message: `Користувач з ID ${userId} не існує` });
};

export const handleServerError = (res: Response) => {
  res.status(500).json({ message: "Помилка сервера" });
};