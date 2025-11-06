import express, { type NextFunction, type Request, type Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import taskRoutes from './routes/task.routes';
import { errorHandler } from './pages/task.pages.errorHandler';

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
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, res, next);
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
