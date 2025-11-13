import { itemTaskManager } from '../api/task.api';
import { useState, useEffect } from "react";
import { type Task } from "../modules/type.modules";

import '../styles/TaskList.css';

const MyTask = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        itemTaskManager.getTasks().then(setTasks);
    }, []);
    
    return (
        <div>
            <ul className="taskList">
            {tasks.map((task) => (
                <li key={task.id} className="taskItem">
                    <h3>{task.title}</h3>
                    { task.description &&<p>{task.description}</p> }
                    <span className={ task.status === "todo" ? "todoStatus" : task.status === "in_progress" ? "inProgressStatus" : "doneStatus"}>
                        {task.status}
                    </span>
                    <span>
                        {new Date(task.createdAt).toDateString()} - {task.deadline && new Date(task.deadline).toDateString()}
                    </span>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default MyTask;