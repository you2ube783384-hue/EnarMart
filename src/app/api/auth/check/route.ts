import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USERNAME = 'aalbaal'
const ADMIN_PASSWORD = 'aalbaal'
const SESSION_TOKEN = 'digimarket_admin_session_' + Buffer.from(ADMIN_USERNAME + ADMIN_PASSWORD).toString('base64')

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session')

  if (session && session.value === SESSION_TOKEN) {
    return NextResponse.json({ authenticated: true })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}
