import type { User } from "../models/User.model";


export type UserType = {
    name: string;
    email: string;
};

export type UpdateUserType = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;