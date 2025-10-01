import { TaskList } from "../index";

export function FilterTask(filter:{
    status?: string,
    priority?: string,
    createdAt?: string,
}){ return TaskList?.filter(task => {
        const statusSearch = filter.status ? task.status === filter.status: true;
        const prioritySearch = filter.priority ? task.priority === filter.priority: true;
        const createdAtSearch = filter.createdAt ? task.createdAt === filter.createdAt: true;

        return statusSearch && prioritySearch && createdAtSearch;
    })
}