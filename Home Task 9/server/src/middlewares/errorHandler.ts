import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";

const errorHandler = (
  err: AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Помилка валідації",
      details: err.issues.map((e) => ({
        position: e.path.join("."),
        message: e.message,
      })),
    });
  }

  return res.status(500).json({
    message: "Помилка сервера",
  });
};

export default errorHandler;
