// app/api/resumes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

// This route doesn't have params, remove the second parameter
export async function POST(request: NextRequest) {
  try {
    const resumeData = await request.json()

    console.log('📥 Received resume data:', resumeData)

    // Validate required fields
    if (!resumeData.title || !resumeData.userId || !resumeData.careerId) {
      return NextResponse.json(
        { error: 'Title, userId, and careerId are required' },
        { status: 400 }
      )
    }

    // Create resume
    const resume = await prisma.resume.create({
      data: {
        title: resumeData.title,
        userId: resumeData.userId,
        careerId: resumeData.careerId,
        summary: resumeData.summary || '',
        personalInfo: resumeData.personalInfo || {},
        skills: resumeData.skills || [],
        experiences: resumeData.experiences || [],
        projects: resumeData.projects || [],
        education: resumeData.education || [],
        certifications: resumeData.certifications || [],
        aiFeedback: resumeData.aiFeedback || null,
        aiScore: resumeData.aiScore || 0,
        strengths: resumeData.strengths || [],
        improvements: resumeData.improvements || [],
        version: resumeData.version || 1,
        isActive: resumeData.isActive !== undefined ? resumeData.isActive : true,
      }
    })

    console.log('✅ Resume created successfully:', resume.id)

    return NextResponse.json(
      { 
        message: 'Resume created successfully',
        resume: {
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
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('❌ Resume creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    console.log('📥 Fetching resumes for user:', userId)

    const whereClause = userId ? { userId } : {}

    const resumes = await prisma.resume.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        userId: true,
        careerId: true,
        summary: true,
        personalInfo: true,
        skills: true,
        experiences: true,
        projects: true,
        education: true,
        certifications: true,
        aiFeedback: true,
        aiScore: true,
        strengths: true,
        improvements: true,
        version: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`✅ Found ${resumes.length} resumes`)

    return NextResponse.json({ 
      success: true,
      resumes 
    })

  } catch (error) {
    console.error('❌ Resume fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}