import type { Column } from "@/types/task.type";

export const COLUMNS_DEFAULT: Column[] = [
  { id: 'todo', title: 'To Do', color: '#D9D9D9', tasks: [] },
  { id: 'in_progress', title: 'In Progress', color: '#66BCFF', tasks: [] },
  { id: 'review', title: 'Review', color: '#FFA500', tasks: [] },
  { id: 'done', title: 'Done', color: '#46AE9F', tasks: [] },
];