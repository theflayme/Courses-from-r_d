import { TaskController } from './modules/task/task.controller';
import { TaskService } from './modules/task/task.service';
import { Story, Bug, Subtask, Epic } from './modules/task/task.types';

const taskController = new TaskController(new TaskService());


taskController.createTask(
    new Bug(
        1,
        'Завдання 1',
        'Опис завдання 1',
        'todo',
        'low',
        new Date(),
        new Date()
    )
)

taskController.createTask(
    new Subtask(
        2,
        'Завдання 2',
        'Опис завдання 2',
        'in_progress',
        'low',
        new Date(),
        new Date()
    )
)

taskController.createTask(
    new Story(
        3,
        'Завдання 3',
        'Опис завдання 3',
        'todo',
        'low',
        new Date(),
        new Date()
    )
)   

taskController.createTask(
    new Epic(
        4,
        'Завдання 4',
        'Опис завдання 4',
        'todo',
        'high',
        new Date(2025, 10, 12),
        new Date(2025, 10, 17)
    )
)

console.log('----- Оновлення задач -----');
const updatedTask = taskController.updateTask(1, {
    title: 'Завдання 1 Оновлене',
});
console.log(updatedTask);

console.log('----- Видалення задач -----');
const deletedTask = taskController.deleteTask(3);
console.log(deletedTask);

console.log('----- Фільтрація задач -----');
const filteredTasks = taskController.filterTask({
    priority: 'low',
});
console.log(filteredTasks);

console.log('----- Перевірка дедлайну -----');
const deadlineCheck = taskController.getDeadlineCheck(4);
console.log(deadlineCheck);