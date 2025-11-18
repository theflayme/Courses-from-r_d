import type { Request, Response, NextFunction } from "express";
import { filterTaskType } from "../types/task.schema";

const validateGetTasksQuery = (req: Request, res: Response, next: NextFunction) => {
  const result = filterTaskType.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      error: "Помилка валідації параметрів запиту",
      details: result.error.issues.map((e) => ({
        position: e.path.join("."),
        message: e.message,
      })),
    });
  }

  res.locals.validatedQuery = result.data; 
  next();
};

export default validateGetTasksQuery;