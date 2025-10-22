import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, interests, careerMatches } = body

    // For now, we'll just simulate saving the data
    // In a real app, you would save to a database here
    console.log('Saving onboarding data:', {
      userId,
      interests,
      careerMatches
    })

    // Simulate successful save
    return NextResponse.json(
      { 
        success: true, 
        message: 'Onboarding data saved successfully',
        data: {
          userId,
          interests,
          careerMatches,
          savedAt: new Date().toISOString()
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error saving onboarding data:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to save onboarding data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}