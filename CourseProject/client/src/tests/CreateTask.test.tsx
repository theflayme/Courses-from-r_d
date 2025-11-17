/*
 * Валідація форми створення/оновлення деталей завдання:
 * поля повинні коректно перевірятись на обов’язковість, формат та довжину
 * кнопка submit має бути disabled якщо форма невалідна або не змінена
 * форма у валідному стані повинна відправляти дані
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CreateTask from '@/layouts/CreateTask';

vi.mock('@/controllers/task.controller', () => ({
  createTask: vi.fn(),
}));

describe('Форма створення/оновлення завдання', () => {
  const mockOnOpenChange = vi.fn();
  const mockOnTaskCreated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    render(
      <MemoryRouter>
        <CreateTask
          open={true}
          onOpenChange={mockOnOpenChange}
          onTaskCreated={mockOnTaskCreated}
        />
      </MemoryRouter>,
    );
  });

  it('Поля повинні показувати помилки, якщо залишити їх порожніми та натиснути submit', async () => {
    const submitBtn = screen.getByRole('button', { name: /зберегти/i });

    fireEvent.click(submitBtn);

    expect(await screen.findByText(/назва/i)).toBeInTheDocument();
    expect(await screen.findByText(/обов/i)).toBeInTheDocument();
  });

  it('Кнопка Зберегти повинна бути disabled при невалідній формі', () => {
    const titleInput = screen.getByPlaceholderText(/введіть назву/i);
    const submitBtn = screen.getByRole('button', { name: /зберегти/i });

    expect(titleInput).toHaveValue('');
    expect(submitBtn).toBeDisabled();
  });
});
