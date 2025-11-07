import { Table, Column, Model, DataType } from 'sequelize-typescript';
import type { UserType } from '../types/User.types';

@Table({
  tableName: 'users',
})
export class User extends Model<UserType> {
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  email!: string;
}
