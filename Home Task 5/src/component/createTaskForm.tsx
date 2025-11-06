import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type Task } from "../modules/type.modules";
import { itemTaskManager } from "../api/task.api";
import { useNavigate } from "react-router-dom";

const CreateTaskForm = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
        resolver: zodResolver(taskSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: Task) => {
        const newTask = await itemTaskManager.createTask(data);
        console.log(newTask);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formGroup">
                        <div className="formGroupItem">
                            <label>Заголовок</label>
                            <input {...register('title', { required: true })} />
                            {errors.title && <span className="errorTextMessage">{errors.title.message}</span>}
                        </div>
                        <div className="formGroupItem">
                            <label>Опис <desc>(Не обовʼязково)</desc></label>
                            <input {...register('description')} />
                        </div>
                        <div className="formGroupItem">
                            <label>Статус</label>
                            <select {...register('status', { required: true })}>
                                <option value="todo">Todo</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            {errors.status && <span className="errorTextMessage">{errors.status.message}</span>}
                        </div>
                        <div className="formGroupItem">
                            <label>Пріоритет</label>
                            <select {...register('priority', { required: true })}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.priority && <span className="errorTextMessage">{errors.priority.message}</span>}
                        </div>
                        <div className="formGroupItem">
                            <label>Дата виконання</label>
                            <input {...register('deadline', { required: true })} type="date" />
                            {errors.deadline && <span className="errorTextMessage">{errors.deadline.message}</span>}
                        </div>
            
                        <button disabled={!isValid || isSubmitting} type="submit" onClick={() => navigate('/TaskList')}><span>Створити задачу</span></button>
                    </div>
            </form>
    );
}

export default CreateTaskForm;