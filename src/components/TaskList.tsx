'use client';

import React, { useState, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import TaskItem from './TaskItem';
import { Task, TaskStatus } from '@/types';
import { useTaskContext } from '@/context/TaskContext';

interface TaskListProps {
  onEdit: (task: Task) => void;
}

interface Filter {
  status: TaskStatus | 'ALL';
  searchQuery: string;
}

const ITEM_HEIGHT = 200; // Height of each task item in pixels
const WINDOW_HEIGHT = 800; // Height of the virtualized window

const TaskList: React.FC<TaskListProps> = React.memo(({ onEdit }) => {
  const { state, updateTask, deleteTask } = useTaskContext();
  const [filter, setFilter] = useState<Filter>({
    status: 'ALL',
    searchQuery: '',
  });

  const filteredTasks = useMemo(() => {
    return state.tasks.filter(task => {
      const matchesStatus = filter.status === 'ALL' || task.status === filter.status;
      const matchesSearch = task.title.toLowerCase().includes(filter.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [state.tasks, filter]);

  const Row = React.memo(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const task = filteredTasks[index];
    return (
      <div style={style}>
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={(id, status) => {
            updateTask({ ...task, status });
          }}
          onEdit={onEdit}
          onDelete={deleteTask}
        />
      </div>
    );
  });
  Row.displayName = 'TaskRow';

  return (
    <div className="task-list-container">
      <div className="task-list-filters mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="task-search" className="sr-only">Search tasks</label>
          <input
            id="task-search"
            type="text"
            placeholder="Search tasks..."
            value={filter.searchQuery}
            onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="task-search-input w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
          />
        </div>
        
        <div>
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select
            id="status-filter"
            value={filter.status}
            onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value as TaskStatus | 'ALL' }))}
            className="task-status-filter px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            aria-label="Filter by status"
          >
            <option value="ALL">All Tasks</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {state.tasks.length === 0 ? (
        <div className="task-list-empty text-center py-8 text-gray-400">
          No tasks yet. Add your first task!
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="task-list-empty text-center py-8 text-gray-400">
          No tasks match your filters.
        </div>
      ) : (
        <FixedSizeList
          height={WINDOW_HEIGHT}
          width="100%"
          itemCount={filteredTasks.length}
          itemSize={ITEM_HEIGHT}
        >
          {Row}
        </FixedSizeList>
      )}
    </div>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;
