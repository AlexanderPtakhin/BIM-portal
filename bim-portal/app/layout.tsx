import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BIM Portal',
  description: 'Биржа фрилансеров в нише BIM-проектирования',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="ru"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <header className="flex justify-end items-center p-4 gap-4 h-16 border-b">
            <SignInButton mode="modal">
              <button className="text-sm font-medium hover:text-blue-600">
                Войти
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 text-white rounded-full font-medium text-sm h-10 px-4 hover:bg-blue-700">
                Регистрация
              </button>
            </SignUpButton>
            <UserButton />
          </header>
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
