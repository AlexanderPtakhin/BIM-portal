'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

export function DashboardNav() {
  const pathname = usePathname();
  const { user } = useUser();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900">
              BIM Portal
            </Link>

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
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {user?.firstName} {user?.lastName}
            </span>
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
        </div>
      </div>
    </nav>
  );
}
