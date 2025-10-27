
import { taskList } from "../index";

export function сheckDeadline (id: number){
    const task = taskList.find((d) => d.id === id)!;

    const deadlineTime = new Date(task.deadline);
    const nowTime = new Date();

    return deadlineTime >= nowTime;
}