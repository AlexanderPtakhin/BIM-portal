'use client';

import { DashboardNav } from '@/components/DashboardNav';
import { trpc } from '@/trpc/client';
import { useParams } from 'next/navigation';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;

  const {
    data: job,
    isLoading,
    error,
  } = trpc.job.getById.useQuery({ id: jobId });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNav />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">Загрузка проекта...</div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNav />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">Проект не найден</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {job.title}
                </h1>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {job.status}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Категория: {job.category}</span>
                <span>•</span>
                <span>
                  Бюджет: {Number(job.budgetMin)} - {Number(job.budgetMax)}₽
                </span>
                <span>•</span>
                <span>Срок: {job.durationDays} дней</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Описание проекта
              </h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Client Info */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Заказчик
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {('client' in job && job.client?.user?.name
                      ? job.client.user.name[0]
                      : 'U'
                    ).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {'client' in job && job.client?.user?.name
                      ? job.client.user.name
                      : 'Неизвестный заказчик'}
                  </p>
                  <p className="text-sm text-gray-500">Заказчик</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Отправить предложение
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                Сохранить в избранное
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
