import { useEffect, useState, type DragEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, GripVertical } from 'lucide-react';

import type { TaskResponseType } from '@/types/task.type';
import { getTasks, updateTask } from '@/controllers/task.controller';
import formatDate from '@/utils/formatDate';
import EditTask from '@/layouts/EditTask';
import { Button } from '@/components/ui/button';
import CreateTask from './CreateTask';

type Task = TaskResponseType;

interface Column {
  id: Task['status'];
  title: string;
  color: string;
}

const COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', color: '#8B7355' },
  { id: 'in_progress', title: 'In Progress', color: '#6B8E23' },
  { id: 'review', title: 'Review', color: '#CD853F' },
  { id: 'done', title: 'Done', color: '#556B2F' },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (error) {
      console.error('Помилка при завантаженні задач:', error);
    }
  };

  useEffect(() => {
    void fetchTasks();
  }, []);

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    taskId: string,
    sourceStatus: Task['status'],
  ) => {
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ taskId, sourceStatus }),
    );
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (
    e: DragEvent<HTMLDivElement>,
    targetStatus: Task['status'],
  ) => {
    e.preventDefault();

    const rawData = e.dataTransfer.getData('text/plain');
    if (!rawData) return;

    const { taskId, sourceStatus } = JSON.parse(rawData) as {
      taskId: string;
      sourceStatus: Task['status'];
    };

    if (sourceStatus === targetStatus) return;

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask: Task = { ...task, status: targetStatus };

    setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));

    try {
      await updateTask(taskId, {
        title: task.title,
        description: task.description,
        status: targetStatus,
        priority: task.priority,
        deadline: task.deadline,
      });
    } catch (error) {
      console.error('Помилка при оновленні задачі:', error);
    }
  };

  const handleCardClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsEditTaskOpen(true);
  };

  return (
    <>
      <div className='flex justify-end'>
        <Button className='justify-end mb-4' onClick={() => setIsCreateTaskOpen(true)}>Додати задачу</Button>
          {isCreateTaskOpen && (
            <CreateTask
              open={isCreateTaskOpen}
              onOpenChange={setIsCreateTaskOpen}
              onTaskCreated={fetchTasks}
            />
          )}
      </div>
      <div className='grid grid-row-1 md:grid-cols-4 gap-6'>
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);

          return (
            <div
              key={column.id}
              className='bg-white/20 dark:bg-neutral-900/20 backdrop-blur-xl rounded-3xl p-5 border border-border dark:border-neutral-700/50'
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <div
                    className='w-4 h-4 rounded-full'
                    style={{ backgroundColor: column.color }}
                  />
                  <h3 className='font-semibold text-neutral-900 dark:text-neutral-100'>
                    {column.title}
                  </h3>
                  <Badge className='bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border-neutral-200/50 dark:border-neutral-600/50'>
                    {columnTasks.length}
                  </Badge>
                </div>
              </div>

              <div className='space-y-4'>
                {columnTasks.map((task) => (
                  <Card
                    key={task.id}
                    className='cursor-move transition-all duration-300 border bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-neutral-700/70'
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                    onClick={() => handleCardClick(task.id)}
                  >
                    <CardContent className='p-5'>
                      <div className='space-y-4'>
                        <div className='flex items-start justify-between'>
                          <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 leading-tight'>
                            {task.title}
                          </h4>
                          <GripVertical className='w-5 h-5 text-neutral-500 dark:text-neutral-400 cursor-move' />
                        </div>

                        {task.description && (
                          <p className='text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed'>
                            {task.description}
                          </p>
                        )}

                        <div className='flex items-center justify-between pt-2 border-t border-neutral-200/30 dark:border-neutral-700/30'>
                          <div className='flex items-center gap-4 text-neutral-600 dark:text-neutral-400'>
                            {task.deadline && (
                              <div className='flex items-center gap-1'>
                                <Calendar className='w-4 h-4' />
                                <span className='text-xs font-medium'>
                                  {formatDate(task.deadline)}
                                </span>
                              </div>
                            )}
                            <div className='flex items-center gap-1'>
                              <Badge
                                className='text-xs border-neutral-200/50 dark:border-neutral-600/50'
                                style={{
                                  fontWeight: 600,
                                  background:
                                    task.priority === 'low'
                                      ? '#232323ff'
                                      : task.priority === 'medium'
                                        ? '#4d551dff'
                                        : task.priority === 'high'
                                          ? '#6a2222ff'
                                          : '#d1d5db',
                                  color:
                                    task.priority === 'low'
                                      ? '#ffffff'
                                      : task.priority === 'medium'
                                        ? '#e4ed62ff'
                                        : task.priority === 'high'
                                          ? '#ed6262ff'
                                          : '#000000',
                                }}
                              >
                                {task.priority
                                  .replace('_', ' ')
                                  .replace(/\b\w/g, (c: string) =>
                                    c.toUpperCase(),
                                  )}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isEditTaskOpen && (
        <EditTask
          open={isEditTaskOpen}
          onOpenChange={setIsEditTaskOpen}
          onTaskUpdated={fetchTasks}
          taskId={selectedTaskId}
        />
      )}
    </>
  );
};

export default KanbanBoard;
