export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskType = {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: Date;
    deadline: Date;
}

export abstract class Task implements TaskType {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status: TaskStatus,
        public priority: TaskPriority,
        public createdAt: Date,
        public deadline: Date
    ) { this.validate(); }

    validate(){
        if (!this.title || !this.description || !this.status || !this.priority || !this.createdAt || !this.deadline) {
            console.log('Треба заповнити всі поля');
        }
        if (this.id < 0) {
            console.log('ID не може бути відємним');
        }
        if (this.createdAt > this.deadline) {
            console.log('Дата створення не може бути більшою за дату завершення');
        }
    }

    abstract getTaskInfo(): string;
}


export class Subtask extends Task {
    getTaskInfo(): string {
        return `Subtask: ${this.title} - ${this.description} - ${this.status} - ${this.priority} - ${this.createdAt} - ${this.deadline}`;
    }
}

export class Bug extends Task {
    getTaskInfo(): string {
        return `Bug: ${this.title} - ${this.description} - ${this.status} - ${this.priority} - ${this.createdAt} - ${this.deadline}`;
    }
}

export class Story extends Task {
    getTaskInfo(): string {
        return `Story: ${this.title} - ${this.description} - ${this.status} - ${this.priority} - ${this.createdAt} - ${this.deadline}`;
    }
}

export class Epic extends Task {
    getTaskInfo(): string {
        return `Epic: ${this.title} - ${this.description} - ${this.status} - ${this.priority} - ${this.createdAt} - ${this.deadline}`;
    }
}


