import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Get the path user is trying to visit
  const path = request.nextUrl.pathname

  // 2. Define allowed paths (The "Safe List")
  // We MUST allow:
  // - '/coming-soon' (The page we want to show)
  // - '/_next' (Next.js system files - breaking this breaks the site)
  // - Files like 'logo.png', 'favicon.ico' (detected by having a dot '.')
  const isAllowedPath = 
    path === '/coming-soon' || 
    path.startsWith('/_next') || 
    path.startsWith('/static') || 
    path.includes('.') ||
    path.startsWith('/admin') ||
    path.startsWith('/suervey') ||
    path.startsWith('/scan')||
    path.startsWith('/contact')
  // 3. If it's an allowed path, let them through
  if (isAllowedPath) {
    return NextResponse.next()
  }

  // 4. BLOCK everything else (Home, /sports, /contact) and force redirect
  return NextResponse.redirect(new URL('/coming-soon', request.url))
}

// 5. Run on every single route
export const config = {
  matcher: '/:path*',
}