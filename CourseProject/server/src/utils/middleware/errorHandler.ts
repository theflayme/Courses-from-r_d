import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import MongooseValidationError from "../../types/MongooseValidationError";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Помилка зв'язку з сервером" });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // Внутрішня валідація Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Помилка валідації",
      details: err.issues.map(e => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Валідація у базі даних
  if (err.name === "ValidationError") {
    const mongooseError = err as MongooseValidationError;
    return res.status(400).json({
      error: "Помилка валідації у базі даних",
      details: Object.values(mongooseError.errors).map(e => e.message),
    });
  }

  const statusCode = (err).statusCode || 500;
  const message = err.message || "Внутрішня помилка сервера";

  console.log("Помилка сервера:", err);
  res.status(statusCode).json({ error: message });
};
