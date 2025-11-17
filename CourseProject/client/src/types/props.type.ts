export type CreateTaskProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskCreated?: () => void;
};
