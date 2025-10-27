import { Task } from '../task.class'
import { TaskStatus, TaskPriority } from '../task.types';
 
export class Story extends Task {
    constructor(
        id: number,
        title: string,
        description: string,
        status: TaskStatus,
        priority: TaskPriority,
        createdAt: Date,
        deadline: Date,
        public storyPoints: number
    ) {
        super(id, title, description, status, priority, createdAt, deadline);
    }
    getTaskInfo(): string {
        return `Story: ${this.title} - ${this.description} - ${this.status} - ${this.priority} - ${this.createdAt} - ${this.deadline}`;
    }
}