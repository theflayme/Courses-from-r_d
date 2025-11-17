import type { TaskType } from '@/types/task.type';
import API_URL from '@/configApi.ts';

export async function getTasks() {
  const res = await fetch(`${API_URL.url(API_URL.endpoints.tasks.base)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    console.error('Помилка від сервера');
    return;
  }

  return await res.json();
}

export async function getTaskById(id: string) {
  const res = await fetch(`${API_URL.url(API_URL.endpoints.tasks.byId(id))}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    console.error('Помилка від сервера');
    return;
  }

  return await res.json();
}

export async function createTask(data: TaskType) {
  const res = await fetch(`${API_URL.url(API_URL.endpoints.tasks.base)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error('Помилка від сервера');
    return;
  }

  return await res.json();
}

export async function updateTask(id: string, data: TaskType) {
  const res = await fetch(`${API_URL.url(API_URL.endpoints.tasks.byId(id))}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error('Помилка від сервера');
    return;
  }

  return await res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`${API_URL.url(API_URL.endpoints.tasks.byId(id))}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    console.error('Помилка від сервера');
    return;
  }

  return await res.json();
}
