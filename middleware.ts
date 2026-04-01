import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in((?!.).*)',
  '/sign-up((?!.).*)',
  '/api/hello',
  '/api/users',
  '/api/jobs',
  '/create-user',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Если пользователь не авторизован и пытается зайти в dashboard
  if (!userId && req.nextUrl.pathname.startsWith('/dashboard')) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Если пользователь авторизован и пытается зайти на auth страницы
  if (
    userId &&
    (req.nextUrl.pathname.startsWith('/sign-in') ||
      req.nextUrl.pathname.startsWith('/sign-up'))
  ) {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Если не public route и не авторизован - редирект на sign-in
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
