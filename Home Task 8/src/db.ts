import { Sequelize } from "sequelize-typescript";
import User from "./models/user.model";
import Task from "./models/task.model";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "dev",
  username: "root",
  password: "root",
  models: [User, Task],
});

export default sequelize;
