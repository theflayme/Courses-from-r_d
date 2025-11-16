import { Table, Column, Model, DataType } from 'sequelize-typescript';
import type { UserDataType } from '../types/User.types';

@Table({
  tableName: 'users',
})

export class User extends Model<UserDataType> {
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  email!: string;
}
