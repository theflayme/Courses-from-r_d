import { itemTaskManager } from './api/task.api';
import type { TaskPriority, TaskStatus, TaskType, UpdateTaskType } from './modules/task.type';
import { formatDate } from './utils/formateDate.util';

const arrayContainer = document.getElementById('array') as HTMLDivElement;

const errorElement = (text: string) => `<h3 style="color: red; text-align: center; padding-top: 20px;">${text}</h3>`;

function setModal(modalId: string, isAction: boolean) {
  const modal = document.getElementById(modalId);
  const closeButton = document.getElementById(modalId + 'Close') as HTMLButtonElement; 
  const displayStyle = isAction ? "block" : "none";

  if (modal) {
    modal.style.display = displayStyle;
  }
  
  if (closeButton && isAction) {
    closeButton.addEventListener('click', () => {
      setModal(modalId, false);
    });
  }
}

function createTaskElement(task: TaskType) {
  return (
    `
    <tr> 
      <th>${task.id}</th>
      <th>${task.title}</th>
      <th>${task.description}</th>
      <th>Статус: ${task.status}</th>
      <th>Приоритет: ${task.priority}</th>
      <th>Протяжність виконання: ${formatDate(task.createdAt)} - ${formatDate(task.deadline)}</th>
    </tr>
  `
  )
}

const modalMap: Record<string, string> = {
  getTaskById: 'getTaskByIdModal',
  createTask: 'createModal',
  deleteTask: 'deleteModal',
  updateTask: 'updateModal',
  getSortedTaskStatus: 'statusModal',
  getSortedTaskByPriority: 'priorityModal',
  deadlineCheck: 'deadlineModal'
};

for (const [buttonId, modalId] of Object.entries(modalMap)) {
  const btn = document.getElementById(buttonId) as HTMLButtonElement | null;
  if (btn) btn.onclick = () => setModal(modalId, true);
}

document.getElementById('getTask')!.addEventListener('click', async () => {
  try {
    const tasks = await itemTaskManager.getTasks();
    if (tasks.length === 0) {
      arrayContainer.innerHTML = errorElement('Завдання відсутні');
    } 
  } catch (error) {
    arrayContainer.innerHTML = errorElement("Помилка зв'язку з сервером");
  }
});

document.getElementById('createTaskForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);

  const newTask: UpdateTaskType = {
    title: data.title as string,
    description: data.description as string,
    status: data.status as TaskStatus,
    priority: data.priority as TaskPriority,
    deadline: new Date(data.deadline as string),
  }

  itemTaskManager.createTask(newTask).then(task => {
    const taskElement = createTaskElement(task);

    arrayContainer.innerHTML = `<table>${taskElement}</table>`;
    setModal('createModal', false);
  });
});

document.getElementById('deleteTaskForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  const id = data.id as string;
  
  itemTaskManager.getTaskById(id).then(task => {
    const taskElement = createTaskElement(task);
    arrayContainer.innerHTML = `<table>${taskElement}</table>`;
    setModal('deleteModal', false);
  });
});

document.getElementById('updateTaskForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);

  const updatedTask: UpdateTaskType = {
    title: data.title as string,
    description: data.description as string,
    status: data.status as TaskStatus,
    priority: data.priority as TaskPriority,
    deadline: new Date(data.deadline as string),
  };
  
  itemTaskManager.updateTask(data.id as string, updatedTask).then(task => {
    const taskElement = createTaskElement(task);
    arrayContainer.innerHTML = `<table>${taskElement}</table>`;
    setModal('updateModal', false);
  });
});

document.getElementById('statusFilterForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  
  itemTaskManager.getSortedTask({
    status: data.status as TaskStatus,
  }).then(tasks => {
    const taskElement = tasks.map(task => createTaskElement(task)).join('');

    arrayContainer.innerHTML = `<table>${taskElement}</table>`;
    setModal('statusModal', false);
  });
});

document.getElementById('priorityFilterForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  const filter = data as { priority: TaskPriority };
  
  itemTaskManager.getSortedTask({
    priority: filter.priority,
    }).then(tasks => {
      const taskElement = tasks.map(task => createTaskElement(task)).join('');
  
      arrayContainer.innerHTML = `<table>${taskElement}</table>`;
      setModal('priorityModal', false);
    });
});

document.getElementById('deadlineCheckForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  const id = data.id as string;

  itemTaskManager.deadlineCheck(id).then(isDeadline => {
    const taskElement= `
      <tr> 
        <th>Дедлайн: ${isDeadline ? 'Активний' : 'Вже пройшов дедлайн'}</th>
      </tr>
    `;

  arrayContainer.innerHTML = `<table>${taskElement}</table>`;
  setModal('deadlineModal', false);
  });
});


document.getElementById('getTask')!.addEventListener('click', () => {
  itemTaskManager.getTasks().then(tasks => {
    const taskElements = tasks.map(task => {

      return `
        ${createTaskElement(task)}
      `;
    }).join('');

    arrayContainer.innerHTML = `<table>${taskElements}</table>`;
  });
});

document.getElementById('getTaskByIdForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  const id = data.id as string;

  itemTaskManager.getTaskById(id).then(task => {
    const taskElement = createTaskElement(task);
    arrayContainer.innerHTML = `<table>${taskElement}</table>`;
    setModal('getTaskByIdModal', false);
  });
});
