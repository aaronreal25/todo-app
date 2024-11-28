'use client';

import React from 'react';
import { format } from 'date-fns';
import { Task, TaskStatus } from '@/types';

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ 
  task, 
  onStatusChange, 
  onEdit, 
  onDelete 
}) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  const dueDate = new Date(task.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  const isOverdue = dueDate < currentDate;

  const getBorderColor = (status: TaskStatus): string => {
    switch (status) {
      case 'PENDING':
        return 'border-yellow-500';
      case 'IN_PROGRESS':
        return 'border-blue-500';
      case 'COMPLETED':
        return 'border-green-500';
      default:
        return 'border-gray-700';
    }
  };

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-900 text-yellow-100';
      case 'IN_PROGRESS':
        return 'bg-blue-900 text-blue-100';
      case 'COMPLETED':
        return 'bg-green-900 text-green-100';
      default:
        return 'bg-gray-800 text-gray-100';
    }
  };

  const borderColor = getBorderColor(task.status);
  const finalBorderClass = isOverdue && task.status !== 'COMPLETED' 
    ? 'border-red-500' 
    : borderColor;

  return (
    <div data-testid="task-item" className={`task-item p-4 mb-4 border-2 rounded-lg bg-gray-800 ${finalBorderClass}`}>
      <div className="task-item-header flex justify-between items-center mb-2">
        <h3 className="task-item-title text-lg font-semibold text-white">{task.title}</h3>
        <span 
          role="status"
          aria-label={task.status.toLowerCase()}
          className={`task-item-status px-2 py-1 rounded ${getStatusColor(task.status)}`}
        >
          {task.status.replace('_', ' ')}
        </span>
      </div>
      
      <p className="task-item-description text-gray-300 mb-2">{task.description}</p>
      <p className={`task-item-due-date text-sm ${isOverdue && task.status !== 'COMPLETED' ? 'text-red-400 font-semibold' : 'text-gray-400'}`}>
        Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
      </p>

      <div className="task-item-controls flex justify-between mt-4">
        <select
          className="task-status-select p-2 border rounded bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <div className="task-item-buttons space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="task-edit-button px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="task-delete-button px-3 py-1 bg-red-600 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;
