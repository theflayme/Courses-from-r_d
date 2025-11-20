import type { Request, Response, NextFunction } from "express";
import { taskSchema } from "../types/task.types";

const validateUpdateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const result = taskSchema.partial().safeParse(req.body);

  if (!id) {
    return res.status(400).json({ message: "ID завдання не вказано" });
  }

  if (!result.success) {
    return res.status(400).json({
      error: "Помилка валідації",
      details: result.error.issues.map((e) => ({
        position: e.path.join("."),
        message: e.message,
      })),
    });
  }

  req.body = result.data;
  next();
};
export default validateUpdateTask;
