// Елементи у списку відображаються коректно (усі потрібні поля присутні).
// При порожньому списку — відображається empty state.
// При помилці — показується error message.

import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import TaskList from './TaskList';
import * as useAsyncHook from '../../../shared/hook/useAnyncTask';
import dateFormat from '../../../shared/utils/dateFormat';

describe('Тестування списку задач', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Елементи у списку відображаються коректно', () => {
        const mockCreatedAt = new Date('2024-01-01');
        const mockDeadline = new Date('2024-01-02');
        
        vi.spyOn(useAsyncHook, 'useAsyncTaskList').mockReturnValue({
            tasks: [
                {
                    id: 1,
                    title: "Task 1",
                    description: "Description 1",
                    status: "todo",
                    priority: "low",
                    createdAt: mockCreatedAt,
                    deadline: mockDeadline,
                },
                {
                    id: 2,
                    title: "Task 2",
                    description: "Description 2",
                    status: "done",
                    priority: "high",
                    createdAt: mockCreatedAt,
                    deadline: mockDeadline,
                },
            ],
            error: undefined,
        });

        render(
            <MemoryRouter>
                <TaskList />
            </MemoryRouter>
        );

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        
        expect(screen.getByText('Description 1')).toBeInTheDocument();
        expect(screen.getByText('Description 2')).toBeInTheDocument();
        
        expect(screen.getByText('todo')).toBeInTheDocument();
        expect(screen.getByText('done')).toBeInTheDocument();
        
        const expectedDateString = `${dateFormat(mockCreatedAt)} - ${dateFormat(mockDeadline)}`;
        expect(screen.getAllByText(expectedDateString)).toHaveLength(2);

        expect(screen.queryByText('Задачі не знайдено')).not.toBeInTheDocument();
    });

    it('При порожньому списку відображається empty state', () => {
        vi.spyOn(useAsyncHook, 'useAsyncTaskList').mockReturnValue({
            tasks: [],
            error: undefined,
        });

        render(
            <MemoryRouter>
                <TaskList />
            </MemoryRouter>
        );

        expect(screen.getByText('Задачі не знайдено')).toBeInTheDocument();
    });

    it('При помилці показується error message', () => {
        vi.spyOn(useAsyncHook, 'useAsyncTaskList').mockReturnValue({
            tasks: [],
            error: new Error('Помилка завантаження задач'),
        });

        render(
            <MemoryRouter>
                <TaskList />
            </MemoryRouter>
        );

        expect(screen.getByText('Помилка завантаження задач')).toBeInTheDocument();
    });
});
