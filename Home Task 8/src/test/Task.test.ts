import request from 'supertest';
import { app } from '../server';
import sequelize from '../db';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await Task.destroy({ where: {}, truncate: true, restartIdentity: true });
  await User.destroy({ where: {}, truncate: true, restartIdentity: true });
});

afterAll(async () => {
  await sequelize.close();
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

  beforeEach(async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@test.com' });

    userId = res.body.id;
  });

  it('GET /tasks -> 200 та порожній масив', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /tasks (валідні дані) -> 201', async () => {
    const res = await request(app).post('/tasks').send({
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo',
      priority: 'medium',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      userId: userId,
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
        userId: userId,
      })
    );
  });

  it('POST /tasks (без title) -> 400', async () => {
    const res = await request(app).post('/tasks').send({
      description: 'Desc',
      status: 'todo',
      priority: 'medium',
      deadline: new Date(),
      userId: userId,
    });

    expect(res.status).toBe(400);
  });

  it('POST /tasks (неіснуючий userId) -> 400', async () => {
    const res = await request(app).post('/tasks').send({
      title: 'Task',
      description: 'Desc',
      status: 'todo',
      priority: 'medium',
      deadline: new Date(),
      userId: 999999,
    });

    expect(res.status).toBe(400);
  });

  it('GET /tasks/:id (існує) -> 200', async () => {
    const create = await request(app).post('/tasks').send({
      title: 'Task 1',
      description: 'Desc',
      status: 'todo',
      priority: 'low',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      userId: userId,
    });

    const res = await request(app).get(`/tasks/${create.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(create.body.id);
  });

  it('GET /tasks/:id (не існує) -> 404', async () => {
    const res = await request(app).get('/tasks/999999');
    expect(res.status).toBe(404);
  });

  it('PUT /tasks/:id (існує) -> 200', async () => {
    const create = await request(app).post('/tasks').send({
      title: 'Old Title',
      description: 'Old',
      status: 'todo',
      priority: 'medium',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      userId: userId,
    });

    const res = await request(app)
      .put(`/tasks/${create.body.id}`)
      .send({
        title: 'New Title',
        description: 'New Desc',
        status: 'done',
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New Title');
    expect(res.body.status).toBe('done');
  });

  it('PUT /tasks/:id (не існує) -> 404', async () => {
    const res = await request(app).put('/tasks/999999').send({
      status: 'done',
    });

    expect(res.status).toBe(404);
  });

  it('DELETE /tasks/:id (існує) -> 200', async () => {
    const create = await request(app).post('/tasks').send({
      title: 'Delete me',
      description: 'Bye',
      status: 'todo',
      priority: 'medium',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      userId: userId,
    });

    const res = await request(app).delete(`/tasks/${create.body.id}`);
    expect(res.status).toBe(200);

    const check = await request(app).get(`/tasks/${create.body.id}`);
    expect(check.status).toBe(404);
  });

  it('DELETE /tasks/:id (не існує) -> 404', async () => {
    const res = await request(app).delete('/tasks/999999');
    expect(res.status).toBe(404);
  });

  it('GET /tasks?status -> повертає задачі конкретного користувача', async () => {
    const user2 = await request(app)
      .post('/users')
      .send({ name: 'User 2', email: 'user2@test.com' });

    await request(app).post('/tasks').send({
      title: 'Task 1',
      description: 'Desc 1',
      status: 'todo',
      priority: 'low',
      deadline: new Date(),
      userId: userId,
    });

    await request(app).post('/tasks').send({
      title: 'Task 2',
      description: 'Desc 2',
      status: 'done',
      priority: 'medium',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      userId: userId,
    });

    await request(app).post('/tasks').send({
      title: 'Task U2',
      description: 'Desc 3',
      status: 'todo',
      priority: 'low',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      userId: user2.body.id,
    });

    const res = await request(app).get(`/tasks?status=done`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body.every((t: { status: string; }) => t.status === 'done')).toBe(true);
  });
});
