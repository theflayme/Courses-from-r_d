import type { Task } from '../types';
import dateFormat from '../../../shared/utils/dateFormat';

const TaskDetailsList = ({ task }: { task: Task }) => {
    return (
        <>
            <h2 className='taskDetailsTitle'>{task.title}</h2>
            <p className='taskDetailsDescription'> Опис: {task.description}</p>
            <p className='taskDetailsStatus'>Статус: {task.status}</p>
            <p className='taskDetailsPriority'>Пріоритет: {task.priority}</p>
            <p className='taskDetailsCreatedAt'>Дата створення: {dateFormat(task.createdAt)}</p>
            <p className='taskDetailsDeadline'>Дата виконання: {dateFormat(task.deadline)}</p>
        </>
    )
}

export default TaskDetailsList;