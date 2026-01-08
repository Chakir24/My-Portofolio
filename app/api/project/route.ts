import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      'full-name': fullName,
      email,
      phone,
      company,
      'project-type': projectType,
      'project-title': projectTitle,
      'project-description': projectDescription,
      budget,
      timeline,
      features,
      technologies,
      reference,
      'additional-info': additionalInfo,
    } = body

    // Validation
    if (!fullName || !email || !projectType || !projectTitle || !projectDescription) {
      return NextResponse.json(
        { error: 'Full name, email, project type, title, and description are required' },
        { status: 400 }
      )
    }

    // Save to database
    const projectSubmission = await prisma.projectSubmission.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        company: company || null,
        projectType,
        projectTitle,
        projectDescription,
        budget: budget || null,
        timeline: timeline || null,
        features: features || null,
        technologies: technologies || null,
        reference: reference || null,
        additionalInfo: additionalInfo || null,
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Project submission received successfully',
        id: projectSubmission.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving project submission:', error)
    return NextResponse.json(
      { error: 'Failed to save project submission' },
      { status: 500 }
    )
  }
}

