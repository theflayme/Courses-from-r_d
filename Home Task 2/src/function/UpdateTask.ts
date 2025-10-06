import { Task, TaskType } from '../dto/Task';
import { TaskList } from "../index";
import { writeFileSync } from 'fs';

export function UpdateTask(id: number, updateNow: Partial<TaskType>) {
    const id_index = TaskList?.findIndex((d) => d.id === id);
    if (id_index !== -1) {
        const updateInfo = { ...TaskList[id_index], ...updateNow };
        const TaskParc = Task.parse(updateInfo);
        TaskList[id_index] = TaskParc;
        
        writeFileSync("./task.json", JSON.stringify(TaskList, null, 2), "utf-8");
        return TaskParc;
    }
}