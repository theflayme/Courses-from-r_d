import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controlles"

const app = express.Router();
app.use(express.json());

app.get('/', getTasks);
app.post('/', createTask);
app.put('/:id', updateTask);
app.delete('/:id', deleteTask)

export default app;