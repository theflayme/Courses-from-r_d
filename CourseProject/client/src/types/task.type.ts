
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

// Розширений тип задачі з додатковими полями
export type TaskType = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;  
  updatedAt: string;
  deadline?: string;
}

// Колонка з задачами
export type Column = {
  id: TaskStatus;
  title: string;
  tasks: TaskType[];
  color?: string;
}

