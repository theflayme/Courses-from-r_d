import { TaskFilter } from './task.types';
import { Task } from './task.class';

export class TaskService {
    private tasks: Task[] = [];

    getDetailById(id: number) {
        return this.tasks.find(task => task.id === id);
    }

    createTask(task: Task) {
        this.tasks.push(task);
        return true;
    }

    deleteTask(id: number) {
        console.log('Було видалено задачу з id:', id);
        const elementId = this.tasks.findIndex(task => task.id === id);
        
        if (elementId !== -1) {
            return this.tasks.splice(elementId, 1)[0];
        }
    }

    updateTask(id: number, newUpdateTask: Partial<Omit<Task, 'id' | 'createdAt'>>) {
        const elementId = this.tasks.findIndex(task => task.id === id);
        
        if (elementId !== -1) {
            const task = this.tasks[elementId];
            
            Object.assign(task, newUpdateTask);
            task.validate();
            return task;
        }
        
        return null;
    }
    

    filterTask(filter: TaskFilter) {
        return this.tasks.filter((task: Task) =>
            (filter.status ? task.status === filter.status : true) &&
            (filter.priority ? task.priority === filter.priority : true) &&
            (filter.deadline ? task.deadline === filter.deadline : true)
        );
    }

    getDeadlineCheck(id: number): boolean {
        const elementId = this.tasks.findIndex(task => task.id === id);

        if (elementId !== -1) {
            return this.tasks[elementId].deadline > new Date();
        }
        return false;
    }
}