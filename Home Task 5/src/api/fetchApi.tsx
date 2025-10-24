import type { Task } from "../utils/ValidationSchema";

class FetchApi {
    private url = 'http://localhost:3000/tasks';

    async getTask(): Promise<Task[]> {
        const response = await fetch(this.url);
        return response.json();
    }

    async createTask (newTask: Task): Promise<Task> {
        
        const taskList = await this.getTask();
        const id = taskList.length + 1;
        newTask.id = id.toString();

        const url = `${this.url}`
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newTask)
        })
        return response.json();
    }
}

export default new FetchApi();