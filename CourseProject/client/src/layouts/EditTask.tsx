import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { taskSchema, type TaskResponseType, type TaskType } from "@/types/task.type";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateTask } from "@/controllers/task.controller";

type EditTaskProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskUpdated?: () => void;
  taskId: string;
};

const EditTask = ({ open, onOpenChange, onTaskUpdated, taskId }: EditTaskProps) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [taskDetails, setTaskDetails] = useState<TaskResponseType>();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, control, reset } = useForm<TaskType>({
      resolver: zodResolver(taskSchema),
      mode: "onTouched",
    });

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const data = await updateTask(taskId, {} as TaskType); 
                setTaskDetails(data);

                reset({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    priority: data.priority,
                    deadline: new Date(data.deadline),
                });

            } catch (error) {
                console.error("Помилка:", error);
            }
        };

        if(taskId) {
            fetchTaskDetails();
        }
    }, [taskId, reset]);

    const onSubmit = async (data: TaskType) => {
        try {
            const response = await fetch(`http://localhost:3000/task/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                console.error("Помилка від сервера при оновленні задачі");
            }

            const updatedTask = await response.json();
            console.log("Оновлена задача:", updatedTask);
            
            if(onTaskUpdated) {
                onTaskUpdated();
            }
            onOpenChange(false);
        } catch (error) {
            console.error("Помилка:", error);
        }
  };


    return(
        <>
        <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild></SheetTrigger>
        <SheetContent>
            <SheetHeader>
            <SheetTitle>Редагування задачі</SheetTitle>
            </SheetHeader>
            {taskId && (
                <form onSubmit={handleSubmit(onSubmit)} className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                    <Label htmlFor="title">Назва</Label>
                    <Input id="title" placeholder="Введіть назву задачі" defaultValue={taskDetails?.title} {...register("title")} />
                    {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="description">Опис <span className="opacity-25">(Не обов'язково)</span></Label>
                    <Textarea id="description" placeholder="Введіть опис задачі" {...register("description")} className="max-h-32" />
                    {errors.description && <span className="text-sm text-red-600">{errors.description.message}</span>}
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="status">Статус</Label>
                    <NativeSelect id="status" {...register("status")}>
                        <NativeSelectOption value="todo">To Do</NativeSelectOption>
                        <NativeSelectOption value="in_progress">In Progress</NativeSelectOption>
                        <NativeSelectOption value="review">Review</NativeSelectOption>
                        <NativeSelectOption value="done">Done</NativeSelectOption>
                    </NativeSelect>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="priority">Пріоритет</Label>
                    <NativeSelect id="priority" {...register("priority")}>
                        <NativeSelectOption value="low">Low</NativeSelectOption>
                        <NativeSelectOption value="medium">Medium</NativeSelectOption>
                        <NativeSelectOption value="high">High</NativeSelectOption>
                    </NativeSelect>
                </div>

                <div className="grid gap-3">
                    <Label>Термін виконання</Label>
                    <Controller
                    control={control}
                    name="deadline"
                    render={({ field }) => (
                        <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-auto justify-between font-normal">
                            {field.value ? field.value.toDateString() : "Оберіть дату"}
                            <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={field.value}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                field.onChange(date);
                                setOpenCalendar(false);
                            }}
                            />
                        </PopoverContent>
                        </Popover>
                    )}
                    />
                    {errors.deadline && <span className="text-sm text-red-600">{errors.deadline.message}</span>}
                </div>

                <SheetFooter className="flex gap-2">
                    <Button type="submit" disabled={!isValid || isSubmitting}>Зберегти</Button>
                    <SheetClose asChild>
                    <Button variant="outline">Закрити</Button>
                    </SheetClose>
                </SheetFooter>
                </form>
         )}
            </SheetContent>
        </Sheet>
        </>
    )
}

export default EditTask;