import { User } from "../models/user.model";
import type { UserDataType } from "../types/user.types";
import { AppError } from "../utils/appError";

export const userService = {
  async getUsers() {
    return User.findAll();
  },

  async getUserById(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError(`Користувача з id ${id} не знайдено`, 404);
    }
    return user;
  },

  async createUser(data: Pick<UserDataType, "name" | "email">) {
    return User.create(data);
  },

  async updateUser(id: string, body: Partial<UserDataType>) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError(`Користувача з id ${id} не знайдено`, 404);
    }

    await user.update(body);
    return user;
  },

  async deleteUser(id: string) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(`Користувача з id ${id} не знайдено`, 404);
    }

    await user.destroy();
    return { message: "Користувача видалено", user };
  },
};
