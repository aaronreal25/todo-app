'use client';

import React, { useState } from 'react';
import { TaskProvider } from '@/context/TaskContext';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import Dialog from '@/components/Dialog';
import { Task } from '@/types';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  return (
    <TaskProvider>
      <main className="task-manager-main container mx-auto px-4 py-8 max-w-4xl">
        <div className="task-manager-header flex justify-between items-center mb-8">
          <h1 className="task-manager-title text-3xl font-bold text-white">Task Manager</h1>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="task-add-button px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>

        <TaskList onEdit={handleEditTask} />

        <Dialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          title={editingTask ? 'Edit Task' : 'Add New Task'}
        >
          <TaskForm
            task={editingTask}
            onClose={handleCloseDialog}
          />
        </Dialog>
      </main>
    </TaskProvider>
  );
}