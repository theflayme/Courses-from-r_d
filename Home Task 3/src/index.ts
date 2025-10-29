import { TaskController } from './modules/task/task.controller';
import { TaskService } from './modules/task/task.service';


import { Story } from './modules/task/model/Story.model';
import { Bug } from './modules/task/model/Bug.model';
import { Subtask } from './modules/task/model/Subtask.model';
import { Epic } from './modules/task/model/Epic.model';

const taskController = new TaskController(new TaskService());

taskController.createTask(
    new Bug(
        1,
        'Завдання 1',
        'Опис завдання 1',
        'todo',
        'low',
        new Date(),
        new Date(),
        'low'
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
        new Date(),
        1
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
        new Date(),
        10
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
        new Date(2025, 10, 17),
        10
    )
)

console.log('----- Оновлення задач -----');
console.log('Приклад валідації:\n');
console.log('Не валідна задача:');
const updatedTask = taskController.updateTask(1, {
    title: '',
});
console.log(updatedTask);

console.log('\nВалідна задача:');
const updatedTask2 = taskController.updateTask(2, {
    description: 'Завдання 2 Оновлене',
});
console.log(updatedTask2);


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