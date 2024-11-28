'use client';

import React from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="task-dialog-overlay fixed inset-0 z-50 overflow-y-auto">
      <div className="task-dialog-wrapper flex items-center justify-center min-h-screen px-4">
        <div className="task-dialog-backdrop fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="task-dialog-content relative bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
          <h2 className="task-dialog-title text-xl font-semibold mb-4 text-white">{title}</h2>
          <div className="task-dialog-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
