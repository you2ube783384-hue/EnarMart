import { NextRequest, NextResponse } from 'next/server'

// Simple admin credentials (like WordPress wp-config.php)
const ADMIN_USERNAME = 'aalbaal'
const ADMIN_PASSWORD = 'aalbaal'

// Simple session token
const SESSION_TOKEN = 'digimarket_admin_session_' + Buffer.from(ADMIN_USERNAME + ADMIN_PASSWORD).toString('base64')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })

      // Set httpOnly cookie for session
      response.cookies.set('admin_session', SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return response
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}
