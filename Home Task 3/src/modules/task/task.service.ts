import { Task, Subtask, Bug, Story, Epic, TaskStatus, TaskPriority } from './task.types';

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
        const indexId = this.getDetailById(id);
        
        if (indexId){
            const idx = this.tasks.indexOf(indexId);
            return this.tasks.splice(idx, 1)[0]
        }
    }

    updateTask(id: number, newUpdateTask: Partial<Task>){
        const indexId = this.getDetailById(id);

        if (indexId){
            const updatedTask = {...indexId, ...newUpdateTask};
            return this.tasks[this.tasks.indexOf(indexId)] = updatedTask as Task;
        }
    }

    filterTask(filter: { status?: TaskStatus, priority?: TaskPriority, deadline?: Date }){
        return this.tasks.filter((task: Task) =>
            (filter.status ? task.status === filter.status: true) &&
            (filter.priority ? task.priority === filter.priority: true) &&
            (filter.deadline ? task.deadline === filter.deadline: true)
        );
    }

    getDeadlineCheck(id: number): boolean {
        const indexId = this.getDetailById(id);
        if (indexId){
            return indexId.deadline > new Date();
        }
        return false;
    }
}