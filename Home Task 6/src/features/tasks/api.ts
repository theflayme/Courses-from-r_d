
import type { Task } from "./types";

let tasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    status: "todo",
    priority: "low",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    status: "done",
    priority: "high",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description 4",
    status: "todo",
    priority: "low",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 5,
    title: "Task 5",
    description: "Description 5",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 6,
    title: "Task 6",
    description: "Description 6",
    status: "done",
    priority: "high",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 7,
    title: "Task 7",
    description: "Description 7",
    status: "todo",
    priority: "low",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 8,
    title: "Task 8",
    description: "Description 8",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 9,
    title: "Task 9",
    description: "Description 9",
    status: "done",
    priority: "high",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 10,
    title: "Task 10",
    description: "Description 10",
    status: "todo",
    priority: "low",
    createdAt: new Date(),
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
  }
];

const Api = {
  async getTask(): Promise<Task[]> {
    return tasks;
  },

  async getTaskById(id: number): Promise<Task> {
    const foundTask = tasks.find((x) => x.id === id);
    if (!foundTask){
        throw new Error("Задачі не знайдено");
    }
    return foundTask;
  },

  async createTask(data: Omit<Task, 'id'>): Promise<Task> {
    const createdTask: Task = {
        id: tasks.length + 1, ...data
    };

    tasks.push(createdTask);
    return createdTask;
  },

  async updateTask(id: number, data: Partial<Omit<Task, "id">>): Promise<Task> {
    const foundTask = tasks.findIndex((x) => x.id === id);
    if (foundTask === -1) {
        throw new Error("Задачі не знайдено");
    }

    tasks[foundTask] = { ...tasks[foundTask], ...data };
    return tasks[foundTask];
  }
};

export default Api;