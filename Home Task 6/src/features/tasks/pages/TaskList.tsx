
import '../../../styles/TaskList.css';
import CreateTaskList from "../components/CreatedTaskList";
import { useAsyncTaskList } from "../../../shared/hook/useAnyncTask";
const TaskList = () => {
    const { tasks, error } = useAsyncTaskList();

    if (error) return <div>{error.message}</div>;

    if (tasks.length === 0) {
        return <div className='emptyState'>Задачі не знайдено</div>;
    }
    
    return (
        <div>
            <CreateTaskList tasks={tasks} />
        </div>
    );
}

export default TaskList;