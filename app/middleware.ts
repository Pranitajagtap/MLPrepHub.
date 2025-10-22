import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register', '/', '/api/auth/login', '/api/auth/register']
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname) || 
                       pathname.startsWith('/api/test') ||
                       pathname.startsWith('/_next/') ||
                       pathname.startsWith('/favicon.ico')

  if (isPublicRoute) {
    // If user is logged in and tries to access auth pages, redirect to dashboard
    if (token && (pathname === '/auth/login' || pathname === '/auth/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Protect all routes except public ones
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}