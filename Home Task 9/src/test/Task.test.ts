import request from 'supertest';
import { app } from '../server';
import { setupTestDb, teardownTestDb } from '../utils/test-db';
import { User } from '../models/User.model';
import { Task } from '../models/Task.model';
import { describe, beforeAll, beforeEach, afterAll, it, expect } from '@jest/globals';

beforeAll(async () => {
  await setupTestDb();
});

beforeEach(async () => {
  await Task.destroy({ where: {}, truncate: true, cascade: true });
  await User.destroy({ where: {}, truncate: true, cascade: true });
});

afterAll(async () => {
  await teardownTestDb();
});

describe('Тестування бази даних', () => {
    it('База даних створена', async () => {
      const res = await request(app).get('/users');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  
describe('Тестування API задач', () => {
    let userId: number;
  
    beforeAll(async () => {
      await setupTestDb();
    });
  
    beforeEach(async () => {
      await Task.destroy({ where: {}, truncate: true, cascade: true });
      
      const userRes = await request(app).post('/users').send({ name: 'Test User', email: 'test@test.com' });
      userId = userRes.body.id;
    });
  
    afterAll(async () => {
      await teardownTestDb();
    });
  
    it('GET /tasks -> 200 та порожній масив', async () => {
      const res = await request(app).get('/tasks');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  
    it('POST /tasks (вірні дані) Статус:201', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
        userId: userId
      };
      const res = await request(app).post('/tasks').send(taskData);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: 'Test Task',
          description: 'Test Description',
          status: 'pending',
          userId: userId
        })
      );
    });
  
    it('POST /tasks (невалідні дані - без title) Статус:400', async () => {
      const taskData = {
        description: 'Test Description',
        status: 'pending',
        userId: userId
      };
      const res = await request(app).post('/tasks').send(taskData);
      expect(res.status).toBe(400);
    });
  
    it('POST /tasks (невалідні дані - неіснуючий userId) Статус:400', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
        userId: 999999
      };
      const res = await request(app).post('/tasks').send(taskData);
      expect(res.status).toBe(400);
    });
  
    it('GET /tasks/:id (існує) Статус:200', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
        userId: userId
      };
      const create = await request(app).post('/tasks').send(taskData);
      const taskId = create.body.id;
      
      const res = await request(app).get(`/tasks/${taskId}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(taskId);
      expect(res.body.title).toBe('Test Task');
    });
  
    it('GET /tasks/:id (не існує) Статус:404', async () => {
      const res = await request(app).get('/tasks/999999');
      expect(res.status).toBe(404);
    });
  
    it('PUT /tasks/:id (існує) Статус:200', async () => {
      const taskData = {
        title: 'Original Task',
        description: 'Original Description',
        status: 'pending',
        userId: userId
      };
      const create = await request(app).post('/tasks').send(taskData);
      const taskId = create.body.id;
      
      const updateData = {
        title: 'Updated Task',
        status: 'completed'
      };
      const res = await request(app).put(`/tasks/${taskId}`).send(updateData);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Task');
      expect(res.body.status).toBe('completed');
    });
  
    it('PUT /tasks/:id (не існує) Статус:404', async () => {
      const updateData = {
        title: 'Updated Task',
        status: 'completed'
      };
      const res = await request(app).put('/tasks/999999').send(updateData);
      expect(res.status).toBe(404);
    });
  
    it('DELETE /tasks/:id (існує) Статус:200', async () => {
      const taskData = {
        title: 'Task to Delete',
        description: 'Will be deleted',
        status: 'pending',
        userId: userId
      };
      const create = await request(app).post('/tasks').send(taskData);
      const taskId = create.body.id;
      
      const res = await request(app).delete(`/tasks/${taskId}`);
      expect(res.status).toBe(200);
      
      const getRes = await request(app).get(`/tasks/${taskId}`);
      expect(getRes.status).toBe(404);
    });
  
    it('DELETE /tasks/:id (не існує) Статус:404', async () => {
      const res = await request(app).delete('/tasks/999999');
      expect(res.status).toBe(404);
    });
  
    it('GET /tasks?userId=:id (фільтрація по користувачу) Статус:200', async () => {
      const user2Res = await request(app).post('/users').send({ name: 'User 2', email: 'user2@test.com' });
      const user2Id = user2Res.body.id;
      
      await request(app).post('/tasks').send({
        title: 'Task 1 for User 1',
        description: 'Description 1',
        status: 'pending',
        userId: userId
      });
      
      await request(app).post('/tasks').send({
        title: 'Task 2 for User 1',
        description: 'Description 2',
        status: 'completed',
        userId: userId
      });
      
      await request(app).post('/tasks').send({
        title: 'Task for User 2',
        description: 'Description 3',
        status: 'pending',
        userId: user2Id
      });
      
      const res = await request(app).get(`/tasks?userId=${userId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body.every((task: any) => task.userId === userId)).toBe(true);
    });
  });