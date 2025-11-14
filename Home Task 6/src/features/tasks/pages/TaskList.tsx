
import '../../../styles/TaskList.css';
import CreateTaskList from "../components/TaskList";
import useAsyncTaskList from "../../../shared/hook/useAsyncTaskList";
const TaskList = () => {
    const { tasks, error } = useAsyncTaskList();

    if (error) {
        return <div className='errorMessage'>{error.message}</div>;
    }

    if (tasks.length === 0) {
        return <div className='emptyState'>Задачі не знайдено</div>;
    }

    return (
        <>
            <div>
                <CreateTaskList tasks={tasks} />
            </div>
        </>
    );
}

export default TaskList;