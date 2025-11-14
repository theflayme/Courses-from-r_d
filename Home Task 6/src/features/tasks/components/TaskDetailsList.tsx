import type { Task } from '../type.schema';
import dateFormat from '../../../shared/utils/dateFormat';

const TaskDetailsList = ({ task }: { task: Task }) => {
    return (
        <>
            <h2 className='taskDetailsTitle'>{task.title}</h2>
            <p className='taskDetailsInfo'> Опис: {task.description}</p>
            <p className='taskDetailsInfo'>Статус: {task.status}</p>
            <p className='taskDetailsInfo'>Пріоритет: {task.priority}</p>
            <p className='taskDetailsInfo'>Дата створення: {dateFormat(task.createdAt)}</p>
            <p className='taskDetailsInfo'>Дата виконання: {dateFormat(task.deadline)}</p>
        </>
    )
}

export default TaskDetailsList;