import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, GripVertical, Plus } from 'lucide-react';
import { COLUMNS_DEFAULT } from '@/components/Columns';
import type { TaskType, TaskStatus, Column } from '@/types/task.type';
import useUpdate from '@/hooks/handleUpdate';
import useFetchTasks from '@/hooks/useFetchTasks';
import formatDate from '@/utils/formatDate';

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(COLUMNS_DEFAULT);
  const [Modal, setModal] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = Modal ? 'hidden' : 'auto';
    console.log('Modal open state changed:', Modal);
  }, [Modal]);

  useEffect(() => {
    useFetchTasks({ setColumns });
  }, []);

  const handleDragStart = (e: React.DragEvent, task: TaskType, columnId: TaskStatus) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ task, sourceColumnId: columnId }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const updateTaskStatusOnServer = useUpdate;

  // Обробник скидання таски в новий стовпець
  const handleDrop = async (e: React.DragEvent, targetColumnId: TaskStatus) => {
    e.preventDefault();
    try {
      // Отримуємо дані таски та початкового стовпця
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { task, sourceColumnId } = data as { task: TaskType; sourceColumnId: TaskStatus };
      
      // Якщо таска скидається в той же стовпець, нічого не робимо
      if (sourceColumnId === targetColumnId) return;
 
      const prevColumns = columns;

      // Локально оновлюємо стан для миттєвого відображення
      const newColumns = prevColumns.map((col) => {
        if (col.id === sourceColumnId) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== task.id) };
        }

        if (col.id === targetColumnId) {
          const moved = { ...task, status: targetColumnId };
          return { ...col, tasks: [...col.tasks, moved] };
        }
        
        return col;
      });

      setColumns(newColumns);

      try {
        // Оновлюємо статус таски на сервері
        const updated = await updateTaskStatusOnServer(task.id, targetColumnId);
        setColumns((cols) =>
          cols.map((col) =>
            col.id === targetColumnId
              ? { ...col, tasks: col.tasks.map((t) => (t.id === task.id ? { ...t, ...updated } : t)) }
              : col,
          ),
        );
      } catch (error) {
        console.error('Failed to update task status on server:', error);
        setColumns(prevColumns);
      }
    } catch (error) {
      console.error('Failed to handle drop event:', error);
    }
  };

  return (
    <>
      <div className="flex flex-row items-start justify-between gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="w-full bg-white/20 dark:bg-neutral-900/20 backdrop-blur-xl rounded-3xl p-5 border border-border dark:border-neutral-700/50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full " style={{ backgroundColor: column.color }} />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{column.title}</h3>
                <Badge className="bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border-neutral-200/50 dark:border-neutral-600/50" style={{ minWidth: '1.5rem' }}>
                  {column.tasks.length}
                </Badge>
              </div>
              <button className="p-1 rounded-full bg-white/30 dark:bg-neutral-800/30 hover:bg-white/50 dark:hover:bg-neutral-700/50 transition-colors">
                <Plus className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              </button>
            </div>

            <div className="space-y-4">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="cursor-move transition-all duration-300 border bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-neutral-700/70"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, column.id)}
                  onClick={() => {
                    setSelectedTask(task);
                    setModal(true);
                  }}
                >
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          {task.status && (
                            <Badge className={`mt-1 text-xs rounded-full mb-2`} style={
                              {
                                backgroundColor: column.color + '25',
                                color: column.color }}>
                              {task.status.toUpperCase().split('_').join(' ')}
                            </Badge>
                          )}
                          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                            {task.title}
                          </h4>
                        </div>
                        <GripVertical className="w-5 h-5 text-neutral-500 dark:text-neutral-400 cursor-move" />
                      </div>

                      {task.description && (
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-neutral-200/30 dark:border-neutral-700/30">
                        <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
                          {task.deadline && (
                            <div className="flex gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="text-xs font-medium">{formatDate(task.deadline)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
