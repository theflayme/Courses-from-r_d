import { taskList } from '../index'

export function deletedTask(id: number) {
    const task = taskList.find(t => t.id === id);
    
    if (task) {
        const removed = taskList.splice(taskList.indexOf(task), 1)[0];
        return removed;
    }
}
