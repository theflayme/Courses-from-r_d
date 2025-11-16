import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import taskRoutes from './routes/task.routes';
import { errorHandler } from './utils/errorHandler';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: `http://localhost:${PORT}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/tasks', taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
