import type { TaskType, TaskStatus, TaskPriority, UpdateTaskType } from '../modules/task.type';

class ItemTaskManager {
    private url = 'http://localhost:3000/tasks'

    async getTasks(): Promise<TaskType[]> {
        const response = await fetch(this.url)
        if(!response.ok){
            throw new Error(`Помилка: ${response.status} ${response.statusText}`);
        }

    
        const data: TaskType[] = await response.json();
        return data;
    }

    async getTaskById(id: string): Promise<TaskType> {
        const url = `${this.url}/${id}`
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Помилка: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async createTask (newTask: UpdateTaskType): Promise<TaskType> {
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
            body: JSON.stringify(task)
        })

        if(!response.ok){
            throw new Error(`Помилка: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async deleteTask(id:string) {
        const url = `${this.url}/${id}`
        const response = await fetch(url, {
            method: 'DELETE'
        })

        if(!response.ok){
            throw new Error(`Помилка: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async getSortedTask(filter:{
        status?: TaskStatus,
        priority?: TaskPriority,
        createdAt?: string
    }): Promise<TaskType[]> {
        const response =  await fetch(this.url);
        const taskList: TaskType[] = await response.json();
        return taskList.filter(task => {
            return (
                (filter.status ? task.status === filter.status: true) &&
                (filter.priority ? task.priority === filter.priority: true) &&
                (filter.createdAt ? new Date(task.createdAt) === new Date(filter.createdAt) : true)
            )
        });
    }

    async deadlineCheck(id: string): Promise<boolean> {
        const task = await this.getTaskById(id);
        if (task) {
            const deadlineTime = new Date(task.deadline);
            const nowTime = new Date();
            return deadlineTime >= nowTime;
        }
        return false;
    }

    async updateTask(id: string, updatedTask: UpdateTaskType): Promise<TaskType> {
        const url = `${this.url}/${id}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })

        if(!response.ok){
            throw new Error(`Помилка: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }
}


export const itemTaskManager = new ItemTaskManager();