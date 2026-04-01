'use client'

import { DashboardNav } from '@/components/DashboardNav'

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Мои проекты</h1>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Найти проекты
              </button>
            </div>

            {/* Фильтры */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Фильтры</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Категория
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2">
                    <option>Все категории</option>
                    <option>Architectural BIM</option>
                    <option>Structural BIM</option>
                    <option>MEP BIM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Бюджет
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2">
                    <option>Любой бюджет</option>
                    <option>До 50 000₽</option>
                    <option>50 000 - 100 000₽</option>
                    <option>100 000 - 200 000₽</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Статус
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2">
                    <option>Все статусы</option>
                    <option>Открыт для откликов</option>
                    <option>В работе</option>
                    <option>Завершен</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Список проектов */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((project) => (
                <div key={project} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      BIM-модель жилого комплекса
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      В работе
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Нужна BIM-модель 5-этажного жилого дома в Revit с детализацией конструктивов и инженерных сетей.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      Бюджет: 50 000 - 80 000₽
                    </div>
                    <div className="text-sm text-gray-500">
                      Срок: 2 недели
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      Подробнее
                    </button>
                    <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      Откликнуться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
