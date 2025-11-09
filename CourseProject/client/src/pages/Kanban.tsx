'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, GripVertical, Plus } from 'lucide-react';
import type { TaskType, TaskStatus, Column } from '@/types/task.type';

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', color: '#D9D9D9', tasks: [] },
  { id: 'in_progress', title: 'In Progress', color: '#66BCFF', tasks: [] },
  { id: 'review', title: 'Review', color: '#FFA500', tasks: [] },
  { id: 'done', title: 'Done', color: '#46AE9F', tasks: [] },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/task');
        const tasks: TaskType[] = await response.json();

        // Map tasks to their respective columns
        const updatedColumns = initialColumns.map((column) => ({
          ...column,
          tasks: tasks.filter((task) => task.status === column.id),
        }));

        setColumns(updatedColumns);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDragStart = (e: React.DragEvent, task: TaskType, columnId: TaskStatus) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ task, sourceColumnId: columnId }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const updateTaskStatusOnServer = async (taskId: string, status: TaskStatus) => {
    const res = await fetch(`http://localhost:3000/task/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      throw new Error(`Failed to update task ${taskId} status`);
    }
    return (await res.json()) as TaskType;
  };

  const handleDrop = async (e: React.DragEvent, targetColumnId: TaskStatus) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { task, sourceColumnId } = data as { task: TaskType; sourceColumnId: TaskStatus };

      if (sourceColumnId === targetColumnId) return;

      const prevColumns = columns;

      // Optimistically update UI
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
        // Send PUT to backend
        const updated = await updateTaskStatusOnServer(task.id, targetColumnId);

        // Replace moved task with server response (to sync timestamps etc.)
        setColumns((cols) =>
          cols.map((col) =>
            col.id === targetColumnId
              ? { ...col, tasks: col.tasks.map((t) => (t.id === task.id ? { ...t, ...updated } : t)) }
              : col,
          ),
        );
      } catch (err) {
        console.error('Failed to update task status on server:', err);
        // Revert UI on failure
        setColumns(prevColumns);
      }
    } catch {
      // ignore parse errors
    }
  };

  const formatDate = (iso?: string | null) =>
    iso ? new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : null;

  return (
    <div className="">
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
                <Badge className="bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border-neutral-200/50 dark:border-neutral-600/50">
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
                >
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          {task.status && (
                            <Badge className={`mt-1 text-xs rounded-full`} style={{ backgroundColor: column.color, color: column.color !== '#D9D9D9' ? '#fff' : '#000' }}>
                              {task.status.toUpperCase()}
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
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span className="text-xs font-medium">{formatDate(task.deadline)}</span>
                            </div>
                          )}
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            Created: {formatDate(task.createdAt)}
                          </div>
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
    </div>
  );
}
