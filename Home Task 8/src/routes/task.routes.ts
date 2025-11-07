import * as express from 'express';
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/Task.controller';

const app = express.Router();
app.use(express.json());

app.post("/", createTask);
app.get("/", getTasks);
app.get("/:id", getTaskById);
app.put("/:id", updateTask);
app.delete("/:id", deleteTask);

export default app;