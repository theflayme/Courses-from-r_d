import express from 'express';
import {
    createTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateTask,
} from '../controllers/task.controller';
import validateRequestBody from '../middleware/validateRequestBody';
import validateGetTasksQuery from '../middleware/validateGetTasksQuery';
import validateUpdateTask from '../middleware/validateUpdateTask';

const app = express.Router();
app.use(express.json());

app.get("/", validateGetTasksQuery ,getTasks);
app.get("/:id", validateGetTasksQuery, getTaskById);
app.post("/" , validateRequestBody, createTask);
app.put("/:id", validateUpdateTask, updateTask);
app.delete("/:id", validateGetTasksQuery, deleteTask);

export default app;