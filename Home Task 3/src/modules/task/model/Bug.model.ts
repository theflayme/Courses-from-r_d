import { Task } from '../task.class';
import { TaskStatus, TaskPriority } from '../task.types';

export class Bug extends Task {
    constructor(
        id: number,
        title: string,
        description: string,
        status: TaskStatus,
        priority: TaskPriority,
        createdAt: Date,
        deadline: Date,
        public severityLevel: 'low' | 'medium' | 'high'
    ) {
        super(id, title, description, status, priority, createdAt, deadline);
    }

    getTaskInfo(): string {
        return `${this.title} - ${this.severityLevel} - ${this.status} - ${this.priority}`;
    }
}
