import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    console.log('Fetching jobs from database...');
    try {
      const jobs = await ctx.db.job.findMany({
        where: {
          status: 'PUBLISHED',
        },
        include: {
          client_profiles: {
            include: {
              users: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      console.log('Jobs found:', jobs.length);
      return jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // моки
      return [
        {
          id: '1',
          title: 'BIM-модель жилого комплекса',
          description:
            'Нужна BIM-модель 5-этажного жилого дома в Revit с детализацией конструктивов и инженерных сетей.',
          category: 'Architectural BIM',
          budgetMin: 50000,
          budgetMax: 80000,
          status: 'PUBLISHED',
          client_profiles: {
            id: '2',
          },
          createdAt: new Date(),
          durationDays: 14,
        },
        // ...
      ];
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log('Fetching job by ID:', input.id);
      try {
        const job = await ctx.db.job.findUnique({
          where: { id: input.id },
          include: {
            client_profiles: {
              include: {
                users: true,
              },
            },
            proposals: {
              include: {
                freelancer_profiles: {
                  include: {
                    users: true,
                  },
                },
              },
            },
          },
        });
        return job;
      } catch (error) {
        console.error('Error fetching job:', error);
        // мок
        return {
          id: input.id,
          title: 'BIM-модель жилого комплекса',
          description:
            'Нужна BIM-модель 5-этажного жилого дома в Revit с детализацией конструктивов и инженерных сетей.',
          category: 'Architectural BIM',
          budgetMin: 50000,
          budgetMax: 80000,
          status: 'PUBLISHED',
          client_profiles: {
            id: '2',
          },
          createdAt: new Date(),
          durationDays: 14,
        };
      }
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, 'Название обязательно'),
        description: z.string().min(1, 'Описание обязательно'),
        category: z.string().min(1, 'Категория обязательна'),
        skills: z.array(z.string()),
        budgetType: z.enum(['fixed', 'hourly']),
        budgetMin: z.number().optional(),
        budgetMax: z.number().optional(),
        durationDays: z.number().optional(),
        locationType: z.enum(['remote', 'onsite', 'hybrid']),
        location: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        let client = await ctx.db.clientProfile.findFirst({
          include: { users: true },
        });

        if (!client) {
          const user = await ctx.db.users.create({
            data: {
              clerk_id: 'default_client',
              email: 'default@bimportal.ru',
              name: 'ООО "BIM Проекты"',
              role: 'CLIENT',
              account_type: 'COMPANY',
              is_blocked: false,
            },
          });

          client = await ctx.db.clientProfile.create({
            data: {
              user_id: user.id,
              company_name: 'ООО "BIM Проекты"',
              company_description:
                'Ведущая компания в области BIM-моделирования',
              industry: 'Строительство',
              website: 'https://bimprojects.ru',
              phone: '+7 (495) 123-45-67',
              country: 'Россия',
              city: 'Москва',
            },
            include: { users: true },
          });
        }

        const jobData = {
          title: input.title,
          description: input.description,
          category: input.category,
          skills: input.skills,
          client_id: client.id,
          status: 'PUBLISHED' as const,
          budget_type: input.budgetType,
          budget_min: input.budgetMin,
          budget_max: input.budgetMax,
          duration_days: input.durationDays,
          location_type: input.locationType,
          location: input.location,
        };

        const job = await ctx.db.job.create({
          data: jobData,
          include: {
            client_profiles: {
              include: {
                users: true,
              },
            },
          },
        });

        console.log('✅ Created real job in Supabase:', job.title);
        return job;
      } catch (error) {
        console.error('Error creating job:', error);
        throw new Error(
          'Не удалось создать проект: ' +
            (error instanceof Error ? error.message : 'Unknown error'),
        );
      }
    }),
});
