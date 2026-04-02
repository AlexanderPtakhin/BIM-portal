import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import superjson from 'superjson';
import { db } from './db';

export type Context = {
  db: typeof db;
  req: Request;
};

export const createTRPCContext = async (opts: {
  req: Request;
}): Promise<Context> => {
  return {
    db,
    ...opts,
  };
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const router = t.router;
