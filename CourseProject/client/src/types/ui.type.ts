import type { TaskType } from "./task.type";

export type TaskModalProps = {
  task: TaskType;
  isOpen: boolean;
  onClose: () => void;
};  