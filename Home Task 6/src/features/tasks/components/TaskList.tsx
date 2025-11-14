import { useNavigate } from 'react-router-dom';
import type { Task } from '../type.schema';
import dateFormat from '../../../shared/utils/dateFormat';

const CreatedTaskList = ({ tasks }: { tasks: Task[] }) => {
    const navigate = useNavigate();

    return (
        <>
            <ul className="taskList">
                {tasks.map((task) => (
                    <li key={task.id} className="taskItem" onClick={() => navigate(`/tasks/${task.id}`)}>
                        <h3>{task.title}</h3>
                        { task.description &&<p>{task.description}</p> }
                        <span className={task.status === "todo" ? "todoStatus" : task.status === "in_progress" ? "inProgressStatus" : "doneStatus"}>
                            {task.status}
                        </span>
                        <span>
                            {dateFormat(task.createdAt)} - {dateFormat(task.deadline)}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CreatedTaskList;