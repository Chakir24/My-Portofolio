import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

/**
 * Vérifie si l'utilisateur est authentifié
 * Retourne la session ou null
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return null
  }
  
  return session
}

/**
 * Middleware pour protéger les routes API admin
 * Retourne une réponse 401 si non authentifié, sinon null
 */
export async function protectAdminRoute(request: NextRequest) {
  const session = await requireAuth()
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  return null
}
