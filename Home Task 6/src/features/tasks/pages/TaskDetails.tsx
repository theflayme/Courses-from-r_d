
import TaskDetailsList from '../components/TaskDetailsList';

import { useNavigate, useParams } from 'react-router-dom';
import useAsyncTaskDetails from '../../../shared/hook/useAsyncTaskDetails';

import '../../../styles/TaskDetails.css';

const TaskDetails = () => {
    const { id } = useParams();
    const { task, error } = useAsyncTaskDetails(id);
    const navigate = useNavigate();

    if (!task) {
        return <div className='emptyState'>Задача не знайдена</div>;
    }

    return (
    <>
    {error && <p className='errorTextMessage'>{error.message}</p>}
        <div className='taskDetailsContainer'>
            <TaskDetailsList task={task} />
            <button onClick={() => navigate('/tasks')}>Назад</button>
        </div>
    </>
    );
}

export default TaskDetails;