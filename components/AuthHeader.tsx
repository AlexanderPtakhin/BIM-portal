'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Briefcase } from 'lucide-react';

export function AuthHeader() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <header className="flex justify-between items-center px-6 py-3 h-16 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          BIM Portal
        </Link>
        {isSignedIn && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Дашборд
            </Link>
            <Link
              href="/jobs"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Вакансии
            </Link>
            <Link
              href="/freelancers"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Фрилансеры
            </Link>
          </nav>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {!isSignedIn ? (
          <>
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Войти</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Регистрация</Link>
            </Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.imageUrl}
                    alt={user?.firstName || ''}
                  />
                  <AvatarFallback>
                    {user?.firstName?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Дашборд
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Профиль
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Настройки
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
