import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL || '',
});

async function createRealData() {
  console.log('🌱 Создаем реальные данные в Supabase...');

  try {
    // 1. Создаем пользователя-клиента
    const clientUser = await prisma.user.create({
      data: {
        clerkId: 'client_real_123',
        email: 'client@bimportal.ru',
        name: 'ООО "BIM Проекты"',
        role: 'CLIENT',
        accountType: 'COMPANY',
        isBlocked: false,
      },
    });

    console.log('✅ Создан пользователь-клиент:', clientUser.name);

    // 2. Создаем профиль клиента
    const clientProfile = await prisma.clientProfile.create({
      data: {
        userId: clientUser.id,
        companyName: 'ООО "BIM Проекты"',
        companyDescription:
          'Ведущая компания в области BIM-моделирования и цифрового строительства',
        industry: 'Строительство и проектирование',
        website: 'https://bimprojects.ru',
        phone: '+7 (495) 123-45-67',
        country: 'Россия',
        city: 'Москва',
      },
    });

    console.log('✅ Создан профиль клиента:', clientProfile.companyName);

    // 3. Создаем реальные проекты
    const jobs = await prisma.job.createMany({
      data: [
        {
          clientId: clientProfile.id,
          title: 'BIM-модель многофункционального комплекса "Северная башня"',
          description:
            'Требуется разработка детализированной BIM-модели 35-этажного многофункционального комплекса. Общая площадь 45,000 м². Включает жилые апартаменты, офисные помещения, торговые площади и подземный паркинг. Необходимо разработать АР, КЖ, КМ, ОВ, ВК, ЭОМ разделы с полной координацией.',
          category: 'Architectural BIM',
          skills: ['Revit', 'AutoCAD', 'Navisworks', 'Solibri', 'BIM 360'],
          budgetType: 'fixed',
          budgetMin: 500000,
          budgetMax: 750000,
          durationDays: 45,
          deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          locationType: 'hybrid',
          status: 'PUBLISHED',
        },
        {
          clientId: clientProfile.id,
          title: 'Конструктивное моделирование стадиона "Локомотив"',
          description:
            'Разработка КЖ и КМ разделов для футбольного стадиона на 35,000 мест. Требуется расчет металлических конструкций покрытия, железобетонных трибун, фундаментов. Обязательно наличие опыта со спортивными объектами.',
          category: 'Structural BIM',
          skills: [
            'Revit Structure',
            'SCAD Office',
            'Lira SAPR',
            'Robot Structural Analysis',
          ],
          budgetType: 'fixed',
          budgetMin: 300000,
          budgetMax: 450000,
          durationDays: 30,
          deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          locationType: 'remote',
          status: 'PUBLISHED',
        },
        {
          clientId: clientProfile.id,
          title: 'BIM-моделирование инженерных сетей бизнес-центра',
          description:
            'Полная разработка инженерных систем (ОВ, ВК, ЭОМ, СКС, АПС) для 22-этажного бизнес-центра класса А. Площадь 28,000 м². Требуется опыт с коммерческой недвижимостью премиум-класса.',
          category: 'MEP BIM',
          skills: ['Revit MEP', 'AutoCAD MEP', 'MagiCAD', 'Tracer', 'DiaLux'],
          budgetType: 'fixed',
          budgetMin: 200000,
          budgetMax: 280000,
          durationDays: 25,
          deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
          locationType: 'remote',
          status: 'PUBLISHED',
        },
        {
          clientId: clientProfile.id,
          title:
            'BIM-координация и clash detection для логистического комплекса',
          description:
            'Проведение полной BIM-координации моделей от разных разделов для логистического комплекса площадью 15,000 м². Поиск коллизий, создание отчетов, организация совещаний, разработка рекомендаций по устранению проблем.',
          category: 'Construction BIM',
          skills: [
            'Navisworks',
            'Solibri Model Checker',
            'Revit',
            'BIM 360',
            'ProjectWise',
          ],
          budgetType: 'hourly',
          budgetMin: 2000,
          budgetMax: 3000,
          durationDays: 20,
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          locationType: 'remote',
          status: 'PUBLISHED',
        },
        {
          clientId: clientProfile.id,
          title: 'Разработка BIM-модели медицинского центра "Здоровье"',
          description:
            'Создание BIM-модели 6-этажного медицинского центра на 300 коек. Включает операционные, палаты, диагностические центры, лаборатории. Требуется знание медицинских нормативов и опыта с healthcare объектами.',
          category: 'Architectural BIM',
          skills: ['Revit', 'AutoCAD', '3ds Max', 'V-Ray', 'Enscape'],
          budgetType: 'fixed',
          budgetMin: 180000,
          budgetMax: 250000,
          durationDays: 35,
          deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
          locationType: 'hybrid',
          status: 'PUBLISHED',
        },
      ],
    });

    console.log(`✅ Создано ${jobs.count} реальных проектов`);

    // 4. Создаем фрилансера для откликов
    const freelancerUser = await prisma.user.create({
      data: {
        clerkId: 'freelancer_real_123',
        email: 'freelancer@bimportal.ru',
        name: 'Иван Петров',
        role: 'FREELANCER',
        accountType: 'INDIVIDUAL',
        isBlocked: false,
      },
    });

    console.log('✅ Создан пользователь-фрилансер:', freelancerUser.name);

    const freelancerProfile = await prisma.freelancerProfile.create({
      data: {
        userId: freelancerUser.id,
        title: 'BIM-моделлер / BIM-координатор',
        bio: 'Специалист с 7-летним опытом в BIM-моделировании. Работал с крупными коммерческими и жилыми проектами. Владею всем стеком BIM-инструментов.',
        location: 'Москва, Россия',
        website: 'https://ivanpetrov-bim.ru',
        hourlyRate: 2500,
        completedContracts: 23,
        rating: 4.8,
        reviewCount: 17,
        level: 'EXPERT',
        isVerified: true,
        skills: [
          'Revit',
          'AutoCAD',
          'Navisworks',
          'Solibri',
          'SCAD',
          '3ds Max',
        ],
        status: 'VERIFIED',
      },
    });

    console.log('✅ Создан профиль фрилансера:', freelancerProfile.title);

    console.log('🎉 Все реальные данные созданы успешно!');
    console.log('📊 Итого:');
    console.log(`- Пользователей: 2`);
    console.log(`- Проектов: ${jobs.count}`);
    console.log(`- Профилей: 2`);
  } catch (error) {
    console.error('❌ Ошибка при создании данных:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createRealData().catch(e => {
  console.error('❌ Фатальная ошибка:', e);
  process.exit(1);
});
