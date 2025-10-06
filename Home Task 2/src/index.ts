import { z } from 'zod';
import * as readline from "readline";

import Json from './task.json';
import { Task } from './dto/Task';

// Підключення функцій
import { DetailID } from './function/DetailID';
import { FilterTask } from './function/FilterTask';
import { CreateTask } from './function/CreateTask';
import { DeleteTask } from './function/DeleteTask';
import { DeadlineCheck } from './function/DeadlineCheck';
import { UpdateTask } from './function/UpdateTask'

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

export const TaskList = resultValid.data;

console.log("1. Отримання деталей завдання за вказаним id")
console.log("2. Фільтрації завдань за статусом, датою створення та пріоритетом")
console.log("3. Створення нового завдання")
console.log("4. Видалення завдання")
console.log("5. Перевірки, чи завершено завдання до дедлайну.")
console.log("6. Апдейт деталей завдання")

rl.question("Введіть номер дії: ", (answer: any) => {
  const Selection = Number(answer); 
  console.log("Вибраний номер:", Selection);

  switch (Selection) {
    case 1:
      console.log("Знайдено за першим ID:", DetailID(1));
    break;
    case 2:
      console.log(
        "Фільтрація задач за статусом, пріорітетом та датою створення",
        FilterTask({
          status: 'in_progress',
          priority: 'high',
          createdAt: '2025-2-10T16:40:00Z',
        })
      );
    break;
    case 3:
      console.log(
        "Створення нової задачі",
        CreateTask({
          id: 11,
          title: "Розробити дизайн логотипу",
          description: "Створити кілька варіантів логотипу для нового проєкту",
          createdAt: "2025-09-29T12:30:00Z",
          status: "in_progress",
          priority: "medium",
          deadline: "2025-10-05T15:00:00Z",
        })
      );
    break;
    case 4:
      console.log("Видалення задачі з списку", DeleteTask(1));
      break;
    case 5:
      console.log("Перевірка, чи завершено завдання до дедлайну", DeadlineCheck(4));
    break;
    case 6:
      console.log("Апдейт деталей завдання", UpdateTask(1,{
        title: "Домашне завдання №2 з курсу Robot Dreams",
        description: "Маніпуляції з типами. Специфічні оператори TypeScript. Робота з константами"
    }));
      break;
    default:
      console.log("Невідомий вибір");
    break;
  }

  rl.close();
});
