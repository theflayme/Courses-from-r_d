export type TaskType = {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: Date;
    deadline: Date;
}

export type MessageType = {
    status: number;
    message: string;
}

