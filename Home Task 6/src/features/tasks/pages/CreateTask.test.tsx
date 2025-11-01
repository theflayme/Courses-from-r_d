import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import CreateTask from './CreateTask';

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Створення задачі', () => {
    const setup = () =>
        render(
            <MemoryRouter initialEntries={['/tasks/create']}>
                <Routes>
                    <Route path="/tasks" element={<div>Список задач</div>} />
                    <Route path="/tasks/create" element={<CreateTask />} />
                </Routes>
            </MemoryRouter>
        );

    it('Форма і елементи відображаються, кнопка submit задизейблена за замовчуванням', () => {
        setup();

        expect(screen.getByLabelText('Заголовок')).toBeInTheDocument();
        expect(screen.getByLabelText(/Опис/)).toBeInTheDocument();
        expect(screen.getByLabelText('Статус')).toBeInTheDocument();
        expect(screen.getByLabelText('Пріоритет')).toBeInTheDocument();
        expect(screen.getByLabelText('Дата створення')).toBeInTheDocument();
        expect(screen.getByLabelText('Дата виконання')).toBeInTheDocument();

        const submitBtn = screen.getByRole('button', { name: 'Створити задачу' });
        expect(submitBtn).toBeDisabled();
    });

    it('Тестування валідації', async () => {
        const user = userEvent.setup();
        setup();

        const titleInput = screen.getByLabelText('Заголовок');
        const submitBtn = screen.getByRole('button', { name: 'Створити задачу' });

        await user.type(titleInput, 'abc');
        fireEvent.blur(titleInput);

        expect(await screen.findByText('Заголовок має бути більше 5 символів')).toBeInTheDocument();
        expect(submitBtn).toBeDisabled();
    });
});