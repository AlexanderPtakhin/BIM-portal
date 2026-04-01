import { createTRPCRouter } from './trpc'
import { userRouter } from './routers/user'
import { jobRouter } from './routers/job'
import { authRouter } from './routers/auth'

export const appRouter = createTRPCRouter({
  user: userRouter,
  job: jobRouter,
  auth: authRouter,
})

export type AppRouter = typeof appRouter
