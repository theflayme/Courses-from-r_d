
import TaskDetailsList from '../components/TaskDetailsList';

import { useNavigate, useParams } from 'react-router-dom';
import useAsyncTaskDetails from '../../../shared/hook/useAsyncTaskDetails';

import '../../../styles/TaskDetails.css';
import useAsyncUserDetails from '../../../shared/hook/useAsyncUserDetails';

const TaskDetails = () => {
    const { id } = useParams();
    const { task, error: taskError } = useAsyncTaskDetails(id);
    const { user, error: userError } = useAsyncUserDetails(task?.userId);
    const navigate = useNavigate();

    if (!task) {
        return <div className='emptyState'>Задача не знайдена</div>;
    }

    if (userError) {
        return <div className='emptyState'>{userError.message}</div>;
    }

    if ( user?.name === undefined) {
        return <div className='emptyState'>Інформація про користувача недоступна</div>;
    }

    return (
    <>
    {taskError && <p className='errorTextMessage'>{taskError.message}</p>}
        <div className='taskDetailsContainer'>
            <TaskDetailsList task={task} user={user.name} />
            <button onClick={() => navigate('/tasks')}>Назад</button>
        </div>
    </>
    );
}

export default TaskDetails;