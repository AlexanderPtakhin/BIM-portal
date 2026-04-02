'use client';

import { trpc } from '@/trpc/client';
import Link from 'next/link';
import { useState } from 'react';

export default function JobsPage() {
  const [filters, setFilters] = useState({
    category: '',
    budget: '',
    status: '',
  });

  const { data: jobs, isLoading, error } = trpc.job.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">Загрузка проектов...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Ошибка загрузки проектов
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Проекты</h1>
              <Link
                href="/dashboard/post-job"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Опубликовать проект
              </Link>
            </div>

            {/* Фильтры */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Фильтры
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Категория
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Все категории</option>
                    <option value="Architectural BIM">Architectural BIM</option>
                    <option value="Structural BIM">Structural BIM</option>
                    <option value="MEP BIM">MEP BIM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Бюджет
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Любой бюджет</option>
                    <option value="0-50000">До 50 000₽</option>
                    <option value="50000-100000">50 000 - 100 000₽</option>
                    <option value="100000-200000">100 000 - 200 000₽</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Статус
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Все статусы</option>
                    <option value="PUBLISHED">Открыт для откликов</option>
                    <option value="IN_PROGRESS">В работе</option>
                    <option value="COMPLETED">Завершен</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Список проектов */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(jobs) && jobs.length > 0 ? (
                jobs.map(job => (
                  <div
                    key={job.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500">
                        Бюджет: {Number(job.budgetMin)} -{' '}
                        {Number(job.budgetMax)}₽
                      </div>
                      <div className="text-sm text-gray-500">
                        Срок: {job.durationDays} дней
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/jobs/${job.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Подробнее
                      </Link>
                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                        Откликнуться
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Проекты не найдены</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
