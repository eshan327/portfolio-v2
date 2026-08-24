import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const CANONICAL_HOST = 'eshankhan.dev'
const LEGACY_HOST = 'eshankhan.vercel.app'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]

  if (host !== LEGACY_HOST) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.protocol = 'https:'
  url.host = CANONICAL_HOST

  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: '/:path*',
}
