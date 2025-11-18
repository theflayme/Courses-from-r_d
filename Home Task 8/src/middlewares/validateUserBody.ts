import type { NextFunction, Request, Response } from "express";
import { UserSchema } from "../types/user.types";

const validateUserBody = (req: Request, res: Response, next: NextFunction) => {
  const result = UserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Помилка валідації даних користувача",
      details: result.error.issues.map((e) => ({
        position: e.path.join("."),
        message: e.message,
      })),
    });
  }

  req.body = result.data;
  next();
};

export default validateUserBody;


