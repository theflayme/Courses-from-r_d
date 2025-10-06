import { writeFileSync } from 'fs';
import { TaskList } from '../index'
import { Task, TaskType } from '../dto/Task'

export function CreateTask(NewTask: TaskType){
    const list = Task.parse(NewTask);
    TaskList?.push(list);
    writeFileSync("./task.json", JSON.stringify(TaskList, null, 2), "utf-8");

    return list;
}
