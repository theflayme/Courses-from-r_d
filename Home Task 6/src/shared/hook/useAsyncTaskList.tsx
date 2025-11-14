import { useEffect, useState } from "react";
import type { Task } from "../../features/tasks/type.schema";
import { itemTaskManager } from "../../features/tasks/api";

const useAsyncTaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        itemTaskManager.getTasks()
            .then(setTasks)
            .catch((error) => setError(error));
    }, []);

    return { tasks, error };
}

export default useAsyncTaskList;