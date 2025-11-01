import type { TaskType } from "../types/task.types";
import { taskService } from "./task.service";

const validateTask = (task: TaskType) => {
    
    if (!task.title || !task.description || !task.status || !task.priority || !task.createdAt || !task.deadline) {
        return 'Треба заповнити всі поля';
    }
}

export { validateTask };