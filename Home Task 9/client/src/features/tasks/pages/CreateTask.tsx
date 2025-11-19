import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { taskSchema, type TaskFormData } from "../type.schema.ts";

import "../../../styles/CreateTask.css";
import { itemTaskManager } from "../api.ts";
import CreatedForm from "../components/CreatedForm.tsx";

const CreateTask = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      await itemTaskManager.createTask(data);
      navigate("/tasks");
    } catch (error) {
      console.error("Помилка при створенні задачі:", error);
    }
    navigate("/tasks");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formGroup">
          <CreatedForm register={register} errors={errors} /> 
          <button disabled={!isValid || isSubmitting} type="submit">
            Створити задачу
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateTask;
