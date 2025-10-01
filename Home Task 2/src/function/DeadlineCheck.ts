
import { TaskList } from "../index";


export function DeadlineCheck(id: number){
    const task = TaskList?.find((d) => d.id === id)

    const deadline_time = new Date(task?.deadline);
    const now_time = new Date();

    return deadline_time >= now_time;
}