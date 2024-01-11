import '@/app/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { Open_Sans } from 'next/font/google';

import type { Metadata } from 'next';

import { cn } from '@/lib/utils';

import { ModalProvider } from '@/components/providers/modal-provider';
import { QueryProvider } from '@/components/providers/query-provider';
// import { SocketProvider } from '@/components/providers/socket-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Acedia',
  description: 'Chat with your friends and family.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
          <Analytics />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="acedia-theme"
          >
            {/* <SocketProvider> */}
            <ModalProvider />
            <QueryProvider>{children}</QueryProvider>
            {/* </SocketProvider> */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
