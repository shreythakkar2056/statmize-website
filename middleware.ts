import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Let everyone through to every page. The lockdown is OFF.
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}