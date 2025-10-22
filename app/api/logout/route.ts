// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    console.log('🔄 Logout endpoint called')
    
    // Create response with success message
    const response = NextResponse.json(
      { 
        success: true,
        message: 'Logout successful' 
      },
      { status: 200 }
    )

    // Clear session cookie
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    // Clear auth-token cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    console.log('✅ Logout cookies cleared')
    return response

  } catch (error) {
    console.error('❌ Logout error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}