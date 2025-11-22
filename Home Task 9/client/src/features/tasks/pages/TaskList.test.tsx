import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import TaskList from "./TaskList";
import useAsyncTaskList from "../../../shared/hook/useAsyncTaskList";
import dateFormat from "../../../shared/utils/dateFormat";

vi.mock("../../../shared/hook/useAsyncTaskList", () => ({
  default: vi.fn(),
}));

const renderTaskList = () =>
  render(
    <MemoryRouter initialEntries={["/tasks"]}>
      <Routes>
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </MemoryRouter>,
  );

describe("Тестування сторінки списку задач", () => {
  const mockTasks = [
    {
      id: 1,
      userId: "user1",
      title: "Test Task",
      description: "Test Description",
      status: "todo",
      priority: "medium",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      deadline: new Date("2024-01-05T00:00:00Z"),
    },
    {
      id: 2,
      userId: "user2",
      title: "Test Task 2",
      description: "Test Description 2",
      status: "in_progress",
      priority: "medium",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      deadline: new Date("2024-01-05T00:00:00Z"),
    },
    {
      id: 3,
      userId: "user3",
      title: "Test Task 3",
      description: "Test Description 3",
      status: "in_progress",
      priority: "medium",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      deadline: new Date("2024-01-05T00:00:00Z"),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Елементи у списку відображаються коректно", () => {
    (useAsyncTaskList as Mock).mockReturnValue({
      tasks: mockTasks,
      error: undefined,
    });

    renderTaskList();

    for (const task of mockTasks) {
      const taskItem = screen.getByText(task.title).closest("li");
      expect(taskItem).not.toBeNull();

      expect(taskItem).toHaveTextContent(task.description);
      expect(taskItem).toHaveTextContent(task.status);
      expect(taskItem).toHaveTextContent(dateFormat(task.createdAt));
      expect(taskItem).toHaveTextContent(dateFormat(task.deadline));
    }
  });

  it("При порожньому списку — відображається empty state", () => {
    (useAsyncTaskList as Mock).mockReturnValue({
      tasks: [],
      error: undefined,
    });

    renderTaskList();

    expect(screen.getByText("Список задач порожній")).toBeInTheDocument();
  });

  it("При помилці — показується error message", () => {
    const taskError = new Error("Невідома помилка");

    (useAsyncTaskList as Mock).mockReturnValue({
      tasks: [],
      error: taskError,
    });

    renderTaskList();

    expect(screen.getByText("Помилка завантаження задач")).toBeInTheDocument();
  });
});
