import { TaskPriority, TaskStatus, TaskType } from './task.types';
import { validateTask } from '../../utils';

export class Task implements TaskType {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status: TaskStatus,
        public priority: TaskPriority,
        public createdAt: Date,
        public deadline: Date
    ){ validateTask(this) }

    getTaskInfo(): string {
        return `${this.title} [${this.status}] (${this.priority})`;
    }

    update(newTask: Partial<Task>) {
        Object.assign(this, newTask);
    }
}