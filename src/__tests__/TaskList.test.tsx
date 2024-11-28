import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '@/components/TaskList';
import { TaskContext } from '@/context/TaskContext';
import { Task, TaskStatus } from '@/types';

describe('TaskList', () => {
  const mockOnEdit = jest.fn();

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'PENDING' as TaskStatus,
      dueDate: '2024-12-31',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'IN_PROGRESS' as TaskStatus,
      dueDate: '2024-12-31',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      title: 'Completed Task',
      description: 'Description 3',
      status: 'COMPLETED' as TaskStatus,
      dueDate: '2024-12-31',
      createdAt: '2024-01-01'
    }
  ];

  const mockContextValue = {
    state: {
      tasks: mockTasks,
      isLoading: false,
      error: null
    },
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state when no tasks', () => {
    const emptyContextValue = {
      ...mockContextValue,
      state: { ...mockContextValue.state, tasks: [] }
    };

    render(
      <TaskContext.Provider value={emptyContextValue}>
        <TaskList onEdit={mockOnEdit} />
      </TaskContext.Provider>
    );

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('shows no matches message when filter returns no results', () => {
    render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskList onEdit={mockOnEdit} />
      </TaskContext.Provider>
    );

    // Search for non-existent task
    const searchInput = screen.getByPlaceholderText(/search tasks/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent task' } });

    expect(screen.getByText(/no tasks match your filters/i)).toBeInTheDocument();
  });

  it('filters tasks by status correctly', () => {
    render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskList onEdit={mockOnEdit} />
      </TaskContext.Provider>
    );

    const statusFilter = screen.getByLabelText(/filter by status/i);

    // Test COMPLETED filter
    fireEvent.change(statusFilter, { target: { value: 'COMPLETED' } });
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();

    // Test PENDING filter
    fireEvent.change(statusFilter, { target: { value: 'PENDING' } });
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();
  });

  // Snapshot tests
  describe('Snapshots', () => {
    it('matches snapshot with multiple tasks', () => {
      const { container } = render(
        <TaskContext.Provider value={mockContextValue}>
          <TaskList onEdit={mockOnEdit} />
        </TaskContext.Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot with no tasks', () => {
      const emptyContextValue = {
        ...mockContextValue,
        state: { ...mockContextValue.state, tasks: [] }
      };

      const { container } = render(
        <TaskContext.Provider value={emptyContextValue}>
          <TaskList onEdit={mockOnEdit} />
        </TaskContext.Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot with filtered tasks', () => {
      const { container } = render(
        <TaskContext.Provider value={mockContextValue}>
          <TaskList onEdit={mockOnEdit} />
        </TaskContext.Provider>
      );

      const statusFilter = screen.getByLabelText(/filter by status/i);
      fireEvent.change(statusFilter, { target: { value: 'COMPLETED' } });

      expect(container).toMatchSnapshot();
    });
  });
});