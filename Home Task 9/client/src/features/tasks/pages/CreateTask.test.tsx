/*
Елементи у списку відображаються коректно (усі потрібні поля присутні).
При порожньому списку — відображається empty state.
При помилці — показується error message.
*/

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import CreateTask from './CreateTask';

describe('Тестування формы создания задачи', () => {
    it('Елементи у списку відображаються коректно', () => {
        render(
            <MemoryRouter>
                <CreateTask />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Користувач')).toBeInTheDocument();
        expect(screen.getByLabelText('Заголовок')).toBeInTheDocument();
        expect(screen.getByLabelText('Опис (Не обовʼязково)')).toBeInTheDocument();
        expect(screen.getByLabelText('Статус')).toBeInTheDocument();
        expect(screen.getByLabelText('Пріоритет')).toBeInTheDocument();
        expect(screen.getByLabelText('Дата виконання')).toBeInTheDocument();
        expect(screen.getByText('Створити задачу')).toBeInTheDocument();
    });

    it('При помилці валідації, показується error message', async () => {
        render(
            <MemoryRouter>
                <CreateTask />
            </MemoryRouter>
        );

        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 2);
        const formattedPastDate = pastDate.toISOString().split('T')[0];

        fireEvent.change(screen.getByLabelText('Користувач'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Заголовок'), { target: { value: '1' } }); // менше 5 символів
        fireEvent.change(screen.getByLabelText('Статус'), { target: { value: 'todo' } });
        fireEvent.change(screen.getByLabelText('Пріоритет'), { target: { value: 'low' } });
        fireEvent.change(screen.getByLabelText('Дата виконання'), { target: { value: formattedPastDate } });

        fireEvent.click(screen.getByText('Створити задачу'));

        expect(await screen.findByText('Заголовок має бути більше 5 символів')).toBeInTheDocument();
    });

    it('Кнопка disabled, якщо валідація не пройдена', () => {
        render(
            <MemoryRouter>
                <CreateTask />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Заголовок'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Статус'), { target: { value: 'todo' } });
        fireEvent.change(screen.getByLabelText('Пріоритет'), { target: { value: 'low' } });

        expect(screen.getByText('Створити задачу')).toBeDisabled();
    });

    it('Кнопка доступна, якщо валідація пройдена', () => {
        render(
            <MemoryRouter>
                <CreateTask />
            </MemoryRouter>
        );

        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const formattedPastDate = pastDate.toISOString().split('T')[0];
        
        fireEvent.change(screen.getByLabelText('Заголовок'), { target: { value: '12345' } });
        fireEvent.change(screen.getByLabelText('Опис (Не обовʼязково)'), { target: { value: 'test' } });
        fireEvent.change(screen.getByLabelText('Статус'), { target: { value: 'in_progress' } });
        fireEvent.change(screen.getByLabelText('Пріоритет'), { target: { value: 'medium' } });
        fireEvent.change(screen.getByLabelText('Дата виконання'), { target: { value: formattedPastDate } });

        waitFor(() => {
            expect(screen.getByText('Створити задачу')).toBeEnabled();
        });
    });
});