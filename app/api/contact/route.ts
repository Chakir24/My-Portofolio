import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateContactForm } from '@/lib/validation'

export const dynamic = 'force-dynamic'

// Limiter la taille du body
const MAX_BODY_SIZE = 10 * 1024 // 10 KB

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
    const validation = validateContactForm(body)
    
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
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: validation.sanitized.name,
        email: validation.sanitized.email,
        phone: validation.sanitized.phone,
        subject: validation.sanitized.subject,
        message: validation.sanitized.message,
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact message sent successfully',
        id: contactMessage.id 
      },
      { status: 201 }
    )
  } catch (error) {
    // Ne pas exposer les détails de l'erreur en production
    console.error('Error saving contact message:', error)
    return NextResponse.json(
      { error: 'Failed to save contact message' },
      { status: 500 }
    )
  }
}

