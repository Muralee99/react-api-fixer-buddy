import React from 'react';
import { NotificationsDropdown } from './NotificationsDropdown';
import { Button } from './button';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Dashboard" }) => {
  return (
    <header className="bg-background border-b border-border px-6 py-2 h-full flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Link to="/" aria-label="Go to Home">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <NotificationsDropdown />
        </div>
      </div>
    </header>
  );
};