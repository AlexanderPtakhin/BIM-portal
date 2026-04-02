'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Plus, X, MapPin, Globe, DollarSign } from 'lucide-react';

const skills = [
  'Revit',
  'ArchiCAD',
  'AutoCAD',
  '3ds Max',
  'SketchUp',
  'Navisworks',
  'Tekla',
  'Rhino',
  'Grasshopper',
  'V-Ray',
];

export default function ProfilePage() {
  const { user } = useUser();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Revit',
    'AutoCAD',
  ]);
  const [newSkill, setNewSkill] = useState('');

  const [profile, setProfile] = useState({
    title: 'BIM-моделлер',
    bio: 'Специализируюсь на BIM-моделировании зданий и сооружений. Имею опыт работы с крупными коммерческими проектами.',
    location: 'Москва',
    website: 'https://example.com',
    hourlyRate: '3500',
    level: 'PRO',
  });

  const addSkill = () => {
    if (newSkill && !selectedSkills.includes(newSkill)) {
      setSelectedSkills([...selectedSkills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Профиль фрилансера
            </h1>
            <p className="text-gray-600">
              Управление вашим профилем и портфолио
            </p>
          </div>
          <Button>Сохранить изменения</Button>
        </div>

        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>
              Базовая информация о вас как о фрилансере
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.firstName?.[0]?.toUpperCase() || 'Ф'}
                  {user?.lastName?.[0]?.toUpperCase() || 'И'}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Загрузить фото
                </Button>
                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG до 5MB
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  id="firstName"
                  defaultValue={user?.firstName || ''}
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Фамилия</Label>
                <Input
                  id="lastName"
                  defaultValue={user?.lastName || ''}
                  placeholder="Ваша фамилия"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Заголовок профиля</Label>
                <Input
                  id="title"
                  value={profile.title}
                  onChange={e =>
                    setProfile({ ...profile, title: e.target.value })
                  }
                  placeholder="BIM-моделлер, архитектор и т.д."
                />
              </div>
              <div>
                <Label htmlFor="level">Уровень</Label>
                <Select
                  value={profile.level}
                  onValueChange={value =>
                    setProfile({ ...profile, level: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Начинающий</SelectItem>
                    <SelectItem value="PRO">PRO</SelectItem>
                    <SelectItem value="EXPERT">Эксперт</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="bio">О себе</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={e =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                placeholder="Расскажите о своем опыте и специализации..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="location">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Локация
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={e =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  placeholder="Город, страна"
                />
              </div>
              <div>
                <Label htmlFor="website">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Сайт/Портфолио
                </Label>
                <Input
                  id="website"
                  value={profile.website}
                  onChange={e =>
                    setProfile({ ...profile, website: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  Ставка (₽/час)
                </Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={profile.hourlyRate}
                  onChange={e =>
                    setProfile({ ...profile, hourlyRate: e.target.value })
                  }
                  placeholder="1500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Навыки</CardTitle>
            <CardDescription>
              Выберите ваши ключевые навыки и технологии
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Добавить новый навык"
                onKeyPress={e => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Предложенные навыки:</Label>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Badge
                    key={skill}
                    variant={
                      selectedSkills.includes(skill) ? 'default' : 'outline'
                    }
                    className="cursor-pointer"
                    onClick={() => {
                      if (selectedSkills.includes(skill)) {
                        removeSkill(skill);
                      } else {
                        setSelectedSkills([...selectedSkills, skill]);
                      }
                    }}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedSkills.length > 0 && (
              <div>
                <Label>Ваши навыки:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSkills.map(skill => (
                    <Badge key={skill} variant="default">
                      {skill}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Контактная информация</CardTitle>
            <CardDescription>
              Как с вами могут связаться заказчики
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">
                Email из вашего аккаунта
              </p>
            </div>

            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div>
              <Label htmlFor="telegram">Telegram</Label>
              <Input id="telegram" placeholder="@username" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}