import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import mongoDB from './config/db';

import TaskRoutes from './routes/task.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan('dev'));

app.use('/task', TaskRoutes);

app.use(errorHandler);

mongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Ошибка подключения к MongoDB:', err);
  });
