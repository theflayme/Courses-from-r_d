import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from '../controllers/task.controlles';
import validateGetTasksQuery from '../middlewares/validateGetTasksQuery';
import validateUpdateTask from '../middlewares/validateUpdateTask';
import validateRequestBody from '../middlewares/validateRequestBody';

const app = express.Router();
app.use(express.json());

app.get('/', validateGetTasksQuery, getTasks);
app.get('/:id', getTaskById);
app.post('/', validateRequestBody, createTask);
app.put('/:id', validateUpdateTask, updateTask);
app.delete('/:id', deleteTask);

export default app;
