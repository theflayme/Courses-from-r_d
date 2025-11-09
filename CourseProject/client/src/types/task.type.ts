
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  priority: string;
  description: string;
  id: string;
  name: string;
  createdAt: string; 
  deadline: string | null;
  column: string; 
};

export type TaskType = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;  
  updatedAt: string;
  deadline?: string | null;
}


export type Column = {
  id: TaskStatus;
  title: string;
  tasks: TaskType[];
  color?: string;
}

