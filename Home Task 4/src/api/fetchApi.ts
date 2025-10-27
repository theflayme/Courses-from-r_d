import type { TaskType, TaskStatus, TaskPriority } from '../modules/task.type';

class ItemTaskManager {
    private url = 'http://localhost:3000/tasks'

    async getTask(): Promise<TaskType[]> {
        const response = await fetch(this.url)
        
        if(!response.ok){
            console.log("Помилка при виклику API")
        }
    
        const data: TaskType[] = await response.json();
        return data;
    }

    async getTaskById(id: number): Promise<TaskType> {
        const url = `${this.url}/${id}`
        const response = await fetch(url)
        return response.json();
    }

    async createTask (newTask: TaskType): Promise<TaskType> {
        
        const taskList = await this.getTask();
        const id = taskList.length + 3;
        newTask.id = id.toString();

        const url = `${this.url}`
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newTask)
        })
        return response.json();
    }

    async deleteTask(id:number) {
        const url = `${this.url}/${id}`
        const response = await fetch(url, {
            method: 'DELETE'
        })
        return response.json();
    }

    async getSortedTask(filter:{
        status?: TaskStatus,
        priority?: TaskPriority,
        createdAt?: string
    }): Promise<TaskType[]> {
        const taskList = await this.getTask();
        return taskList.filter(task => {
            return (
                (filter.status ? task.status === filter.status: true) &&
                (filter.priority ? task.priority === filter.priority: true) &&
                (filter.createdAt ? task.createdAt === filter.createdAt: true)
            )
        });
    }

    async deadlineCheck(id: number): Promise<boolean> {
        const task = await this.getTaskById(id);
        if (task) {
            const deadlineTime = new Date(task.deadline);
            const nowTime = new Date();
            return deadlineTime >= nowTime;
        }
        return false;
    }

    async updateTask(id: number, updatedTask: TaskType): Promise<TaskType> {
        const url = `${this.url}/${id}`
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(updatedTask)
        })
        return response.json();
    }
}


export const itemTaskManager = new ItemTaskManager();