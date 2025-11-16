import type { Request, Response, NextFunction } from "express";
import { taskSchema } from "../types/task.schema";

const validateRequestBody = ( req: Request, res: Response, next: NextFunction ) => {
  const result = taskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Помилка валідації",
      details: result.error.issues.map((e) => ({
        postition: e.path.join("."),
        message: e.message,
      })),
    });
  }
  

  req.body = result.data;

  next();
};

export default validateRequestBody;