'use client';

import { DashboardNav } from '@/components/DashboardNav';
import { useState } from 'react';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const router = useRouter();
  const createJob = trpc.job.create.useMutation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skills: '',
    budgetType: 'fixed' as 'fixed' | 'hourly',
    budgetMin: '',
    budgetMax: '',
    durationDays: '',
    locationType: 'remote' as 'remote' | 'onsite' | 'hybrid',
    location: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createJob.mutateAsync({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skills: formData.skills.split(',').map(s => s.trim()),
        budgetType: formData.budgetType,
        budgetMin: parseFloat(formData.budgetMin) || undefined,
        budgetMax: parseFloat(formData.budgetMax) || undefined,
        durationDays: parseInt(formData.durationDays) || undefined,
        locationType: formData.locationType,
        location: formData.location || undefined,
      });

      router.push('/dashboard/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Опубликовать проект
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Основная информация */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название проекта *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Например: BIM-модель жилого дома"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Категория *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={e =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Выберите категорию</option>
                    <option value="Architectural BIM">Architectural BIM</option>
                    <option value="Structural BIM">Structural BIM</option>
                    <option value="MEP BIM">MEP BIM</option>
                    <option value="Construction BIM">Construction BIM</option>
                  </select>
                </div>
              </div>

              {/* Описание */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание проекта *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Подробное описание проекта, требования, объем работ..."
                />
              </div>

              {/* Навыки */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Требуемые навыки
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={e =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Revit, AutoCAD, Navisworks (через запятую)"
                />
              </div>

              {/* Бюджет и сроки */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип бюджета
                  </label>
                  <select
                    value={formData.budgetType}
                    onChange={e =>
                      setFormData({ ...formData, budgetType: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="fixed">Фиксированная цена</option>
                    <option value="hourly">Почасовая оплата</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Бюджет от (₽)
                  </label>
                  <input
                    type="number"
                    value={formData.budgetMin}
                    onChange={e =>
                      setFormData({ ...formData, budgetMin: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Бюджет до (₽)
                  </label>
                  <input
                    type="number"
                    value={formData.budgetMax}
                    onChange={e =>
                      setFormData({ ...formData, budgetMax: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="100000"
                  />
                </div>
              </div>

              {/* Сроки и локация */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Срок выполнения (дней)
                  </label>
                  <input
                    type="number"
                    value={formData.durationDays}
                    onChange={e =>
                      setFormData({ ...formData, durationDays: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип работы
                  </label>
                  <select
                    value={formData.locationType}
                    onChange={e =>
                      setFormData({ ...formData, locationType: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="remote">Удаленно</option>
                    <option value="onsite">В офисе</option>
                    <option value="hybrid">Гибрид</option>
                  </select>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={createJob.isPending}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {createJob.isPending
                    ? 'Публикация...'
                    : 'Опубликовать проект'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
