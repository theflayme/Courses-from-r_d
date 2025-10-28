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
    ) { this.validate() }

    public validate(): string | undefined {
        if (!this.title || !this.description || !this.status || !this.priority || !this.createdAt || !this.deadline) {
            return 'Треба заповнити всі поля';
        }
        if (this.id < 0) {
            return 'ID не може бути від’ємним';
        }
        if (this.createdAt > this.deadline) {
            return 'Дата створення не може бути більшою за дату завершення';
        }
    }

    getTaskInfo(): string {
        return `${this.title} [${this.status}] (${this.priority})`;
    }
}