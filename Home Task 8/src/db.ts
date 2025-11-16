// src/db.ts
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/User.model';
import { Task } from './models/Task.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'db_homeTask',
  username: 'postgres',
  password: 'qwerty',
  models: [User, Task],
});

export default sequelize;