import { TaskService } from './task.service';
import { TaskStatus, TaskPriority, TaskUpdateType } from './task.types';
import { Task } from './task.class';

export class TaskController {
    constructor(private taskService: TaskService) {}

    getDetailById(id: number) {
        return this.taskService.getDetailById(id);
    }

    createTask(task: Task) {
        return this.taskService.createTask(task);
    }

    deleteTask(id: number) {
        return this.taskService.deleteTask(id);
    }

    updateTask(id: number, newUpdateTask: TaskUpdateType) {
        return this.taskService.updateTask(id, newUpdateTask);
    }

    filterTask(filter: { status?: TaskStatus, priority?: TaskPriority, deadline?: Date }) {
        return this.taskService.filterTask(filter);
    }

    getDeadlineCheck(id: number) {
        return this.taskService.getDeadlineCheck(id);
    }
}