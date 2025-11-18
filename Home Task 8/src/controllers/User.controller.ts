import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const user = await userService.createUser({ name, email });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);

    res.status(200).json({
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
