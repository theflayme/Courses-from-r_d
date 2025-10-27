import { z } from 'zod';
import * as readline from "readline";

import Json from '../task.json';
import { Task } from './dto/Task';

// Підключення функцій
import { getDetailByID } from './function/detailById';
import { filterTask } from './function/filterTask';
import { createTask } from './function/createTask';
import { deletedTask } from './function/deleteTask';
import { сheckDeadline } from './function/deadlineCheck';
import { updateTaskById } from './function/updateTask';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const TaskArray = z.array(Task);
const resultValid = TaskArray.safeParse(Json);

// Перевірка помилок
if (!resultValid.success) {
  console.error(resultValid.error);
}

// Ініціалізація TaskList
export const taskList = resultValid.data || [];

/*Приклади використання функцій (розкоментуйте, щоб перевірити роботу)*/

console.log("--- Пошук за ID ---")
console.log(getDetailByID(2));

console.log("--- Фільтрація ---")
console.log(filterTask({ status: "in_progress" }));

console.log("--- Створення нового таску ---")
console.log(createTask({ id: 11, title: "New Task", description: "This is a new task", status: "todo", priority: "medium", deadline: "2024-12-31" }));

console.log("--- Видалення таску ---")
console.log(deletedTask(3));

console.log("--- Перевірка дедлайну ---")
console.log(сheckDeadline(2));

console.log("--- Пошук за статусом ---")
console.log(updateTaskById(2, { status: "todo" }));



