import type { TaskType } from "@/types/task.type";

async function handleUpdate(task: TaskType){
  try {
    const response = await fetch(`http://localhost:3000/task/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const updatedTask = (await response.json()) as TaskType;
    
    // Trigger a page reload to refresh the data
    window.location.reload();
    
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
}

export default handleUpdate;
