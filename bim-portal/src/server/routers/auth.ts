import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const authRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text} from auth router!`,
      }
    }),
})
