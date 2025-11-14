import { User } from '../models/User.model';
import type { Request, Response } from 'express';
import type { UpdateUserType } from '../types/User.types';
import { handleUserNotFound, handleServerError, handleTaskValidationError } from '../pages/task.pages.errorHandler';

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            handleUserNotFound(parseInt(id as string), res);
            return;
        }

        res.json(user);
    } catch (error) {
        handleServerError(res);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body as { name?: string; email?: string };

        if (!name || !email) {
            handleTaskValidationError('Некорректные данные: name и email обязательны', res);
            return;
        }

        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        handleServerError(res);
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        handleServerError(res);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedUser: UpdateUserType = req.body;
        const user = await User.findByPk(id);

        console.log(user);

        if (!user) {
            handleUserNotFound(parseInt(id as string), res);
            return;
        }

        await user.update(updatedUser);
        res.status(200).json(user);
    } catch (error) {
        handleServerError(res);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            handleUserNotFound(parseInt(id as string), res);
            return;
        }

        await user.destroy();
        res.status(200).json({ user: user, message: 'Користувач видалений' });
    } catch (error) {
        handleServerError(res);
    }
}