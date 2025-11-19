import * as express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import validateRequestBody from "../middlewares/validateRequestBody";
import validateUpdateTask from "../middlewares/validateUpdateTask";
import validateGetTasksQuery from "../middlewares/validateGetTasksQuery";

const app = express.Router();
app.use(express.json());

app.post("/", validateRequestBody, createTask);
app.get("/", validateGetTasksQuery, getTasks);
app.get("/:id", getTaskById);
app.put("/:id", validateUpdateTask, updateTask);
app.delete("/:id", deleteTask);

export default app;
