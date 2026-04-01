'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { DashboardNav } from '@/components/DashboardNav';
import Image from 'next/image';

export default function FreelancerDashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Мой профиль
              </h1>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Фрилансер
              </span>
            </div>
            <nav className="flex space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Общий
              </Link>
              <Link
                href="/dashboard/profile"
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Профиль
              </Link>
              <Link
                href="/dashboard/jobs"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Мои проекты
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Профиль карточка */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <Image
                    className="h-16 w-16 rounded-full object-cover"
                    src="https://ui-avatars.com/api/?name=BIM+Specialist&background=random&bold=true"
                    alt="Profile"
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {user?.firstName || 'BIM'} {user?.lastName || 'Специалист'}
                  </h2>
                  <p className="text-gray-600">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    О себе
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Профессиональный BIM-специалист с 5+ лет опытом в
                    архитектурном проектировании. Работаю с Revit, AutoCAD,
                    ArchiCAD.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Revit
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      AutoCAD
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      ArchiCAD
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Специализация
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        BIM-моделирование
                      </h4>
                      <p className="text-sm text-gray-600">
                        Архитектурные и конструктивные модели
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        КЖ/КМ разделы
                      </h4>
                      <p className="text-sm text-gray-600">
                        Конструктивные расчеты
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Статистика
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">Проектов</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        4.8
                      </div>
                      <div className="text-sm text-gray-600">Рейтинг</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        ₽850К
                      </div>
                      <div className="text-sm text-gray-600">Средний чек</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Кнопка действия */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Быстрые действия
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Найти проекты
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Предложить услуги
                </button>
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Настройки профиля
                </button>
              </div>
            </div>

            {/* Статус */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Статус профиля
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Верификация</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Подтвержден
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Рейтинг</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="ml-2 text-sm text-gray-600">4.8 из 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
