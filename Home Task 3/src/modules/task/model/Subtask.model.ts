import { Task } from '../task.class'
import { TaskStatus, TaskPriority } from '../task.types';
 
export class Subtask extends Task {
    constructor(
        id: number,
        title: string,
        description: string,
        status: TaskStatus,
        priority: TaskPriority,
        createdAt: Date,
        deadline: Date,
        public parentTaskId: number
    ) {
        super(id, title, description, status, priority, createdAt, deadline);
    }

    getTaskInfo(): string {
        return `${this.title} - ${this.parentTaskId} - ${this.status} - ${this.priority}`;
    }
}