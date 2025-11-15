import type { Task, TaskFormData } from '../tasks/type.schema';

class ItemTaskManager {
    private url = 'http://localhost:3000/tasks'

    async getTasks(): Promise<Task[]> {
        const response = await fetch(this.url)
        if(!response.ok){
            console.error(`Помилка: ${response.status} ${response.statusText}`);
        }

        const data: Task[] = await response.json();
        return data;
    }

    async getTaskById(id: string): Promise<Task> {
        const response = await fetch(`${this.url}/${id}`)

        if(!response.ok){
            console.error(`Помилка: ${response.status} ${response.statusText}`);
        }
        
        const data: Task = await response.json();
        return data;
    }

    async createTask (newTask: TaskFormData) {
        const task = {
            ...newTask,
            createdAt: new Date(),
        };
        
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        })

        if(!response.ok){
            console.error(`Помилка: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }
}

export const itemTaskManager = new ItemTaskManager();