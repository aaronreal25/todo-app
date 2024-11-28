'use client';

import React, { useState } from 'react';
import { Task, TaskStatus } from '@/types';
import { useTaskContext } from '@/context/TaskContext';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const { addTask, updateTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'PENDING' as TaskStatus,
    dueDate: task?.dueDate || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (task) {
      updateTask({
        ...task,
        ...formData,
      });
    } else {
      addTask(formData);
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form space-y-6">
      <div className="task-form-field">
        <label htmlFor="task-title" className="task-form-label block text-sm font-medium text-gray-200 mb-2">Title</label>
        <input
          id="task-title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="task-form-input-title mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
          required
        />
      </div>

      <div className="task-form-field">
        <label htmlFor="task-description" className="task-form-label block text-sm font-medium text-gray-200 mb-2">Description</label>
        <textarea
          id="task-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="task-form-input-description mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
          rows={4}
          required
        />
      </div>

      <div className="task-form-field">
        <label htmlFor="task-status" className="task-form-label block text-sm font-medium text-gray-200 mb-2">Status</label>
        <select
        id="task-status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
          className="task-form-select-status mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div className="task-form-field">
        <label htmlFor="task-due-date" className="task-form-label block text-sm font-medium text-gray-200 mb-2">Due Date</label>
        <input
          id="task-due-date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="task-form-input-date mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 px-2 py-2"
          required
        />
      </div>

      <div className="task-form-actions flex justify-end space-x-3 mt-8">
        <button
          type="button"
          onClick={onClose}
          className="task-form-button-cancel px-2 py-2 text-sm font-medium text-gray-200 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="task-form-button-submit px-2 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
