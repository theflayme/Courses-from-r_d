import type { Task } from '../modules/type.modules';

class ItemTaskManager {
    private url = 'http://localhost:3000/tasks'

    async getTasks(): Promise<Task[]> {
        const response = await fetch(this.url)
        if(!response.ok){
            throw new Error(`Помилка: ${response.status} ${response.statusText}`);
        }

        const data: Task[] = await response.json();
        return data;
    }

    async createTask (newTask: Task) {
        const url = `${this.url}`
        
        const task = {
            ...newTask,
            createdAt: new Date()
        };
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        })

        if(!response.ok){
            throw new Error(`Помилка: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }
}

export const itemTaskManager = new ItemTaskManager();