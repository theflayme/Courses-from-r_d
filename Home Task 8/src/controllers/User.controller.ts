import type { NextFunction, Request, Response } from "express";

import { User } from "../models/user.model";
import type { UserDataType } from "../types/user.types";
import { AppError } from "../utils/AppError";

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return next(new AppError(`Користувача з id ${id} не знайдено`, 404));
  }

  res.status(200).json(user);
};

export const createUser = async (req: Request,res: Response, next: NextFunction) => {
  const { name, email } = req.body as UserDataType;

  const user = await User.create({ name, email });
  res.status(201).json(user);
};

export const getUsers = async (req: Request, res: Response,next: NextFunction) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updatedUser: Partial<UserDataType> = req.body;
  const user = await User.findByPk(id);

  if (!user) {
    return next(new AppError(`Користувача з id ${id} не знайдено`, 404));
  }

  await user.update(updatedUser);
  res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return next(new AppError(`Користувача з id ${id} не знайдено`, 404));
  }

  await user.destroy();
  res.status(200).json({ user, message: "Користувач видалений" });
};