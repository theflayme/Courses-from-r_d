import type { Request, Response } from "express";

import { User } from "../models/user.model";
import type { UserDataType } from "../types/user.types";

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({ message: `Користувача з id ${id} не знайдено` });
    }

    res.json(user);
}

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body as { name?: string; email?: string };

    if (!name || !email) {
        res.status(400).json({ message: 'Некорректные данные: name и email обязательны' });
        return;
    }

    const user = await User.create({ name, email });
    res.status(201).json(user);
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.status(200).json(users);
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser: UserDataType = req.body;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({ message: `Користувача з id ${id} не знайдено` });
        return;
    }
    
    await user.update(updatedUser);
    res.status(200).json(user);
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) {
        res.status(404).json({ message: `Користувача з id ${id} не знайдено` });
        return;
    }

    await user.destroy();
    res.status(200).json({ user: user, message: 'Користувач видалений' });
}