import type { Request, Response } from "express";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";
import mongoose, { CastError } from "mongoose";

const errorHandler = (err: AppError | ZodError | CastError, req: Request, res: Response) => {
    
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

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      error: "Помилка валідації ObjectId",
      details: [
        {
          position: err.path,
          message: `Невірний формат ObjectId: ${err.value}`,
        },
      ],
    });
  }


  return res.status(500).json({
    message: "Помилка сервера",
  });
};

export default errorHandler;

