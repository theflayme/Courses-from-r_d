import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Помилки Zod → 400
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Твої кастомні помилки
  if ("statusCode" in err) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Інші помилки → 500
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
};