import { Task, TaskType } from '../dto/Task';
import { taskList } from "../index";

export function updateTaskById(id: number, updateNow: Partial<TaskType>) {

    const task = taskList.find((d) => d.id === id);

    if (task) {
        const updateInfo = { ...task, ...updateNow };
        const taskParc = Task.parse(updateInfo);

        return taskParc;
    }
}