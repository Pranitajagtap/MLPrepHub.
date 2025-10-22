// app/api/resumes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

// For App Router, use Promise wrapper for params
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params // Await the params

    const resume = await prisma.resume.findUnique({
      where: { id }
    })

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: resume.id,
      title: resume.title,
      userId: resume.userId,
      careerId: resume.careerId,
      summary: resume.summary,
      personalInfo: resume.personalInfo,
      skills: resume.skills,
      experiences: resume.experiences,
      projects: resume.projects,
      education: resume.education,
      certifications: resume.certifications,
      aiFeedback: resume.aiFeedback,
      aiScore: resume.aiScore,
      strengths: resume.strengths,
      improvements: resume.improvements,
      version: resume.version,
      isActive: resume.isActive,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt
    })

  } catch (error) {
    console.error('Resume fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params // Await the params
    const requestBody = await request.json()

    console.log('📝 Updating resume:', { id, requestBody })

    // Get an existing user
    const user = await prisma.user.findFirst()
    if (!user) {
      return NextResponse.json(
        { 
          error: 'No user account found. Please create an account first by signing up.' 
        },
        { status: 400 }
      )
    }

    // Get or create a default career
    let career = await prisma.career.findFirst()
    if (!career) {
      career = await prisma.career.create({
        data: {
          title: 'Software Developer',
          description: 'Default career path',
          scope: 'Global',
          earningPotential: '$60,000 - $120,000',
          skills: ['JavaScript', 'HTML', 'CSS'],
          demandLevel: 'HIGH',
          category: 'Technology'
        }
      })
      console.log('✅ Created default career:', career.id)
    }

    // Check if resume exists
    const existingResume = await prisma.resume.findUnique({
      where: { id }
    })

    let updatedResume;

    // Process data
    const educationData = Array.isArray(requestBody.education) 
      ? requestBody.education 
      : requestBody.education ? [requestBody.education] : []
    
    const certificationsData = Array.isArray(requestBody.certifications)
      ? requestBody.certifications
      : requestBody.certifications ? [requestBody.certifications] : []

    if (existingResume) {
      console.log('🔄 Updating existing resume...')
      // Update existing resume
      updatedResume = await prisma.resume.update({
        where: { id },
        data: {
          title: requestBody.title || 'My Resume',
          summary: requestBody.summary || '',
          personalInfo: requestBody.personalInfo || {},
          skills: requestBody.skills || [],
          experiences: requestBody.experiences || [],
          projects: requestBody.projects || [],
          education: educationData,
          certifications: certificationsData,
          aiScore: requestBody.score || 0,
          updatedAt: new Date()
        }
      })
    } else {
      console.log('🆕 Creating new resume...')
      // Create new resume with the existing user
      updatedResume = await prisma.resume.create({
        data: {
          id: id,
          title: requestBody.title || 'My Resume',
          summary: requestBody.summary || '',
          personalInfo: requestBody.personalInfo || {},
          skills: requestBody.skills || [],
          experiences: requestBody.experiences || [],
          projects: requestBody.projects || [],
          education: educationData,
          certifications: certificationsData,
          aiScore: requestBody.score || 0,
          userId: user.id,
          careerId: career.id,
          version: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    }

    console.log('✅ Resume saved successfully:', updatedResume.id)

    return NextResponse.json(
      { 
        message: 'Resume saved successfully',
        resume: updatedResume
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('❌ Resume update error:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params // Await the params

    // Check if resume exists
    const existingResume = await prisma.resume.findUnique({
      where: { id }
    })

    if (!existingResume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    // Delete resume
    await prisma.resume.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Resume deleted successfully' }
    )

  } catch (error) {
    console.error('Resume deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}