import { useEffect, useState } from "react";
import type { Task } from "../../features/tasks/type.schema";
import { itemTaskManager } from "../../features/tasks/api";

const useAsyncTaskDetails = (id: number) => {
    const [task, setTask] = useState<Task>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if(id) {
            itemTaskManager.getTaskById(id)
            .then((task) => setTask(task))
            .catch((err) => setError(err));
        }
    }, [id]);

    return { task, error };
}

export default useAsyncTaskDetails;