import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from '@/components/TaskItem';
import { Task, TaskStatus } from '@/types';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'PENDING' as TaskStatus,
  dueDate: new Date().toISOString().split('T')[0],
  createdAt: new Date().toISOString(),
};

describe('TaskItem', () => {
  const mockOnStatusChange = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Interaction tests
  it('renders task details correctly', () => {
    render(
      <TaskItem
        task={mockTask}
        onStatusChange={mockOnStatusChange}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('PENDING')).toBeInTheDocument();
  });

  it('calls onStatusChange when status is changed', () => {
    render(
      <TaskItem
        task={mockTask}
        onStatusChange={mockOnStatusChange}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'IN_PROGRESS' }
    });

    expect(mockOnStatusChange).toHaveBeenCalledWith('1', 'IN_PROGRESS');
  });

  it('calls handlers when buttons are clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        onStatusChange={mockOnStatusChange}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  // Snapshot tests
  describe('Snapshots', () => {
    it('matches snapshot for pending task', () => {
      const { container } = render(
        <TaskItem
          task={mockTask}
          onStatusChange={mockOnStatusChange}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot for in-progress task', () => {
      const inProgressTask = { ...mockTask, status: 'IN_PROGRESS' as TaskStatus };
      const { container } = render(
        <TaskItem
          task={inProgressTask}
          onStatusChange={mockOnStatusChange}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot for completed task', () => {
      const completedTask = { ...mockTask, status: 'COMPLETED' as TaskStatus };
      const { container } = render(
        <TaskItem
          task={completedTask}
          onStatusChange={mockOnStatusChange}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot for overdue task', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const overdueTask = {
        ...mockTask,
        dueDate: pastDate.toISOString().split('T')[0]
      };
      const { container } = render(
        <TaskItem
          task={overdueTask}
          onStatusChange={mockOnStatusChange}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(container).toMatchSnapshot();
    });
  });
});