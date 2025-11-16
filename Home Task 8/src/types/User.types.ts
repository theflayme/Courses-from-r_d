import type { User } from "../models/User.model";


export type UserDataType = {
    name: string;
    email: string;
};

export type UserType = User & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};