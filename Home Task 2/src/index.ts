/*
    Створіть функції для:
    + отримання деталей завдання за вказаним id
    - створення нового завдання
    - апдейту деталей завдання
    - видалення завдання
    + фільтрації завдань за статусом, датою створення та пріоритетом;
    - перевірки, чи завершено завдання до дедлайну.

*/

import { z } from 'zod';

import Json from './task.json'
import { Task } from './dto/Task'
import { tr } from 'zod/locales';

const TaskArray = z.array(Task);
const resultValid = TaskArray.safeParse(Json);

// Перевірка помилок
if (!resultValid.success){
    console.error(resultValid.error)
}

const TaskList = resultValid.data ;

// Отримання деталей завдання за вказаним id
function DetailID (id: number){
    return TaskList?.filter((d) => d.id === id);
}
// console.log(DetailID(1))

function FilterTask(filter:{
    status?: string,
    priority?: string,
    createdAt?: string,
}){ return TaskList?.filter(task => {
        const statusSearch = filter.status ? task.status === filter.status: true;
        const prioritySearch = filter.priority ? task.priority === filter.priority: true;
        const createdAtSearch = filter.createdAt ? task.createdAt === filter.createdAt: true;

        return statusSearch && prioritySearch && createdAtSearch;
    })
}
console.log(FilterTask({
    status: 'in_progress',
    priority: 'high',
    createdAt: '2025-2-10T16:40:00Z'
}));