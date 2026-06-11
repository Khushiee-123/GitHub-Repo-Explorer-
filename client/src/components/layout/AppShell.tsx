import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Main content container with max-width constraint and responsive padding.
 */
export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <main className="flex-1 w-full max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {children}
    </main>
  );
};
