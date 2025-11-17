import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// UI-components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';

// Types
import { taskSchema, type TaskType } from '@/types/task.type';
import { createTask } from '@/controllers/task.controller';
import type { CreateTaskProps } from '@/types/props.type';

const CreateTask = ({ open, onOpenChange, onTaskCreated }: CreateTaskProps) => {
  const [openCalendar, setOpenCalendar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm<TaskType>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: TaskType) => {
    try {
      const newTask = await createTask(data);

      if (!newTask) {
        console.error('Сервер не повернув даних. Сталася помилка');
      }

      onTaskCreated?.();
      onOpenChange(false);
    } catch (error) {
      console.error('Помилка мережі:', error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Створення задачі</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid flex-1 auto-rows-min gap-6 px-4'
        >
          <div className='grid gap-3'>
            <Label htmlFor='title'>Назва</Label>
            <Input
              id='title'
              placeholder='Введіть назву задачі'
              {...register('title')}
            />
            {errors.title && (
              <span className='text-sm text-red-600'>
                {errors.title.message}
              </span>
            )}
          </div>

          <div className='grid gap-3'>
            <Label htmlFor='description'>
              Опис <span className='opacity-25'>(Не обов`язково)</span>
            </Label>
            <Textarea
              id='description'
              placeholder='Введіть опис задачі'
              {...register('description')}
              className='max-h-32'
            />
            {errors.description && (
              <span className='text-sm text-red-600'>
                {errors.description.message}
              </span>
            )}
          </div>

          <div className='grid gap-3'>
            <Label htmlFor='status'>Статус</Label>
            <NativeSelect id='status' {...register('status')}>
              <NativeSelectOption value='todo'>To Do</NativeSelectOption>
              <NativeSelectOption value='in_progress'>
                In Progress
              </NativeSelectOption>
              <NativeSelectOption value='review'>Review</NativeSelectOption>
              <NativeSelectOption value='done'>Done</NativeSelectOption>
            </NativeSelect>
          </div>

          <div className='grid gap-3'>
            <Label htmlFor='priority'>Пріоритет</Label>
            <NativeSelect id='priority' {...register('priority')}>
              <NativeSelectOption value='low'>Low</NativeSelectOption>
              <NativeSelectOption value='medium'>Medium</NativeSelectOption>
              <NativeSelectOption value='high'>High</NativeSelectOption>
            </NativeSelect>
          </div>

          <div className='grid gap-3'>
            <Label>Термін виконання</Label>
            <Controller
              control={control}
              name='deadline'
              render={({ field }) => {
                const selectedDate = field.value;

                return (
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-auto justify-between font-normal'
                      >
                        {selectedDate
                          ? selectedDate.toLocaleDateString('uk-UA')
                          : 'Оберіть дату'}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      className='w-auto overflow-hidden p-0'
                      align='start'
                    >
                      <Calendar
                        mode='single'
                        selected={selectedDate}
                        captionLayout='dropdown'
                        onSelect={(date) => {
                          field.onChange(date); // сохраняем как строку ISO
                          setOpenCalendar(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
            {errors.deadline && (
              <span className='text-sm text-red-600'>
                {errors.deadline.message}
              </span>
            )}
          </div>

          <SheetFooter className='flex gap-2'>
            <Button type='submit' disabled={!isValid || isSubmitting}>
              Зберегти
            </Button>
            <SheetClose asChild>
              <Button variant='outline'>Закрити</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTask;
