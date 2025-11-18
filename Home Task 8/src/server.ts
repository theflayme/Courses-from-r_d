import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './db';

import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import errorHandler from './middlewares/errorHandler';

export const app = express();
const PORT = 3000

app.use(cors({
  origin: `http://localhost:${PORT}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);

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
