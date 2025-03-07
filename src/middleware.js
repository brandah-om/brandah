import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from '../i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(req) {
  const response = intlMiddleware(req);

  const allowedRoutes = [
    '/en',
    '/ar',
    '/en/login',
    '/ar/login',
    '/en/subscribe',
    '/ar/subscribe',
    '/en/RegisterAgency',
    '/ar/RegisterAgency',
    '/en/RegisterTourGuide',
    '/ar/RegisterTourGuide',
    '/en/RegisterTourist',
    '/ar/RegisterTourist',
    '/en/MyAccount',
    '/ar/MyAccount',
    '/ar/contactUs',
    '/en/contactUs',
    '/en/otp',
    '/ar/otp',
    '/en/forgetPassword',
    '/ar/forgetPassword',
    '/en/resetPassword',
    '/ar/resetPassword',
  ];

  const path = req.nextUrl.pathname;
  const token = req.cookies.get('token');

  if (!allowedRoutes.some(route => path.startsWith(route))) {
    return NextResponse.redirect(new URL('/en', req.url));
  }

  if ((path === '/en/MyAccount' || path === '/ar/MyAccount') && !token) {
    return NextResponse.redirect(new URL('/en/login', req.url));
  }

  return response;
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
