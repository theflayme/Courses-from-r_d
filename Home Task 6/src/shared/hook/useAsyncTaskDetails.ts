import { useEffect, useState } from "react";
import type { Task } from "../../features/tasks/type.schema";
import { itemTaskManager } from "../../features/tasks/api";

const useAsyncTaskDetails = (id: string | undefined) => {
    const [task, setTask] = useState<Task>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if (!id) {
            setError(new Error("Invalid task ID"));
            return;
        }

        itemTaskManager.getTaskById(id)
            .then((task) => setTask(task))
            .catch((err) => setError(err));
    }, [id]);

    return { task, error };
}

export default useAsyncTaskDetails;