
import TaskDetailsList from '../components/TaskDetailsList';

import { useNavigate, useParams } from 'react-router-dom';
import { useAsyncTaskDetails } from '../../../shared/hook/useAnyncTask';

import '../../../styles/TaskDetails.css';

const TaskDetails = () => {
    const { id } = useParams();
    const { task, error } = useAsyncTaskDetails(Number(id));
    const navigate = useNavigate();

    if (error) return <div>{error.message}</div>;

    if (!task) {
        return <div className='emptyState'>Задача не знайдена</div>;
    }

    return (
    <>
        <div className='taskDetailsContainer'>
            <TaskDetailsList task={task} />
            <button onClick={() => navigate('/tasks')}>Назад</button>
        </div>
    </>
    );
}

export default TaskDetails;