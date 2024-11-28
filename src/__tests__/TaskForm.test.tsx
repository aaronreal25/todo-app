import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '@/components/TaskForm';
import { TaskProvider, TaskContext } from '@/context/TaskContext';
import { Task, TaskStatus } from '@/types';

describe('TaskForm', () => {
  const mockOnClose = jest.fn();
  const mockAddTask = jest.fn();
  const mockUpdateTask = jest.fn();

  const mockContextValue = {
    state: { tasks: [], isLoading: false, error: null },
    addTask: mockAddTask,
    updateTask: mockUpdateTask,
    deleteTask: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Render test
  it('renders empty form correctly', () => {
    render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskForm onClose={mockOnClose} />
      </TaskContext.Provider>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('submits new task correctly', () => {
    render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskForm onClose={mockOnClose} />
      </TaskContext.Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), { 
      target: { value: 'New Task' } 
    });
    fireEvent.change(screen.getByLabelText(/description/i), { 
      target: { value: 'New Description' } 
    });
    fireEvent.change(screen.getByLabelText(/status/i), { 
      target: { value: 'IN_PROGRESS' } 
    });
    fireEvent.change(screen.getByLabelText(/due date/i), { 
      target: { value: '2024-12-31' } 
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    // Check if addTask was called with correct data
    expect(mockAddTask).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'New Description',
      status: 'IN_PROGRESS',
      dueDate: '2024-12-31'
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('updates existing task correctly', () => {
    const existingTask: Task = {
      id: '1',
      title: 'Existing Task',
      description: 'Existing Description',
      status: 'PENDING' as TaskStatus,
      dueDate: '2024-12-31',
      createdAt: '2024-01-01'
    };

    render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskForm task={existingTask} onClose={mockOnClose} />
      </TaskContext.Provider>
    );

    // Verify form is pre-filled
    expect(screen.getByLabelText(/title/i)).toHaveValue('Existing Task');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Existing Description');
    expect(screen.getByLabelText(/status/i)).toHaveValue('PENDING');
    expect(screen.getByLabelText(/due date/i)).toHaveValue('2024-12-31');

    // Update the task
    fireEvent.change(screen.getByLabelText(/title/i), { 
      target: { value: 'Updated Task' } 
    });
    fireEvent.click(screen.getByRole('button', { name: /update task/i }));

    // Check if updateTask was called with correct data
    expect(mockUpdateTask).toHaveBeenCalledWith({
      ...existingTask,
      title: 'Updated Task'
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  // Snapshot tests
  describe('Snapshots', () => {
    it('matches snapshot for empty form', () => {
      const { container } = render(
        <TaskContext.Provider value={mockContextValue}>
          <TaskForm onClose={mockOnClose} />
        </TaskContext.Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot for edit form', () => {
      const existingTask: Task = {
        id: '1',
        title: 'Existing Task',
        description: 'Existing Description',
        status: 'PENDING' as TaskStatus,
        dueDate: '2024-12-31',
        createdAt: '2024-01-01'
      };

      const { container } = render(
        <TaskContext.Provider value={mockContextValue}>
          <TaskForm task={existingTask} onClose={mockOnClose} />
        </TaskContext.Provider>
      );
      expect(container).toMatchSnapshot();
    });
  });
});