import { Task } from '../task.class'
import { TaskStatus, TaskPriority } from '../task.types';
 
export class Epic extends Task {
    constructor(
        id: number,
        title: string,
        description: string,
        status: TaskStatus,
        priority: TaskPriority,
        createdAt: Date,
        deadline: Date,
        public numberOfStories: number
    ) {
        super(id, title, description, status, priority, createdAt, deadline);
    }

    getTaskInfo(): string {
        return `${this.title} - ${this.numberOfStories} - ${this.status} - ${this.priority}`;
    }
}