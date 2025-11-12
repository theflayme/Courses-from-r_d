import type { Column, TaskType } from "@/types/task.type";
import { COLUMNS_DEFAULT } from "@/components/Columns";

type UseFetchTasksType = {
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

async function useFetchTasks({ setColumns }: UseFetchTasksType) {{
        try {
            const response = await fetch('http://localhost:3000/task');
            const tasks: TaskType[] = await response.json();

            const updatedColumns = COLUMNS_DEFAULT.map((column) => ({
            ...column,
            tasks: tasks.filter((task) => task.status === column.id),
            }));

            setColumns(updatedColumns);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    }};

export default useFetchTasks;