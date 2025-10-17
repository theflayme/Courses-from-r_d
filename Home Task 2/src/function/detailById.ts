import { taskList } from '../index'

export function getDetailByID (id: number){
    return taskList.find((d) => d.id === id);
}
