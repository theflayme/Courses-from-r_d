import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";

const errorHandler = (
  err: AppError | ZodError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
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

  if (err instanceof Error) {
    return res.status(400).json({
      error: "Помилка валідації",
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Помилка сервера",
  });
};

export default errorHandler;
