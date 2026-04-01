import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                BIM Portal
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Профессиональная биржа фрилансеров в нише BIM-проектирования.
                Соединяем заказчиков с квалифицированными специалистами.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-up"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Начать работу
                </Link>
                <Link
                  href="/jobs"
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Найти специалиста
                </Link>
                <Link
                  href="/api/jobs"
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Все вакансии
                </Link>
                <Link
                  href="/create-user"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Создать пользователя
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Почему выбирают BIM Portal
              </h2>
              <p className="text-xl text-gray-600">
                Все инструменты для эффективной работы над BIM-проектами
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A9.002 9.002 0 0112 21a9.002 9.002 0 01-9-9.255A9.002 9.002 0 0112 3a9.002 9.002 0 019 9.255z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Проверенные специалисты
                </h3>
                <p className="text-gray-600">
                  Только квалифицированные BIM-профессионалы с портфолио и
                  отзывами
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Безопасные сделки
                </h3>
                <p className="text-gray-600">
                  Защита платежей и гарантия выполнения работ
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Удобный чат</h3>
                <p className="text-gray-600">
                  Прямая коммуникация между заказчиком и исполнителем
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  500+
                </div>
                <div className="text-xl text-gray-600">BIM-специалистов</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  1000+
                </div>
                <div className="text-xl text-gray-600">
                  Завершенных проектов
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-xl text-gray-600">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
