import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user.model";
import type {
  TaskFormData,
  TaskStatus,
  TaskPriority,
} from "../types/task.types";

@Table({
  tableName: "tasks",
})
export class Task extends Model<TaskFormData> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
  })
  status!: TaskStatus;

  @Column({
    type: DataType.STRING,
  })
  priority!: TaskPriority;

  @Column({
    type: DataType.DATE,
  })
  deadline!: Date;
}
