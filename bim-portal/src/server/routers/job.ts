import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.job.findMany({
      include: {
        client: true,
        proposals: true,
      },
    })
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.job.findUnique({
        where: { id: input.id },
        include: {
          client: true,
          proposals: {
            include: {
              freelancer: true,
            },
          },
        },
      })
    }),
})
