import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateProjectForm } from '@/lib/validation'

export const dynamic = 'force-dynamic'

// Limiter la taille du body
const MAX_BODY_SIZE = 50 * 1024 // 50 KB

export async function POST(request: NextRequest) {
  try {
    // Vérifier la méthode
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      )
    }

    // Vérifier le Content-Type
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      )
    }

    // Lire et valider la taille du body
    const bodyText = await request.text()
    if (bodyText.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      )
    }

    // Parser le JSON
    let body
    try {
      body = JSON.parse(bodyText)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      )
    }

    // Validation et sanitization complète
    const validation = validateProjectForm(body)
    
    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.errors
        },
        { status: 400 }
      )
    }

    // Sauvegarder dans la base de données avec les données sanitizées
    const projectSubmission = await prisma.projectSubmission.create({
      data: {
        fullName: validation.sanitized.fullName,
        email: validation.sanitized.email,
        phone: validation.sanitized.phone,
        company: validation.sanitized.company,
        projectType: validation.sanitized.projectType,
        projectTitle: validation.sanitized.projectTitle,
        projectDescription: validation.sanitized.projectDescription,
        budget: validation.sanitized.budget,
        timeline: validation.sanitized.timeline,
        features: validation.sanitized.features,
        technologies: validation.sanitized.technologies,
        reference: validation.sanitized.reference,
        additionalInfo: validation.sanitized.additionalInfo,
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
    // Ne pas exposer les détails de l'erreur en production
    console.error('Error saving project submission:', error)
    return NextResponse.json(
      { error: 'Failed to save project submission' },
      { status: 500 }
    )
  }
}

