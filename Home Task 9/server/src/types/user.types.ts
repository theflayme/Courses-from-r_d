import z from "zod";
import type { User } from "../models/user.model";

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export type UserDataType = z.infer<typeof UserSchema>;

export type UserType = User & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
