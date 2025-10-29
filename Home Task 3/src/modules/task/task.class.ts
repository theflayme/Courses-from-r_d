import { TaskPriority, TaskStatus, TaskType } from './task.types';

export class Task implements TaskType {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status: TaskStatus,
        public priority: TaskPriority,
        public createdAt: Date,
        public deadline: Date
    ) {  }



    getTaskInfo(): string {
        return `${this.title} [${this.status}] (${this.priority})`;
    }
}