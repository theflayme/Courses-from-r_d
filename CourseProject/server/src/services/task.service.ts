import { id } from "zod/locales";
import { Task, taskValidationSchema } from "../models/task.model";
import TaskQuery from "../types/TaskQuery";

export const getTasksService = async (query: Record<string, string | undefined>) => {
    const { id, status, priority, createdAt } = query;
    
    if (id) {
        const task = await Task.findById(id);
        return task ? [task] : [];
    }
    
    const filter: TaskQuery = {};
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (createdAt) {
        const date = new Date(createdAt);
        if (!date.getTime()) filter.createdAt = date;
    }
    
    return await Task.find(filter);
};

export const createTaskService = async (data: unknown) => {
    const validated = taskValidationSchema.parse(data);
    const newTask = new Task(validated);
    return newTask.save();
};

export const updateTaskService = async (id: string, data: unknown) => {
    const validated = taskValidationSchema.partial().parse(data);
    return Task.findByIdAndUpdate(id, validated, { new: true });
};

export const deleteTaskService = async (id: string) => {
    return Task.findByIdAndDelete(id);
};
