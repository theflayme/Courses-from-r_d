import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { taskSchema, type Task } from "../types.ts";
import Api from "../api.ts";

import '../../../styles/CreateTask.css';

const CreateTask = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
        resolver: zodResolver(taskSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: Task) => {
        const newTask = await Api.createTask(data);
        console.log(newTask);
        navigate('/tasks');
    };
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formGroup">
                    <div className="formGroupItem">
                        <label htmlFor="title">Заголовок</label>
                        <input id="title" {...register('title', { required: true })} />
                        {errors.title && <span className="errorFormMessage">{errors.title.message}</span>}
                    </div>
                    <div className="formGroupItem">
                        <label htmlFor="description">Опис <span>(Не обовʼязково)</span></label>
                        <input id="description" {...register('description')} />
                    </div>
                    <div className="formGroupItem">
                        <label htmlFor="status">Статус</label>
                        <select id="status" {...register('status', { required: true })}>
                            <option value="todo">Todo</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        {errors.status && <span className="errorFormMessage">{errors.status.message}</span>}
                    </div>
                    <div className="formGroupItem">
                        <label htmlFor="priority">Пріоритет</label>
                        <select id="priority" {...register('priority', { required: true })}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        {errors.priority && <span className="errorFormMessage">{errors.priority.message}</span>}
                    </div>

                    <div className="formGroupItem">
                        <label htmlFor="deadline">Дата виконання</label>
                        <input id="deadline" {...register('deadline', { required: true })} type="date" />
                        {errors.deadline && <span className="errorTextMessage">{errors.deadline.message}</span>}
                    </div>

                        <button disabled={!isValid || isSubmitting} type="submit">Створити задачу</button>
                    </div>
            </form>
        </>
    );
}

export default CreateTask;