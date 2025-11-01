import { useEffect, useState } from "react";
import type { Task } from "../../features/tasks/types";
import Api from "../../features/tasks/api";

export const useAsyncTaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        Api.getTask()
            .then(setTasks)
            .catch((err) => setError(err));
    }, []);

    return { tasks, error };
}

export const useAsyncTaskDetails = (id: number) => {
    const [task, setTask] = useState<Task>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if(id) {
            Api.getTaskById(id)
            .then((task) => setTask(task))
            .catch((err) => setError(err));
        }
    }, [id]);

    return { task, error };
}
