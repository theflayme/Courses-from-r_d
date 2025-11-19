import express from 'express';
import request from 'supertest';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import TaskRoutes from '../routes/task.routes';
import taskService from '../services/task.service';

const app = express();
app.use(express.json());
app.use('/task', TaskRoutes);

const days = 24 * 60 * 60 * 1000;

const validTaskPayload = {
  title: 'Valid task title',
  description: 'Some description',
  status: 'todo',
  priority: 'low',
  deadline: new Date(Date.now() + days).toISOString(),
};

describe('Task API', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /task', () => {
    it('Повертає 200 та список задач', async () => {
      const tasksMock = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Desc 1',
          status: 'todo',
          priority: 'low',
          deadline: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      jest
        .spyOn(taskService, 'getTasks')
        .mockResolvedValueOnce(tasksMock);

      const res = await request(app).get('/task');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(tasksMock);
    });

    it('Повертає 400, параметри запиту невалідні', async () => {
      const res = await request(app)
        .get('/task')
        .query({ status: 'invalid-status' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('Повертає 404, задачі з вказаним id не існує', async () => {
      jest.spyOn(TaskService, 'getTasksService').mockResolvedValueOnce([]);

      const res = await request(app)
        .get('/task')
        .query({ id: 'non-existing-id' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Задача не знайдена');
    });

    it('Повертає 500, внутрішня помилка сервера', async () => {
      jest
        .spyOn(TaskService, 'getTasksService')
        .mockRejectedValueOnce(new Error('Test internal error'));

      const res = await request(app).get('/task');

      expect(res.status).toBe(500);
    });
  });

  describe('POST /task', () => {
    it('Повертає 201, успішне створення задачі', async () => {
      const createdTask = {
        id: '1',
        ...validTaskPayload,
        deadline: new Date(validTaskPayload.deadline).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest
        .spyOn(TaskService, 'createTaskService')
        .mockResolvedValueOnce(createdTask );

      const res = await request(app).post('/task').send(validTaskPayload);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(createdTask);
    });

    it('Повертає 400, тіло запиту невалідне', async () => {
      const invalidPayload = {
        ...validTaskPayload,
        title: '123',
      };

      const res = await request(app).post('/task').send(invalidPayload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Помилка валідації');
    });

    it('Повертає 500, внутрішня помилка сервера', async () => {
      jest
        .spyOn(TaskService, 'createTaskService')
        .mockRejectedValueOnce(new Error('Create error'));

      const res = await request(app).post('/task').send(validTaskPayload);

      expect(res.status).toBe(500);
    });
  });

  describe('PUT /task/:id', () => {
    const taskId = 'existing-id';

    it('Повертає 200, успішне оновлення задачі', async () => {
      const updatePayload = {
        status: 'in_progress',
      };

      const updatedTask = {
        id: taskId,
        ...validTaskPayload,
        ...updatePayload,
        deadline: new Date(validTaskPayload.deadline).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest
        .spyOn(TaskService, 'updateTaskService')
        .mockResolvedValueOnce(updatedTask);

      const res = await request(app).put(`/task/${taskId}`).send(updatePayload);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedTask);
    });

    it('Повертає 400, тіло запиту невалідне', async () => {
      const invalidUpdate = {
        status: 'invalid-status',
      };

      const res = await request(app).put(`/task/${taskId}`).send(invalidUpdate);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Помилка валідації');
    });

    it('Повертає 404, задачі з вказаним id не існує', async () => {
      jest.spyOn(TaskService, 'updateTaskService').mockResolvedValueOnce(null);

      const res = await request(app)
        .put(`/task/${taskId}`)
        .send({ status: 'done' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty(
        'message',
        `Задача з ID:${taskId}, відсутня`,
      );
    });

    it('Повертає 500, внутрішня помилка сервера', async () => {
      jest
        .spyOn(TaskService, 'updateTaskService')
        .mockRejectedValueOnce(new Error('Update error'));

      const res = await request(app)
        .put(`/task/${taskId}`)
        .send({ status: 'done' });

      expect(res.status).toBe(500);
    });
  });

  describe('DELETE /task/:id', () => {
    const taskId = 'existing-id';

    it('Повертає 200, успішне видалення задачі', async () => {
      const deletedTask = {
        id: taskId,
        ...validTaskPayload,
        deadline: new Date(validTaskPayload.deadline).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest
        .spyOn(TaskService, 'deleteTaskService')
        .mockResolvedValueOnce(deletedTask as any);

      const res = await request(app).delete(`/task/${taskId}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Задача видалена');
      expect(res.body).toHaveProperty('task');
    });

    it('Повертає 404, задачі з вказаним id не існує', async () => {
      jest.spyOn(TaskService, 'deleteTaskService').mockResolvedValueOnce(null);

      const res = await request(app).delete(`/task/${taskId}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty(
        'message',
        `Задача з ID:${taskId}, відсутня`,
      );
    });

    it('Повертає 500, внутрішня помилка сервера', async () => {
      jest
        .spyOn(TaskService, 'deleteTaskService')
        .mockRejectedValueOnce(new Error('Delete error'));

      const res = await request(app).delete(`/task/${taskId}`);

      expect(res.status).toBe(500);
    });
  });
});
