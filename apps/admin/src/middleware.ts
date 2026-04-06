import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    // Only allow admin role
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ['/((?!auth|_next|favicon.ico).*)'] }
