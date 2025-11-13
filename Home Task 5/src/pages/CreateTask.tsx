import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskFormData } from "../modules/type.schema";
import { itemTaskManager } from "../api/task.api";
import { useNavigate } from "react-router-dom";
import '../styles/CreateTask.css';

const CreateTask = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
        resolver: zodResolver(taskSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: TaskFormData) => {
        const newTask = await itemTaskManager.createTask(data);
        console.log(newTask);
        navigate('/task-list');
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formGroup">
                        <div className="formGroupItem">
                            <label>Заголовок</label>
                            <input {...register('title')} />
                            {errors.title && <span className="errorTextMessage">{errors.title.message}</span>}
                        </div>
                        <div className="formGroupItem">
                            <label>Опис <desc>(Не обовʼязково)</desc></label>
                            <input {...register('description')} />
                        </div>
                        <div className="formGroupItem">
                            <label>Статус</label>
                            <select {...register('status')}>
                                <option value="todo">Todo</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            {errors.status && <span className="errorTextMessage">{errors.status.message}</span>}
                        </div>
                        <div className="formGroupItem">
                            <label>Пріоритет</label>
                            <select {...register('priority')}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.priority && <span className="errorTextMessage">{errors.priority.message}</span>}
                        </div>
                        <div className="formGroupItem">
                            <label>Дедлайн:</label>
                            <input {...register('deadline')} type="date" />
                            {errors.deadline && <span className="errorTextMessage">{errors.deadline.message}</span>}
                        </div>
            
                        <button disabled={!isValid || isSubmitting} type="submit" onClick={() => navigate('/task-list')}><span>Створити задачу</span></button>
                    </div>
            </form>
    );
}

export default CreateTask;