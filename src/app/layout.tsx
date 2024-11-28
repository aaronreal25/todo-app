import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'A feature-rich task management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="body min-h-screen bg-gray-900">
        {children}
      </body>
    </html>
  );
}