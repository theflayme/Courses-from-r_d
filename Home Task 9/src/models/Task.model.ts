import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User.model';
import type { TaskType, TaskStatus, TaskPriority } from '../types/Task.types';

@Table({
  tableName: 'tasks',
})
export class Task extends Model<TaskType> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  status!: TaskStatus;

  @Column(DataType.STRING)
  priority!: TaskPriority;

  @Column(DataType.DATE)
  deadline!: Date;
}
