import { TaskList } from '../index'

export function DetailID (id: number){
    return TaskList?.filter((d) => d.id === id);
}
