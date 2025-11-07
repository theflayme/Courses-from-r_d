
import '../../../styles/TaskList.css';
import CreateTaskList from "../components/TaskList";
import { useAsyncTaskList } from "../../../shared/hook/useAnyncTask";
const TaskList = () => {
    const { tasks, error } = useAsyncTaskList();

    if (tasks.length === 0) {
        return <div className='emptyState'>Задачі не знайдено</div>;
    }

    return (
        <>
            {error && <p className='errorTextMessage'>{error.message}</p>}
        <div>
            <CreateTaskList tasks={tasks} />
        </div>
        </>
    );
}

export default TaskList;