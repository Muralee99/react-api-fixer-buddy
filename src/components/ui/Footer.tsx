import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border px-6 py-2 flex items-center justify-center">
      <p className="text-sm text-muted-foreground">
        © 2024 Data Pipeline Management. All rights reserved.
      </p>
    </footer>
  );
};