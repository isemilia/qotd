import { getSession } from '@/server/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@/features/auth/model/types';

// todo: refactor later
const routes = {
  user: [
    '/profile',
    '/profile/account',
    '/profile/answers',
    '/profile/favorites',
  ],
  staff: ['/admin'],
};

export const proxy = async (request: NextRequest) => {
  const authResponse = await middlewareAuth(request);

  if (authResponse) {
    return authResponse;
  }

  return NextResponse.next();
};

const middlewareAuth = async (request: NextRequest) => {
  const session = await getSession();

  const pathname = request.nextUrl.pathname;

  if (session) {
    if (['/sign-in', '/sign-up'].includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (routes.user.includes(pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  if (routes.staff.includes(pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    const allowedRoles = [UserRole.MODERATOR, UserRole.ADMIN];

    if (!allowedRoles.includes(session.user_role)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return null;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
