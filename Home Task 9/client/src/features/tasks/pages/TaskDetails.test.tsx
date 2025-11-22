import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import TaskDetails from "./TaskDetails";
import type { Task } from "../type.schema";
import dateFormat from "../../../shared/utils/dateFormat";

import useAsyncTaskDetails from "../../../shared/hook/useAsyncTaskDetails";
import useAsyncUserDetails from "../../../shared/hook/useAsyncUserDetails";

vi.mock("../../../shared/hook/useAsyncTaskDetails", () => ({
  default: vi.fn(),
}));

vi.mock("../../../shared/hook/useAsyncUserDetails", () => ({
  default: vi.fn(),
}));

describe("Тестування сторінки детального перегляду задачі", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockTask: Task = {
    id: "1",
    userId: "user1",
    title: "Test Task",
    description: "Test Description",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date("2024-01-01T00:00:00Z"),
    deadline: new Date("2024-01-05T00:00:00Z"),
  };

  it("Елементи у списку відображаються коректно", () => {
    (useAsyncTaskDetails as Mock).mockReturnValue({
      task: mockTask,
      error: undefined,
    });

    (useAsyncUserDetails as Mock).mockReturnValue({
      user: { name: mockTask.userId },
      error: undefined,
    });

    render(
      <MemoryRouter initialEntries={["/tasks/1"]}>
        <Routes>
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(
      screen.getByText(`Виконавець: ${mockTask.userId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Опис: ${mockTask.description}`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Статус: ${mockTask.status}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Пріоритет: ${mockTask.priority}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Дата створення: ${dateFormat(mockTask.createdAt)}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Дата виконання: ${dateFormat(mockTask.deadline)}`),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Назад" })).toBeInTheDocument();
  });

  it("При порожньому списку — відображається empty state", () => {
    (useAsyncTaskDetails as Mock).mockReturnValue({
      task: undefined,
      error: undefined,
    });

    (useAsyncUserDetails as Mock).mockReturnValue({
      user: undefined,
      error: undefined,
    });

    render(
      <MemoryRouter initialEntries={["/tasks/2"]}>
        <Routes>
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Задача не знайдена")).toBeInTheDocument();
  });

  it("При помилці — показується error message", () => {
    const userError = new Error("Помилка при завантаженні користувача");

    (useAsyncTaskDetails as Mock).mockReturnValue({
      task: mockTask,
      error: undefined,
    });

    (useAsyncUserDetails as Mock).mockReturnValue({
      user: undefined,
      error: userError,
    });

    render(
      <MemoryRouter initialEntries={["/tasks/3"]}>
        <Routes>
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(userError.message)).toBeInTheDocument();
  });
});
