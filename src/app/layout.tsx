import '../styles/globals.css';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Docster - Collaborate and Create Documents Effortlessly',
  description:
    'Docster is your go-to platform for seamless document creation and collaboration. Write, edit, and share in real-time with intuitive tools and a clean interface.',
  keywords:
    'docster, document editor, online collaboration, real-time editing, cloud documents, team collaboration, document sharing, productivity tools, text editing platform',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  );
};

export default RootLayout;
