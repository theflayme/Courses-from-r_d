import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { TaskFormData } from "../type.schema";
import "../../../styles/CreateTask.css";
import useAsyncUserList from "../../../shared/hook/useAsyncUserList";

interface CreatedFormProps {
  register: UseFormRegister<TaskFormData>;
  errors: FieldErrors<TaskFormData>;
}

const CreatedForm: React.FC<CreatedFormProps> = ({ register, errors }) => {  
  const { users } = useAsyncUserList();

  return (
    <>
      <div className="formGroupItem">
        <label htmlFor="userId">Користувач</label>
        <select id="userId" {...register("userId")}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.userId && (
          <span id="errorMessage">{errors.userId.message}</span>
        )}
      </div>

      <div className="formGroupItem">
        <label htmlFor="title">Заголовок</label>
        <input id="title" {...register("title")} />
        {errors.title && (
          <span id="errorMessage">{errors.title.message}</span>
        )}
      </div>

      <div className="formGroupItem">
        <label htmlFor="description">Опис (Не обовʼязково)</label>
        <input id="description" {...register("description")} />
      </div>

      <div className="formGroupItem">
        <label htmlFor="status">Статус</label>
        <select id="status" {...register("status")}>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {errors.status && (
          <span id="errorMessage">{errors.status.message}</span>
        )}
      </div>

      <div className="formGroupItem">
        <label htmlFor="priority">Пріоритет</label>
        <select id="priority" {...register("priority")}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <span id="errorMessage">{errors.priority.message}</span>
        )}
      </div>

      <div className="formGroupItem">
        <label htmlFor="deadline">Дата виконання</label>
        <input id="deadline" type="date" {...register("deadline")} />
        {errors.deadline && (
          <span id="errorMessage">{errors.deadline.message}</span>
        )}
      </div>
    </>
  );
};

export default CreatedForm;