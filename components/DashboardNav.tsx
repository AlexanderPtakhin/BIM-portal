'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import Image from 'next/image';

export function DashboardNav() {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const isActive = (path: string) => pathname === path;

  const handleSignOut = () => {
    signOut(() => {
      window.location.href = '/';
    });
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-blue-600">
              BIM Portal
            </Link>

            {isSignedIn && (
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Общий
                </Link>
                <Link
                  href="/dashboard/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard/profile')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Профиль
                </Link>
                <Link
                  href="/dashboard/jobs"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard/jobs')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Мои проекты
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Войти
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Регистрация
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {user?.firstName} {user?.lastName}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded"
                >
                  Выйти
                </button>
                <div className="flex-shrink-0">
                  <Image
                    className="h-8 w-8 rounded-full object-cover"
                    src={
                      user?.imageUrl ||
                      'https://ui-avatars.com/api/?name=User&background=random&bold=true'
                    }
                    alt="Profile"
                    width={32}
                    height={32}
                    unoptimized
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
