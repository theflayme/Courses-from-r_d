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

    async createTask (newTask: Task): Promise<Task> {
        
        const taskList = await this.getTasks();
        const id = taskList.length + 1;
        newTask.id = id.toString();
        newTask.createdAt = new Date();

        const url = `${this.url}`
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newTask)
        })

        if(!response.ok){
            throw new Error(`Помилка: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }
}


export const itemTaskManager = new ItemTaskManager();