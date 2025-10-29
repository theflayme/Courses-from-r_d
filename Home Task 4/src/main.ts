import { itemTaskManager } from './api/task.api';
import './styles/style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <header>
      <h1>Менеджер Завдань</h1>
    </header>

    <!-- Модальне вікно для створення завдання -->
    <div id="createModal" class="modal">
      <div class="modal-content">
        <h2>Створити завдання</h2>
        <form id="createTaskForm">
          <input type="text" name="title" id="createTitle" placeholder="Назва завдання" required>
          <textarea name="description" id="createDescription" placeholder="Опис завдання" required></textarea>
          <select name="status" id="createStatus">
            <option value="todo">До виконання</option>
            <option value="in_progress">В процесі</option>
            <option value="done">Виконано</option>
          </select>
          <select name="priority" id="createPriority">
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
          <input type="datetime-local" name="createdAt" id="createCreatedAt" placeholder="Дата створення" required>
          <input type="datetime-local" name="deadline" id="createDeadline" placeholder="Дедлайн" required>
          <button type="submit">Створити</button>
        </form>
      </div>
    </div>

    <!-- Модальне вікно для пошуку завдання по id -->
    <div id="getTaskByIdModal" class="modal">
      <div class="modal-content">
        <h2>Показати завдання по ID</h2>
        <form id="getTaskByIdForm">
          <input type="number" name="id" id="getTaskByIdId" placeholder="ID завдання" required>
          <button type="submit">Відобразити</button>
        </form>
      </div>
    </div>

    <!-- Модальне вікно для видалення завдання -->
    <div id="deleteModal" class="modal">
      <div class="modal-content">
        <h2>Видалити завдання</h2>
        <form id="deleteTaskForm">
          <input type="number" name="id" id="deleteId" placeholder="ID завдання" required>
          <button type="submit">Видалити</button>
        </form>
      </div>
    </div>

    <!-- Модальне вікно для оновлення завдання -->
    <div id="updateModal" class="modal">
      <div class="modal-content">
        <h2>Оновити завдання</h2>
        <form id="updateTaskForm">
          <input type="number" name="id" id="updateId" placeholder="ID завдання" required>
          <input type="text" name="title" id="updateTitle" placeholder="Назва завдання" required>
          <textarea name="description" id="updateDescription" placeholder="Опис завдання" required></textarea>
          <select name="status" id="updateStatus">
            <option value="todo">До виконання</option>
            <option value="in_progress">В процесі</option>
            <option value="done">Виконано</option>
          </select>
          <select name="priority" id="updatePriority">
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
          <input type="datetime-local" name="createdAt" id="updateCreatedAt" placeholder="Дата створення" required>
          <input type="datetime-local" name="deadline" id="updateDeadline" placeholder="Дедлайн" required>
          <button type="submit">Оновити завдання</button>
        </form>
      </div>
    </div>

    <!-- Модальне вікно для фільтру по статусу -->
    <div id="statusModal" class="modal">
      <div class="modal-content">
        <h2>Фільтр за статусом</h2>
        <form id="statusFilterForm">
          <select name="status" id="filterStatus" required>
            <option value="">Виберіть статус</option>
            <option value="todo">До виконання</option>
            <option value="in_progress">В процесі</option>
            <option value="done">Виконано</option>
          </select>
          <button type="submit">Показати завдання</button>
        </form>
      </div>
    </div>

    <!-- Модальне вікно для фільтру по пріоритету -->
    <div id="priorityModal" class="modal">
      <div class="modal-content">
        <h2>Фільтр за пріоритетом</h2>
        <form id="priorityFilterForm">
          <select name="priority" id="filterPriority" required>
            <option value="">Виберіть пріоритет</option>
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
          <button type="submit">Показати завдання</button>
        </form>
      </div>
    </div>

    <!-- Модальне вікно для перевірки дедлайну -->
    <div id="deadlineModal" class="modal">
      <div class="modal-content">
        <h2>Перевірка дедлайну</h2>
        <form id="deadlineCheckForm">
          <input type="number" name="id" id="deadlineId" placeholder="ID завдання" required>
          <button type="submit">Перевірити</button>
        </form>
      </div>
    </div>

    <main>
      <ul>
        <li><button id="getTask">Показати всі завдання</button></li>
        <li><button id="getTaskById">Показати завдання по ID</button></li>
        <li><button id="createTask">Створити завдання</button></li>
        <li><button id="deleteTask">Видалити завдання</button></li>
        <li><button id="updateTask">Оновити завдання</button></li>
        <li><button id="getSortedTaskStatus">Фільтр за статусом</button></li>
        <li><button id="getSortedTaskByPriority">Фільтр за пріоритетом</button></li>
        <li><button id="deadlineCheck">Перевірити дедлайн</button></li>
      </ul>

      <div id="array"></div>
    </main>
  </div>
`

function openModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
  }
}

function closeModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

document.querySelector<HTMLButtonElement>('#getTaskById')!.addEventListener('click', () => {
  openModal('getTaskByIdModal');
});

document.querySelector<HTMLButtonElement>('#createTask')!.addEventListener('click', () => {
  openModal('createModal');
});

document.querySelector<HTMLButtonElement>('#deleteTask')!.addEventListener('click', () => {
  openModal('deleteModal');
});

document.querySelector<HTMLButtonElement>('#updateTask')!.addEventListener('click', () => {
  openModal('updateModal');
});

document.querySelector<HTMLButtonElement>('#getSortedTaskStatus')!.addEventListener('click', () => {
  openModal('statusModal');
});

document.querySelector<HTMLButtonElement>('#getSortedTaskByPriority')!.addEventListener('click', () => {
  openModal('priorityModal');
});

document.querySelector<HTMLButtonElement>('#deadlineCheck')!.addEventListener('click', () => {
  openModal('deadlineModal');
});

document.querySelector<HTMLFormElement>('#createTaskForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  
  itemTaskManager.createTask({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as any,
    priority: formData.get('priority') as any,
    createdAt: formData.get('createdAt') as string,
    deadline: formData.get('deadline') as string
  }).then(task => {
    const taskElement = `
      <tr> 
        <th>${task.id}</th>
        <th>${task.title}</th>
        <th>${task.description}</th>
        <th>Статус: ${task.status}</th>
        <th>Приоритет: ${task.priority}</th>
        <th>Протяжність виконання: ${task.createdAt} - ${task.deadline}</th>
      </tr>
    `;

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    closeModal('createModal');
  });
});

document.querySelector<HTMLFormElement>('#deleteTaskForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const id = parseInt(formData.get('id') as string);
  
  itemTaskManager.deleteTask(id).then(task => {
    const taskElement = `
      <tr> 
        <th>${task.id}</th>
        <th>${task.title}</th>
        <th>${task.description}</th>
        <th>Статус: ${task.status}</th>
        <th>Приоритет: ${task.priority}</th>
        <th>Протяжність виконання: ${task.createdAt} - ${task.deadline}</th>
      </tr>
    `;

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    closeModal('deleteModal');
  });
});

document.querySelector<HTMLFormElement>('#updateTaskForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const id = parseInt(formData.get('id') as string);
  
  itemTaskManager.updateTask(id, {
    id: formData.get('id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as any,
    priority: formData.get('priority') as any,
    createdAt: formData.get('createdAt') as string,
    deadline: formData.get('deadline') as string
  }).then(task => {
    const taskElement = `
      <tr> 
        <th>${task.id}</th>
        <th>${task.title}</th>
        <th>${task.description}</th>
        <th>Статус: ${task.status}</th>
        <th>Приоритет: ${task.priority}</th>
        <th>Протяжність виконання: ${task.createdAt} - ${task.deadline}</th>
      </tr>
    `;

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    closeModal('updateModal');
  });
});

document.querySelector<HTMLFormElement>('#statusFilterForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const status = formData.get('status') as any;
  
  itemTaskManager.getSortedTask({
    status: status,
  }).then(tasks => {
    const taskElement= tasks.map(task => `
      <tr> 
        <th>${task.id}</th>
        <th>${task.title}</th>
        <th>${task.description}</th>
        <th>Статус: ${task.status}</th>
        <th>Приоритет: ${task.priority}</th>
        <th>Протяжність виконання: ${task.createdAt} - ${task.deadline}</th>
      </tr>
    `).join('');

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    closeModal('statusModal');
  });
});

document.querySelector<HTMLFormElement>('#priorityFilterForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const priority = formData.get('priority') as any;
  
  itemTaskManager.getSortedTask({
    priority: priority,
    }).then(tasks => {
      const taskElement= tasks.map(task => `
        <tr> 
          <th>${task.id}</th>
          <th>${task.title}</th>
          <th>${task.description}</th>
          <th>Статус: ${task.status}</th>
          <th>Приоритет: ${task.priority}</th>
          <th>Протяжність виконання: ${task.createdAt} - ${task.deadline}</th>
        </tr>
      `).join('');
  
      document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
      closeModal('priorityModal');
    });
});

document.querySelector<HTMLFormElement>('#deadlineCheckForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const id = parseInt(formData.get('id') as string);
  
  itemTaskManager.deadlineCheck(id).then(isDeadline => {
    const taskElement= `
      <tr> 
        <th>Дедлайн: ${isDeadline ? 'Активний' : 'Вже пройшов дедлайн'}</th>
      </tr>
    `;

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    closeModal('deadlineModal');
  });
});

document.querySelector<HTMLButtonElement>('#getTask')!.addEventListener('click', () => {
  itemTaskManager.getTask().then(tasks => {
    const taskElements = tasks.map(task => {
      const priorityClass =
        task.priority === "low" ? "styleBoxLow" :
        task.priority === "high" ? "styleBoxHigh" :
        task.priority === "medium" ? "styleBoxMedium" :
        "style";

      return `
        <tr> 
          <th class="thId">${task.id}</th>
          <th>${task.title}</th>
          <th>${task.description}</th>
          <th>Статус: ${task.status}</th>
          <th class="${priorityClass}">Приоритет: ${task.priority}</th>
          <th>Протяжність виконання: ${task.createdAt} - ${task.deadline}</th>
        </tr>
      `;
    }).join('');

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElements}</table>`;
  });
});

document.querySelector<HTMLFormElement>('#getTaskByIdForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const id = parseInt(formData.get('id') as string);
  itemTaskManager.getTaskById(id).then(task => {
    const taskElement = `
      <tr> 
        <th>${task.id}</th>
        <th>${task.title}</th>
        <th>${task.description}</th>
        <th>Статус: ${task.status}</th>
        <th>Приоритет: ${task.priority}</th>
        <th>Протяжність виконання: ${task.createdAt} - ${task.deadline}</th>
      </tr>
    `;

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    closeModal('getTaskByIdModal');
  });
});
