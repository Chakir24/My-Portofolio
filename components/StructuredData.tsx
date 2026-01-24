const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chakir.dev'

export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Chakir BOUSSARI',
    jobTitle: 'Full Stack Developer & Designer',
    description: 'Développeur Full Stack et designer spécialisé en React, Next.js, Node.js, et création d\'interfaces utilisateur modernes.',
    url: siteUrl,
    image: `${siteUrl}/image2.jpg`,
    sameAs: [
      'https://github.com/Chakir24',
      // Ajoutez vos autres profils sociaux ici
    ],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'Frontend Development',
      'Backend Development',
      'UI/UX Design',
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'PostgreSQL',
      'Prisma',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rouyn-Noranda',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
    email: 'chakiribrahim24@gmail.com',
    availableLanguage: ['en', 'fr'],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Chakir BOUSSARI Portfolio',
    url: siteUrl,
    description: 'Portfolio professionnel de Chakir BOUSSARI, développeur Full Stack et designer.',
    author: {
      '@type': 'Person',
      name: 'Chakir BOUSSARI',
    },
    inLanguage: ['en-US', 'fr-FR'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
