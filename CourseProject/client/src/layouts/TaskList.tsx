import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { ScrollArea } from "@/components/ui/scroll-area"
import { type TaskResponseType } from "@/types/task.type";

import CreateTask from "@/layouts/CreateTask";
import EditTask from "@/layouts/EditTask";
import formatDate from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import { deleteTask, getTasks } from "@/controllers/task.controller";
import { ChevronDownIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const TaskList = () => {
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
    const [tasks, setTasks] = useState<TaskResponseType[]>();
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filterPriority, setFilterPriority] = useState<string>("");

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Помилка:", error);
        }
    };

    const deleteTaskById = async (id: string) => {
        try {
        await deleteTask(id);
        await fetchTasks();
        } catch (error) {
        console.error("Помилка при видаленні задачі:", error);
        }
    };

    const filteredTasks = tasks?.filter((task) => {
        const statusMatch = filterStatus ? task.status === filterStatus : true;
        const priorityMatch = filterPriority ? task.priority === filterPriority : true;
        return statusMatch && priorityMatch;
    });

    
    const resetFilters = () => {
        setFilterStatus("");
        setFilterPriority("");
    };

    useEffect(() => {
        const renderTasks = async () => {
            await fetchTasks();
        };
        renderTasks();
    }, []);

    return (
        <>
            <div className="flex items-center justify-end space-x-2 mb-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                Фільтри <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Статус</DropdownMenuLabel>
                                <DropdownMenuCheckboxItem
                                checked={filterStatus === "todo"}
                                onCheckedChange={() =>
                                    setFilterStatus(filterStatus === "todo" ? "" : "todo")
                                }
                                >
                                To Do
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                checked={filterStatus === "in_progress"}
                                onCheckedChange={() =>
                                    setFilterStatus(filterStatus === "in_progress" ? "" : "in_progress")
                                }
                                >
                                In Progress
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                checked={filterStatus === "review"}
                                onCheckedChange={() =>
                                    setFilterStatus(filterStatus === "review" ? "" : "review")
                                }
                                >
                                Review
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                checked={filterStatus === "done"}
                                onCheckedChange={() =>
                                    setFilterStatus(filterStatus === "done" ? "" : "done")
                                }
                                >
                                Done
                                </DropdownMenuCheckboxItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Пріоритет</DropdownMenuLabel>
                                <DropdownMenuCheckboxItem
                                checked={filterPriority === "low"}
                                onCheckedChange={() =>
                                    setFilterPriority(filterPriority === "low" ? "" : "low")
                                }
                                >
                                Low
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                checked={filterPriority === "medium"}
                                onCheckedChange={() =>
                                    setFilterPriority(filterPriority === "medium" ? "" : "medium")
                                }
                                >
                                Medium
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                checked={filterPriority === "high"}
                                onCheckedChange={() =>
                                    setFilterPriority(filterPriority === "high" ? "" : "high")
                                }
                                >
                                High
                                </DropdownMenuCheckboxItem>

                                <DropdownMenuSeparator />
                                <Button
                                variant="default"
                                className="w-full mt-1"
                                onClick={resetFilters}
                                >
                                Cкинути фільтри
                                </Button>
                            </DropdownMenuContent>
                            </DropdownMenu>
                <Button onClick={() => setIsCreateTaskOpen(true)}>Додати задачу</Button>
            </div>
            <div className="rounded-lg border bg-black/5 p-5 dark:bg-white/2">
                <ScrollArea className="">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[200px] font-semibold">Назва задачі</TableHead>
                            <TableHead className="max-w-[200px] font-semibold">Опис</TableHead>
                            <TableHead className="font-semibold">Статус</TableHead>
                            <TableHead className="font-semibold">Пріоритет</TableHead>
                            <TableHead className="font-semibold">Створення</TableHead>
                            <TableHead className="text-right font-semibold">Дедлайн</TableHead>
                        </TableRow>
                        </TableHeader>
                            <TableBody>
                            {filteredTasks && filteredTasks.length > 0 ? (
                                filteredTasks.map((task) => (
                                <ContextMenu key={task.id}>
                                    <ContextMenuTrigger asChild>
                                    <TableRow id="context-menu-trigger">
                                        <TableCell className="font-medium break-words whitespace-pre-wrap max-w-[200px]">
                                        {task.title}
                                        </TableCell>

                                        <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <TableCell className="max-w-[200px] break-words whitespace-pre-wrap line-clamp-3">
                                            {task.description}
                                            </TableCell>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-64 break-words whitespace-pre-wrap">
                                            {task.description || "Немає опису"}
                                        </HoverCardContent>
                                        </HoverCard>

                                        <TableCell>
                                        <Badge
                                            style={{
                                            fontWeight: "600",
                                            background:
                                                task.status === "todo"
                                                ? "#232323ff"
                                                : task.status === "in_progress"
                                                ? "#1d3255ff"
                                                : task.status === "review"
                                                ? "#6a4122ff"
                                                : task.status === "done"
                                                ? "#1b512fff"
                                                : "#d1d5db",
                                            color:
                                                task.status === "todo"
                                                ? "#ffffff"
                                                : task.status === "in_progress"
                                                ? "#6297edff"
                                                : task.status === "review"
                                                ? "#ed9762ff"
                                                : task.status === "done"
                                                ? "#43cc75ff"
                                                : "#000000",
                                            padding: "0.25rem 0.5rem",
                                            }}
                                        >
                                            {task.status
                                            .replace("_", " ")
                                            .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                                        </Badge>
                                        </TableCell>

                                        <TableCell>
                                        <Badge
                                            style={{
                                            fontWeight: "600",
                                            background:
                                                task.priority === "low"
                                                ? "#232323ff"
                                                : task.priority === "medium"
                                                ? "#4d551dff"
                                                : task.priority === "high"
                                                ? "#6a2222ff"
                                                : "#d1d5db",
                                            color:
                                                task.priority === "low"
                                                ? "#ffffff"
                                                : task.priority === "medium"
                                                ? "#e4ed62ff"
                                                : task.priority === "high"
                                                ? "#ed6262ff"
                                                : "#000000",
                                            padding: "0.25rem 0.5rem",
                                            }}
                                        >
                                            {task.priority
                                            .replace("_", " ")
                                            .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                                        </Badge>
                                        </TableCell>

                                        <TableCell>{formatDate(task.createdAt)}</TableCell>
                                        <TableCell className="text-right">
                                        {task.deadline ? formatDate(task.deadline) : "Не встановлено"}
                                        </TableCell>
                                    </TableRow>
                                    </ContextMenuTrigger>

                                    <ContextMenuContent>
                                    <ContextMenuItem
                                        onClick={() => {
                                        setSelectedTaskId(task.id);
                                        setIsEditTaskOpen(true);
                                        }}
                                    >
                                        Редагувати
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        variant="destructive"
                                        onClick={() => deleteTaskById(task.id)}
                                    >
                                        Видалити
                                    </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                                ))
                            ) : (
                                <TableRow>
                                <TableCell colSpan={6} className="text-center py-4 opacity-50">
                                    Список задач порожній
                                </TableCell>
                                </TableRow>
                            )}
                            </TableBody>

                </Table>
                </ScrollArea>
            </div>
            {isCreateTaskOpen && (
                <CreateTask
                    open={isCreateTaskOpen}
                    onOpenChange={setIsCreateTaskOpen}
                    onTaskCreated={fetchTasks} 
                />
            )}
            {isEditTaskOpen && (
                <EditTask
                    open={isEditTaskOpen}
                    onOpenChange={setIsEditTaskOpen}
                    onTaskUpdated={fetchTasks}
                    taskId={selectedTaskId}
                />
            )}
        </>
    );
}

export default TaskList;