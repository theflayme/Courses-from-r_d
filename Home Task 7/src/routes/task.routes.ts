import * as express from 'express';
import {
    createTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateTask,
} from '../controllers/task.controller';

const app = express.Router();
app.use(express.json());

app.get("/", getTasks);
app.get("/:id", getTaskById);
app.post("/", createTask);
app.put("/:id", updateTask);
app.delete("/:id", deleteTask);


export default app;