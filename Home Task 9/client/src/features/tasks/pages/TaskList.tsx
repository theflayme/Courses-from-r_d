
import '../../../styles/TaskList.css';
import CreateTaskList from "../components/TaskList";
import useAsyncTaskList from "../../../shared/hook/useAsyncTaskList";

const TaskList = () => {
    const { tasks, error: taskError } = useAsyncTaskList();

    if (taskError) {
        return <div className='errorTextMessage'>Помилка завантаження задач</div>;
    }

    if (!tasks || tasks.length === 0) {
        return <div className='emptyState'>Список задач порожній</div>;
    }

    return (
        <div>
            <CreateTaskList tasks={tasks} />
        </div>
    );
}

export default TaskList;
    