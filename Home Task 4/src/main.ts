import { itemTaskManager } from './api/task.api';
import type { TaskPriority, TaskStatus, TaskType, UpdateTaskType } from './modules/task.type';

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
      <th>Протяжність виконання: ${task.createdAt} - ${task.deadline}</th>
    </tr>
  `
  )
}

document.querySelector<HTMLButtonElement>('#getTaskById')!.addEventListener('click', () => {
  setModal('getTaskByIdModal', true);
});

document.querySelector<HTMLButtonElement>('#createTask')!.addEventListener('click', () => {
  setModal('createModal', true);
});

document.querySelector<HTMLButtonElement>('#deleteTask')!.addEventListener('click', () => {
  setModal('deleteModal', true);
});

document.querySelector<HTMLButtonElement>('#updateTask')!.addEventListener('click', () => {
  setModal('updateModal', true);
});

document.querySelector<HTMLButtonElement>('#getSortedTaskStatus')!.addEventListener('click', () => {
  setModal('statusModal', true);
});

document.querySelector<HTMLButtonElement>('#getSortedTaskByPriority')!.addEventListener('click', () => {
  setModal('priorityModal', true);
});

document.querySelector<HTMLButtonElement>('#deadlineCheck')!.addEventListener('click', () => {
  setModal('deadlineModal', true);
});


document.querySelector<HTMLButtonElement>('#getTask')!.addEventListener('click', async () => {
  try {
    const tasks = await itemTaskManager.getTasks();
    if (tasks.length === 0) {
      document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<h3 style="color: red; text-align: center; padding-top: 20px;">Завдання відсутні</h3>`;
    } 
  } catch (error) {
    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<h3 style="color: red; text-align: center; padding-top: 20px;">Помилка зв'язку з сервером</h3>`;
  }
});

document.querySelector<HTMLFormElement>('#createTaskForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);

  const newTask: TaskType = {
    id: data.id as string,
    title: data.title as string,
    description: data.description as string,
    status: data.status as TaskStatus,
    priority: data.priority as TaskPriority,
    createdAt: new Date(data.createdAt as string).toISOString(),
    deadline: new Date(data.deadline as string).toISOString(),
  }

  itemTaskManager.createTask(newTask).then(task => {
    const taskElement = createTaskElement(task);

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    setModal('createModal', false);
  });
});

document.querySelector<HTMLFormElement>('#deleteTaskForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  const id = data.id as string;
  
  itemTaskManager.deleteTask(Number(id)).then(task => {
    const taskData = Array.isArray(task) ? task[0] : task;
    const taskElement = createTaskElement(taskData);

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    setModal('deleteModal', false);
  });
});
document.querySelector<HTMLFormElement>('#updateTaskForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);

  const updatedTask: UpdateTaskType = {
    title: data.title as string,
    description: data.description as string,
    status: data.status as TaskStatus,
    priority: data.priority as TaskPriority,
    deadline: new Date(data.deadline as string).toISOString(),
  };
  
  itemTaskManager.updateTask(Number(data.id), updatedTask).then(task => {
    const taskElement = createTaskElement(task);
    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    setModal('updateModal', false);
  });
});

document.querySelector<HTMLFormElement>('#statusFilterForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  const filter = data as { status: TaskStatus };
  
  itemTaskManager.getSortedTask({
    status: filter.status,
  }).then(tasks => {
    const taskElement= tasks.map(task => createTaskElement(task)).join('');

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    setModal('statusModal', false);
  });
});

document.querySelector<HTMLFormElement>('#priorityFilterForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  const filter = data as { priority: TaskPriority };
  
  itemTaskManager.getSortedTask({
    priority: filter.priority,
    }).then(tasks => {
      const taskElement = tasks.map(task => createTaskElement(task)).join('');
  
      document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
      setModal('priorityModal', false);
    });
});

document.querySelector<HTMLFormElement>('#deadlineCheckForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  const id = data.id as string;

  itemTaskManager.deadlineCheck(Number(id)).then(isDeadline => {
    const taskElement= `
      <tr> 
        <th>Дедлайн: ${isDeadline ? 'Активний' : 'Вже пройшов дедлайн'}</th>
      </tr>
    `;

  document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
  setModal('deadlineModal', false);
  });
});


document.querySelector<HTMLButtonElement>('#getTask')!.addEventListener('click', () => {
  itemTaskManager.getTasks().then(tasks => {
    const taskElements = tasks.map(task => {

      return `
        ${createTaskElement(task)}
      `;
    }).join('');

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElements}</table>`;
  });
});

document.querySelector<HTMLFormElement>('#getTaskByIdForm')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData);
  const id = data.id as string;

  itemTaskManager.getTaskById(Number(id)).then(task => {
    const taskData = Array.isArray(task) ? task[0] : task;
    const taskElement = createTaskElement(taskData);

    document.querySelector<HTMLDivElement>('#array')!.innerHTML = `<table>${taskElement}</table>`;
    setModal('getTaskByIdModal', false);
  });
});
