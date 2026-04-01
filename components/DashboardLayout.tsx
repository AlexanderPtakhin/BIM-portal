'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Settings,
  FileText,
  Star,
  Calendar,
  DollarSign,
  Menu,
  X,
} from 'lucide-react';

const navigation = [
  { name: 'Обзор', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Мои вакансии', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Отклики', href: '/dashboard/proposals', icon: FileText },
  { name: 'Контракты', href: '/dashboard/contracts', icon: DollarSign },
  { name: 'Сообщения', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Отзывы', href: '/dashboard/reviews', icon: Star },
  { name: 'Календарь', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Настройки', href: '/dashboard/settings', icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          sidebarOpen ? 'block' : 'hidden',
        )}
      >
        <div
          className="fixed inset-0 bg-gray-900/80"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <h2 className="text-lg font-semibold">BIM Portal</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h2 className="text-xl font-bold text-blue-600">BIM Portal</h2>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="ml-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex flex-1 justify-center items-center">
            <h2 className="text-lg font-semibold">BIM Portal</h2>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
