/**
 * Utilitaires de validation et sanitization pour la sécurité
 */

// Caractères dangereux à échapper
const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /<link/gi,
  /<meta/gi,
  /<style/gi,
]

/**
 * Sanitize une chaîne de caractères pour prévenir les attaques XSS
 */
export function sanitizeString(input: string | null | undefined): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  let sanitized = input.trim()

  // Supprimer les patterns dangereux
  for (const pattern of DANGEROUS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '')
  }

  // Échapper les caractères HTML
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')

  return sanitized
}

/**
 * Valide un email
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Valide un numéro de téléphone (format international)
 */
export function isValidPhone(phone: string | null | undefined): boolean {
  if (!phone) return true // Optionnel

  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
  return phoneRegex.test(phone) && phone.length <= 20
}

/**
 * Valide la longueur d'une chaîne
 */
export function isValidLength(
  input: string | null | undefined,
  min: number,
  max: number
): boolean {
  if (!input) return min === 0
  return input.length >= min && input.length <= max
}

/**
 * Valide et sanitize un nom
 */
export function validateName(name: string | null | undefined): { valid: boolean; value: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, value: '' }
  }

  const sanitized = sanitizeString(name)
  
  if (!isValidLength(sanitized, 2, 100)) {
    return { valid: false, value: sanitized }
  }

  // Vérifier qu'il n'y a pas que des caractères spéciaux
  if (!/^[a-zA-ZÀ-ÿ\s\-'\.]+$/.test(sanitized)) {
    return { valid: false, value: sanitized }
  }

  return { valid: true, value: sanitized }
}

/**
 * Valide et sanitize un message
 */
export function validateMessage(
  message: string | null | undefined,
  maxLength: number = 5000
): { valid: boolean; value: string } {
  if (!message || typeof message !== 'string') {
    return { valid: false, value: '' }
  }

  const sanitized = sanitizeString(message)
  
  if (!isValidLength(sanitized, 10, maxLength)) {
    return { valid: false, value: sanitized }
  }

  return { valid: true, value: sanitized }
}

/**
 * Valide les données d'un formulaire de contact
 */
export interface ContactFormData {
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  message: string
}

export function validateContactForm(data: any): {
  valid: boolean
  errors: string[]
  sanitized: ContactFormData | null
} {
  const errors: string[] = []
  const sanitized: ContactFormData = {
    name: '',
    email: '',
    phone: null,
    subject: null,
    message: '',
  }

  // Validation du nom
  const nameValidation = validateName(data.name)
  if (!nameValidation.valid) {
    errors.push('Le nom est invalide (2-100 caractères, lettres uniquement)')
  } else {
    sanitized.name = nameValidation.value
  }

  // Validation de l'email
  if (!isValidEmail(data.email)) {
    errors.push('L\'email est invalide')
  } else {
    sanitized.email = data.email.toLowerCase().trim()
  }

  // Validation du téléphone (optionnel)
  if (data.phone) {
    if (!isValidPhone(data.phone)) {
      errors.push('Le numéro de téléphone est invalide')
    } else {
      sanitized.phone = sanitizeString(data.phone)
    }
  }

  // Validation du sujet (optionnel)
  if (data.subject) {
    const subjectSanitized = sanitizeString(data.subject)
    if (!isValidLength(subjectSanitized, 0, 200)) {
      errors.push('Le sujet est trop long (max 200 caractères)')
    } else {
      sanitized.subject = subjectSanitized
    }
  }

  // Validation du message
  const messageValidation = validateMessage(data.message, 5000)
  if (!messageValidation.valid) {
    errors.push('Le message est invalide (10-5000 caractères)')
  } else {
    sanitized.message = messageValidation.value
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? sanitized : null,
  }
}

/**
 * Valide les données d'un formulaire de projet
 */
export interface ProjectFormData {
  fullName: string
  email: string
  phone?: string | null
  company?: string | null
  projectType: string
  projectTitle: string
  projectDescription: string
  budget?: string | null
  timeline?: string | null
  features?: string | null
  technologies?: string | null
  reference?: string | null
  additionalInfo?: string | null
}

export function validateProjectForm(data: any): {
  valid: boolean
  errors: string[]
  sanitized: ProjectFormData | null
} {
  const errors: string[] = []
  const sanitized: ProjectFormData = {
    fullName: '',
    email: '',
    phone: null,
    company: null,
    projectType: '',
    projectTitle: '',
    projectDescription: '',
    budget: null,
    timeline: null,
    features: null,
    technologies: null,
    reference: null,
    additionalInfo: null,
  }

  // Validation du nom complet
  const nameValidation = validateName(data['full-name'] || data.fullName)
  if (!nameValidation.valid) {
    errors.push('Le nom complet est invalide')
  } else {
    sanitized.fullName = nameValidation.value
  }

  // Validation de l'email
  if (!isValidEmail(data.email)) {
    errors.push('L\'email est invalide')
  } else {
    sanitized.email = data.email.toLowerCase().trim()
  }

  // Validation du téléphone (optionnel)
  if (data.phone) {
    if (!isValidPhone(data.phone)) {
      errors.push('Le numéro de téléphone est invalide')
    } else {
      sanitized.phone = sanitizeString(data.phone)
    }
  }

  // Validation de l'entreprise (optionnel)
  if (data.company) {
    const companySanitized = sanitizeString(data.company)
    if (!isValidLength(companySanitized, 0, 200)) {
      errors.push('Le nom de l\'entreprise est trop long')
    } else {
      sanitized.company = companySanitized
    }
  }

  // Validation du type de projet
  const projectType = sanitizeString(data['project-type'] || data.projectType)
  if (!isValidLength(projectType, 1, 100)) {
    errors.push('Le type de projet est invalide')
  } else {
    sanitized.projectType = projectType
  }

  // Validation du titre du projet
  const titleSanitized = sanitizeString(data['project-title'] || data.projectTitle)
  if (!isValidLength(titleSanitized, 5, 200)) {
    errors.push('Le titre du projet est invalide (5-200 caractères)')
  } else {
    sanitized.projectTitle = titleSanitized
  }

  // Validation de la description
  const descValidation = validateMessage(data['project-description'] || data.projectDescription, 10000)
  if (!descValidation.valid) {
    errors.push('La description du projet est invalide (10-10000 caractères)')
  } else {
    sanitized.projectDescription = descValidation.value
  }

  // Champs optionnels
  const optionalFields = ['budget', 'timeline', 'features', 'technologies', 'reference', 'additional-info']
  for (const field of optionalFields) {
    const key = field === 'additional-info' ? 'additionalInfo' : field
    if (data[field]) {
      const sanitizedValue = sanitizeString(data[field])
      if (isValidLength(sanitizedValue, 0, 2000)) {
        ;(sanitized as any)[key] = sanitizedValue
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? sanitized : null,
  }
}
