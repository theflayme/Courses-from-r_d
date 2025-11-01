import { taskService } from "../services/task.service";

export const filterTaskList = (createdAt?: string, status?: string, priority?: string) => {
    let filtered = [...taskService];

    if (createdAt) {
        filtered = filtered.filter(t => t.createdAt.toISOString().startsWith(createdAt));
    }

    if (status) {
        filtered = filtered.filter(t => t.status === status);
    }

    if (priority) {
        filtered = filtered.filter(t => t.priority === priority);
    }

    return filtered;
}