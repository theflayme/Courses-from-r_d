import { taskList } from '../index'
import { Task, TaskType } from '../dto/Task'

export function createTask(NewTask: TaskType){
    const taskParc = Task.parse(NewTask);
    taskList.push(taskParc);

    return taskParc;
}
