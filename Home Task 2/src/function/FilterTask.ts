import { taskList } from "../index";

export function filterTask(filter:{
    status?: string,
    priority?: string,
    createdAt?: string,
}){ return taskList.filter(task => {
        return (
            (filter.status ? task.status === filter.status: true) &&
            (filter.priority ? task.priority === filter.priority: true) &&
            (filter.createdAt ? task.createdAt === filter.createdAt: true)
        )
    });
}
