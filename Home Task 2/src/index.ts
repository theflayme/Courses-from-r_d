/*
    Створіть файл tasks.json, який містить щонайменше 10 об'єктів завдань з такими полями:
    + id (string або number);
    + title (string);
    + description (string);
    + createdAt (string або Date);
    + status (наприклад: "todo", "in_progress", "done");
    + priority (наприклад: "low", "medium", "high");
    + deadline (string або Date).

    + Визначте тип Task, а також окремі типи Status і Priority, які відображають допустимі значення статусів і пріоритетів. Визначити, які поля мають бути обов'язковими, а які опціональними. Дефолтні значення для полів мають зберігатися у відповідних константах

    Напишіть утиліту, яка буде:
    + приймати дані з JSON-файлу tasks.json; 
    + перевіряти, чи відповідає структура об’єктів визначеному типу Task.
    + для кожного обʼєкту перевіряти наявність поля status і priority. якщо відповідне значення не вказано — надавати дефолтне значення з констант

    Створіть функції для:
    + отримання деталей завдання за вказаним id
    - створення нового завдання
    - апдейту деталей завдання
    - видалення завдання
    - фільтрації завдань за статусом, датою створення та пріоритетом;
    - перевірки, чи завершено завдання до дедлайну.

    Усі константи та типи винесіть в окремі файли:
    + constants.ts — для дефолтних значень;
    + dto/Task.ts — для типів Task, Status, Priority тощо.
*/

import { z } from 'zod';

import TaskList from './task.json'
import { Task } from './dto/Task'

const TaskListArray = z.array(Task);
const resultValid = TaskListArray.safeParse(TaskList);

// Перевірка помилок
if (!resultValid.success){
    console.error(resultValid.error)
}

const TaskManager = resultValid.data ;

// Отримання деталей завдання за вказаним id
function DetailID (id: number){
    return TaskManager.filter((d) => d.id === id);
}

console.log(DetailID(1))

// Створення нового завдання
