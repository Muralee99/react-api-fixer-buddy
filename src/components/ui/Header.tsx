import React from 'react';
import { NotificationsDropdown } from './NotificationsDropdown';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Dashboard" }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center gap-4">
          <NotificationsDropdown />
        </div>
      </div>
    </header>
  );
};