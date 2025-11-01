// Елементи на сторінці деталей задачі відображаються коректно.
// При відсутності задачі показується empty state.
// Кнопка "Назад" переводить на сторінку списку задач.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, afterEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as useAsyncHook from '../../../shared/hook/useAnyncTask';

vi.mock('../../../shared/utils/dateFormat', () => ({
    default: () => 'DATE',
}));

import TaskDetails from './TaskDetails';

describe('Тестування деталей задачі', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Деталі задачі відображаються коректно', () => {
        const mockCreatedAt = new Date('2024-01-01');
        const mockDeadline = new Date('2024-01-02');
        
        vi.spyOn(useAsyncHook, 'useAsyncTaskDetails').mockReturnValue({
            task: {
                id: 1,
                title: 'Task 1',
                description: 'Description 1',
                status: 'todo',
                priority: 'low',
                createdAt: mockCreatedAt,
                deadline: mockDeadline,
            },
            error: undefined,
        });

        render(
            <MemoryRouter initialEntries={['/tasks/1']}>
                <Routes>
                    <Route path="/tasks/:id" element={<TaskDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText(/Опис:\s*Description 1/)).toBeInTheDocument();
        expect(screen.getByText(/Статус:\s*todo/)).toBeInTheDocument();
        expect(screen.getByText(/Пріоритет:\s*low/)).toBeInTheDocument();
        expect(screen.getByText(/Дата створення:\s*DATE/)).toBeInTheDocument();
        expect(screen.getByText(/Дата виконання:\s*DATE/)).toBeInTheDocument();
        expect(screen.queryByText('Задача не знайдена')).not.toBeInTheDocument();
    });

    it('При відсутності задачі показується empty state', () => {
        vi.spyOn(useAsyncHook, 'useAsyncTaskDetails').mockReturnValue({
            task: undefined,
            error: undefined,
        });

        render(
            <MemoryRouter initialEntries={['/tasks/999']}>
                <Routes>
                    <Route path="/tasks/:id" element={<TaskDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Задача не знайдена')).toBeInTheDocument();
    });

    it('При помилці показується error message', () => {
        vi.spyOn(useAsyncHook, 'useAsyncTaskDetails').mockReturnValue({
            task: undefined,
            error: new Error('Помилка завантаження задачі'),
        });

        render(
            <MemoryRouter initialEntries={['/tasks/1']}>
                <Routes>
                    <Route path="/tasks/:id" element={<TaskDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Помилка завантаження задачі')).toBeInTheDocument();
    });

    it('Кнопка "Назад" переводить на сторінку списку задач', () => {
        const mockCreatedAt = new Date('2024-01-01');
        const mockDeadline = new Date('2024-01-02');
        
        vi.spyOn(useAsyncHook, 'useAsyncTaskDetails').mockReturnValue({
            task: {
                id: 1,
                title: 'Task 1',
                description: 'Description 1',
                status: 'todo',
                priority: 'low',
                createdAt: mockCreatedAt,
                deadline: mockDeadline,
            },
            error: undefined,
        });

        render(
            <MemoryRouter initialEntries={['/tasks/1']}>
                <Routes>
                    <Route path="/tasks/:id" element={<TaskDetails />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Назад'));
    });
});