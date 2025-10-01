import { Task, TaskType } from '../dto/Task';
import { TaskList } from "../index";

export function UpdateTask(id: number, updateNow: Partial<TaskType>) {
    const id_index = TaskList?.findIndex((d) => d.id === id);
    if (id_index !== -1) {
        const updateInfo = { ...TaskList[id_index], ...updateNow };
        const TaskParc = Task.parse(updateInfo);
        TaskList[id_index] = TaskParc;
        return TaskParc;
    }
}