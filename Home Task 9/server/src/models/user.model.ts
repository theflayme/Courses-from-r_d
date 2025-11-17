import { Table, Column, Model, DataType } from 'sequelize-typescript';
import type { UserDataType } from '../types/user.types';

@Table({
  tableName: 'users',
})
export class User extends Model<UserDataType> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;
}
