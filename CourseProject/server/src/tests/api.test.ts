import express from 'express';
import request from 'supertest';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import TaskRoutes from '../routes/task.routes';
import { taskService } from '../services/task.service';
import { AppError } from '../utils/appError';
import errorHandler from '../middlewares/errorHandler';

import type { TaskFormData, TaskType } from '../types/task.types';
import type { HydratedDocument } from 'mongoose';

type TaskDocument = HydratedDocument<TaskType>;

const createMockTask = (id = '1', payload?: Partial<TaskFormData>): TaskDocument =>
  ({
    _id: id,
    id,
    title: 'Task title',
    description: 'Description',
    status: 'todo',
    priority: 'low',
    deadline: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...payload,
  } as unknown as TaskDocument);

const validTaskPayload: TaskFormData = {
  title: 'Valid task title',
  description: 'Some description',
  status: 'todo',
  priority: 'low',
  deadline: new Date(Date.now() + 86400000),
};

const app = express();
app.use(express.json());
app.use('/task', TaskRoutes);
app.use(errorHandler);

describe('Task API', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /task', () => {
    it('Повертає 200 та список задач', async () => {
      jest.spyOn(taskService, 'getTasks').mockResolvedValueOnce([
        createMockTask('1'),
      ]);

      const res = await request(app).get('/task');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('id', '1');
    });

    it('Повертає 400, якщо параметри невалідні', async () => {
      const res = await request(app).get('/task').query({ status: 'wrong' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('Повертає 200 та порожній масив, якщо задач немає', async () => {
      jest.spyOn(taskService, 'getTasks').mockResolvedValueOnce([]);

      const res = await request(app).get('/task').query({ id: 'no-id' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('Повертає 400 при помилці сервера', async () => {
      jest
        .spyOn(taskService, 'getTasks')
        .mockRejectedValueOnce(new Error('DB connection failed'));

      const res = await request(app).get('/task');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'DB connection failed');
    });
  });

  describe('POST /task', () => {
    it('201 – задача створена', async () => {
      jest
        .spyOn(taskService, 'createTask')
        .mockResolvedValueOnce(createMockTask('1', validTaskPayload));

      const res = await request(app).post('/task').send(validTaskPayload);

      expect(res.status).toBe(201);
      expect(res.body.id).toBe('1');
    });

    it('400 – невалідний body', async () => {
      const res = await request(app).post('/task').send({ title: '' });
      expect(res.status).toBe(400);
    });

    it('400 – помилка сервера', async () => {
      jest
        .spyOn(taskService, 'createTask')
        .mockRejectedValueOnce(new Error('Save failed'));

      const res = await request(app).post('/task').send(validTaskPayload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Save failed');
    });
  });

  describe('PUT /task/:id', () => {
    const taskId = 'existing-id';

    it('200 – успішне оновлення', async () => {
      jest
        .spyOn(taskService, 'updateTask')
        .mockResolvedValueOnce(createMockTask(taskId, { status: 'in_progress' }));

      const res = await request(app)
        .put(`/task/${taskId}`)
        .send({ status: 'in_progress' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('in_progress');
    });

    it('400 – невалідне тіло запиту', async () => {
      const res = await request(app)
        .put(`/task/${taskId}`)
        .send({ priority: 'ultra' });

      expect(res.status).toBe(400);
    });

    it('400 – задача не знайдена', async () => {
      jest
        .spyOn(taskService, 'updateTask')
        .mockRejectedValueOnce(new AppError('Завдання не знайдено', 400));

      const res = await request(app)
        .put(`/task/${taskId}`)
        .send({ status: 'done' });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        status: 400,
        message: 'Завдання не знайдено',
      });
    });

    it('500 – серверна помилка', async () => {
      jest
        .spyOn(taskService, 'updateTask')
        .mockRejectedValueOnce(new AppError('Помилка сервера', 500));

      const res = await request(app)
        .put(`/task/${taskId}`)
        .send({ status: 'done' });

      expect(res.status).toBe(500);
      expect(res.body.status).toBe(500);
    });
  });

  describe('DELETE /task/:id', () => {
    const taskId = 'existing-id';

    it('200 – успішне видалення', async () => {
      jest.spyOn(taskService, 'deleteTask').mockResolvedValueOnce({
        message: 'Завдання видалено',
        task: createMockTask(taskId),
      });

      const res = await request(app).delete(`/task/${taskId}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Завдання видалено');
    });

    it('400 – задачі не існує', async () => {
      jest
        .spyOn(taskService, 'deleteTask')
        .mockRejectedValueOnce(new AppError('Завдання не знайдено', 400));

      const res = await request(app).delete(`/task/${taskId}`);

      expect(res.status).toBe(400);
    });

    it('400 – серверна помилка', async () => {
      jest
        .spyOn(taskService, 'deleteTask')
        .mockRejectedValueOnce(new Error('Delete failed'));

      const res = await request(app).delete(`/task/${taskId}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Delete failed');
    });
  });
});
