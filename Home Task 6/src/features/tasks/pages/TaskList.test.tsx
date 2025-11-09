/*
Елементи у списку відображаються коректно (усі потрібні поля присутні).
При порожньому списку — відображається empty state.
При помилці — показується error message.
*/

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import { useAsyncTaskList } from '../../../shared/hook/useAnyncTask';
import dateFormat from '../../../shared/utils/dateFormat';

vi.mock('../../../shared/hook/useAnyncTask', () => ({
  useAsyncTaskList: vi.fn(),
}));

describe('Тестування сторінки списку задач', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockTasks = [
    {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date('2024-01-01T00:00:00Z'),
      deadline: new Date('2024-01-05T00:00:00Z'),
    },
    {
      id: 2,
      title: 'Test Task 2',
      description: 'Test Description 2',
      status: 'in_progress',
      priority: 'medium',
      createdAt: new Date('2024-01-01T00:00:00Z'),
      deadline: new Date('2024-01-05T00:00:00Z'),
    },
    {
      id: 3,
      title: 'Test Task 3',
      description: 'Test Description 3',
      status: 'in_progress',
      priority: 'medium',
      createdAt: new Date('2024-01-01T00:00:00Z'),
      deadline: new Date('2024-01-05T00:00:00Z'),
    },
  ];

  it('Елементи у списку відображаються коректно', () => {
    (useAsyncTaskList as Mock).mockReturnValue({
      tasks: mockTasks,
      error: undefined,
    });

    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </MemoryRouter>
    );

    for (const task of mockTasks) {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
      // Look for an element containing both dates
      expect(
        screen.getByText((content) => {
          return content.includes(dateFormat(task.createdAt)) && content.includes(dateFormat(task.deadline));
        })
      ).toBeInTheDocument();
    }
  });

  it('При порожньому списку — відображається empty state', () => {
    (useAsyncTaskList as Mock).mockReturnValue({
      tasks: [],
      error: undefined,
    });

    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Задачі не знайдено')).toBeInTheDocument();
  });

//   it('При помилці — показується error message', () => {
//     (useAsyncTaskList as Mock).mockReturnValue({
//       tasks: [],
//       error: { message: 'Помилка при отриманні задач' },
//     });

//     render(
//       <MemoryRouter initialEntries={['/tasks']}>
//         <Routes>
//           <Route path="/tasks" element={<TaskList />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     expect(screen.getByText('Помилка при отриманні задач')).toBeInTheDocument();
//   });
});