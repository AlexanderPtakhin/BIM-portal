'use client'

import { useUser } from '@clerk/nextjs'
import { DashboardNav } from '@/components/DashboardNav'

export default function ProfilePage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src="https://ui-avatars.com/api/?name=BIM+Specialist&background=random&bold=true"
                  alt="Profile"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.firstName || 'BIM'} {user?.lastName || 'Специалист'}
                </h1>
                <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Основная информация */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Основная информация</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        defaultValue={user?.firstName || ''}
                        className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Фамилия
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        defaultValue={user?.lastName || ''}
                        className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Специализация */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Специализация</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label className="text-sm text-gray-700">BIM-моделирование</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label className="text-sm text-gray-700">AutoCAD</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label className="text-sm text-gray-700">ArchiCAD</label>
                  </div>
                </div>
              </div>

              {/* О себе */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">О себе</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                      Описание
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900"
                    defaultValue="Профессиональный BIM-специалист с 5+ лет опытом в архитектурном проектировании. Работаю с Revit, AutoCAD, ArchiCAD."
                  />
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex justify-end space-x-3 mt-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
