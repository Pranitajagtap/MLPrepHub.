import { NextRequest, NextResponse } from 'next/server'

// Mock user data - replace this with your actual database queries
const mockUsers = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'John Student',
    targetRole: 'ML Engineer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasCompletedOnboarding: true
  }
]

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would check the session cookie or JWT token
    const cookies = request.cookies
    const sessionToken = cookies.get('session-token') || cookies.get('next-auth.session-token')

    console.log('🔍 /api/auth/me: Checking authentication', { sessionToken })

    if (!sessionToken) {
      console.log('❌ /api/auth/me: No session token found')
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // In a real app, you would validate the token and fetch user from database
    // For now, we'll return the first mock user
    const user = mockUsers[0]

    if (!user) {
      console.log('❌ /api/auth/me: User not found')
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log('✅ /api/auth/me: User found:', user.email)
    return NextResponse.json(user)
  } catch (error) {
    console.error('❌ /api/auth/me: Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}