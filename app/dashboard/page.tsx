import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">BIM Portal Dashboard</h1>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Добро пожаловать в Dashboard!</h2>
              <p className="text-gray-600 mb-8">Здесь будет основная функциональность платформы</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                {/* Для фрилансеров */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Для фрилансеров</h3>
                  <p className="text-blue-700 mb-4">Управление профилем и проектами</p>
                  <div className="space-y-2">
                    <Link href="/dashboard/profile" className="block bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700">
                      Мой профиль
                    </Link>
                    <Link href="/jobs" className="block bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700">
                      Найти проекты
                    </Link>
                  </div>
                </div>

                {/* Для заказчиков */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Для заказчиков</h3>
                  <p className="text-green-700 mb-4">Управление вакансиями</p>
                  <div className="space-y-2">
                    <Link href="/dashboard/post-job" className="block bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700">
                      Создать вакансию
                    </Link>
                    <Link href="/dashboard/my-jobs" className="block bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700">
                      Мои вакансии
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
