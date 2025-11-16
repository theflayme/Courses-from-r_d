import express, { type NextFunction, type Request, type Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './db';

import { errorHandler } from './pages/task.pages.errorHandler';
import userRoutes from './routes/User.routes';
import taskRoutes from './routes/Task.routes';

export const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return errorHandler(err, res);
});

app.listen(4000, () => {
  console.log('Сервер запущено на порту 4000');
  
sequelize.authenticate()
  .then(() => console.log('Підключено до бази даних'))
  .then(() => sequelize.sync())
  .catch((err) => console.error('Помилка підключення до бази даних:', err));
});
