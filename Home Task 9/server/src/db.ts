import { Sequelize } from "sequelize-typescript";
import User from "./models/user.model";
import Task from "./models/task.model";
import config from "./configs/config.json";

type Env = keyof typeof config;

const env: Env = (process.env.NODE_ENV as Env) || "development";
const dbConfig = config[env];

console.log("DB CONFIG USED:", dbConfig);

const sequelize = new Sequelize({
  dialect: dbConfig.dialect as any,
  host: dbConfig.host,
  port: 5432,
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  models: [User, Task],
  logging: false,
});

export default sequelize;
