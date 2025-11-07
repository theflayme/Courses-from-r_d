// src/server.ts
import express, { type NextFunction, type Request, type Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './db';

import { errorHandler } from './pages/task.pages.errorHandler';
import userRoutes from './routes/User.routes';
import taskRoutes from './routes/Task.routes';

export const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors({
  origin: `http://localhost:${PORT}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, res, next);
});

if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate()
    .then(() => console.log('Підключено до бази даних'))
    .then(() => sequelize.sync())
    .then(() => console.log('База даних і таблиці створені!'))
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Сервер запущено на http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Помилка ініціалізації БД/сервера:', err);
    });
}