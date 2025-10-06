import { TaskList } from '../index'
import { writeFileSync } from 'fs';

export function DeleteTask(id: number) {
    const id_index = TaskList?.findIndex(t => t.id === id);
    
    if (id_index !== -1) {
        const removed = TaskList?.splice(id_index, 1)[0];
        
        console.log("Видалено з списку задачу з ID: " + id)
        writeFileSync("./task.json", JSON.stringify(TaskList, null, 2), "utf-8");
        return TaskList;
    }
}
