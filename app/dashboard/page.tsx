import { DashboardLayout } from '@/components/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Users,
  TrendingUp,
  DollarSign,
  FileText,
  Calendar,
  Star,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Активные проекты',
      value: '12',
      change: '+2 за неделю',
      changeType: 'positive' as const,
      icon: Briefcase,
    },
    {
      title: 'Заработано',
      value: '₽245,000',
      change: '+15% за месяц',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Рейтинг',
      value: '4.8',
      change: '+0.2 за месяц',
      changeType: 'positive' as const,
      icon: Star,
    },
    {
      title: 'Отклики',
      value: '89%',
      change: '+5% за неделю',
      changeType: 'positive' as const,
      icon: FileText,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: 'Новый отклик на проект "BIM-моделирование офисного центра"',
      description: 'Иван Петров откликнулся на вашу вакансию',
      time: '2 часа назад',
      type: 'proposal',
    },
    {
      id: 2,
      title: 'Проект завершен',
      description: 'Контракт #1234 успешно завершен',
      time: '5 часов назад',
      type: 'completed',
    },
    {
      id: 3,
      title: 'Новый отзыв',
      description: 'Ольга Смирнова оставила отзыв 5 звезд',
      time: '1 день назад',
      type: 'review',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Добро пожаловать в BIM Portal!
          </h1>
          <p className="text-gray-600">
            Управляйте вашими проектами и карьерой в BIM-индустрии
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(stat => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>
                Частые задачи для быстрого доступа
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/dashboard/post-job">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Создать новую вакансию
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <Link href="/jobs">
                  <Users className="mr-2 h-4 w-4" />
                  Найти фрилансеров
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <Link href="/dashboard/profile">
                  <FileText className="mr-2 h-4 w-4" />
                  Обновить профиль
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
              <CardDescription>Самые свежие события</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === 'proposal' && (
                        <FileText className="h-4 w-4 text-blue-500" />
                      )}
                      {activity.type === 'completed' && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                      {activity.type === 'review' && (
                        <Star className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge variant="secondary" className="text-xs">
                        {activity.time}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>Советы для успеха</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-1">Заполните профиль</h3>
                <p className="text-sm text-gray-600">
                  Детальный профиль увеличивает шансы на получение проектов
                </p>
              </div>
              <div className="text-center p-4">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium mb-1">Собирайте отзывы</h3>
                <p className="text-sm text-gray-600">
                  Положительные отзывы повышают ваш рейтинг и доверие
                </p>
              </div>
              <div className="text-center p-4">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium mb-1">Будьте активны</h3>
                <p className="text-sm text-gray-600">
                  Регулярно проверяйте новые проекты и откликайтесь быстро
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
