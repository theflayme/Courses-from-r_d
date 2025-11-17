import { Task } from "../models/task.model";

export const filterTaskList = async (createdAt?: string, status?: string, priority?: string) => {
    const tasks = await Task.findAll();
    let filtered = [...tasks];
    
    if (createdAt) {
        filtered = filtered.filter(t => t.createdAt.startsWith(createdAt));
    }

    if (status) {
        filtered = filtered.filter(t => t.status === status);
    }

    if (priority) {
        filtered = filtered.filter(t => t.priority === priority);
    }

    return filtered;
}