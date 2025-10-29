import type { TaskUpdateType } from './modules/task/task.types';

export function validateTask(task: TaskUpdateType){
  if (!task.title || task.description || task.priority || task.status || task.deadline) {
    return 'Треба заповнити всі поля';
  }
}
